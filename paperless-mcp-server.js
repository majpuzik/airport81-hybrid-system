const express = require('express');
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.MCP_PORT || 3001;

// Configuration
const PAPERLESS_URL = process.env.PAPERLESS_URL || 'http://host.docker.internal:8050';
const PAPERLESS_TOKEN = process.env.PAPERLESS_TOKEN;
const ANYPARSER_API_KEY = 'ap-6339380810039441f1f04952188b6c9dee638be509cf8e21';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer for file uploads
const upload = multer({ 
    dest: 'uploads/',
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// AnyParser API call
async function parseWithAnyParser(filePath, documentType = 'auto') {
    try {
        const formData = new FormData();
        formData.append('file', fs.createReadStream(filePath));
        
        let instructions = getInstructionsByType(documentType);
        
        formData.append('extract_instruction', instructions);
        
        const response = await axios.post('https://api.cambioml.com/v1/parse', formData, {
            headers: {
                'X-API-Key': ANYPARSER_API_KEY,
                ...formData.getHeaders()
            },
            timeout: 60000
        });
        
        return response.data;
    } catch (error) {
        console.error('AnyParser error:', error.response?.data || error.message);
        throw error;
    }
}

// Get parsing instructions by document type
function getInstructionsByType(type) {
    const instructions = {
        'invoice': `
            Extract from this invoice:
            - Číslo faktury (invoice number)
            - Datum vystavení (issue date)
            - Datum splatnosti (due date)
            - Dodavatel (supplier) with IČO and DIČ
            - Odběratel (customer) with IČO and DIČ
            - Celková částka (total amount)
            - Variabilní symbol (variable symbol)
            - Položky s cenami (line items with prices)
            - DPH sazby (VAT rates)
            
            Return as JSON with Czech field names.
        `,
        'bank_statement': `
            Extract from this bank statement:
            - Název banky (bank name)
            - Číslo účtu (account number)
            - Období výpisu (statement period)
            - Počáteční zůstatek (opening balance)
            - Konečný zůstatek (closing balance)
            - Seznam transakcí (transactions) with date, amount, description, variable symbol
            
            Return as JSON with Czech field names.
        `,
        'contract': `
            Extract from this contract:
            - Typ smlouvy (contract type)
            - Smluvní strany (contracting parties)
            - Datum podpisu (signature date)
            - Platnost od/do (validity period)
            - Hlavní předmět (main subject)
            - Cena/náklady (price/costs)
            
            Return as JSON with Czech field names.
        `,
        'receipt': `
            Extract from this receipt:
            - Obchodník (merchant name)
            - Datum a čas (date and time)
            - Celková částka (total amount)
            - DPH (VAT amount)
            - Způsob platby (payment method)
            - Položky (items purchased)
            
            Return as JSON with Czech field names.
        `,
        'auto': `
            Analyze this document and determine if it's:
            - Faktura (invoice) - extract invoice data
            - Bankovní výpis (bank statement) - extract banking data
            - Smlouva (contract) - extract contract data
            - Účtenka (receipt) - extract receipt data
            - Úřední dokument (official document) - extract official data
            
            Extract all relevant information and return as JSON with document type and extracted data.
        `
    };
    
    return instructions[type] || instructions['auto'];
}

// Convert AnyParser result to Paperless tags
function createPaperlessTags(parsedData, documentType, filename) {
    const tags = [];
    const metadata = {
        title: filename.replace(/\.[^/.]+$/, ""), // Remove extension
        correspondent: null,
        document_type: null,
        created: new Date().toISOString().split('T')[0]
    };
    
    // Document type tag
    const typeMapping = {
        'invoice': 'faktura',
        'bank_statement': 'bankovni-vypis', 
        'contract': 'smlouva',
        'receipt': 'uctenka',
        'official': 'uredni-dokument'
    };
    
    if (typeMapping[documentType]) {
        tags.push(typeMapping[documentType]);
        metadata.document_type = typeMapping[documentType];
    }
    
    // Extract correspondent from parsed data
    if (parsedData.dodavatel) {
        metadata.correspondent = parsedData.dodavatel;
        tags.push(`korespondent-${parsedData.dodavatel.toLowerCase().replace(/\s+/g, '-')}`);
    } else if (parsedData.banka) {
        metadata.correspondent = parsedData.banka;
        tags.push(`banka-${parsedData.banka.toLowerCase().replace(/\s+/g, '-')}`);
    } else if (parsedData.obchodnik) {
        metadata.correspondent = parsedData.obchodnik;
        tags.push(`obchodnik-${parsedData.obchodnik.toLowerCase().replace(/\s+/g, '-')}`);
    }
    
    // Amount tag for invoices/receipts
    if (parsedData.celkova_castka || parsedData.total_amount) {
        const amount = parsedData.celkova_castka || parsedData.total_amount;
        const numAmount = parseFloat(amount.toString().replace(/[^\d.,]/g, '').replace(',', '.'));
        
        if (numAmount > 10000) {
            tags.push('velka-faktura');
        } else if (numAmount > 1000) {
            tags.push('stredni-faktura');
        } else {
            tags.push('mala-faktura');
        }
    }
    
    // Date tags
    const currentYear = new Date().getFullYear();
    tags.push(`rok-${currentYear}`);
    
    const currentMonth = new Date().toLocaleDateString('cs-CZ', { month: 'long' });
    tags.push(`mesic-${currentMonth}`);
    
    // IČO/DIČ tags
    if (parsedData.ico) {
        tags.push(`ico-${parsedData.ico}`);
    }
    if (parsedData.dic) {
        tags.push(`dic-${parsedData.dic}`);
    }
    
    // Source tag
    tags.push('import-anyparser');
    
    return { tags, metadata };
}

// Upload to Paperless
async function uploadToPaperless(filePath, tags, metadata) {
    try {
        const formData = new FormData();
        formData.append('document', fs.createReadStream(filePath));
        formData.append('title', metadata.title);
        
        if (metadata.correspondent) {
            formData.append('correspondent', metadata.correspondent);
        }
        
        if (metadata.document_type) {
            formData.append('document_type', metadata.document_type);
        }
        
        formData.append('created', metadata.created);
        formData.append('tags', tags.join(','));
        
        const response = await axios.post(
            `${PAPERLESS_URL}/api/documents/post_document/`,
            formData,
            {
                headers: {
                    'Authorization': `Token ${PAPERLESS_TOKEN}`,
                    ...formData.getHeaders()
                },
                timeout: 120000
            }
        );
        
        return response.data;
    } catch (error) {
        console.error('Paperless upload error:', error.response?.data || error.message);
        throw error;
    }
}

// Main endpoint for document processing
app.post('/process-document', upload.single('file'), async (req, res) => {
    const startTime = Date.now();
    
    try {
        const { documentType = 'auto' } = req.body;
        const filePath = req.file.path;
        const filename = req.file.originalname;
        
        console.log(`Processing: ${filename} as type: ${documentType}`);
        
        // Step 1: Parse with AnyParser
        console.log('Step 1: Parsing with AnyParser...');
        const parsedData = await parseWithAnyParser(filePath, documentType);
        
        // Step 2: Create tags and metadata
        console.log('Step 2: Creating tags and metadata...');
        const { tags, metadata } = createPaperlessTags(parsedData, documentType, filename);
        
        // Step 3: Upload to Paperless
        console.log('Step 3: Uploading to Paperless...');
        const paperlessResult = await uploadToPaperless(filePath, tags, metadata);
        
        // Cleanup
        fs.unlinkSync(filePath);
        
        const processingTime = Date.now() - startTime;
        
        res.json({
            success: true,
            filename,
            documentType,
            parsedData,
            tags,
            metadata,
            paperlessId: paperlessResult.id || paperlessResult.task_id,
            processingTime: `${processingTime}ms`
        });
        
    } catch (error) {
        // Cleanup on error
        if (req.file?.path) {
            try {
                fs.unlinkSync(req.file.path);
            } catch (e) {}
        }
        
        res.status(500).json({
            success: false,
            error: error.message,
            details: error.response?.data || null
        });
    }
});

// Batch processing endpoint
app.post('/process-batch', upload.array('files', 10), async (req, res) => {
    const results = [];
    const { documentType = 'auto' } = req.body;
    
    for (const file of req.files) {
        try {
            console.log(`Processing batch file: ${file.originalname}`);
            
            const parsedData = await parseWithAnyParser(file.path, documentType);
            const { tags, metadata } = createPaperlessTags(parsedData, documentType, file.originalname);
            const paperlessResult = await uploadToPaperless(file.path, tags, metadata);
            
            results.push({
                filename: file.originalname,
                success: true,
                paperlessId: paperlessResult.id || paperlessResult.task_id,
                tags,
                parsedData
            });
            
            fs.unlinkSync(file.path);
            
        } catch (error) {
            results.push({
                filename: file.originalname,
                success: false,
                error: error.message
            });
            
            if (file.path) {
                try { fs.unlinkSync(file.path); } catch (e) {}
            }
        }
    }
    
    res.json({
        success: true,
        totalProcessed: req.files.length,
        results
    });
});

// Test endpoint
app.get('/test', async (req, res) => {
    try {
        // Test Paperless connection
        const paperlessTest = await axios.get(`${PAPERLESS_URL}/api/`, {
            headers: { 'Authorization': `Token ${PAPERLESS_TOKEN}` },
            timeout: 5000,
            validateStatus: function (status) {
                return status < 500; // Resolve only if the status code is less than 500
            }
        });
        
        res.json({
            success: true,
            paperlessConnected: paperlessTest.status === 200,
            anyparserApiKey: ANYPARSER_API_KEY ? 'configured' : 'missing',
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            paperlessConnected: false
        });
    }
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Paperless MCP Server running on port ${port}`);
    console.log(`📡 Paperless URL: ${PAPERLESS_URL}`);
    console.log(`🔑 API Key configured: ${ANYPARSER_API_KEY ? 'YES' : 'NO'}`);
    console.log(`🔐 Paperless Token: ${PAPERLESS_TOKEN ? 'YES' : 'NO'}`);
});