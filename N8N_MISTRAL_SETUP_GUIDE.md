# N8N Mistral Document Classification - Kompletní návod

## 🎯 Optimalizované nastavení pro české dokumenty

### Požadavky
- N8N instance (port 5678)
- Ollama s Mistral modelem
- LM Studio jako záloha
- MCP server pro API komunikaci
- Paperless-ngx instance

## 1. Instalace Mistral v Ollama

```bash
# Stáhnout Mistral model optimalizovaný pro české dokumenty
ollama pull mistral:latest

# Pro lepší výkon s českými dokumenty
ollama pull mistral:7b-instruct-v0.3-q4_K_M

# Nastavit parametry pro Ollama
export OLLAMA_NUM_PARALLEL=4
export OLLAMA_MAX_LOADED_MODELS=2
export OLLAMA_HOST=0.0.0.0:11434
```

## 2. Konfigurace LM Studio jako zálohy

```bash
# Spustit LM Studio server
/Applications/LM\ Studio.app/Contents/Resources/app/.webpack/lms server start \
  --port 1234 \
  --cors \
  --models-dir /Volumes/ACASIS/lmstudio-models
```

### Doporučené modely pro české dokumenty:
- **Primary**: `mistral-7b-instruct-v0.3.Q4_K_M.gguf`
- **Backup**: `qwen2.5-7b-instruct-q4_k_m.gguf`
- **Fast**: `gemma-2-2b-it-abliterated-Q4_K_M.gguf`

## 3. MCP Server konfigurace

Vytvořte soubor `/Users/m.a.j.puzik/mcp-config.json`:

```json
{
  "servers": {
    "ollama": {
      "endpoint": "http://localhost:11434",
      "models": ["mistral", "mistral:7b-instruct"],
      "priority": 1
    },
    "lmstudio": {
      "endpoint": "http://localhost:1234/v1",
      "models": ["mistral-7b", "qwen2.5"],
      "priority": 2
    }
  },
  "routing": {
    "czech_documents": "ollama/mistral",
    "german_documents": "lmstudio/mistral-7b",
    "fallback": "lmstudio/qwen2.5"
  }
}
```

## 4. N8N Workflow konfigurace

### A. Spuštění N8N s Docker

```bash
# Upravit docker-compose.n8n-test.yml
docker-compose -f docker-compose.n8n-test.yml up -d n8n-test
```

### B. Import workflow

1. Otevřete N8N: http://localhost:5678
2. Login: admin / n8n-test-2024
3. Import workflow z `/Users/m.a.j.puzik/n8n_mistral_document_classifier.json`

### C. Nastavení credentials

#### Gmail OAuth2:
1. Settings → Credentials → New → Gmail OAuth2
2. Client ID & Secret z Google Cloud Console
3. Scopes: `gmail.readonly`, `gmail.modify`

#### Paperless-ngx API:
1. Settings → Credentials → New → HTTP Request (Token Auth)
2. URL: `http://localhost:8050`
3. Token: `9d51c86467e7b7e17a8748722ff1a24226c94a7e`

## 5. Optimalizace pro české dokumenty

### A. Mistral Prompt Template pro češtinu

```javascript
const czechPrompt = `
Jsi expert na analýzu českých obchodních dokumentů.
Analyzuj následující dokument a urči PŘESNĚ jeden typ:

TYPY DOKUMENTŮ:
- FAKTURA: daňový doklad, faktura, tax invoice
- PROFORMA: proforma faktura, zálohová faktura
- PLATBA: potvrzení platby, příjmový doklad
- BANKOVNI_VYPIS: výpis z účtu, bank statement
- SMLOUVA: smlouva, dohoda, contract
- OBJEDNAVKA: objednávka, purchase order
- DODACI_LIST: dodací list, delivery note
- UPOMINKA: upomínka, urgence platby
- REKLAMA: reklamní email, newsletter, marketing

Klíčové indikátory:
- IČO/DIČ = pravděpodobně FAKTURA
- Variabilní symbol = FAKTURA nebo PLATBA
- "Výpis č." = BANKOVNI_VYPIS
- "Odhlásit" = REKLAMA

Dokument: {document_text}

Odpověz POUZE typem dokumentu:
`;
```

### B. Filtrování reklam - rozšířený seznam

```javascript
const czechAdPatterns = {
  // Silné indikátory reklamy
  strong: [
    'odhlásit se z odběru',
    'zrušit odběr',
    'unsubscribe',
    'newsletter',
    'marketing communication',
    'reklamní sdělení'
  ],
  
  // Střední indikátory
  medium: [
    'sleva', 'akce', 'výprodej',
    'black friday', 'cyber monday',
    'zdarma', 'gratis', 'free',
    'vyhrajte', 'soutěž',
    'limitovaná nabídka'
  ],
  
  // Slabé indikátory (kontrolovat kontext)
  weak: [
    'novinka', 'tip', 'doporučujeme',
    'speciální nabídka', 'jen dnes'
  ]
};
```

