# 📚 CLAUDE TRVALÁ PAMĚŤ - PAPERLESS NGX PROJEKT

## ⚠️ DŮLEŽITÉ: TŘI PAPERLESS PROCESY
**Paperless A:** http://localhost:8060 (hlavní produkce)  
**Paperless B:** http://localhost:8050 (testovací - MBW dokumenty)  
**Paperless C:** http://localhost:8075 (nová instance - HTML GUI testy s Ultimate Detector V10)  
**MCP SERVER:** http://localhost:5002
**LiteLLM Proxy:** http://localhost:4000 (OpenAI-compatible API, plně funkční)

### 📄 KOMPLETNÍ DOKUMENTACE PROCESŮ:
- **[PAPERLESS_DUAL_PROCESS_DOCUMENTATION.md](./PAPERLESS_DUAL_PROCESS_DOCUMENTATION.md)** - Přehled procesů A & B
- **[PAPERLESS_MCP_V4_COMPLETE_DOCUMENTATION.md](./PAPERLESS_MCP_V4_COMPLETE_DOCUMENTATION.md)** - Proces A (8060) detaily
- **[MBW-Paperless-8050-backup/SYSTEM_COMPLETE_DOCUMENTATION.md](./MBW-Paperless-8050-backup-20250901-223950/SYSTEM_COMPLETE_DOCUMENTATION.md)** - Proces B (8050) detaily
- **Proces C (8075):** Určen pro HTML GUI testování s integrovaným Ultimate Document Detector V10 (94% přesnost)

---

# 🆕 AKTUALIZACE 2025-09-05: KOMPLETNÍ MCP V4 INTEGRACE!

## 📦 Paperless NGX Fixes v0.1 - Kompletní opravy a automatické tagování
**Verze:** 0.1  
**Datum vydání:** 3.9.2025 23:55  
**Umístění:** `/Users/m.a.j.puzik/paperless-ngx-fixes-v0.1/`  
**Backup:** Google Drive/Paperless Fixes/paperless-ngx-fixes-v0.1.zip  
**Dokumentace:** `/Users/m.a.j.puzik/PAPERLESS_NGX_FIX_DOCUMENTATION_v0.1.md`

