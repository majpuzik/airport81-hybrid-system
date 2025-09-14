# 📚 PAPERLESS NGX + MCP SERVER V4 - KOMPLETNÍ DOKUMENTACE
**Verze:** 2.0.0  
**Datum:** 2025-09-03  
**Autor:** M.A.J. Pužík + Claude Code Assistant  
**Port:** 8060 (Paperless A - hlavní produkce)

---

## 🎯 PŘEHLED SYSTÉMU

Kompletní inteligentní systém pro zpracování dokumentů kombinující:
- **Paperless NGX** - správa dokumentů na portu 8060
- **MCP Server V4** - centrální API gateway na portu 5002 (68+ AI nástrojů)
- **Pre/Post Processing** - inteligentní zpracování dokumentů

## 🏗️ ARCHITEKTURA

```
┌──────────────────────────────────────────────────┐
│               PAPERLESS NGX (8060)                │
│  ┌─────────────────────────────────────────────┐ │
│  │         1. CONSUME FOLDER                   │ │
│  │         Nový dokument přijat                │ │
│  └─────────────────┬───────────────────────────┘ │
│                    ▼                              │
│  ┌─────────────────────────────────────────────┐ │
│  │         2. PRE-PROCESSOR                    │ │
│  │   • Detekce typu dokumentu                  │ │
│  │   • Extrakce první stránky                  │ │
│  │   • Detekce jazyka a citlivých údajů        │ │
│  │   • Vytvoření metadat pro MCP               │ │
│  └─────────────────┬───────────────────────────┘ │
│                    ▼                              │
│  ┌─────────────────────────────────────────────┐ │
│  │         3. PAPERLESS PROCESSING             │ │
│  │   • OCR (Tesseract)                         │ │
│  │   • Fulltext indexace                       │ │
│  │   • Uložení do databáze                     │ │
│  └─────────────────┬───────────────────────────┘ │
│                    ▼                              │
│  ┌─────────────────────────────────────────────┐ │
│  │         4. POST-PROCESSOR                   │ │
│  └─────────────────┬───────────────────────────┘ │
└────────────────────┼──────────────────────────────┘
                     ▼
┌───────────────────────────────────────────────────┐
│           MCP SERVER V4 (5002)                     │
│  ┌──────────────────────────────────────────────┐ │
│  │   Výběr optimálního nástroje:                │ │
│  │   • AnyParser (faktury, účtenky)             │ │
│  │   • Google Vision (OCR skenů)                │ │
│  │   • PDF.co (strukturovaná data)              │ │
│  │   • Ollama (lokální LLM)                     │ │
│  └──────────────────┬──────────────────────────┘ │
└────────────────────┼──────────────────────────────┘
                     ▼
┌───────────────────────────────────────────────────┐
│           VÝSLEDEK ZPRACOVÁNÍ                      │
│  • Automatické tagy podle typu                     │
│  • Korespondent z IČO/emailu                      │
│  • Custom fields (IČO, DIČ, VS, částka)           │
│  • XML metadata pro bankovní výpisy               │
│  • Inteligentní název dokumentu                   │
└───────────────────────────────────────────────────┘
```

## 🚀 INSTALACE A SPUŠTĚNÍ

### 1. Předpoklady
```bash
# Nainstalované nástroje
- Docker & Docker Compose
- Node.js 18+
- Python 3.9+
- Tesseract OCR

# Porty
- 8060: Paperless NGX
- 5002: MCP Server V4
- 5432: PostgreSQL (interní)
- 6379: Redis (interní)
```

### 2. Spuštění MCP Server V4
```bash
cd /Users/m.a.j.puzik/unified-mcp-server
node http-server.js

# Nebo jako daemon
nohup node http-server.js > http-server.log 2>&1 &

# Test
curl http://localhost:5002/health
```

### 3. Spuštění Paperless NGX
```bash
cd /Users/m.a.j.puzik
./start-paperless-8060.sh

# Nebo manuálně
docker-compose -f paperless-8060-docker-compose.yml up -d
```

### 4. Test systému
```bash
python3 test-complete-workflow-8060.py
```

## 📁 STRUKTURA SOUBORŮ

