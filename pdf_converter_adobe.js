// Advanced PDF Converter using Adobe Acrobat and fallback options
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

class PDFConverter {
    constructor(options = {}) {
        this.useAdobe = options.useAdobe !== false;
        this.adobePath = '/Applications/Adobe Acrobat DC/Adobe Acrobat.app/Contents/MacOS/AdobeAcrobat';
        this.outputPath = options.outputPath || '/Users/m.a.j.puzik/classified_documents';
        this.mergeAttachments = options.mergeAttachments !== false;
    }

    // Method 1: Adobe Acrobat via AppleScript (Best quality)
    async convertWithAdobeAcrobat(inputFiles, outputFile) {
        const appleScript = `
        tell application "Adobe Acrobat"
            activate
            
            -- Create new PDF document
            set newDoc to make new document
            
            -- Add each file
            ${inputFiles.map((file, index) => `
            open "${file}"
            set sourceDoc to document 1
            
            -- Copy all pages
            repeat with pageNum from 1 to count of pages of sourceDoc
                duplicate page pageNum of sourceDoc to end of pages of newDoc
            end repeat
            
            close sourceDoc saving no
            `).join('\n')}
            
            -- Save merged PDF
            save newDoc to "${outputFile}" with linearize
            close newDoc saving no
        end tell
        `;
        
        try {
            await execPromise(`osascript -e '${appleScript.replace(/'/g, "'\"'\"'")}'`);
            return { success: true, method: 'Adobe Acrobat', output: outputFile };
        } catch (error) {
            console.error('Adobe Acrobat error:', error);
            return { success: false, error: error.message };
        }
    }

