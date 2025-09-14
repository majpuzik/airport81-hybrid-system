#!/usr/bin/env node
/**
 * Upload všech bankovních výpisů přes MCP Server
 * 1. NEJDŘÍV jako PDF s OCR
 * 2. POTOM jako XML Base64
 */

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const monthNames = {
  '01': 'leden', '02': 'únor', '03': 'březen',
  '04': 'duben', '05': 'květen', '06': 'červen',
  '07': 'červenec', '08': 'srpen', '09': 'září',
  '10': 'říjen', '11': 'listopad', '12': 'prosinec'
};

async function uploadToMCP(request) {
  return new Promise((resolve, reject) => {
    const mcp = spawn('node', ['server.js'], {
      cwd: '/Users/m.a.j.puzik/unified-mcp-server',
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    let response = '';
    
    mcp.stdout.on('data', (data) => {
      response += data.toString();
    });
    
    mcp.on('close', (code) => {
      const lines = response.split('\n');
      for (const line of lines) {
        if (line.includes('jsonrpc') && line.startsWith('{')) {
          try {
            const result = JSON.parse(line);
            resolve(result);
            return;
          } catch (e) {
            // ignore
          }
        }
      }
      reject(new Error('No valid response'));
    });
    
    mcp.stdin.write(JSON.stringify(request) + '\n');
    mcp.stdin.end();
    
    setTimeout(() => {
      mcp.kill();
      reject(new Error('Timeout'));
    }, 30000);
  });
}

async function uploadPDF(pdfPath) {
  const filename = path.basename(pdfPath, '.pdf');
  const parts = filename.split('_');
  
  const account = parts[0] || 'Unknown';
  const dateStr = parts[1] || '';
  const year = dateStr.substring(0, 4) || '2024';
  const month = dateStr.substring(4, 6) || '01';
  const monthName = monthNames[month] || 'neznámý';
  
  const pdfContent = fs.readFileSync(pdfPath);
  const pdfBase64 = pdfContent.toString('base64');
  
  const request = {
    jsonrpc: "2.0",
    id: 1,
    method: "tools/call",
    params: {
      name: "paperless_upload_document",
      arguments: {
        file_content: pdfBase64,
        filename: `${filename}.pdf`,
        title: `ČSOB výpis ${account} - ${monthName} ${year} [PDF+OCR]`,
        tags: ["bankovní-výpis", "ČSOB", year, monthName, "pdf-ocr", "mbw"],
        correspondent: "ČSOB",
        content_type: "application/pdf",
        port: 8050
      }
    }
  };
  
  try {
    const result = await uploadToMCP(request);
    if (result.result) {
      console.log(`   ✅ PDF nahráno: ${filename}`);
      return true;
    }
  } catch (error) {
    console.log(`   ❌ PDF selhalo: ${filename} - ${error.message}`);
    return false;
  }
}

async function uploadXMLAsBase64(xmlPath) {
  const filename = path.basename(xmlPath, '.xml');
  const parts = filename.split('_');
  
  const account = parts[0] || 'Unknown';
  const dateStr = parts[1] || '';
  const year = dateStr.substring(0, 4) || '2024';
  const month = dateStr.substring(4, 6) || '01';
  const monthName = monthNames[month] || 'neznámý';
  
  const xmlContent = fs.readFileSync(xmlPath);
  
  // Create Base64 text document
  let txtContent = "=== PAPERLESS-NGX XML BASE64 ENCODED FILE ===\n";
  txtContent += "Type: Bank Statement XML\n";
  txtContent += "Encoding: Base64\n";
  txtContent += `Account: ${account}\n`;
  txtContent += `Period: ${monthName} ${year}\n`;
  txtContent += `Encoded-Date: ${new Date().toISOString()}\n`;
  txtContent += "=== BEGIN BASE64 CONTENT ===\n";
  
  const base64Content = xmlContent.toString('base64');
  const formatted = base64Content.match(/.{1,80}/g).join('\n');
  
  txtContent += formatted;
  txtContent += "\n=== END BASE64 CONTENT ===\n";
  
  const txtBase64 = Buffer.from(txtContent).toString('base64');
  
  const request = {
    jsonrpc: "2.0",
    id: 1,
    method: "tools/call",
    params: {
      name: "paperless_upload_document",
      arguments: {
        file_content: txtBase64,
        filename: `${filename}_xml_base64.txt`,
        title: `ČSOB výpis ${account} - ${monthName} ${year} [XML-Base64]`,
        tags: ["bankovní-výpis", "ČSOB", year, monthName, "xml-base64", "strojově-čitelné", "mbw"],
        correspondent: "ČSOB",
        content_type: "text/plain",
        port: 8050
      }
    }
  };
  
  try {
    const result = await uploadToMCP(request);
    if (result.result) {
      console.log(`   ✅ XML-Base64 nahráno: ${filename}`);
      return true;
    }
  } catch (error) {
    console.log(`   ❌ XML selhalo: ${filename} - ${error.message}`);
    return false;
  }
}

async function main() {
  console.log("=" + "=".repeat(69));
  console.log("📊 NAHRÁVÁNÍ BANKOVNÍCH VÝPISŮ PŘES MCP SERVER V4");
  console.log("=" + "=".repeat(69));
  console.log("📋 Pořadí: 1. PDF+OCR, 2. XML-Base64");
  console.log("=" + "=".repeat(69));
  
  const basePath = '/Users/m.a.j.puzik/Library/CloudStorage/OneDrive-Osobní/MBW';
  
  // 1. NEJDŘÍV PDF VÝPISY
  console.log("\n📄 FÁZE 1: PDF VÝPISY S OCR");
  console.log("-".repeat(40));
  
  const pdfFolder = path.join(basePath, '20250221_42796603_EV_183343');
  let pdfUploaded = 0;
  let pdfFailed = 0;
  
  if (fs.existsSync(pdfFolder)) {
    const pdfFiles = fs.readdirSync(pdfFolder)
      .filter(f => f.endsWith('.pdf'))
      .map(f => path.join(pdfFolder, f))
      .sort();
    
    console.log(`Nalezeno ${pdfFiles.length} PDF výpisů\n`);
    
    for (let i = 0; i < pdfFiles.length; i++) {
      console.log(`[${i + 1}/${pdfFiles.length}] ${path.basename(pdfFiles[i])}`);
      const success = await uploadPDF(pdfFiles[i]);
      if (success) pdfUploaded++;
      else pdfFailed++;
    }
  }
  
  // 2. POTOM XML JAKO BASE64
  console.log("\n\n🔐 FÁZE 2: XML VÝPISY JAKO BASE64");
  console.log("-".repeat(40));
  
  const xmlFolders = ['CSOB vypis', 'CSOB', 'Bank'];
  let xmlFiles = [];
  
  for (const folder of xmlFolders) {
    const folderPath = path.join(basePath, folder);
    if (fs.existsSync(folderPath)) {
      const findXML = (dir) => {
        const files = fs.readdirSync(dir);
        for (const file of files) {
          const fullPath = path.join(dir, file);
          const stat = fs.statSync(fullPath);
          if (stat.isDirectory()) {
            findXML(fullPath);
          } else if (file.endsWith('.xml')) {
            xmlFiles.push(fullPath);
          }
        }
      };
      findXML(folderPath);
    }
  }
  
  xmlFiles.sort();
  console.log(`Nalezeno ${xmlFiles.length} XML výpisů\n`);
  
  let xmlUploaded = 0;
  let xmlFailed = 0;
  
  for (let i = 0; i < xmlFiles.length; i++) {
    console.log(`[${i + 1}/${xmlFiles.length}] ${path.basename(xmlFiles[i])}`);
    const success = await uploadXMLAsBase64(xmlFiles[i]);
    if (success) xmlUploaded++;
    else xmlFailed++;
  }
  
  // Výsledky
  console.log("\n" + "=".repeat(70));
  console.log("📊 VÝSLEDKY:");
  console.log(`  ✅ PDF nahráno: ${pdfUploaded}`);
  console.log(`  ❌ PDF selhalo: ${pdfFailed}`);
  console.log(`  ✅ XML nahráno: ${xmlUploaded}`);
  console.log(`  ❌ XML selhalo: ${xmlFailed}`);
  console.log("=" + "=".repeat(69));
  console.log("\n✨ Bankovní výpisy jsou nyní uloženy:");
  console.log("   1. Jako PDF s OCR (pro čtení)");
  console.log("   2. Jako XML Base64 (pro strojové zpracování)");
}

main().catch(console.error);