```
/Users/m.a.j.puzik/
├── paperless-8060-docker-compose.yml    # Docker konfigurace
├── paperless-pre-process-8060.py        # Pre-processor script
├── paperless-post-process-8060.py       # Post-processor script  
├── start-paperless-8060.sh              # Spouštěcí skript
├── test-complete-workflow-8060.py       # Kompletní test
├── test-mcp-paperless-8060.sh          # Rychlý test
└── scripts/
    └── post_process.py                  # Kopie pro Docker volume
```

## 🔧 PRE-PROCESSOR

**Soubor:** `paperless-pre-process-8060.py`

### Funkce:
1. **Detekce typu dokumentu** z názvu souboru
2. **Extrakce textu** z první stránky PDF
3. **Detekce jazyka** (cs, de, en)
4. **Detekce citlivých údajů** (IČO, DIČ, IBAN, rodné číslo)
5. **Generování MCP hints** - doporučení nejlepšího nástroje
6. **Uložení metadat** do `/tmp/paperless_metadata/`

### Detekované typy:
- `invoice` - faktury
- `receipt` - účtenky
- `bank_statement` - bankovní výpisy
- `contract` - smlouvy
- `order` - objednávky
- `delivery` - dodací listy
- `tax` - daňové doklady

## 🔨 POST-PROCESSOR

**Soubor:** `paperless-post-process-8060.py`

### Workflow:
1. **Získání dokumentu** z Paperless API
2. **Volání MCP Server V4** pro extrakci dat
3. **Analýza dokumentu** - typ, metadata, korespondent
4. **Vytvoření/přiřazení tagů**:
   - Typ dokumentu (faktura, účtenka, výpis)
   - Korespondent (z IČO nebo emailu)
   - Metadata (IČO, DIČ, VS)
   - Rok a MCP nástroj
5. **Aktualizace v Paperless** přes API

### Priorita MCP nástrojů:

#### Faktury:
1. `anyparser_parse_invoice`
2. `google_document_ai_process`
3. `pdf_convert_to_text`

#### Účtenky:
1. `anyparser_parse_receipt`
2. `google_vision_ocr`
3. `pdf_convert_to_text`

#### Bankovní výpisy:
1. `anyparser_extract_structured`
2. `pdf_convert_to_text`
3. Generování XML metadat

## 🌐 MCP SERVER V4 INTEGRACE

**Port:** 5002  
**Typ:** HTTP REST API (wrapper pro STDIO JSON-RPC)

### Hlavní endpointy:
- `GET /health` - Status serveru
- `GET /tools` - Seznam všech nástrojů
- `POST /api/v4/call` - Volání nástroje

### Podporované systémy (20+):
1. **PDF.co** - OCR, parsing, konverze
2. **AnyParser** - Strukturovaná extrakce
3. **Google Vision** - OCR obrázků
4. **Google Document AI** - Inteligentní parsing
5. **Ollama** - Lokální LLM
6. **Paperless NGX** - Správa dokumentů
7. **Gmail** - Email integrace
8. **Outlook** - Email integrace
9. **Dropbox** - Cloud storage
10. **GitHub** - Verzování
11. **N8N** - Workflow automatizace
12. **Loxone** - Smart home
13. **Solax** - Solární systém
14. **OTE** - Energetické ceny
15. **Home Assistant** - Domácí automatizace
16. A další...

### Volání nástroje:
```python
# Příklad volání MCP nástroje
import requests

response = requests.post(
    "http://localhost:5002/api/v4/call",
    json={
        "tool": "anyparser_parse_invoice",
        "parameters": {
            "file_path": "/path/to/invoice.pdf"
        }
    }
)

result = response.json()
if result['success']:
    print(f"Extrahovaná data: {result['data']}")
```

## 🏷️ SYSTÉM TAGOVÁNÍ

### Kategorie tagů:
- `paperless-ngx-faktury` - Faktury
- `paperless-ngx-účtenky` - Účtenky
- `paperless-ngx-bankovnictví` - Bankovní výpisy
- `paperless-ngx-smlouvy` - Smlouvy
- `paperless-ngx-úřední-sdělení` - Úřední dokumenty

### Metadata tagy:
- `IČO:12345678` - IČO firmy
- `DIČ:CZ12345678` - DIČ firmy
- `VS:123456` - Variabilní symbol
- `2025` - Rok
- `MCP:anyparser_parse_invoice` - Použitý nástroj

## 📊 CUSTOM FIELDS

