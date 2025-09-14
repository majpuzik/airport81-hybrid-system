# 📄 PAPERLESS OFFICE - INTELIGENTNÍ SPRÁVCE DOKUMENTŮ

## 🎯 POPIS
Kompletní systém pro inteligentní správu dokumentů s HTML GUI, který používá **výhradně MCP Server V4.0** pro všechna externí API volání.

## 🏗️ ARCHITEKTURA

### 🔗 MCP Server V4.0 Integration
- **URL:** http://localhost:5002
- **Verze:** 4.0.1  
- **Role:** Unified API gateway pro všechny externí služby
- **Služby:** PDF.co, AnyParser, Ollama, Paperless A/B, Gmail, atd.

### 📊 Paperless B Integration  
- **URL:** http://localhost:8050
- **Role:** Testovací instance pro MBW dokumenty
- **Token:** 1b57fb8a8fdd49eb478690e5820b61ff53da39a0

### 🤖 Intelligent Classification
- **Engine:** Učící se vzory z reálných dokumentů
- **Podpora:** Proforma detekce, český vs. německý obsah
- **OCR:** 3-úrovňový fallback (pdftotext → Tesseract → Cloud)

## 📁 SOUBORY

### Hlavní komponenty:
```
paperless_office_app.py           # Hlavní Flask aplikace
paperless_office_gui.html         # HTML GUI interface  
mcp_office_client.py              # MCP Server V4.0 klient
intelligent_office_classifier.py  # Inteligentní klasifikátor
start_paperless_office.sh        # Startup script
```

### Konfigurace:
```
paperless_office_config.json     # Konfigurace aplikace
learned_document_patterns.pkl    # Naučené vzory (pickle)
paperless_office.log             # Aplikační logy
intelligent_classifier.log       # Klasifikační logy
```

## 🚀 SPUŠTĚNÍ

### Rychlé spuštění:
```bash
./start_paperless_office.sh
```

### Manuální spuštění:
```bash
# 1. Kontrola MCP Server V4.0
curl http://localhost:5002/health

# 2. Kontrola Paperless B
curl http://localhost:8050/api/

# 3. Spuštění aplikace
python3 paperless_office_app.py
```

### GUI přístup:
- **Hlavní GUI:** http://localhost:8065
- **API status:** http://localhost:8065/api/status  
- **Logy:** http://localhost:8065/logs

## 🔧 FUNKCIONALITA

### 📤 Upload dokumentů
- **Drag & Drop:** Přetáhnutí souborů do GUI
- **Batch upload:** Hromadné nahrání složek
- **Gmail integrace:** Zpracování Gmail složek přes MCP
- **Podporované formáty:** PDF, DOC, DOCX, TXT, EML, MSG

### 🤖 Inteligentní klasifikace
- **6 kategorií:** invoice, proforma, bank_statement, contract, receipt, official_document
- **Učící se vzory:** Automatické vytváření patterns z dokumentů
- **Proforma detekce:** Kritická kontrola proforma vs. skutečná faktura
- **Metadata extrakce:** IČO, DIČ, VS, částky, data přes MCP Server

### 🏷️ Automatické tagování
- **Kategorie tagy:** paperless-ngx-faktury, paperless-ngx-bankovnictvi, atd.
- **Metadata tagy:** ico-12345678, dic-CZ12345678, konfidence-85
- **Časové tagy:** 2025, mesic-01, mesic-02, atd.
- **Korespondent tagy:** Automatické z emailů nebo obsahu

### 📊 Real-time monitoring
- **Processing queue:** Živá fronta zpracování
- **Statistiky:** Úspěšnost, rychlost, confidence
- **Logy:** Real-time log konzole
- **Export:** JSON export výsledků a vzorů

## ⚙️ KONFIGURACE

### Režimy klasifikace:
- **Intelligent:** Učící se vzory (doporučeno)
- **Fast:** Pouze základní vzory
- **Comprehensive:** Všechny detektory

### OCR režimy:
- **Auto:** Automatický fallback (doporučeno)
- **Local:** Pouze Tesseract lokálně
- **Cloud:** Pouze cloud API přes MCP
- **Disabled:** Vypnuto

