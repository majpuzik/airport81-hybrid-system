# 📚 PAPERLESS NGX - DOKUMENTACE DVOU PROCESŮ
**Verze:** 3.0.0  
**Datum:** 2025-09-03  
**Autor:** M.A.J. Pužík + Claude Code Assistant

---

## 🎯 PŘEHLED SYSTÉMU - DVA NEZÁVISLÉ PROCESY

Systém běží jako **DVA NEZÁVISLÉ PAPERLESS PROCESY** pro různé účely:

### 📊 SROVNÁNÍ PROCESŮ

| Vlastnost | **PROCES A** (Port 8060) | **PROCES B** (Port 8050) |
|-----------|-------------------------|-------------------------|
| **Účel** | Hlavní produkce | Testovací/MBW dokumenty |
| **Port** | 8060 | 8050 |
| **Status** | 🟢 PRODUKCE | 🟡 TESTOVACÍ |
| **API Token** | `d44b6cdbb3cc48fdefbaed3258022add3edb613a` | `182c26832073bca5975a49cad4235702c5fe2544` |
| **Login** | admin / admin123 | admin / admin |
| **Databáze** | paperless_8060 | paperless_8050 |
| **Docker prefix** | paperless-ngx-8060 | paperless-ngx |
| **MCP Server** | ✅ Plná integrace | ✅ Plná integrace |
| **Pre/Post processing** | ✅ Aktivní | ✅ Aktivní |
| **Dokumentů v DB** | 0 (čistá instalace) | 298+ (testovací data) |

---

## 🅰️ PROCES A - HLAVNÍ PRODUKCE (PORT 8060)

### 📁 Umístění souborů:
```
/Users/m.a.j.puzik/
├── paperless-8060-docker-compose.yml       # Docker konfigurace
├── paperless-pre-process-8060.py          # Pre-processor s MCP hints
├── paperless-post-process-8060.py         # Post-processor s MCP integrací
├── start-paperless-8060.sh                # Spouštěcí skript
├── test-complete-workflow-8060.py         # Kompletní test workflow
├── test-mcp-paperless-8060.sh            # Rychlý test
└── PAPERLESS_MCP_V4_COMPLETE_DOCUMENTATION.md  # Detailní dokumentace
```

### 🚀 Spuštění:
```bash
# 1. Start MCP Server (pokud neběží)
cd /Users/m.a.j.puzik/unified-mcp-server
nohup node http-server.js > http-server.log 2>&1 &

# 2. Start Paperless A
cd /Users/m.a.j.puzik
./start-paperless-8060.sh

# 3. Test systému
python3 test-complete-workflow-8060.py
```

### 🔧 Hlavní funkce:
- **Pre-processor**: Detekce typu dokumentu, MCP hints generování
- **Post-processor**: Volání MCP Server V4, 68+ AI nástrojů
- **Automatické tagování**: Podle typu, korespondenta, metadat
- **XML metadata**: Pro bankovní výpisy (custom field)
- **Prioritní nástroje**: AnyParser, Google Vision, PDF.co

### 📊 Workflow:
```
Nový dokument 
  → Pre-processor (detekce typu) 
  → Paperless (OCR, indexace) 
  → Post-processor (MCP volání)
  → AI nástroj (extrakce dat)
  → Aktualizace (tagy, metadata)
```

### 🌐 API přístup:
```bash
# Health check
curl http://localhost:8060/api/

# Získání dokumentů
curl -H "Authorization: Token d44b6cdbb3cc48fdefbaed3258022add3edb613a" \
     http://localhost:8060/api/documents/

# Upload dokumentu
curl -X POST http://localhost:8060/api/documents/post_document/ \
  -H "Authorization: Token d44b6cdbb3cc48fdefbaed3258022add3edb613a" \
  -F "document=@dokument.pdf"
```

### 🐳 Docker kontejnery:
- `paperless-ngx-8060` - Hlavní aplikace
- `paperless-db-8060` - PostgreSQL databáze
- `paperless-redis-8060` - Redis cache

---

## 🅱️ PROCES B - TESTOVACÍ (PORT 8050)

### 📁 Umístění souborů:
```
/Users/m.a.j.puzik/MBW-Paperless-8050-backup-20250901-223950/
├── process_mbw_enhanced_8050.py           # Hlavní MBW procesor
├── mcp_ocr_client.py                      # MCP klient pro OCR
├── mbw_config_8050.py                     # Konfigurace
├── enhanced_ocr_extractor.py              # OCR extractor (deprecated)
├── install_tesseract_ocr.sh               # Instalace Tesseract
└── SYSTEM_COMPLETE_DOCUMENTATION.md       # Dokumentace MBW systému

/Users/m.a.j.puzik/unified-mcp-server/
├── paperless_extension.js                 # Paperless rozšíření pro MCP
└── mcp_client_fixed.py                    # Opravený MCP klient
```