Paperless custom fields pro strukturovaná data:
- `ico` - IČO firmy (text)
- `dic` - DIČ firmy (text)
- `vs` - Variabilní symbol (text)
- `amount` - Částka (float)
- `electronic_xml` - XML metadata (text)

## 🧪 TESTOVÁNÍ

### Rychlý test:
```bash
./test-mcp-paperless-8060.sh
```

### Kompletní test workflow:
```bash
python3 test-complete-workflow-8060.py
```

### Test jednotlivých komponent:
```bash
# Test pre-processoru
python3 paperless-pre-process-8060.py test_document.pdf

# Test MCP serveru
curl http://localhost:5002/health

# Test Paperless API
curl -H "Authorization: Token d44b6cdbb3cc48fdefbaed3258022add3edb613a" \
     http://localhost:8060/api/
```

## 📝 PŘÍKLAD POUŽITÍ

### 1. Nahrání dokumentu:
```bash
# Zkopíruj do consume složky
docker cp faktura.pdf paperless-ngx-8060:/usr/src/paperless/consume/
```

### 2. Automatické zpracování:
1. Pre-processor detekuje typ "invoice"
2. Pre-processor vytvoří metadata s MCP hintem "anyparser_parse_invoice"
3. Paperless zpracuje dokument (OCR, indexace)
4. Post-processor zavolá MCP Server V4
5. MCP použije AnyParser pro extrakci dat
6. Post-processor přidá tagy: "typ:faktura", "IČO:12345678", "VS:2025001"
7. Post-processor nastaví korespondenta podle IČO
8. Dokument je kompletně zpracován

### 3. Kontrola výsledku:
```bash
# V Paperless GUI
http://localhost:8060

# Přes API
curl -H "Authorization: Token d44b6cdbb3cc48fdefbaed3258022add3edb613a" \
     http://localhost:8060/api/documents/
```

## 🔍 DEBUGGING

### Logy:
```bash
# MCP Server
tail -f /Users/m.a.j.puzik/unified-mcp-server/http-server.log

# Paperless
docker logs -f paperless-ngx-8060

# Pre/Post processor
docker exec paperless-ngx-8060 cat /tmp/paperless_process.log
```

### Časté problémy:

#### MCP Server nedostupný:
```bash
# Zkontroluj proces
ps aux | grep "node.*http-server"

# Restart
pkill -f "node.*http-server"
cd /Users/m.a.j.puzik/unified-mcp-server
nohup node http-server.js > http-server.log 2>&1 &
```

#### Paperless nespouští skripty:
```bash
# Zkontroluj environment
docker exec paperless-ngx-8060 env | grep SCRIPT

# Zkontroluj oprávnění
docker exec paperless-ngx-8060 ls -la /usr/src/paperless/scripts/
```

## 📈 VÝKON A OPTIMALIZACE

### Doporučené nastavení:
- **OCR_MODE:** `skip_noarchive` - přeskočí již zpracované
- **OCR_LANGUAGE:** `ces+eng` - pouze potřebné jazyky
- **CONSUMER_RECURSIVE:** `true` - zpracuje podsložky
- **MCP_TIMEOUT:** `120` - timeout pro AI operace

### Škálování:
- Více Paperless workerů: `PAPERLESS_TASK_WORKERS=4`
- Redis persistence: Redis volume pro cache
- PostgreSQL tuning: Zvýšit `shared_buffers` a `work_mem`

## 🔐 BEZPEČNOST

### API tokeny:
```python
# Paperless API token (generovat v admin rozhraní)
PAPERLESS_TOKEN = "d44b6cdbb3cc48fdefbaed3258022add3edb613a"

# Změnit v produkci!
PAPERLESS_SECRET_KEY = "change-me-to-random-string-8060-production"
```

### Síťová izolace:
- Paperless běží v Docker bridge síti
- MCP Server přístupný pouze z localhost
- PostgreSQL/Redis pouze interně

## 📚 REFERENCE

- [Paperless NGX dokumentace](https://docs.paperless-ngx.com)
- [MCP Server V4 README](./unified-mcp-server/README.md)
- [Docker Compose reference](https://docs.docker.com/compose/)
- [CLAUDE.md](./CLAUDE.md) - Trvalá paměť projektu

---

**Poslední aktualizace:** 2025-09-03  
**Autor:** M.A.J. Pužík + Claude Code Assistant  
**Verze:** 2.0.0