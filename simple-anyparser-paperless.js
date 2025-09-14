const express = require('express');
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3002;

// Configuration
const PAPERLESS_URL = 'http://localhost:8050';
const PAPERLESS_TOKEN = '0f57f058dbe5d56e9ddd63b74251fd7655ed0932';
const ANYPARSER_API_KEY = 'ap-6339380810039441f1f04952188b6c9dee638be509cf8e21';

console.log('🚀 Starting Simple AnyParser → Paperless Server');
console.log('📡 Paperless URL:', PAPERLESS_URL);
console.log('🔑 API Key configured:', ANYPARSER_API_KEY ? 'YES' : 'NO');

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Multer for file uploads
const upload = multer({ 
    dest: 'uploads/',
    limits: { fileSize: 50 * 1024 * 1024 }
});

// Web interface
app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>AnyParser → Paperless</title>
    <style>
        body { font-family: Arial; margin: 40px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; color: #333; margin-bottom: 30px; }
        .upload-area { border: 2px dashed #ccc; padding: 40px; text-align: center; margin: 20px 0; border-radius: 10px; }
        .upload-area:hover { border-color: #007bff; background: #f8f9fa; }
        select, input[type="file"] { margin: 10px; padding: 10px; font-size: 16px; }
        button { background: #007bff; color: white; padding: 15px 30px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer; }
        button:hover { background: #0056b3; }
        .result { margin-top: 20px; padding: 20px; background: #f8f9fa; border-radius: 5px; }
        .success { background: #d4edda; color: #155724; }
        .error { background: #f8d7da; color: #721c24; }
        .log { background: #333; color: #fff; padding: 15px; border-radius: 5px; font-family: monospace; max-height: 300px; overflow-y: auto; }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="header">🚀 AnyParser → Paperless Document Processor</h1>
        
        <form id="uploadForm" enctype="multipart/form-data">
            <div class="upload-area" onclick="document.getElementById('fileInput').click()">
                <p>📁 Click to select files or drag & drop</p>
                <input type="file" id="fileInput" name="file" accept=".pdf,.jpg,.jpeg,.png" style="display: none;" required>
                <p id="fileName" style="color: #666; font-size: 14px;"></p>
            </div>
            
            <label for="docType">📋 Document Type:</label>
            <select id="docType" name="documentType">
                <option value="auto">Auto-detect</option>
                <option value="invoice">Faktura (Invoice)</option>
                <option value="bank_statement">Bankovní výpis (Bank Statement)</option>
                <option value="contract">Smlouva (Contract)</option>
                <option value="receipt">Účtenka (Receipt)</option>
            </select>
            
            <br><br>
            <button type="submit">🔄 Process & Upload to Paperless</button>
        </form>
        
        <div id="result"></div>
        <div id="log" class="log" style="display: none;"></div>
    </div>

    <script>
        document.getElementById('fileInput').addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
                document.getElementById('fileName').textContent = '📄 Selected: ' + e.target.files[0].name;
            }
        });

        document.getElementById('uploadForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const resultDiv = document.getElementById('result');
            const logDiv = document.getElementById('log');
            const formData = new FormData();
            
            const fileInput = document.getElementById('fileInput');
            const docType = document.getElementById('docType').value;
            
            if (!fileInput.files[0]) {
                resultDiv.innerHTML = '<div class="error">❌ Please select a file first!</div>';
                return;
            }
            
            formData.append('file', fileInput.files[0]);
            formData.append('documentType', docType);
            
            resultDiv.innerHTML = '<div>⏳ Processing document...</div>';
            logDiv.style.display = 'block';
            logDiv.innerHTML = 'Starting processing...\\n';
            
            try {
                const response = await fetch('/process-document', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success) {
                    resultDiv.innerHTML = \`
                        <div class="success">
                            <h3>✅ Document processed successfully!</h3>
                            <p><strong>File:</strong> \${result.filename}</p>
                            <p><strong>Paperless ID:</strong> \${result.paperlessId || 'Processing...'}</p>
                            <p><strong>Tags:</strong> \${result.tags ? result.tags.join(', ') : 'N/A'}</p>
                            <p><strong>Processing time:</strong> \${result.processingTime}</p>
                        </div>
                    \`;
                    
                    logDiv.innerHTML += 'SUCCESS: Document uploaded to Paperless!\\n';
                    
                } else {
                    resultDiv.innerHTML = \`
                        <div class="error">
                            <h3>❌ Processing failed</h3>
                            <p><strong>Error:</strong> \${result.error}</p>
                        </div>
                    \`;
                    
                    logDiv.innerHTML += 'ERROR: ' + result.error + '\\n';
                }
                
            } catch (error) {
                resultDiv.innerHTML = \`
                    <div class="error">
                        <h3>❌ Network error</h3>
                        <p><strong>Error:</strong> \${error.message}</p>
                    </div>
                \`;
                
                logDiv.innerHTML += 'NETWORK ERROR: ' + error.message + '\\n';
            }
        });
    </script>
</body>
</html>
    `);
});

// Parse with AnyParser
async function parseWithAnyParser(filePath, documentType = 'auto') {
    try {
        console.log(`📄 Parsing ${path.basename(filePath)} with AnyParser...`);
        
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
        
        console.log('✅ AnyParser response received');
        return response.data;
        
    } catch (error) {
        console.error('❌ AnyParser error:', error.response?.data || error.message);
        throw error;
    }
}

// Get instructions by document type
function getInstructionsByType(type) {
    const instructions = {
        'invoice': 'Extract from this Czech invoice: Číslo faktury (invoice number), Datum vystavení (issue date), Dodavatel (supplier) with IČO and DIČ, Celková částka (total amount), Variabilní symbol. Return as JSON with Czech field names.',
        'bank_statement': 'Extract from this bank statement: Název banky (bank name), Číslo účtu (account number), Období výpisu (period), Transakce (transactions). Return as JSON with Czech field names.',
        'contract': 'Extract from this contract: Typ smlouvy (contract type), Smluvní strany (parties), Datum podpisu (signature date), Předmět (subject). Return as JSON with Czech field names.',
        'receipt': 'Extract from this receipt: Obchodník (merchant), Datum (date), Celková částka (total amount). Return as JSON with Czech field names.',
        'auto': 'Analyze this document and determine if it is a Czech faktura (invoice), bankovní výpis (bank statement), smlouva (contract), or účtenka (receipt). Extract all relevant information and return as JSON.'
    };
    
    return instructions[type] || instructions['auto'];
}

// Create Paperless tags from parsed data
function createPaperlessTags(parsedData, documentType, filename) {
    const tags = [];
    
    // Document type tag
    const typeMapping = {
        'invoice': 'faktura',
        'bank_statement': 'bankovni-vypis', 
        'contract': 'smlouva',
        'receipt': 'uctenka'
    };
    
    if (typeMapping[documentType]) {
        tags.push(typeMapping[documentType]);
    }
    
    // Add current year and month
    const now = new Date();
    tags.push(`rok-${now.getFullYear()}`);
    
    const months = ['leden', 'unor', 'brezen', 'duben', 'kveten', 'cerven', 
                   'cervenec', 'srpen', 'zari', 'rijen', 'listopad', 'prosinec'];
    tags.push(`mesic-${months[now.getMonth()]}`);
    
    // Source tag
    tags.push('import-anyparser');
    
    return tags;
}

// Upload to Paperless
async function uploadToPaperless(filePath, tags, title) {
    try {
        console.log(`📤 Uploading to Paperless: ${title}`);
        
        const formData = new FormData();
        formData.append('document', fs.createReadStream(filePath));
        formData.append('title', title);
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
        
        console.log('✅ Uploaded to Paperless successfully');
        return response.data;
        
    } catch (error) {
        console.error('❌ Paperless upload error:', error.response?.data || error.message);
        throw error;
    }
}

// Main processing endpoint
app.post('/process-document', upload.single('file'), async (req, res) => {
    const startTime = Date.now();
    
    try {
        const { documentType = 'auto' } = req.body;
        const filePath = req.file.path;
        const filename = req.file.originalname;
        
        console.log(`\n🔄 Processing: ${filename} (type: ${documentType})`);
        
        // Step 1: Parse with AnyParser
        const parsedData = await parseWithAnyParser(filePath, documentType);
        
        // Step 2: Create tags
        const tags = createPaperlessTags(parsedData, documentType, filename);
        const title = filename.replace(/\.[^/.]+$/, "");
        
        // Step 3: Upload to Paperless
        const paperlessResult = await uploadToPaperless(filePath, tags, title);
        
        // Cleanup
        fs.unlinkSync(filePath);
        
        const processingTime = Date.now() - startTime;
        
        console.log(`✅ Complete! Processing time: ${processingTime}ms`);
        
        res.json({
            success: true,
            filename,
            documentType,
            parsedData,
            tags,
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
        
        console.error('❌ Processing failed:', error.message);
        
        res.status(500).json({
            success: false,
            error: error.message,
            details: error.response?.data || null
        });
    }
});

// Test endpoint
app.get('/test', async (req, res) => {
    try {
        console.log('🔍 Testing connections...');
        
        // Test Paperless
        const paperlessTest = await axios.get(`${PAPERLESS_URL}/api/`, {
            headers: { 'Authorization': `Token ${PAPERLESS_TOKEN}` },
            timeout: 5000
        });
        
        console.log('✅ Paperless connected');
        
        res.json({
            success: true,
            paperlessConnected: paperlessTest.status === 200,
            anyparserApiKey: 'configured',
            paperlessUrl: PAPERLESS_URL,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        
        res.json({
            success: false,
            error: error.message,
            paperlessConnected: false,
            paperlessUrl: PAPERLESS_URL
        });
    }
});

// Start server
app.listen(port, () => {
    console.log(`\n🚀 Simple AnyParser → Paperless Server running on port ${port}`);
    console.log(`🌐 Open: http://localhost:${port}`);
    console.log(`🧪 Test: http://localhost:${port}/test`);
    console.log('\n📋 Ready to process documents!');
});