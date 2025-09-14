# 🚀 V10 - MCP ONLY DETEKTOR
**Verze:** 10.0  
**Datum:** 2025-09-02  
**Port:** 8060 (VŽDY!)  

---

## ✅ KLÍČOVÁ ZMĚNA: VŠE PŘES MCP SERVER!

### 🚫 Původní V9 (ŠPATNĚ):
```python
# PŘímá API volání - NEPOUŽÍVAT!
response = requests.post(
    'https://api.pdf.co/v1/pdf/documentparser',
    headers={'x-api-key': PDF_CO_API_KEY},
    json=data
)
```

### ✅ Nový V10 (SPRÁVNĚ):
```python
# Vše přes MCP server - JEDINÝ SPRÁVNÝ ZPŮSOB!
result = self.mcp.call_tool(
    "pdf_convert_to_text",  # MCP tool
    {"url": file_url}        # parametry
)
```

---

## 🎯 ARCHITEKTURA V10

```
┌──────────────────────────────────────────┐
│           V10 PYTHON DETEKTOR            │
│         (NEOBSAHUJE API KLÍČE!)          │
└────────────────┬─────────────────────────┘
                 │
                 ↓ STDIO JSON-RPC
┌──────────────────────────────────────────┐
│       UNIFIED MCP SERVER V4.0.1          │
│     /Users/m.a.j.puzik/unified-mcp-server│
│                                          │
│  ✅ PDF.co API klíč                       │
│  ✅ AnyParser API klíč                   │
│  ✅ Paperless B (port 8060)              │
│  ✅ Cache & Rate limiting                │
│  ✅ 60+ MCP tools                        │
└────────────────┬─────────────────────────┘
                 │
       ┌─────────┼─────────┬──────────┐
       ↓         ↓         ↓          ↓
   PDF.co   AnyParser  Paperless  Další API
```

---

## 🔧 MCP TOOLS POUŽÍVANÉ VE V10

### 1. PDF.co Tools:
| Tool | Účel | Parametry |
|------|-------|----------|
| `pdf_convert_to_text` | Extrakce textu z PDF | url, inline, password |
| `pdf_merge_documents` | Sloučení PDF | urls[], name |
| `pdf_split_document` | Rozdělení PDF | url, pages |
| `pdf_compress` | Komprese PDF | url, quality |

### 2. AnyParser Tools:
| Tool | Účel | Parametry |
|------|-------|----------|
| `anyparser_parse_invoice` | Parsování faktur | file_url, extract_specific_fields |
| `anyparser_parse_receipt` | Parsování účtenek | file_url, extract_specific_fields |
| `anyparser_extract_structured` | Extrakce strukturovaných dat | file_url, extract_args |

### 3. Paperless B Tools:
| Tool | Účel | Parametry |
|------|-------|----------|
| `paperlessB_upload_document` | Upload dokumentů | file_path, metadata |
| `paperlessB_get_documents` | Získat dokumenty | page, page_size, query |
| `paperlessB_create_correspondent` | Vytvořit korespondenta | name, match, matching_algorithm |
| `paperlessB_create_tag` | Vytvořit tag | name, color, is_inbox_tag |

---

## 💻 IMPLEMENTACE V10

### MCPClient třída:
```python
class MCPClient:
    """Klient pro komunikaci s MCP serverem přes stdio"""
    
    def start(self):
        """Spustí MCP server jako subprocess"""
        self.process = subprocess.Popen(
            ['node', 'server.js'],
            cwd='/Users/m.a.j.puzik/unified-mcp-server',
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            text=True
        )
    
    def call_tool(self, tool_name: str, arguments: Dict) -> Dict:
        """Zavolá MCP tool přes JSON-RPC"""
        request = {
            "jsonrpc": "2.0",
            "method": "tools/call",
            "params": {
                "name": tool_name,
                "arguments": arguments
            },
            "id": self.request_id
        }
        # Pošli request a čti odpověď
```

