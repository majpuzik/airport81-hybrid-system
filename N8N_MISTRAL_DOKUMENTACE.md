# 📊 n8n Document Processor s Mistral AI

## ✅ KOMPLETNÍ ŘEŠENÍ PRO KLASIFIKACI DOKUMENTŮ

### 🌐 PŘÍSTUP
**GUI:** http://localhost:8891

### 🚀 FUNKCE

#### 1. **Výběr zdroje dokumentů**
- 📧 **Email** - načítání z Gmail
  - Nastavení počtu emailů (1-1000)
  - Časový rozsah (posledních X dní)
  - Výběr od konkrétního data
- 📁 **Soubory** - výběr přes GUI picker
- 📂 **Složka** - výběr celé složky

#### 2. **Rozpoznávané kategorie dokumentů**
- **faktura** - faktury, invoices, Rechnung
- **platba** - platby, payments, Zahlung
- **vypis** - bankovní výpisy, statements
- **reklama** - reklamní emaily, spam
- **smlouva** - smlouvy, contracts
- **soudni** - soudní obsílky, předvolání
- **policie** - policejní dokumenty
- **korespondence** - obchodní korespondence
- **nabidka** - cenové nabídky
- **ostatni** - nezatříděné

#### 3. **Zpracování**
- 🤖 Klasifikace přes **Mistral AI** (MCP server nebo Ollama)
- 🇫🇷 Primárně pro **české dokumenty** (99%)
- 🇩🇪🇬🇧🇪🇸 Podpora němčiny, angličtiny, francouzštiny, španělštiny (1%)

#### 4. **Výstup**
- 📁 Třídění do složek podle kategorií
- 📄 Konverze do PDF pomocí **Adobe Acrobat**
- 🏷️ Tagování pro **Paperless-ngx**
- 🔄 Přepsání existujících souborů (volitelné)

### 🔧 KONVERZE DO PDF S ADOBE ACROBAT

Systém využívá vaši placenou verzi Adobe Acrobat pro konverzi:

```python
def convert_to_pdf_adobe(input_file, output_file):
    # Používá AppleScript pro ovládání Adobe Acrobat
    script = f'''
    tell application "Adobe Acrobat"
        activate
        open "{input_file}"
        save document 1 to "{output_file}" as "com.adobe.acrobat.pdf"
        close document 1
    end tell
    '''
```

**Funkce:**
- Konverze emailů s přílohami do jednoho PDF
- Sloučení více dokumentů
- Zachování formátování

### 📦 STRUKTURA VÝSTUPU

```
/Users/m.a.j.puzik/classified_documents_n8n/
├── faktura/
│   ├── invoice_001.pdf
│   └── invoice_001.json (metadata pro Paperless)
├── platba/
├── vypis/
├── reklama/ (automaticky přeskočeno)
├── smlouva/
├── soudni/ (vysoká priorita)
├── policie/ (vysoká priorita)
├── korespondence/
├── nabidka/
└── ostatni/
```

### 📤 n8n WORKFLOW

#### Import do n8n:
1. Otevřete n8n: http://localhost:5678
2. Vytvořte nový workflow
3. Importujte: `/Users/m.a.j.puzik/n8n_mistral_workflow.json`

#### Workflow obsahuje:
- **Webhook** pro příjem dokumentů
- **MCP Classify** - klasifikace přes MCP server
- **Ollama Mistral** - záložní klasifikace
- **Process Results** - zpracování výsledků
- **Is Advertisement?** - detekce reklam
- **Skip/Process** - rozhodování o zpracování

### 🎆 SPECIÁLNÍ FUNKCE

#### Rozpoznávání priority:
- **Vysoká**: soudní, policejní, úřední dokumenty
- **Střední**: faktury, platby
- **Nízká**: korespondence, nabídky
- **Žádná**: reklamy (automaticky přeskočeno)

#### Detekce reklam:
- Newsletter, unsubscribe linky
- Slova: akce, sleva, omezenou dobu
- Marketing emaily
- Automatické přeskočení

#### Rozlišování korespondence:
- **Obchodní**: známí odesílatelé, existující vztah
- **Nabídky**: neznámí odesílatelé, ale ne spam

### 🛠️ INSTALACE A SPUTĚNÍ

#### Požadavky:
```bash
# Python knihovny
pip3 install flask flask-socketio PyPDF2 requests

# Adobe Acrobat DC (placená verze)
# n8n (port 5678)
# MCP server (port 3001)
# Ollama s Mistral modelem
```

#### Spuštění:
```bash
# 1. Spustit MCP server
python3 mcp_ai_server.py

# 2. Spustit n8n
n8n start

# 3. Spustit document processor
python3 n8n_document_processor.py
```

### 📊 STATISTIKY A MONITORING

- Real-time progress bar
- Počítadla: Celkem/Zpracováno/Úspěšně/Chyby
- Kategorie statistiky
- Živý log s časovými razítky
- Export výsledků jako ZIP

### 🔄 INTEGRACE S PAPERLESS-NGX

- Automatické tagování podle kategorií
- Metadata ve formátu JSON
- Přímý export přes API
- Token: 1ed757660d46807ef2cf1fa725cf1272b335f68a

### 💡 TIPY PRO POUŽITÍ

1. **Pro hromadné zpracování emailů:**
   - Nastavte větší počet (např. 100-500)
   - Použijte časový filtr
   - Zaškrtněte "Smazat staré výsledky"

2. **Pro dokumenty s přílohami:**
   - Zaškrtněte "Konvertovat do PDF"
   - Všechny přílohy budou sloučeny

3. **Pro rychlou kontrolu:**
   - Reklamy jsou automaticky přeskočeny
   - Důležité dokumenty mají vysokou prioritu

---

**SYSTÉM JE PLNĚ FUNKČNÍ A PŘIPRAVEN K POUŽITÍ!** 🎉

- GUI běží na: http://localhost:8891
- n8n workflow připraven k importu
- Adobe Acrobat integrace funkční
- Mistral AI klasifikace aktivní