# Ruční vytvoření n8n workflow pro klasifikaci dokumentů

## 1. Vytvořte nový workflow v n8n

1. Otevřete n8n: http://localhost:5678
2. Klikněte na **"New Workflow"**

## 2. Přidejte Webhook node

1. Klikněte na **"+"** pro přidání node
2. Hledejte **"Webhook"**
3. Přetáhněte do canvasu
4. Dvojklik pro nastavení:
   - **Webhook URL**: `document-classifier`
   - **HTTP Method**: POST
   - **Response Mode**: Last Node
5. Klikněte **"Save"**

## 3. Přidejte HTTP Request node

1. Klikněte na **"+"**
2. Hledejte **"HTTP Request"**
3. Přetáhněte vpravo od Webhook
4. Propojte: táhněte z Webhook na HTTP Request
5. Dvojklik pro nastavení:
   - **URL**: `http://localhost:8888/classify`
   - **Method**: POST
   - **Response Format**: JSON
   - **Body Type**: JSON
   - **JSON Body**:
   ```json
   {
     "text": "{{ $json.testText || $json.documentText || $json.text || 'No text' }}"
   }
   ```
6. Klikněte **"Save"**

## 4. Přidejte Set node (volitelné)

1. Klikněte na **"+"**
2. Hledejte **"Set"**
3. Přetáhněte vpravo od HTTP Request
4. Propojte nodes
5. Dvojklik pro nastavení:
   - Klikněte **"Add Value"**
   - **Name**: `result`
   - **Value**: `={{ $json }}`
   - Přidejte další:
   - **Name**: `timestamp`
   - **Value**: `={{ new Date().toISOString() }}`
6. Klikněte **"Save"**

## 5. Aktivujte workflow

1. Klikněte na toggle **"Active"** vpravo nahoře
2. Workflow se automaticky uloží

## 6. Získejte webhook URL

1. Klikněte na Webhook node
2. V nastavení uvidíte:
   - **Test URL**: pro testování (workflow nemusí být aktivní)
   - **Production URL**: `http://localhost:5678/webhook/document-classifier`

## 7. Testování

### A. Test přímo v n8n:
1. Klikněte na Webhook node
2. Klikněte **"Listen for Test Event"**
3. V jiném okně spusťte:
```bash
curl -X POST http://localhost:5678/webhook-test/document-classifier \
  -H "Content-Type: application/json" \
  -d '{"testText": "Faktura č. 2024/001 IČO: 12345678"}'
```

### B. Test přes GUI:
1. Otevřete: http://localhost:8888/test_document_classifier.html
2. Klikněte **"Test N8N Webhook"**

### C. Test v terminálu (produkční URL):
```bash
curl -X POST http://localhost:5678/webhook/document-classifier \
  -H "Content-Type: application/json" \
  -d '{"testText": "Faktura č. 2024/001 IČO: 12345678 Částka: 25000 Kč"}' \
  | jq
```

## Očekávaný výsledek:
```json
{
  "success": true,
  "classification": {
    "type": "faktura",
    "confidence": 1.0,
    "priority": 1,
    "extracted": {
      "ico": "12345678",
      "variable_symbol": null,
      "amount": "25000"
    }
  },
  "timestamp": "2024-08-07T..."
}
```

## Troubleshooting

### Chyba "webhook not registered":
- Workflow není aktivní - přepněte toggle "Active"

### Chyba "connection refused":
- Test server neběží - spusťte: `python3 /Users/m.a.j.puzik/test_classifier_server.py`

### Chyba "Load failed":
- CORS problém - zkuste Test URL místo Production URL

---

## Alternativa: Přímé volání Python serveru

Pokud n8n nefunguje, můžete používat přímo Python server:

```javascript
// V libovolné aplikaci
fetch('http://localhost:8888/classify', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({text: 'Váš dokument...'})
})
.then(r => r.json())
.then(result => console.log(result));
```

Python server běží a funguje správně! ✅