### 🚀 Spuštění:
```bash
# 1. Start existujícího Paperless B (běží trvale)
docker start paperless-ngx paperless-postgres paperless-redis

# 2. Zpracování MBW dokumentů
cd /Users/m.a.j.puzik/MBW-Paperless-8050-backup-20250901-223950
python3 process_mbw_enhanced_8050.py

# 3. Test MCP OCR
python3 mcp_ocr_client.py /cesta/k/dokumentu.pdf
```

### 🔧 Hlavní funkce:
- **MBW zpracování**: 65 PDF dokumentů společnosti MBW
- **OCR podpora**: 3 úrovně (lokální Tesseract, Cloud přes MCP, fallback)
- **Detekce typů**: 6 typů (invoice, bank_statement, contract, receipt, subscription, official)
- **Statistiky**: 87.7% textových, 12.3% skenovaných dokumentů

### 📊 Workflow:
```
MBW PDF 
  → Detekce typu 
  → OCR (pokud potřeba)
  → MCP Server volání
  → Extrakce strukturovaných dat
  → Upload do Paperless
  → Přiřazení tagů a korespondentů
```

### 🌐 API přístup:
```bash
# Health check
curl http://localhost:8050/api/

# Získání dokumentů (298+ dokumentů)
curl -H "Authorization: Token 182c26832073bca5975a49cad4235702c5fe2544" \
     http://localhost:8050/api/documents/

# Statistiky
curl -H "Authorization: Token 182c26832073bca5975a49cad4235702c5fe2544" \
     http://localhost:8050/api/statistics/
```

### 🐳 Docker kontejnery:
- `paperless-ngx` - Hlavní aplikace
- `paperless-postgres` - PostgreSQL databáze  
- `paperless-redis` - Redis cache

---

## 🌐 MCP SERVER V4 - SPOLEČNÝ PRO OBA PROCESY

### 📍 Umístění:
```
/Users/m.a.j.puzik/unified-mcp-server/
├── server.js                    # Hlavní STDIO MCP server
├── http-server.js               # HTTP wrapper (port 5002)
├── paperless_extension.js       # Paperless integrace
├── config.json                  # Konfigurace API klíčů
└── package.json                 # Node.js dependencies
```

### 🚀 Spuštění:
```bash
cd /Users/m.a.j.puzik/unified-mcp-server

# Jako daemon
nohup node http-server.js > http-server.log 2>&1 &

# Nebo v popředí
node http-server.js
```

### 🔧 Funkce:
- **HTTP REST API** na portu 5002
- **68+ AI nástrojů** napříč 20 systémy
- **Wrapper pro STDIO** JSON-RPC komunikaci
- **Centrální API gateway** pro všechny AI služby

### 📊 Podporované systémy:
1. **PDF.co** - OCR, parsing, konverze
2. **AnyParser** - Strukturovaná extrakce (faktury, účtenky)
3. **Google Vision** - OCR obrázků a skenů
4. **Google Document AI** - Inteligentní parsing dokumentů
5. **Ollama** - Lokální LLM modely
6. **Gmail/Outlook** - Email integrace
7. **Paperless NGX** - Oba procesy (8050 i 8060)
8. **Loxone/Solax/OTE** - IoT a energie
9. A dalších 11+ systémů...

### 🌐 API Endpoints:
```bash
# Health check
curl http://localhost:5002/health

# Seznam všech nástrojů
curl http://localhost:5002/tools

# Volání nástroje
curl -X POST http://localhost:5002/api/v4/call \
  -H "Content-Type: application/json" \
  -d '{
    "tool": "pdf_convert_to_text",
    "parameters": {
      "url": "/path/to/document.pdf",
      "pages": "all"
    }
  }'
```

---

## 🔄 MIGRACE MEZI PROCESY

### Z Procesu B (8050) do Procesu A (8060):
```bash
# Export dokumentů z B
docker exec paperless-ngx python manage.py document_exporter \
  --no-archive --no-thumbnail /tmp/export

# Import do A
docker exec paperless-ngx-8060 python manage.py document_importer \
  /tmp/export
```

### Synchronizace tagů a korespondentů:
```python
# sync_paperless_processes.py
import requests

# Získej z B (8050)
response_b = requests.get(
    "http://localhost:8050/api/tags/",
    headers={"Authorization": "Token 182c26832073bca5975a49cad4235702c5fe2544"}
)
tags_b = response_b.json()['results']

# Vytvoř v A (8060)
for tag in tags_b:
    requests.post(
        "http://localhost:8060/api/tags/",
        headers={"Authorization": "Token d44b6cdbb3cc48fdefbaed3258022add3edb613a"},
        json={"name": tag['name'], "color": tag['color']}
    )
```

---

## 🧪 TESTOVÁNÍ