## 6. Rychlé rozpoznání prioritních dokumentů

### Priority System:
```
Priorita 1 (KRITICKÉ - okamžitá akce):
- Faktury s blížící se splatností
- Bankovní výpisy
- Potvrzení plateb

Priorita 2 (DŮLEŽITÉ - do 24h):
- Upomínky
- Proforma faktury
- Důležité smlouvy

Priorita 3 (BĚŽNÉ - do 3 dnů):
- Objednávky
- Běžné smlouvy
- Dodací listy

Priorita 4 (NÍZKÁ):
- Informační emaily
- Potvrzení

Priorita 10 (IGNOROVAT):
- Reklamy
- Newslettery
- Marketing
```

## 7. OCR nastavení pro naskenované dokumenty

```javascript
// Pokud dokument vyžaduje OCR
if (document.needsOCR) {
  // Použít Mistral OCR endpoint
  const ocrResult = await mistralOCR({
    file: attachment,
    language: 'cs+en',
    options: {
      dpi: 300,
      removeBackground: true,
      enhanceText: true
    }
  });
}
```

## 8. Monitoring a ladění

### A. Kontrola Ollama

```bash
# Status
curl http://localhost:11434/api/tags

# Test klasifikace
curl -X POST http://localhost:11434/api/generate \
  -d '{
    "model": "mistral",
    "prompt": "Classify: Faktura č. 2024001",
    "stream": false
  }'
```

### B. N8N Execution Logs

1. Workflows → Your Workflow → Executions
2. Kontrola chyb v jednotlivých nodes
3. Export logů pro analýzu

### C. Metriky úspěšnosti

```javascript
// Přidat monitoring node
const metrics = {
  totalProcessed: 0,
  correctlyClassified: 0,
  falsePositives: 0,
  processingTime: [],
  
  // Specifické pro české dokumenty
  czechDocs: 0,
  germanDocs: 0,
  englishDocs: 0,
  
  // Typy dokumentů
  invoices: 0,
  payments: 0,
  bankStatements: 0,
  advertisements: 0
};
```

## 9. Troubleshooting

### Problém: Mistral nerozpoznává české znaky
```bash
# Restart s UTF-8 podporou
LANG=cs_CZ.UTF-8 ollama serve
```

### Problém: Pomalá klasifikace
```bash
# Zvýšit počet workerů
export OLLAMA_NUM_PARALLEL=8

# Použít menší model
ollama pull mistral:7b-instruct-v0.2-q4_0
```

### Problém: Vysoká chybovost u reklam
```javascript
// Přidat více spam indikátorů
const additionalSpamHeaders = [
  'List-Id',
  'List-Unsubscribe',
  'X-Campaign-Id',
  'X-Mailchimp-Id'
];
```

## 10. Best Practices

### ✅ DOPORUČENÉ:
1. **Batch processing**: Zpracovávat 10-20 emailů najednou
2. **Caching**: Ukládat klasifikace podobných dokumentů
3. **Fallback**: Mít záložní model pro případ výpadku
4. **Validation**: Pravidelně kontrolovat přesnost

### ❌ NEDOPORUČENÉ:
1. Zpracovávat více než 50 dokumentů najednou
2. Používat vysokou teplotu (temperature > 0.3)
3. Ignorovat spam hlavičky emailů
4. Spoléhat pouze na jeden model

## 11. Automatizace a integrace

### Webhook pro okamžité zpracování:
```javascript
// N8N Webhook node
{
  "path": "document-classify",
  "method": "POST",
  "responseMode": "onReceived",
  "authentication": "basicAuth"
}
```

### Integrace s Paperless-ngx:
```bash
# Auto-tagging v Paperless
docker exec paperless-ngx python manage.py \
  document_retagger --tags-from-classification
```

## 12. Výkonnostní optimalizace

### Model Loading Strategy:
```python
# Přednahrát nejčastější modely
models_to_preload = [
    "mistral:7b-instruct",  # Pro české dokumenty
    "mistral:latest",       # Fallback
]

for model in models_to_preload:
    ollama.pull(model)
    ollama.generate(model, "test", keep_alive="5m")
```

### Paralelní zpracování:
```javascript
// N8N Split in Batches node
{
  "batchSize": 5,
  "options": {
    "parallel": true,
    "maxParallel": 3
  }
}
```

---

## Kontakt a podpora

- Ollama issues: https://github.com/ollama/ollama/issues
- N8N community: https://community.n8n.io
- Mistral docs: https://docs.mistral.ai

Vytvořeno: 2024-08-07
Verze: 1.0