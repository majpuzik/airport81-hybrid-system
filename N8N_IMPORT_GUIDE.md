# 📚 NÁVOD NA IMPORT N8N WORKFLOW PRO MBW DOKUMENTY

## 🎯 CO WORKFLOW DĚLÁ

Tento n8n workflow automaticky zpracovává 100 MBW dokumentů podle pravidel z CLAUDE.md:
- ✅ Všech 16 kategorií tagů
- ✅ České faktury (12 povinných náležitostí, min 80 bodů)
- ✅ Correspondent mapping (80+ domén)
- ✅ Metadata extrakce (IČO, DIČ, VS)
- ✅ MCP Server integrace s PDF.co a AnyParser
- ✅ Bodovací systém (min 50 bodů pro rozpoznání)

## 📁 SOUBORY

- **Workflow JSON:** `/Users/m.a.j.puzik/mbw_n8n_document_workflow.json`
- **Dokumenty:** `/Users/m.a.j.puzik/mbw_100_documents/*.pdf`
- **Paperless:** `http://localhost:8050`

## 🚀 IMPORT DO N8N

### Krok 1: Otevřete n8n
```bash
open http://localhost:5678
```

### Krok 2: Import workflow
1. Klikněte **Workflows** v menu
2. Klikněte **Import from File** 
3. Vyberte: `/Users/m.a.j.puzik/mbw_n8n_document_workflow.json`
4. Klikněte **Import**

### Krok 3: Nastavte Paperless token
1. Otevřete importovaný workflow
2. Najděte node **📥 Get Existing Tags**
3. V Authorization header změňte token na: `24a855c09689e061afe7bd363dc5e02983fcba1b`
4. Stejně upravte i node **📤 Upload to Paperless**

## ▶️ SPUŠTĚNÍ

1. Klikněte **Execute Workflow** (zelené tlačítko)
2. Sledujte průběh - nodes se postupně rozsvítí
3. Po dokončení zkontrolujte Paperless

## 📊 VÝSLEDKY V PAPERLESS

Po úspěšném zpracování uvidíte:

### Dokumenty s tagy:
- `paperless-ngx-faktury` (faktury)
- `paperless-ngx-bankovnictvi` (výpisy)
- `paperless-ngx-smlouvy` (smlouvy)
- `correspondent:MBW`, `correspondent:ČSOB`, `correspondent:Alza`
- `ico:26178370`, `dic:CZ26178370`
- `konfidence-95`, `score-125`
- `2025`, `leden`, `unor`...

## ❓ PROBLÉMY?

### MCP Server nefunguje
- Workflow automaticky použije lokální pdftotext

### Špatný token
- Vygenerujte nový v Paperless admin

### Chybí pdftotext
```bash
brew install poppler
```

---
✅ **Workflow je připraven!** Zpracuje 100 dokumentů podle všech pravidel.