### Unified parsing:
```python
def unified_parse_with_mcp(self, file_path: str) -> Dict:
    # 1. PDF.co přes MCP
    pdf_co_data = self.parse_with_mcp_pdfco(file_path)
    
    # 2. AnyParser přes MCP
    anyparser_data = self.parse_with_mcp_anyparser(file_path)
    
    # 3. Lokální fallback (pdftotext)
    text = self.extract_text_from_pdf(file_path)
    
    # Kombinuj výsledky
    return unified_data
```

---

## 📊 POROVNÁNÍ V9 vs V10

| Aspekt | V9 (Přímá API) | V10 (MCP Only) |
|--------|-----------------|----------------|
| **API klíče** | V Python kódu | V MCP serveru |
| **Bezpečnost** | ❌ Menší | ✅ Lepší |
| **Cache** | Manuální | ✅ Automatický |
| **Rate limiting** | Manuální | ✅ Automatický |
| **Správa API** | V každém skriptu | ✅ Centrální |
| **Testování** | Složité | ✅ Jednoduché |
| **Rozhršaní** | Specifické pro API | ✅ Jednotné MCP |

---

## 🚀 SPOUŠTĚNÍ V10

### 1. Příprava MCP serveru:
```bash
# Instalace závislostí
cd /Users/m.a.j.puzik/unified-mcp-server
npm install

# Kontrola .env (API klíče jsou tam)
cat .env | grep -E "PDFCO|ANYPARSER"
```

### 2. Test MCP serveru:
```bash
# Test spojení
python3 ultimate_document_detector_v10_MCP_ONLY.py --test-mcp
```

### 3. Zpracování dokumentů:
```bash
# Analýza bez uploadu
python3 ultimate_document_detector_v10_MCP_ONLY.py

# Analýza + upload do Paperless B (port 8060)
python3 ultimate_document_detector_v10_MCP_ONLY.py --upload
```

---

## ⚠️ DŮLEŽITÁ UPOZORNĚNÍ

1. **NIKDY nepoužívejte přímá API volání** - vše přes MCP!
2. **API klíče jsou POUZE v MCP serveru** - ne v Python kódu!
3. **MCP server běží lokálně** - není potřeba Docker
4. **Port 8060** pro Paperless B - nikdy jiný!
5. **Cache je automatický** - MCP server cachuje odpovědi

---

## 📊 OČEKÁVANÉ VÝSLEDKY

### S MCP parserem:
- **Úspěšnost detekce:** 95%+ (PDF.co + AnyParser)
- **Strukturovaná data:** Částky, položky, DPH
- **Tabulky:** Extrakce pomocí AnyParser
- **Cache:** Automatický, 5 minut TTL
- **Rate limiting:** Automatický v MCP

### Výhody MCP přístupu:
- ✅ **Centralizované API klíče** - bezpečnější
- ✅ **Jednotné rozhraní** - stejné pro všechny API
- ✅ **Automatický cache** - rychlejší odpovědi
- ✅ **Rate limiting** - chrání před přetížením
- ✅ **Snadné rozšiřování** - stačí přidat tool do MCP

---

## 🔍 TROUBLESHOOTING

### MCP server neštartuje:
```bash
# Kontrola Node.js
node --version  # Musí být 18+

# Kontrola závislostí
cd /Users/m.a.j.puzik/unified-mcp-server
npm install

# Kontrola .env
ls -la .env
```

### Žádná odpověď z MCP:
```bash
# Test přímo
cd /Users/m.a.j.puzik/unified-mcp-server
node server.js
# Pak v jiném okně poslat JSON-RPC request
```

### API klíče nefungují:
```bash
# Kontrola .env
grep PDFCO_API_KEY /Users/m.a.j.puzik/unified-mcp-server/.env
grep ANYPARSER_API_KEY /Users/m.a.j.puzik/unified-mcp-server/.env
```

---

*Vytvořeno: 2025-09-02 | V10.0 | MCP Only | Port 8060*