    // Method 2: Adobe Acrobat CLI (if available)
    async convertWithAdobeCLI(inputFile, outputFile) {
        const commands = {
            // Convert email to PDF
            eml: `"${this.adobePath}" -print-to-pdf "${inputFile}" -o "${outputFile}"`,
            
            // Convert MSG to PDF
            msg: `"${this.adobePath}" -print-to-pdf "${inputFile}" -o "${outputFile}"`,
            
            // Convert DOC/DOCX to PDF
            doc: `"${this.adobePath}" -print-to-pdf "${inputFile}" -o "${outputFile}"`,
            docx: `"${this.adobePath}" -print-to-pdf "${inputFile}" -o "${outputFile}"`,
            
            // Optimize existing PDF
            pdf: `"${this.adobePath}" -optimize "${inputFile}" -o "${outputFile}"`
        };
        
        const ext = path.extname(inputFile).toLowerCase().slice(1);
        const command = commands[ext];
        
        if (!command) {
            return { success: false, error: 'Unsupported file type' };
        }
        
        try {
            await execPromise(command);
            return { success: true, method: 'Adobe CLI', output: outputFile };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Method 3: Use Python with pdfkit (fallback)
    async convertWithPython(inputFile, outputFile) {
        const pythonScript = `
import sys
import os
from pathlib import Path

# Try different PDF libraries
try:
    import pdfkit
    has_pdfkit = True
except:
    has_pdfkit = False

try:
    from reportlab.pdfgen import canvas
    from reportlab.lib.pagesizes import letter
    has_reportlab = True
except:
    has_reportlab = False

try:
    from fpdf import FPDF
    has_fpdf = True
except:
    has_fpdf = False

input_file = "${inputFile}"
output_file = "${outputFile}"
file_ext = Path(input_file).suffix.lower()

def convert_with_pdfkit():
    if file_ext in ['.html', '.htm']:
        pdfkit.from_file(input_file, output_file)
    elif file_ext in ['.txt', '.log']:
        with open(input_file, 'r', encoding='utf-8') as f:
            content = f.read()
        html_content = f"<html><body><pre>{content}</pre></body></html>"
        pdfkit.from_string(html_content, output_file)
    return True

def convert_with_reportlab():
    c = canvas.Canvas(output_file, pagesize=letter)
    if file_ext in ['.txt', '.log']:
        with open(input_file, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        y = 750
        for line in lines[:50]:  # First 50 lines
            c.drawString(50, y, line[:80])  # Max 80 chars per line
            y -= 15
            if y < 50:
                c.showPage()
                y = 750
    c.save()
    return True

def convert_with_fpdf():
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    if file_ext in ['.txt', '.log']:
        with open(input_file, 'r', encoding='utf-8') as f:
            for line in f:
                pdf.cell(0, 10, txt=line[:80], ln=True)
    pdf.output(output_file)
    return True

# Try conversion methods in order
if has_pdfkit:
    convert_with_pdfkit()
elif has_reportlab:
    convert_with_reportlab()
elif has_fpdf:
    convert_with_fpdf()
else:
    print("No PDF library available")
    sys.exit(1)

print(f"Converted to {output_file}")
`;
        
        const scriptPath = '/tmp/convert_to_pdf.py';
        fs.writeFileSync(scriptPath, pythonScript);
        
        try {
            await execPromise(`python3 ${scriptPath}`);
            return { success: true, method: 'Python', output: outputFile };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Method 4: Use LibreOffice (universal converter)
    async convertWithLibreOffice(inputFile, outputDir) {
        const command = `/Applications/LibreOffice.app/Contents/MacOS/soffice --headless --convert-to pdf --outdir "${outputDir}" "${inputFile}"`;
        
        try {
            await execPromise(command);
            const baseName = path.basename(inputFile, path.extname(inputFile));
            const outputFile = path.join(outputDir, `${baseName}.pdf`);
            return { success: true, method: 'LibreOffice', output: outputFile };
        } catch (error) {
            // Try alternative path
            try {
                const altCommand = `soffice --headless --convert-to pdf --outdir "${outputDir}" "${inputFile}"`;
                await execPromise(altCommand);
                const baseName = path.basename(inputFile, path.extname(inputFile));
                const outputFile = path.join(outputDir, `${baseName}.pdf`);
                return { success: true, method: 'LibreOffice', output: outputFile };
            } catch (altError) {
                return { success: false, error: altError.message };
            }
        }
    }

    // Method 5: Use textutil + cupsfilter (macOS built-in)
    async convertWithMacOS(inputFile, outputFile) {
        const ext = path.extname(inputFile).toLowerCase();
        const tempPs = '/tmp/temp.ps';
        
        try {
            if (['.doc', '.docx', '.rtf', '.txt'].includes(ext)) {
                // Convert to PostScript first
                await execPromise(`textutil -convert ps "${inputFile}" -output "${tempPs}"`);
                // Then to PDF
                await execPromise(`cupsfilter "${tempPs}" > "${outputFile}"`);
                fs.unlinkSync(tempPs);
            } else if (ext === '.html') {
                // Direct HTML to PDF
                await execPromise(`cupsfilter "${inputFile}" > "${outputFile}"`);
            }
            
            return { success: true, method: 'macOS built-in', output: outputFile };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Main conversion method with fallbacks
    async convertToPDF(inputFile, outputFile, options = {}) {
        const ext = path.extname(inputFile).toLowerCase();
        
        // If already PDF, just copy or optimize
        if (ext === '.pdf') {
            if (this.useAdobe) {
                // Optimize with Adobe
                return await this.convertWithAdobeCLI(inputFile, outputFile);
            } else {
                // Just copy
                fs.copyFileSync(inputFile, outputFile);
                return { success: true, method: 'Copy', output: outputFile };
            }
        }
        
        // Try conversion methods in order of preference
        const methods = [];
        
        if (this.useAdobe) {
            methods.push(() => this.convertWithAdobeCLI(inputFile, outputFile));
        }
        
        methods.push(
            () => this.convertWithLibreOffice(inputFile, path.dirname(outputFile)),
            () => this.convertWithMacOS(inputFile, outputFile),
            () => this.convertWithPython(inputFile, outputFile)
        );
        
        for (const method of methods) {
            const result = await method();
            if (result.success) {
                return result;
            }
        }
        
        return { success: false, error: 'All conversion methods failed' };
    }

    // Merge multiple PDFs into one
    async mergePDFs(inputFiles, outputFile) {
        // Filter only PDF files
        const pdfFiles = inputFiles.filter(f => path.extname(f).toLowerCase() === '.pdf');
        
        if (pdfFiles.length === 0) {
            return { success: false, error: 'No PDF files to merge' };
        }
        
        if (pdfFiles.length === 1) {
            fs.copyFileSync(pdfFiles[0], outputFile);
            return { success: true, method: 'Single file', output: outputFile };
        }
        
        // Try Adobe Acrobat first
        if (this.useAdobe) {
            const result = await this.convertWithAdobeAcrobat(pdfFiles, outputFile);
            if (result.success) return result;
        }
        
        // Fallback to Python PyPDF2
        const pythonMergeScript = `
import sys
from PyPDF2 import PdfMerger
import pikepdf

files = ${JSON.stringify(pdfFiles)}
output = "${outputFile}"

try:
    # Try PyPDF2
    merger = PdfMerger()
    for pdf in files:
        merger.append(pdf)
    merger.write(output)
    merger.close()
    print(f"Merged with PyPDF2: {output}")
except:
    try:
        # Try pikepdf
        pdf = pikepdf.new()
        for file in files:
            src = pikepdf.open(file)
            pdf.pages.extend(src.pages)
        pdf.save(output)
        print(f"Merged with pikepdf: {output}")
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)
`;
        
        const scriptPath = '/tmp/merge_pdfs.py';
        fs.writeFileSync(scriptPath, pythonMergeScript);
        
        try {
            await execPromise(`python3 ${scriptPath}`);
            return { success: true, method: 'Python PDF merger', output: outputFile };
        } catch (error) {
            // Last resort: use macOS built-in
            try {
                const joinCommand = `"/System/Library/Automator/Combine PDF Pages.action/Contents/Resources/join.py" -o "${outputFile}" ${pdfFiles.map(f => `"${f}"`).join(' ')}`;
                await execPromise(joinCommand);
                return { success: true, method: 'macOS PDF joiner', output: outputFile };
            } catch (macError) {
                return { success: false, error: macError.message };
            }
        }
    }

    // Process email with attachments
    async processEmailDocument(emailData, outputPath) {
        const tempDir = '/tmp/email_processing_' + Date.now();
        fs.mkdirSync(tempDir, { recursive: true });
        
        const pdfFiles = [];
        
        try {
            // 1. Convert email body to PDF
            const emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { background: #f0f0f0; padding: 15px; margin-bottom: 20px; }
        .field { margin: 10px 0; }
        .label { font-weight: bold; }
        .content { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ccc; }
    </style>
</head>
<body>
    <div class="header">
        <h2>Email Document</h2>
        <div class="field"><span class="label">From:</span> ${emailData.from || 'Unknown'}</div>
        <div class="field"><span class="label">To:</span> ${emailData.to || 'Unknown'}</div>
        <div class="field"><span class="label">Subject:</span> ${emailData.subject || 'No subject'}</div>
        <div class="field"><span class="label">Date:</span> ${emailData.date || new Date().toISOString()}</div>
    </div>
    <div class="content">
        ${emailData.content || emailData.emailText || 'No content'}
    </div>
</body>
</html>`;
            
            const emailHtmlPath = path.join(tempDir, 'email.html');
            fs.writeFileSync(emailHtmlPath, emailHtml);
            
            const emailPdfPath = path.join(tempDir, 'email.pdf');
            const emailResult = await this.convertToPDF(emailHtmlPath, emailPdfPath);
            
            if (emailResult.success) {
                pdfFiles.push(emailPdfPath);
            }
            
            // 2. Convert attachments to PDF
            if (emailData.attachments && emailData.attachments.length > 0) {
                for (const attachment of emailData.attachments) {
                    if (attachment.data || attachment.path) {
                        const attachPath = attachment.path || path.join(tempDir, attachment.filename);
                        
                        // Save attachment if data provided
                        if (attachment.data) {
                            const buffer = Buffer.from(attachment.data, 'base64');
                            fs.writeFileSync(attachPath, buffer);
                        }
                        
                        const attachPdfPath = path.join(tempDir, `attachment_${path.basename(attachment.filename, path.extname(attachment.filename))}.pdf`);
                        const attachResult = await this.convertToPDF(attachPath, attachPdfPath);
                        
                        if (attachResult.success) {
                            pdfFiles.push(attachPdfPath);
                        }
                    }
                }
            }
            
            // 3. Merge all PDFs
            if (this.mergeAttachments && pdfFiles.length > 0) {
                const mergeResult = await this.mergePDFs(pdfFiles, outputPath);
                
                // Clean up temp files
                fs.rmSync(tempDir, { recursive: true, force: true });
                
                return mergeResult;
            } else {
                // Just copy the email PDF
                if (pdfFiles.length > 0) {
                    fs.copyFileSync(pdfFiles[0], outputPath);
                    fs.rmSync(tempDir, { recursive: true, force: true });
                    return { success: true, method: 'Single PDF', output: outputPath };
                }
            }
            
        } catch (error) {
            fs.rmSync(tempDir, { recursive: true, force: true });
            return { success: false, error: error.message };
        }
    }
}

module.exports = PDFConverter;

// Example usage in n8n
if (require.main === module) {
    const converter = new PDFConverter({
        useAdobe: true,
        mergeAttachments: true
    });
    
    // Test conversion
    const testEmail = {
        from: 'sender@example.com',
        to: 'recipient@example.com', 
        subject: 'Test Invoice',
        content: 'This is a test invoice email',
        attachments: [
            { filename: 'invoice.pdf', path: '/path/to/invoice.pdf' }
        ]
    };
    
    converter.processEmailDocument(testEmail, '/tmp/test_output.pdf')
        .then(result => console.log('Result:', result))
        .catch(error => console.error('Error:', error));
}