### ✅ Co je opraveno:
- Upload souborů se speciálními znaky (mezery, závorky, české znaky)
- Ghost dokumenty v databázi (#210)
- Chybná detekce duplikátů u ČSOB výpisů
- Automatické tagování všech dokumentů
- 100% pokrytí metadaty (189 dokumentů)

### 🚀 Instalace (3 kroky):
```bash
# 1. Zkopírovat post-processor
docker cp /Users/m.a.j.puzik/paperless-ngx-fixes-v0.1/intelligent_post_processor.py \
  paperless-ngx:/usr/src/paperless/scripts/post_process.py

# 2. Nastavit spustitelnost
docker exec paperless-ngx chmod +x /usr/src/paperless/scripts/post_process.py

# 3. Restartovat
docker restart paperless-ngx
```

### 📊 Statistiky v0.1:
- 189 dokumentů zpracováno
- 20 tagů vytvořeno
- 14 korespondentů přiřazeno
- 0 dokumentů bez metadat
- 100% úspěšnost tagování

---

# 🖥️ AKTUALIZACE 2025-09-03: AI MONITOR UNIFIED v0.1

## 📊 AI Monitor Unified - Centralizovaný monitoring systém
**Port:** 8900  
**Umístění:** `/Users/m.a.j.puzik/zahnpasta/ai_monitor_unified.py`  
**Dokumentace:** `/Users/m.a.j.puzik/AI_MONITOR_UNIFIED_DOCUMENTATION.md`  
**Záloha:** Google Drive/AI Monitor Backups/AI-Monitor-Unified-v0.1-20250903.zip

### Spuštění:
```bash
cd /Users/m.a.j.puzik/zahnpasta
python3 ai_monitor_unified.py
```

### Moduly (vše přes port 8900):
- **System Monitor:** http://localhost:8900/module/system
- **LLM Monitor:** http://localhost:8900/module/llm  
- **Docker Monitor:** http://localhost:8900/module/docker
- **Process Monitor:** http://localhost:8900/module/processes
- **Network Scanner:** http://localhost:8900/module/network

### API Endpoints:
- `/api/system`, `/api/llm`, `/api/docker`, `/api/processes`, `/api/network`

**Koncept:** Všechny monitorovací moduly běží jako pod-GUI v hlavním GUI na jediném portu.

---

# 🆕 AKTUALIZACE 2025-09-03: OPRAVY MCP KLIENTA A SERVERU

## ✅ KRITICKÉ OPRAVY - MCP SERVER FUNGUJE SPRÁVNĚ!
**Datum opravy:** 2025-09-03
**Status:** VYŘEŠENO - chyba byla v mém kódu, ne v MCP serveru!

### 🔧 Opravené soubory:
1. **`/Users/m.a.j.puzik/unified-mcp-server/paperless_extension.js`** (řádky 150-179)
   - Paperless API vrací task ID jako string, ne JSON objekt
   - Přidáno čekání 2 sekundy a hledání dokumentu podle titlu
   
2. **`/Users/m.a.j.puzik/mcp_client_fixed.py`** (řádky 80-89)
   - Opraven regex: `r'ID dokumentu:\s*(\d+|undefined|null)'`
   - Správně parsuje číselné ID z MCP odpovědi

### ✅ Důkaz funkčnosti:
- Nahrané dokumenty mají ID (např. 291, 292, 293-298+)
- Celkem nahráno 134+ nových dokumentů
- Databáze vzrostla ze 164 na 298+ dokumentů

# 🆕 AKTUALIZACE 2025-09-02: MCP SERVER V4 + OCR INTEGRACE

## 🎯 AKTUÁLNÍ PROCES: PAPERLESS B NA PORTU 8050
Tento proces pracuje s **Paperless B** instancí na portu **8050** pro testování MBW dokumentů.

## 🌐 UNIFIED MCP SERVER V4 - POVINNÉ PRO VŠECHNA API!
**⚠️ KRITICKÉ:** Všechna API volání MUSÍ jít přes MCP server! NIKDY nevolat API přímo!

### MCP Server Konfigurace:
```bash
# Umístění
/Users/m.a.j.puzik/unified-mcp-server/

# Spuštění
node /Users/m.a.j.puzik/unified-mcp-server/server.js

# Port: 5002
# Verze: 4.0.1
```

### Podporované API přes MCP (18 systémů):
1. **PDF.co** - OCR, parsing, konverze (`pdf_convert_to_text`)
2. **AnyParser** - Strukturovaná extrakce (`anyparser_extract_structured`)
3. **Ollama** - Lokální LLM (`ollama_generate`)
4. **Paperless A** - Port 8060 (hlavní produkce)
5. **Paperless B** - Port 8050 (testovací - POUŽÍVÁME)
6. **Loxone, Solax, OTE, Home Assistant**
7. **Gmail, Outlook, Dropbox, GitHub, N8N**

### SPRÁVNÉ použití MCP:
```python
# ✅ SPRÁVNĚ - přes MCP klienta
from mcp_ocr_client import MCPOCRClient
client = MCPOCRClient()
result = client.call_mcp_tool('pdf_convert_to_text', {
    'url': file_path,
    'pages': 'all'
})

# ❌ ŠPATNĚ - přímé API volání
# requests.post('https://api.pdf.co/...') # NEPOUŽÍVAT!
```

## 🔍 OCR PODPORA - 3 ÚROVNĚ

### 1. Lokální Tesseract OCR
```bash
# Instalace
brew install tesseract tesseract-lang poppler
pip install pytesseract pdf2image pillow PyPDF2

# Konfigurace
- Jazyky: ces+deu+eng
- DPI: 300 (normální), 400 (vysoká kvalita)
- Max stran: 5 (pro rychlost)
```

### 2. Cloud OCR přes MCP Server
- **PDF.co** - profesionální OCR, tabulky, formuláře
- **AnyParser** - AI extrakce, automatická detekce

### 3. Fallback mechanismus
```
1. pdftotext (textové PDF)
   ↓ pokud < 100 znaků
2. Tesseract OCR (lokální skeny)
   ↓ pokud stále < 100 znaků
3. Cloud OCR přes MCP (složité dokumenty)
```

## 📂 AKTUÁLNÍ SYSTÉM MBW-PAPERLESS-8050

### Hlavní soubory:
```
/Users/m.a.j.puzik/MBW-Paperless-8050-backup-20250901-223950/
├── process_mbw_enhanced_8050.py      # Hlavní procesor s MCP integrací
├── mcp_ocr_client.py                 # MCP klient pro všechna API
├── mbw_config_8050.py                # Konfigurace včetně OCR
├── enhanced_ocr_extractor.py         # Původní cloud OCR (deprecated)
├── install_tesseract_ocr.sh          # Instalační skript
└── SYSTEM_COMPLETE_DOCUMENTATION.md  # Kompletní dokumentace
```

### Statistiky zpracování:
- **Celkem MBW souborů:** 65 PDF
- **Textové dokumenty:** 57 (87.7%)
- **Skenované dokumenty:** 8 (12.3%)
- **Úspěšně zpracováno:** 57
- **Typy dokumentů:** 6 (invoice, bank_statement, contract, receipt, subscription, official)

---

# 📚 PŘEHLED SKRIPTŮ A NÁSTROJŮ - INVENTÁŘ
**Datum vytvoření:** 2025-08-27
**Poslední aktualizace:** 2025-09-02  
**Autor:** Claude Code Assistant  
**Umístění:** /Users/m.a.j.puzik

## 📊 SOUHRN
Kompletní inventář nalezených skriptů, nástrojů a automatizací v systému m.a.j.puzik včetně záloh na Google Drive.

### 🏆 TOP VÝKONNOSTNÍ NÁSTROJE:
- **Ultimate Document Detector** - 94% přesnost, 172,894 dokumentů v databázi
- **Gmail Identifier Fak Ban Stv** - Kompletní pipeline Gmail→Paperless s identifikací dokumentů, přísný filtr (pouze faktury/výpisy/účtenky)
- **Extract Correspondent From Document** - Automatická identifikace korespondentů z PDF (IČO/DIČ databáze, confidence scoring)
  - 📁 Záloha: [Google Drive/Paperless Scripts/Correspondent-Extractor-backup-20250828-184933.zip]
  - 📄 Dokumentace: CORRESPONDENT_EXTRACTOR_DOCUMENTATION.md
- **Police Document Detector** - Specializovaný detektor českých a německých policejních dokumentů (5 typů, 75-100% přesnost)
  - 📁 Záloha: [Google Drive/Paperless Scripts/Police-Document-Detector-backup-20250828-200128.zip]
  - 📄 Dokumentace: POLICE_DOCUMENT_DETECTOR_DOCUMENTATION.md
- **AI Monitor Unified** - 102KB, kompletní monitoring všech AI systémů
- **Commands Logic** - 235KB, komplexní NLP pro Loxone
- **Quick Start Energy** - 74KB, kompletní energy management
- **Mass Document Processor** - 72KB, hromadné zpracování
- **AI Monitor Modular** - 67KB, modulární monitoring systému

### 📈 STATISTIKY SYSTÉMU:
- **Celkem skriptů:** 1,930+ (.sh a .py soubory)
- **Testovacích skriptů:** 197+ test_*.py souborů
- **Záložních složek:** 20+ backup adresářů
- **Google Drive zálohy:** 15+ kategorií záloh

---

# 📚 CLAUDE TRVALÁ PAMĚŤ - PAPERLESS NGX PROJEKT

## 🏷️ KOMPLETNÍ SYSTÉM TAGOVÁNÍ DOKUMENTŮ

## ⚠️ DŮLEŽITÉ: PROFORMA vs SKUTEČNÁ FAKTURA

**PROFORMA FAKTURA NENÍ FAKTURA!** Je to pouze předpis k platbě.

### 🚨 ROZLIŠOVÁNÍ:
- **PROFORMA** = předpis k platbě (NENÍ daňový doklad, NELZE účtovat)
- **FAKTURA** = daňový doklad (JE účetní doklad, MŮŽE se účtovat)

### 🔍 DETEKČNÍ VZORY:
```python
PROFORMA_PATTERNS = [
    r'pro[\s\-]?forma\s+faktura',
    r'zálohová\s+faktura', 
    r'předpis\s+k\s+platbě',
    r'není\s+daňový\s+doklad',
    r'advance\s+invoice'
]

REAL_INVOICE_PATTERNS = [
    r'daňový\s+doklad',
    r'faktura\s*[-–]\s*daňový\s+doklad',
    r'tax\s+invoice'
]
```

### 🏷️ TAGOVÁNÍ:
- **Proforma**: `typ:proforma`, `platební-předpis` (oranžové tagy)
- **Faktura**: `typ:faktura`, `paperless-ngx-faktury` (zelené tagy)

### 1️⃣ KATEGORIE TAGŮ (16 kategorií)
```python
CATEGORIES = {
    'banking': 'paperless-ngx-bankovnictvi',
    'invoices': 'paperless-ngx-faktury',
    'office': 'paperless-ngx-office',
    'contracts': 'paperless-ngx-smlouvy',
    'official': 'paperless-ngx-uredni-sdeleni',
    'medical': 'paperless-ngx-lekarske-zpravy',
    'subscriptions': 'paperless-ngx-predplatna',
    'bills_tv': 'paperless-ngx-platby-za-tv',
    'bills_internet': 'paperless-ngx-platby-za-internet',
    'bills_services': 'paperless-ngx-platby-za-sluzby',
    'commercial': 'paperless-ngx-obchodni-nabidky',
    'ecommerce': 'paperless-ngx-eshop',
    'social_media': 'paperless-ngx-socialni-site',
    'system_notifications': 'paperless-ngx-systemove-notifikace',
    'unclear': 'paperless-ngx-nejasne',
    'spam': 'paperless-ngx-spam'
}
```

### 2️⃣ CORRESPONDENT TAGY (User/Email odesílatele)
**DŮLEŽITÉ:** Vytváří se automaticky z emailové adresy odesílatele nebo obsahu!

```python
# Z emailu: sender@csob.cz → Tag: "ČSOB"
# Z obsahu: "Finanční úřad Praha" → Tag: "Finanční úřad Praha"

DOMAIN_TO_CORRESPONDENT = {
    'csob.cz': 'ČSOB',
    'kb.cz': 'Komerční banka',
    'csas.cz': 'Česká spořitelna',
    'rb.cz': 'Raiffeisenbank',
    'moneta.cz': 'Moneta',
    'alza.cz': 'Alza',
    'amazon.com': 'Amazon',
    'facebook.com': 'Facebook',
    # ... dalších 80+ mapování
}
```

### 3️⃣ METADATA TAGY
- **Rok:** `2025`, `2024`, `2023`
- **Měsíc:** `leden`, `únor`, ... `prosinec`
- **Velikost faktury:** `velká-faktura` (>10000 Kč), `malá-faktura`
- **DPH:** `s-dph`, `bez-dph`, `dph-21`, `dph-15`, `dph-10`
- **IČO:** `ico-12345678` (z obsahu dokumentu)
- **DIČ:** `dic-CZ12345678` (z obsahu dokumentu)
- **VS:** `vs-123456789` (variabilní symbol)
- **Konfidence:** `konfidence-95`, `konfidence-80` atd.
- **Zdroj:** `import-gmail`, `import-manual`, `import-scanner`

### 4️⃣ BANKOVNÍ TAGY
- **České banky:** `ČSOB`, `KB`, `Česká-spořitelna`, `Raiffeisenbank`, `Moneta`, `Fio`, `AirBank`
- **Zahraniční:** `N26`, `Revolut`, `Deutsche-Bank`, `Erste-Bank`, `BAWAG`
- **Typ výpisu:** `měsíční-výpis`, `roční-výpis`, `výpis-z-karty`

### 5️⃣ POVINNÉ NÁLEŽITOSTI ČESKÉ FAKTURY
```python
CZECH_INVOICE_REQUIREMENTS = {
    1: "Označení 'Faktura' nebo 'Daňový doklad'",
    2: "IČO dodavatele (8 číslic)",
    3: "DIČ dodavatele (CZ + 8-10 číslic)",
    4: "Datum vystavení",
    5: "Datum uskutečnění zdanitelného plnění (DUZP)",
    6: "Evidenční číslo faktury",
    7: "Název a sídlo dodavatele",
    8: "Název a sídlo odběratele",
    9: "Rozsah a předmět plnění",
    10: "Základ daně podle sazeb (21%, 15%, 10%, 0%)",
    11: "Výše DPH",
    12: "Celková částka k úhradě"
}

# Regex vzory pro detekci:
ICO_PATTERN = r'IČO?:?\s*(\d{8})'
DIC_PATTERN = r'DIČ:?\s*(CZ\d{8,10})'
VS_PATTERN = r'VS:?\s*(\d+)'
AMOUNT_PATTERN = r'celkem:?\s*([\d\s]+[,.]?\d*)\s*(?:Kč|CZK)'
```

## 🚨 KRITICKÉ PRAVIDLO UPLOADU - ABSOLUTNÍ ZÁKAZ CONSUMER!

### ⚠️ POVINNÉ: JEN A POUZE MCP SERVER API!
```python
# ✅ JEDINÝ POVOLENÝ ZPŮSOB - MCP SERVER API
from mcp_ocr_client import MCPOCRClient
client = MCPOCRClient()
result = client.call_mcp_tool('paperless_upload_document', {
    'file_path': '/path/to/document.pdf',
    'tags': ['faktury', 'ČSOB', '2025'],
    'correspondent': 'ČSOB',
    'title': 'Faktura ČSOB'
})

# ❌ ABSOLUTNĚ ZAKÁZÁNO - VŠE OSTATNÍ!
# docker cp → ZAKÁZÁNO
# curl API → ZAKÁZÁNO  
# consume folder → ZAKÁZÁNO
# přímé API → ZAKÁZÁNO
```

**DŮVOD:** Pouze MCP server zaručuje správné tagy a metadata!

## 🔄 WORKFLOW ZPRACOVÁNÍ

### KROK 1: Převod do PDF
```python
# Email s přílohami → Sloučený PDF
# 1. strana: Email hlavička
# 2. strana: Email tělo
# 3+ strany: Všechny přílohy
```

### KROK 2: Detekce typu (v pořadí priority)
1. **PROFORMA CHECK** - explicitní kontrola na "proforma" (NEJVYŠŠÍ PRIORITA)
2. **Filename analysis** - rychlé, podle názvu (+30 bodů)
3. **Text extraction** - pdftotext, max 5 stran
4. **Czech invoice requirements** - § 28 ZDPH náležitosti (7 kritérií)
5. **Pattern matching** - regex, keywords (+15 bodů/match)
6. **OCR** - jen když < 500 znaků textu
7. **ML classification** - BART model, když confidence < 70%

### ⚠️ PROFORMA KONTROLA:
```python
# NEJVYŠŠÍ PRIORITA - kontrola na proforma
if 'proforma' in filename.lower():
    return 'proforma'  # NENÍ faktura!

if re.search(r'předpis\s+k\s+platbě|advance\s+invoice', text):
    return 'proforma'  # NENÍ faktura!
```

### KROK 3: Bodování
- Název souboru match: **+30 bodů**
- Klíčové slovo: **+15 bodů**
- Regex match (IČO, DIČ): **+25 bodů**
- Instituce nalezena: **+35 bodů**
- OCR match: **+20 bodů**
- ML confidence: **+50 × confidence**
- **Minimum pro rozpoznání: 50 bodů**

### KROK 4: Přiřazení tagů
1. Kategorie tag
2. Correspondent tag (z emailu nebo obsahu)
3. Rok a měsíc
4. Specifické tagy (IČO, DIČ, VS)
5. Metadata tagy (konfidence, zdroj)

## 📁 DŮLEŽITÉ SOUBORY

### Detektory:
- `/Users/m.a.j.puzik/ultimate_document_detector.py` - Hlavní detektor (11 kategorií, 94% přesnost)
- `/Users/m.a.j.puzik/police_document_detector.py` - Policejní dokumenty (5 typů, 75-100% přesnost)
- `/Users/m.a.j.puzik/czech_german_bank_statement_detector.py` - Bankovní výpisy
- `/Users/m.a.j.puzik/german_invoice_detector.py` - Německé faktury
- `/Users/m.a.j.puzik/austrian_invoice_detector.py` - Rakouské faktury
- `/Users/m.a.j.puzik/chinese_invoice_detector.py` - Čínské faktury

### Processory:
- `/Users/m.a.j.puzik/gmail_paperless_with_attachments.py` - Gmail s přílohami
- `/Users/m.a.j.puzik/universal_pdf_tagger.py` - Universal tagger
- `/Users/m.a.j.puzik/extract_correspondents.py` - Extrakce korespondentů

### Konfigurace:
- `/Users/m.a.j.puzik/bank_configs/` - Konfigurace bank

## 🔑 API KONFIGURACE - TŘI PAPERLESS SERVERY

### PAPERLESS A [PORT 8060] - Hlavní produkce
```python
PAPERLESS_A_URL = "http://localhost:8060"
PAPERLESS_A_TOKEN = "797eb57399bdb346dcc802e7666ddc316b6e8052"  # ⚠️ AKTUALIZOVÁNO 2025-09-03
LOGIN_A = "admin"
PASSWORD_A = "admin123"
```

### PAPERLESS B [PORT 8050] - Testovací (MBW dokumenty)
```python
PAPERLESS_B_URL = "http://localhost:8050"
PAPERLESS_B_TOKEN = "85919386a7e8c42f0dc8608535816bb109b73305"  # ⚠️ AKTUALIZOVÁNO 2025-09-03
LOGIN_B = "admin"
PASSWORD_B = "admin"
```

### PAPERLESS C [PORT 8075] - HTML GUI testy s Ultimate Detector V10
```python
PAPERLESS_C_URL = "http://localhost:8075"  # ⚠️ NOVÁ INSTANCE!
PAPERLESS_C_TOKEN = "dbfcde56d1b185aa5507b86ca8f381e5fdf44fd6"  # ⚠️ OPRAVENO 2025-09-05 (admin token)
LOGIN_C = "admin"
PASSWORD_C = "admin"

# ⚠️ POUŽITÍ: HTML aplikace + Ultimate Document Detector V10 (94% přesnost)
# Pro MCP Server V4 upload:
headers_C = {
    "Authorization": f"Token {PAPERLESS_C_TOKEN}",
    "Content-Type": "application/json"
}
```

## ⚡ RYCHLÉ PŘÍKAZY

```bash
# Spustit MBW procesor pro Paperless B (port 8050)
cd /Users/m.a.j.puzik/MBW-Paperless-8050-backup-20250901-223950
python3 process_mbw_enhanced_8050.py

# Test MCP OCR klienta
python3 mcp_ocr_client.py /cesta/k/dokumentu.pdf

# Upload do Paperless B [PORT 8050] - MBW dokumenty
curl -X POST http://localhost:8050/api/documents/post_document/ \
  -H "Authorization: Token 85919386a7e8c42f0dc8608535816bb109b73305" \
  -F "document=@dokument.pdf" \
  -F "tags=1,2,3"

# Upload do Paperless A [PORT 8060] - hlavní produkce
curl -X POST http://localhost:8060/api/documents/post_document/ \
  -H "Authorization: Token 797eb57399bdb346dcc802e7666ddc316b6e8052" \
  -F "document=@dokument.pdf" \
  -F "tags=1,2,3"

# Upload do Paperless C [PORT 8075] - HTML GUI testy (PŘES MCP SERVER!)
curl -X POST http://localhost:5002/paperless-intelligence/upload \
  -H "Content-Type: application/json" \
  -d '{"file_content":"base64_content","filename":"dokument.pdf","port":8075}'
```

## 🎯 CÍLE PROJEKTU
1. ✅ 92%+ přesnost klasifikace (dosaženo: 94%)
2. ✅ Automatické tagování všech dokumentů
3. ✅ Correspondent tagy z emailů
4. ✅ Zpracování příloh emailů
5. ⏳ Upload 170,000+ dokumentů do Paperless

## 📚 DOKUMENTACE SYSTÉMU

### 🆕 Paperless Upload System v0.1 (2025-09-03)
**📖 Kompletní dokumentace:** [`PAPERLESS_UPLOAD_DOKUMENTACE_v0.1.md`](/Users/m.a.j.puzik/PAPERLESS_UPLOAD_DOKUMENTACE_v0.1.md)

#### Hlavní features v0.1:
- ✅ **320 dokumentů** úspěšně nahráno na port 8050
- ✅ **MBW faktury** - automatické zpracování s odstraněním diakritiky
- ✅ **ČSOB bankovní výpisy** - konverze XML → PDF pomocí reportlab
- ✅ **OneDrive integrace** - 164,462 PDF nalezeno, batch upload implementován
- ✅ **Automatická detekce** - typy dokumentů, correspondenti, tagy

#### Hlavní skripty:
- `upload_mbw_no_diacritics.py` - Upload MBW s čištěním diakritiky
- `fix_csob_proper.py` - Konverze ČSOB XML na PDF
- `upload_all_onedrive.py` - Masivní upload z OneDrive
- `upload_scanned_docs.py` - Upload naskenovaných dokumentů

---
*Poslední aktualizace: 3.9.2025*
*Autor: M.A.J. Pužík + Claude Code Assistant*
*Proces: Paperless B (port 8050) s MCP Server V4 integrací*
*Verze dokumentace: 0.1*
## ⚠️ DŮLEŽITÉ UPOZORNĚNÍ - OPRAVENÉ SKRIPTY (2025-09-05)

### ✅ SPRÁVNÉ SOUBORY K POUŽITÍ:
- `/Users/m.a.j.puzik/paperless_importer_complete_FIXED.py` - POUŽIJ TENTO\! Má opravené:
  - NULL check pro correspondent_info (řádek 205: correspondent_info = {})
  - Správné volání extract_from_document() místo jiných metod
  - Fallback mechanismy pro korespondenty

### ❌ NEPOUŽÍVAT (mají chyby):
- Jakékoliv importery v /tmp/ - jsou dočasné a mizí
- Staré verze bez _FIXED suffixu

### 📝 PŘIPOMÍNKA:
Při každém startu NEJDŘÍV zkontroluj, zda používáš _FIXED verze skriptů\!

EOF < /dev/null
## 📅 POSLEDNÍ ZMĚNY: 2025-09-05
- Opraveny NULL pointer chyby v correspondent_extractor
- Vytvořen MAIN_PAPERLESS_IMPORTER.py jako definitivní verze
- Dokumentace v DAILY_CHANGES_2025-09-05.md
- Backup v /Users/m.a.j.puzik/paperless-backup-2025-09-05/
