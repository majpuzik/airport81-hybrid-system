// N8N PDF Converter Module
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const fs = require('fs').promises;
const path = require('path');

async function convertToPDF(inputFile, outputFile) {
    try {
        const result = await execPromise(
            `python3 /Users/m.a.j.puzik/universal_pdf_converter.py "${inputFile}" "${outputFile}"`
        );
        return { success: true, output: outputFile, method: 'Universal Converter' };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function mergePDFs(pdfFiles, outputFile) {
    try {
        const files = pdfFiles.join(' ');
        const result = await execPromise(
            `python3 /Users/m.a.j.puzik/universal_pdf_converter.py "${pdfFiles[0]}" "${outputFile}" --merge ${pdfFiles.slice(1).join(' ')}`
        );
        return { success: true, output: outputFile, method: 'PDF Merger' };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

module.exports = { convertToPDF, mergePDFs };
