# 🔍 JAK KONTROLOVAT PRŪBĚH ZPRACOVÁNÍ

## 1. **Hlavní GUI** 🌐
http://localhost:8890

### Co vidíte v GUI:
- **Progress bar** - ukazuje procenta dokončení
- **Statistiky** - Celkem / Zpracováno / Úspěšně / Chyby
- **Log okno** - real-time zprávy s časovými razítky

### Postup:
1. Klikněte **"🔍 Naskenovat"** - uvidíte počet nalezených souborů
2. Klikněte **"🚀 Spustit zpracování"**
3. Sledujte průběh v logu:
   - `[čas] 🔍 Nalezeno X dokumentů`
   - `[čas] 🚀 Spouštím zpracování X dokumentů`
   - `[čas] ✅ dokument.txt → faktura (0.85)`
   - `[čas] ✅ Zpracování dokončeno: X dokumentů`

## 2. **Testovací stránka** 🧪
file:///Users/m.a.j.puzik/test_working.html

- Jednodušší rozhraní pro testování
- Tlačítka: Naskenovat, Zpracovat, Smazat staré
- Živý log s WebSocket zprávami

## 3. **Server log** 📝
```bash
tail -f /tmp/processor_working.log
```

Ukazuje HTTP požadavky a WebSocket komunikaci

## 4. **Výstupní složka** 📁
```bash
ls -la /Users/m.a.j.puzik/classified_documents/
```

Obsahuje zpracované soubory rozdělené do kategorií:
- `faktura/`
- `smlouva/`
- `výpis/`
- `ostatní/`

## 5. **MCP Server log** 🤖
Pokud MCP server loguje:
```bash
ps aux | grep mcp_ai_server
```

## 📊INDIKÁTORY ZPRACOVÁNÍ:

### ✅ **Funguje správně:**
- Progress bar se hýbe
- Statistiky se aktualizují
- V logu vidíte klasifikaci dokumentů
- Soubory se objevují v `/classified_documents/`

### ❌ **Problém:**
- Progress bar stále na 0%
- Žádné zprávy v logu
- Statistiky se nemění
- Složka `classified_documents` zůstává prázdná

## 🔧 TROUBLESHOOTING:

### Zkontrolujte MCP server:
```bash
curl -X POST http://localhost:3001/classify \
  -H "Content-Type: application/json" \
  -d '{"text": "Test faktura", "filename": "test.txt"}'
```

### Zkontrolujte běžící procesy:
```bash
ps aux | grep -E "mass_document|mcp_ai" | grep -v grep
```

### Restartujte server:
```bash
pkill -f mass_document_processor
python3 /Users/m.a.j.puzik/mass_document_processor_working.py
```

## 💡 TIP:
Nejjednodušší je sledovat hlavní GUI na http://localhost:8890
Všechny informace o průběhu jsou tam v real-time!