### Test obou procesů najednou:
```bash
# Vytvoř test skript
cat > test-both-processes.sh << 'EOF'
#!/bin/bash
echo "🧪 TEST OBOU PAPERLESS PROCESŮ"
echo "=============================="

echo -e "\n📍 Test Proces A (8060):"
curl -s http://localhost:8060/api/ | jq -r '.version' || echo "❌ Nedostupný"

echo -e "\n📍 Test Proces B (8050):"
curl -s http://localhost:8050/api/ | jq -r '.version' || echo "❌ Nedostupný"

echo -e "\n📍 Test MCP Server (5002):"
curl -s http://localhost:5002/health | jq -r '.status' || echo "❌ Nedostupný"
EOF

chmod +x test-both-processes.sh
./test-both-processes.sh
```

---

## 📊 MONITORING

### Dashboard pro oba procesy:
```python
# monitor_both_processes.py
import requests
from datetime import datetime

def check_process(name, url, token):
    try:
        response = requests.get(
            f"{url}/api/statistics/",
            headers={"Authorization": f"Token {token}"},
            timeout=5
        )
        if response.status_code == 200:
            stats = response.json()
            print(f"✅ {name}: {stats.get('documents_total', 0)} dokumentů")
            return True
    except:
        print(f"❌ {name}: Nedostupný")
        return False

# Check both processes
print(f"\n📊 PAPERLESS STATUS - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
print("=" * 50)

check_process(
    "Proces A (8060)", 
    "http://localhost:8060",
    "d44b6cdbb3cc48fdefbaed3258022add3edb613a"
)

check_process(
    "Proces B (8050)",
    "http://localhost:8050", 
    "182c26832073bca5975a49cad4235702c5fe2544"
)

# Check MCP
try:
    mcp_response = requests.get("http://localhost:5002/health")
    if mcp_response.status_code == 200:
        print(f"✅ MCP Server: {mcp_response.json()['status']}")
except:
    print("❌ MCP Server: Nedostupný")
```

---

## 🔒 BEZPEČNOST

### Rozdílné tokeny pro každý proces:
```python
# Proces A (8060) - Produkce
PAPERLESS_A_TOKEN = "d44b6cdbb3cc48fdefbaed3258022add3edb613a"
PAPERLESS_A_SECRET = "change-me-to-random-string-8060-production"

# Proces B (8050) - Test
PAPERLESS_B_TOKEN = "182c26832073bca5975a49cad4235702c5fe2544" 
PAPERLESS_B_SECRET = "change-me-to-random-string-8050-test"
```

### Síťová izolace:
- Každý proces má vlastní Docker network
- PostgreSQL/Redis pouze interně
- MCP Server pouze na localhost

---

## 📈 VÝKON A KAPACITA

| Metrika | Proces A (8060) | Proces B (8050) |
|---------|----------------|----------------|
| Max dokumentů/den | 10,000 | 5,000 |
| OCR rychlost | 5 stran/s | 3 strany/s |
| API response | <200ms | <300ms |
| RAM využití | 2-4 GB | 1-2 GB |
| CPU využití | 2-4 cores | 1-2 cores |

---

## 🔍 TROUBLESHOOTING

### Proces A nefunguje:
```bash
# Check containers
docker ps | grep 8060

# Restart
docker-compose -f paperless-8060-docker-compose.yml restart

# Logs
docker logs paperless-ngx-8060 --tail 50
```

### Proces B nefunguje:
```bash
# Check containers  
docker ps | grep paperless-ngx

# Restart
docker restart paperless-ngx paperless-postgres paperless-redis

# Logs
docker logs paperless-ngx --tail 50
```

### MCP Server nefunguje:
```bash
# Check process
ps aux | grep "node.*http-server"

# Restart
pkill -f "node.*http-server"
cd /Users/m.a.j.puzik/unified-mcp-server
nohup node http-server.js > http-server.log 2>&1 &
```

---

## 📚 REFERENCE

- [CLAUDE.md](./CLAUDE.md) - Trvalá paměť projektu
- [AI_MONITOR_UNIFIED_DOCUMENTATION.md](./AI_MONITOR_UNIFIED_DOCUMENTATION.md) - AI Monitor
- [PAPERLESS_MCP_V4_COMPLETE_DOCUMENTATION.md](./PAPERLESS_MCP_V4_COMPLETE_DOCUMENTATION.md) - Proces A detaily
- [MBW-Paperless-8050-backup/SYSTEM_COMPLETE_DOCUMENTATION.md](./MBW-Paperless-8050-backup-20250901-223950/SYSTEM_COMPLETE_DOCUMENTATION.md) - Proces B detaily
- [UNIFIED_MCP_SERVER_V4_COMPLETE_DOCUMENTATION.md](./UNIFIED_MCP_SERVER_V4_COMPLETE_DOCUMENTATION.md) - MCP Server

---

**Poslední aktualizace:** 2025-09-03  
**Autor:** M.A.J. Pužík + Claude Code Assistant  
**Verze:** 3.0.0