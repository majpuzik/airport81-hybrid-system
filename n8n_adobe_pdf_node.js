// N8N Custom Node for Adobe Acrobat PDF Conversion
// This code can be used in n8n Code node

const processDocumentWithAdobe = async (document) => {
    const fs = require('fs');
    const path = require('path');
    const { exec } = require('child_process');
    const util = require('util');
    const execPromise = util.promisify(exec);
    
    // Configuration
    const config = {
        outputBase: document.outputPath || '/Users/m.a.j.puzik/classified_documents',
        documentType: document.classification?.type || 'ostatni',
        useAdobe: true,
        mergeAttachments: document.mergeAttachments !== false
    };
    
    // Create output folder structure
    const outputFolder = path.join(config.outputBase, config.documentType);
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true });
    }
    
    // Generate output filename
    const date = new Date().toISOString().split('T')[0];
    const sender = (document.from || 'unknown')
        .replace(/[<>@]/g, '')
        .replace(/[^a-z0-9]/gi, '_')
        .substring(0, 30);
    const outputFilename = `${date}_${config.documentType}_${sender}.pdf`;
    const outputPath = path.join(outputFolder, outputFilename);
    
    // Prepare files for conversion
    const filesToConvert = [];
    const tempDir = `/tmp/pdf_conversion_${Date.now()}`;
    fs.mkdirSync(tempDir, { recursive: true });
    
    try {
        // 1. Create HTML from email content
        if (document.emailText || document.content) {
            const htmlContent = `
<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <style>
        @page { size: A4; margin: 2cm; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            margin: -20px -20px 20px -20px;
            border-radius: 10px;
        }
        .classification {
            background: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 15px;
            margin: 20px 0;
        }
        .field {
            margin: 10px 0;
            display: flex;
        }
        .label {
            font-weight: bold;
            width: 150px;
            color: #495057;
        }
        .value {
            flex: 1;
        }
        .content {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #dee2e6;
        }
        .priority-1 { border-left-color: #dc3545; }
        .priority-2 { border-left-color: #ffc107; }
        .priority-3 { border-left-color: #28a745; }
        .attachments {
            margin-top: 30px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 5px;
        }
        .attachment-item {
            padding: 5px 0;
            border-bottom: 1px solid #dee2e6;
        }
        .footer {
            margin-top: 50px;
            padding-top: 20px;
            border-top: 1px solid #dee2e6;
            font-size: 0.9em;
            color: #6c757d;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>📄 ${document.classification?.type === 'soudni_obesilka' ? '⚖️ SOUDNÍ DOKUMENT' :
               document.classification?.type === 'faktura' ? '💰 FAKTURA' :
               document.classification?.type === 'smlouva' ? '📋 SMLOUVA' :
               'Dokument'}</h1>
    </div>
    
    <div class="classification priority-${document.classification?.priority || 3}">
        <h2>Klasifikace dokumentu</h2>
        <div class="field">
            <span class="label">Typ dokumentu:</span>
            <span class="value">${document.classification?.type || 'Neznámý'}</span>
        </div>
        <div class="field">
            <span class="label">Priorita:</span>
            <span class="value">${document.classification?.priority || 'Normální'} ${
                document.classification?.requiresUrgentAction ? '⚠️ VYŽADUJE AKCI' : ''
            }</span>
        </div>
        <div class="field">
            <span class="label">Důvěryhodnost:</span>
            <span class="value">${Math.round((document.classification?.confidence || 0) * 100)}%</span>
        </div>
    </div>
    
    <div class="metadata">
        <div class="field">
            <span class="label">Od:</span>
            <span class="value">${document.from || 'Neznámý odesílatel'}</span>
        </div>
        <div class="field">
            <span class="label">Komu:</span>
            <span class="value">${document.to || '-'}</span>
        </div>
        <div class="field">
            <span class="label">Předmět:</span>
            <span class="value"><strong>${document.subject || 'Bez předmětu'}</strong></span>
        </div>
        <div class="field">
            <span class="label">Datum:</span>
            <span class="value">${document.date || new Date().toLocaleString('cs-CZ')}</span>
        </div>
        ${document.classification?.extractedData ? `
        <div class="field">
            <span class="label">IČO:</span>
            <span class="value">${document.classification.extractedData.ico?.[0] || '-'}</span>
        </div>
        <div class="field">
            <span class="label">Variabilní symbol:</span>
            <span class="value">${document.classification.extractedData.variableSymbol?.[0] || '-'}</span>
        </div>
        <div class="field">
            <span class="label">Částka:</span>
            <span class="value">${document.classification.extractedData.amounts?.[0] || '-'}</span>
        </div>
        ` : ''}
    </div>
    
    <div class="content">
        <h3>Obsah dokumentu</h3>
        <pre style="white-space: pre-wrap; font-family: inherit;">${
            (document.emailText || document.content || 'Prázdný dokument').substring(0, 10000)
        }</pre>
    </div>
    
    ${document.attachments && document.attachments.length > 0 ? `
    <div class="attachments">
        <h3>📎 Přílohy (${document.attachments.length})</h3>
        ${document.attachments.map((att, i) => `
            <div class="attachment-item">
                ${i + 1}. <strong>${att.filename}</strong> 
                (${att.mimeType}, ${att.size ? (att.size / 1024).toFixed(1) + ' KB' : 'velikost neznámá'})
            </div>
        `).join('')}
    </div>
    ` : ''}
    
    <div class="footer">
        <p>Dokument zpracován: ${new Date().toLocaleString('cs-CZ')}</p>
        <p>Systém: N8N Document Classifier with Adobe Acrobat</p>
        ${document.needsPaperlessTags ? `
        <p><strong>Paperless-ngx tagy:</strong> ${[
            document.classification?.type,
            document.classification?.priority <= 2 ? 'urgent' : 'normal',
            document.classification?.isTrustedSender ? 'trusted' : 'untrusted'
        ].join(', ')}</p>
        ` : ''}
    </div>
</body>
</html>`;
            
            const htmlPath = path.join(tempDir, 'email_content.html');
            fs.writeFileSync(htmlPath, htmlContent, 'utf8');
            filesToConvert.push(htmlPath);
        }
        
        // 2. Process attachments
        if (document.attachments && document.attachments.length > 0) {
            for (const attachment of document.attachments) {
                if (attachment.data) {
                    const attachPath = path.join(tempDir, attachment.filename);
                    const buffer = Buffer.from(attachment.data, 'base64');
                    fs.writeFileSync(attachPath, buffer);
                    filesToConvert.push(attachPath);
                } else if (attachment.path && fs.existsSync(attachment.path)) {
                    filesToConvert.push(attachment.path);
                }
            }
        }
        
        // 3. Convert using Adobe Acrobat via AppleScript
        if (filesToConvert.length > 0) {
            const appleScript = `
            set outputFile to POSIX file "${outputPath}"
            set tempFiles to {}
            
            tell application "Adobe Acrobat DC"
                activate
                
                -- Convert each file to PDF first
                ${filesToConvert.map((file, index) => {
                    const ext = path.extname(file).toLowerCase();
                    const tempPdf = path.join(tempDir, `temp_${index}.pdf`);
                    
                    if (ext === '.pdf') {
                        return `set end of tempFiles to POSIX file "${file}"`;
                    } else if (ext === '.html') {
                        return `
                        -- Convert HTML to PDF using Acrobat
                        do JavaScript "
                            var doc = app.newDoc();
                            doc.insertPages({
                                nPage: -1,
                                cPath: '${file}',
                                nStart: 0
                            });
                            doc.saveAs('${tempPdf}');
                            doc.closeDoc(true);
                        "
                        set end of tempFiles to POSIX file "${tempPdf}"`;
                    } else {
                        return `
                        -- Open and convert other formats
                        open POSIX file "${file}"
                        set sourceDoc to document 1
                        save sourceDoc to POSIX file "${tempPdf}" as "com.adobe.acrobat.pdf"
                        close sourceDoc saving no
                        set end of tempFiles to POSIX file "${tempPdf}"`;
                    }
                }).join('\n')}
                
                -- Merge all PDFs
                if (count of tempFiles) > 0 then
                    set mergedDoc to open (item 1 of tempFiles)
                    
                    repeat with i from 2 to count of tempFiles
                        set currentFile to item i of tempFiles
                        set insertDoc to open currentFile
                        set pageCount to count of pages of mergedDoc
                        
                        my insertPages(mergedDoc, insertDoc, pageCount)
                        
                        close insertDoc saving no
                    end repeat
                    
                    -- Optimize and save
                    save mergedDoc to outputFile using PDFOptimizer
                    close mergedDoc saving no
                end if
            end tell
            
            on insertPages(targetDoc, sourceDoc, afterPage)
                tell application "Adobe Acrobat DC"
                    set sourcePageCount to count of pages of sourceDoc
                    repeat with pageNum from 1 to sourcePageCount
                        duplicate page pageNum of sourceDoc to after page afterPage of targetDoc
                        set afterPage to afterPage + 1
                    end repeat
                end tell
            end insertPages
            `;
            
            // Save AppleScript to file
            const scriptPath = path.join(tempDir, 'convert.scpt');
            fs.writeFileSync(scriptPath, appleScript);
            
            // Execute AppleScript
            try {
                await execPromise(`osascript "${scriptPath}"`);
                
                // Verify output file was created
                if (fs.existsSync(outputPath)) {
                    document.pdfPath = outputPath;
                    document.pdfCreated = true;
                    document.conversionMethod = 'Adobe Acrobat DC';
                } else {
                    throw new Error('PDF creation failed');
                }
            } catch (error) {
                console.error('Adobe conversion error:', error);
                
                // Fallback to Python method
                const fallbackScript = `
import sys
import os
os.chdir('${tempDir}')

# Try to merge HTMLs and files
from weasyprint import HTML
from PyPDF2 import PdfMerger

merger = PdfMerger()

# Convert HTML files
for file in ${JSON.stringify(filesToConvert.filter(f => f.endsWith('.html')))}:
    try:
        HTML(file).write_pdf(file.replace('.html', '.pdf'))
        merger.append(file.replace('.html', '.pdf'))
    except:
        pass

# Add PDF files
for file in ${JSON.stringify(filesToConvert.filter(f => f.endsWith('.pdf')))}:
    try:
        merger.append(file)
    except:
        pass

merger.write('${outputPath}')
merger.close()
`;
                
                const pythonScriptPath = path.join(tempDir, 'fallback.py');
                fs.writeFileSync(pythonScriptPath, fallbackScript);
                
                try {
                    await execPromise(`python3 "${pythonScriptPath}"`);
                    document.pdfPath = outputPath;
                    document.pdfCreated = true;
                    document.conversionMethod = 'Python fallback';
                } catch (pythonError) {
                    document.pdfCreated = false;
                    document.error = pythonError.message;
                }
            }
        }
        
    } finally {
        // Clean up temp directory
        try {
            fs.rmSync(tempDir, { recursive: true, force: true });
        } catch (e) {
            console.error('Cleanup error:', e);
        }
    }
    
    return document;
};

// Export for n8n
return await Promise.all($input.all().map(item => 
    processDocumentWithAdobe(item.json)
        .then(result => ({json: result}))
));