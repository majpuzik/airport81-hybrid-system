#!/usr/bin/env node
/**
 * Test MCP Server Paperless upload
 */

import { spawn } from 'child_process';
import fs from 'fs';

const testUpload = async () => {
  console.log('🔧 Testing MCP Server Paperless upload...\n');
  
  // Test PDF file
  const testPdf = '/Users/m.a.j.puzik/Library/CloudStorage/OneDrive-Osobní/MBW/20250221_42796603_EV_183343/269290450_20240131_1_MCZB.pdf';
  
  if (!fs.existsSync(testPdf)) {
    console.error('❌ Test PDF not found');
    return;
  }
  
  // Read PDF and convert to Base64
  const pdfContent = fs.readFileSync(testPdf);
  const pdfBase64 = pdfContent.toString('base64');
  
  console.log(`📄 PDF file: ${testPdf}`);
  console.log(`📏 Size: ${pdfContent.length} bytes`);
  console.log(`🔐 Base64 length: ${pdfBase64.length} chars\n`);
  
  // Create MCP request
  const mcpRequest = {
    jsonrpc: "2.0",
    id: 1,
    method: "tools/call",
    params: {
      name: "paperless_upload_document",
      arguments: {
        file_content: pdfBase64,
        filename: "test_269290450_20240131.pdf",
        title: "TEST ČSOB výpis - leden 2024 [PDF+OCR]",
        tags: ["bankovní-výpis", "ČSOB", "2024", "leden", "test"],
        correspondent: "ČSOB",
        content_type: "application/pdf",
        port: 8050
      }
    }
  };
  
  console.log('📤 Sending to MCP Server...\n');
  
  // Spawn MCP Server
  const mcp = spawn('node', ['server.js'], {
    cwd: '/Users/m.a.j.puzik/unified-mcp-server',
    stdio: ['pipe', 'pipe', 'pipe']
  });
  
  let response = '';
  
  mcp.stdout.on('data', (data) => {
    response += data.toString();
  });
  
  mcp.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  
  mcp.on('close', (code) => {
    console.log(`\n✅ MCP Server closed with code ${code}`);
    
    // Parse response
    const lines = response.split('\n');
    for (const line of lines) {
      if (line.includes('jsonrpc') && line.startsWith('{')) {
        try {
          const result = JSON.parse(line);
          console.log('\n📥 MCP Response:');
          console.log(JSON.stringify(result, null, 2));
        } catch (e) {
          // ignore parse errors
        }
      }
    }
  });
  
  // Send request
  mcp.stdin.write(JSON.stringify(mcpRequest) + '\n');
  mcp.stdin.end();
  
  // Timeout after 30 seconds
  setTimeout(() => {
    mcp.kill();
  }, 30000);
};

testUpload().catch(console.error);