### Parametry:
- **Min confidence:** 70% (doporučeno)
- **Batch size:** 10 dokumentů (doporučeno)
- **Auto upload:** Automatický upload do Paperless B

## 🔍 API ENDPOINTS

### Status a monitoring:
```
GET  /api/status              # Celkový stav systému
GET  /api/queue               # Aktuální fronta zpracování  
GET  /api/learning/stats      # Statistiky učení
```

### Ovládání:
```
POST /api/upload              # Upload souborů
POST /api/process/start       # Spuštění zpracování
POST /api/process/stop        # Zastavení zpracování
POST /api/queue/clear         # Vymazání fronty
```

### Testování:
```
GET  /api/test/mcp           # Test MCP Server připojení
GET  /api/test/paperless     # Test Paperless B připojení
POST /api/classify/test      # Test klasifikace textu
```

### Konfigurace:
```
GET  /api/config             # Načtení konfigurace
POST /api/config             # Uložení konfigurace
```

## 🎯 VÝHODY SYSTÉMU

### ✅ MCP Server V4.0 Exclusive:
- **Unified API:** Všechna volání přes jeden gateway
- **Consistency:** Jednotné error handling a retry logika
- **Security:** Centralized authentication a authorization
- **Performance:** Connection pooling a caching

### 🧠 Intelligent Learning:
- **Adaptive patterns:** Vzory se učí z reálných dokumentů  
- **Supplier knowledge:** Znalosti o dodavatelích se hromadí
- **Format detection:** Automatické rozpoznání nových formátů
- **Confidence evolution:** Precision se zlepšuje s časem

### 🔧 Production Ready:
- **Error handling:** Robustní error handling s fallbacks
- **Logging:** Kompletní loggování všech operací
- **Monitoring:** Real-time statistiky a monitoring
- **Export/Import:** Backup a restore naučených vzorů

## ⚠️ DŮLEŽITÉ POZNÁMKY

### 🚨 KRITICKÉ PRAVIDLO:
**VŠECHNA externí API volání MUSÍ jít přes MCP Server V4.0!**

```python
# ✅ SPRÁVNĚ - přes MCP Server
result = mcp_client.classify_document(file_path, options)

# ❌ ZAKÁZÁNO - přímé API volání  
# requests.post('https://api.pdf.co/...')  # NEPOUŽÍVAT!
```

### 📋 Paperless B vs. Paperless A:
- **Paperless A:** Port 8060 (produkce)
- **Paperless B:** Port 8050 (testing) ← **TENTO SYSTÉM**

### 🏷️ Proforma vs. Faktura:
- **Proforma:** Předpis k platbě (NENÍ daňový doklad)
- **Faktura:** Daňový doklad (JE účetní doklad)
- **Detekce:** Automatická s highest priority

## 🛠️ TROUBLESHOOTING

### MCP Server nedostupný:
```bash
# Spuštění MCP Server V4.0
node /Users/m.a.j.puzik/unified-mcp-server/server.js
```

### Paperless B nedostupný:
```bash
# Spuštění Paperless B
docker start paperless-ngx-8060
```

### Port 8065 obsazený:
```bash
# Zabití procesů na portu 8065
lsof -i :8065 -t | xargs kill -9
```

### Chyby v logách:
```bash
# Sledování logů
tail -f /Users/m.a.j.puzik/paperless_office.log
```

## 📈 OČEKÁVANÉ VÝSLEDKY

### Performance:
- **Rychlost:** 20-40 dokumentů/minutu
- **Úspěšnost:** 90%+ pro známé formáty
- **Confidence:** 85%+ průměr pro faktury/výpisy

### Učení:
- **Vzory:** +5-10 nových vzorů denně
- **Dodavatelé:** Automatické rozpoznání nových
- **Precision:** Zlepšování s každým dokumentem

---

**📧 Autor:** M.A.J. Pužík + Claude Code Assistant  
**📅 Datum:** 2025-01-02  
**🔧 Verze:** Paperless Office V1.0  
**🎯 Účel:** Inteligentní správa dokumentů přes MCP Server V4.0