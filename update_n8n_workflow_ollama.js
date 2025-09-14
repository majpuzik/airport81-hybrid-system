// Script pro úpravu N8N workflow - nahrazení OpenAI za Ollama

const fs = require('fs');

// Načíst původní workflow
const workflow = JSON.parse(fs.readFileSync('advanced_document_recognition_n8n.json', 'utf8'));

// Najít a nahradit AI node
const aiNodeIndex = workflow.nodes.findIndex(node => node.id === 'aiDocumentAnalysis');

if (aiNodeIndex !== -1) {
  // Nahradit OpenAI node za Ollama HTTP Request
  workflow.nodes[aiNodeIndex] = {
    "parameters": {
      "method": "POST",
      "url": "http://host.docker.internal:11434/api/generate",
      "sendHeaders": true,
      "headerParameters": {
        "parameters": [
          {
            "name": "Content-Type",
            "value": "application/json"
          }
        ]
      },
      "sendBody": true,
      "specifyBody": "json",
      "jsonBody": `={
  "model": "llama3.3:70b",
  "prompt": "Jsi expert na analýzu business dokumentů. Tvým úkolem je PŘESNĚ určit typ dokumentu a extrahovat klíčové informace.\\n\\nTYPY DOKUMENTŮ které musíš rozpoznat:\\n1. FAKTURA - daňový doklad s IČO, DIČ, částkou k úhradě\\n2. PROFORMA - předfaktura, není daňový doklad\\n3. BANKOVNÍ VÝPIS - výpis z účtu s transakcemi\\n4. POTVRZENÍ O PLATBĚ - potvrzení o přijaté/odeslané platbě\\n5. POTVRZENÍ O PŘEVODU - potvrzení bankovního převodu\\n6. SMLOUVA - právní dokument s podmínkami\\n7. OBJEDNÁVKA - objednávka zboží/služeb\\n8. DODACÍ LIST - potvrzení o dodání\\n9. UPOMÍNKA - upomínka k platbě\\n10. JINÝ - pokud nespadá do výše uvedených\\n\\nAnalyzuj tento dokument:\\nNázev souboru: {{ $('attachmentAnalysis').item.json.attachmentAnalysis.documentAttachments[0].filename }}\\nPředběžná klasifikace: {{ $('documentClassification').item.json.documentClassification.primaryType }}\\nObsah emailu:\\n{{ $('documentClassification').item.json.emailText }}\\n\\nVRAŤ POUZE JSON bez dalšího textu:\\n{\\n  \\"documentType\\": \\"přesný_typ\\",\\n  \\"confidence\\": 0.0-1.0,\\n  \\"vendor\\": \\"název_dodavatele\\",\\n  \\"documentNumber\\": \\"číslo_dokumentu\\",\\n  \\"date\\": \\"datum_vystavení\\",\\n  \\"amount\\": číslo_nebo_null,\\n  \\"currency\\": \\"CZK/EUR/USD\\",\\n  \\"variableSymbol\\": \\"VS_pokud_existuje\\",\\n  \\"dueDate\\": \\"datum_splatnosti\\",\\n  \\"extractedData\\": {}\\n}",
  "stream": false,
  "options": {
    "temperature": 0.1,
    "num_predict": 1000
  }
}`,
      "options": {
        "timeout": 60000
      }
    },
    "id": "ollamaAnalysis",
    "name": "Ollama Document Analysis (70B)",
    "type": "n8n-nodes-base.httpRequest",
    "typeVersion": 4.2,
    "position": [1800, 300]
  };
}

// Upravit preparePaperless node pro zpracování Ollama odpovědi
const preparePaperlessIndex = workflow.nodes.findIndex(node => node.id === 'preparePaperless');

if (preparePaperlessIndex !== -1) {
  // Upravit kód pro parsování Ollama odpovědi
  const originalCode = workflow.nodes[preparePaperlessIndex].parameters.jsCode;
  const updatedCode = originalCode.replace(
    "const aiAnalysis = JSON.parse($('aiDocumentAnalysis').first().json.content || '{}');",
    `// Zpracovat Ollama odpověď
const ollamaResponse = $('ollamaAnalysis').first().json;
let aiAnalysis = {};
try {
  // Ollama vrací JSON v poli 'response'
  const responseText = ollamaResponse.response || ollamaResponse.choices?.[0]?.message?.content || '{}';
  aiAnalysis = JSON.parse(responseText);
} catch (e) {
  console.error('Failed to parse Ollama response:', e);
  aiAnalysis = {};
}`
  );
  workflow.nodes[preparePaperlessIndex].parameters.jsCode = updatedCode;
}

// Upravit connections
if (workflow.connections['aiDocumentAnalysis']) {
  workflow.connections['ollamaAnalysis'] = workflow.connections['aiDocumentAnalysis'];
  delete workflow.connections['aiDocumentAnalysis'];
}

// Upravit odkazy na aiDocumentAnalysis
for (const [nodeName, connections] of Object.entries(workflow.connections)) {
  if (connections.main) {
    for (const mainConnections of connections.main) {
      for (const connection of mainConnections) {
        if (connection.node === 'aiDocumentAnalysis') {
          connection.node = 'ollamaAnalysis';
        }
      }
    }
  }
}

// Uložit upravený workflow
fs.writeFileSync('advanced_document_recognition_ollama_n8n.json', JSON.stringify(workflow, null, 2));

console.log('✅ Workflow upraven pro Ollama!');
console.log('📄 Nový soubor: advanced_document_recognition_ollama_n8n.json');
console.log('🤖 Používá model: llama3.3:70b');
console.log('🔗 API endpoint: http://host.docker.internal:11434/api/generate');