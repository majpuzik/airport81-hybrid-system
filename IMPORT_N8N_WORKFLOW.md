# Import n8n Workflow s Ollama (Czech Finance Model)

## 🚀 Rychlý import

1. **Otevřete n8n**: http://localhost:5678

2. **Vytvořte nový workflow**:
   - Klikněte na **"New Workflow"** vpravo nahoře

3. **Import workflow**:
   - Klikněte na **⋮** (3 tečky) vpravo nahoře
   - Vyberte **"Import from File"**
   - Vyberte soubor: `/Users/m.a.j.puzik/n8n_czech_ollama_workflow.json`

4. **Aktivujte workflow**:
   - Klikněte na toggle **"Active"** vpravo nahoře
   - Workflow se automaticky uloží

## ✅ Workflow používá:
- **Ollama** na portu 11434
- **Model: czech-finance:latest** - váš český model optimalizovaný pro finanční dokumenty
- **Žádné OpenAI!** - vše běží lokálně

## 🧪 Test workflow

```bash
# Test přes webhook
curl -X POST http://localhost:5678/webhook/document-classifier \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Faktura č. 2024/001 IČO: 12345678 Částka: 25000 Kč"
  }'
```

## 📝 Dostupné modely pro klasifikaci:

### České modely (nejlepší pro české dokumenty):
- `czech-finance:latest` - Speciální pro finanční dokumenty ⭐
- `czech-finance-speed:latest` - Rychlejší verze

### Obecné modely (také dobré):
- `qwen2.5:32b` - Velmi chytrý, 19 GB
- `mistral:7b-instruct` - Rychlý a spolehlivý
- `mixtral:8x7b` - Výkonný, 26 GB
- `llama3.3:70b` - Nejchytřejší, 42 GB

## 🔧 Změna modelu

V n8n workflow:
1. Dvojklik na node **"Czech Finance Model"**
2. V poli **Body Parameters** změňte:
   ```json
   "model": "czech-finance:latest"
   ```
   na jakýkoliv jiný model ze seznamu

## ⚡ Alternativa: Přímé volání Ollama

Pokud nechcete n8n, můžete volat Ollama přímo:

```bash
curl -X POST http://localhost:11434/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "model": "czech-finance:latest",
    "prompt": "Klasifikuj: Faktura č. 2024/001",
    "stream": false
  }'
```

## 🎯 Výhody vašeho řešení:
- ✅ **100% lokální** - žádná data neopouští váš počítač
- ✅ **Žádné API klíče** - nepotřebujete OpenAI
- ✅ **České modely** - optimalizované pro české dokumenty
- ✅ **Rychlé** - czech-finance-speed pro rychlou klasifikaci
- ✅ **Zdarma** - žádné poplatky za API

---

**TIP**: Používejte `czech-finance:latest` pro nejlepší výsledky s českými dokumenty!