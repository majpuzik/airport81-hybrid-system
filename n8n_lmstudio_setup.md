# 🤖 N8N + Ollama/LM Studio Integration

## 🔧 Úprava workflow pro lokální LLM

### 1. **Nahraďte OpenAI node za HTTP Request node**

V N8N workflow:
1. Smažte **"AI Deep Document Analysis"** node
2. Přidejte nový **HTTP Request** node
3. Importujte nastavení z `n8n_ollama_document_node.json`

### 2. **Konfigurace pro Ollama**

```json
{
  "method": "POST",
  "url": "http://host.docker.internal:11434/api/generate",
  "headers": {
    "Content-Type": "application/json"
  },
  "body": {
    "model": "llama3.3:70b",  // nebo jiný model
    "prompt": "...",
    "stream": false,
    "temperature": 0.1
  }
}
```

### 3. **Konfigurace pro LM Studio**

```json
{
  "method": "POST", 
  "url": "http://host.docker.internal:1234/v1/chat/completions",
  "headers": {
    "Content-Type": "application/json"
  },
  "body": {
    "model": "loaded-model",
    "messages": [
      {
        "role": "system",
        "content": "Jsi expert na analýzu dokumentů..."
      },
      {
        "role": "user", 
        "content": "{{ $json.emailText }}"
      }
    ],
    "temperature": 0.1,
    "max_tokens": 1000
  }
}
```

## 📊 Doporučené modely

### Pro rychlost (7-14B):
- `mistral:7b-instruct` - Rychlý, dobrá čeština
- `qwen2.5:14b` - Výborný poměr výkon/rychlost
- `czech-finance:latest` - Specializovaný na finance

### Pro přesnost (32-70B):
- `llama3.3:70b` - Nejlepší přesnost
- `qwen2.5:32b` - Dobrý kompromis
- `mixtral:8x7b` - MoE architektura

## 🔄 Zpracování odpovědi

Ollama vrací JSON s polem `response`:

```javascript
// V následujícím Code node přidejte:
const ollamaResponse = JSON.parse($json.response);
const analysis = JSON.parse(ollamaResponse.response);
```

## ⚡ Optimalizace výkonu

### 1. **Použijte menší model pro pre-filtering**
- První průchod: `mistral:7b` (rychlé třídění)
- Druhý průchod: `llama3.3:70b` (přesná analýza)

### 2. **Cachování**
- Ukládejte výsledky klasifikace
- Znovu neanalyzujte stejné dokumenty

### 3. **Batch processing**
- Zpracovávejte více dokumentů najednou
- Využijte paralelní běh

## 🧪 Testování

### Test Ollama API:
```bash
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.3:70b",
  "prompt": "Analyzuj: Faktura č. 2024001, IČO: 12345678",
  "stream": false
}'
```

### Test LM Studio API:
```bash
curl http://localhost:1234/v1/models
```

## 📝 Prompt Engineering

### Strukturovaný prompt:
```
ÚKOL: Klasifikuj dokument

KONTEXT:
- Název: {filename}
- Text: {content}

TYPY:
1. FAKTURA - má IČO, DIČ, částku
2. PROFORMA - není daňový doklad
...

VÝSTUP: JSON
{
  "documentType": "...",
  "confidence": 0.9,
  ...
}
```

### České vs. anglické prompty:
- České modely: Použijte český prompt
- Globální modely: Mix češtiny a angličtiny funguje

## 🔐 Bezpečnost

1. **Lokální zpracování** - data neopouští váš server
2. **Žádné API klíče** - není třeba platit za tokeny
3. **Plná kontrola** - můžete upravit modely

## 🚀 Výhody lokálních LLM

✅ **Zdarma** - žádné poplatky za API  
✅ **Rychlost** - při dobrém HW rychlejší než cloud  
✅ **Soukromí** - data zůstávají lokálně  
✅ **Offline** - funguje bez internetu  
✅ **Customizace** - fine-tuning na vaše dokumenty