# 📧 EMAIL PDF MERGER - Kompletní řešení pro Gmail export

## 🎯 Co to řeší

### Hlavní problém:
Gmail export vytváří **každou přílohu jako samostatný PDF**, což vede k:
- 5+ separátních PDF z jednoho emailu s přílohami
- Paperless neví, že patří k sobě
- Špatná klasifikace českých dokumentů
- Ruční tagování je zdlouhavé

### Naše řešení:
✅ **Automatické sloučení** - detekuje PDF ze stejného emailu podle timestamp + odesílatel  
✅ **České dokumenty** - rozpozná faktury, účtenky (benzín/mytí/zasklení)  
✅ **Auto-tagging** - generuje relevantní tagy podle obsahu  
✅ **Paperless upload** - nahraje s kompletními metadaty

---

## 📦 Instalace

```bash
# 1. Nainstalovat závislosti
brew install poppler        # pro pdftotext
brew install ghostscript    # pro kvalitní PDF merge
pip3 install PyPDF2 requests

# 2. Stáhnout skripty
curl -O https://raw.../email_pdf_merger.py
curl -O https://raw.../paperless_auto_uploader.py
curl -O https://raw.../email_merge_workflow.sh
chmod +x email_merge_workflow.sh
```

---

## 🚀 Použití

### Rychlý start - kompletní workflow:
```bash
# Upravit cesty ve workflow skriptu
nano email_merge_workflow.sh

# Spustit vše automaticky
./email_merge_workflow.sh
```

### Krok za krokem:

#### 1. Sloučení PDF z emailů:
```bash
python3 email_pdf_merger.py /path/to/gmail-export /path/to/output

# Příklad:
python3 email_pdf_merger.py \
    /Users/m.a.j.puzik/majconvert-gmail-all \
    /Users/m.a.j.puzik/merged-pdfs
```

#### 2. Nahrání do Paperless:
```bash
python3 paperless_auto_uploader.py /path/to/merged --url URL --token TOKEN

# Příklad:
python3 paperless_auto_uploader.py \
    /Users/m.a.j.puzik/merged-pdfs \
    --url http://localhost:8050 \
    --token 9d51c86467e7b7e17a8748722ff1a24226c94a7e
```

---

## 🏷️ Automatická detekce a tagování

### České faktury:
- **Detekce:** faktura, DIČ: CZ, IČO, DPH, variabilní symbol
- **Tagy:** `faktura`, `VS_123456`, `rok_2025`, `mesic_08`
- **Příklad:** Vyúčtovací faktura od T-Mobile

### Účtenky - benzín:
- **Detekce:** Shell, OMV, Benzina, Natural 95, litry
- **Tagy:** `uctenka`, `benzin`, `cerpaci_shell`
- **Příklad:** Shell - 45 litrů Natural 95

### Účtenky - mytí aut:
- **Detekce:** mytí, car wash, autoservis, DPH 21%
- **Tagy:** `uctenka`, `myti_aut`, `autoservis`
- **Příklad:** Kompletní mytí vozu včetně vosku

### Účtenky - zasklení:
- **Detekce:** sklo, zasklení, m², montáž
- **Tagy:** `uctenka`, `zaskleni`, `sklenar`
- **Příklad:** Výměna skla u automobilu

---

## 📊 Příklad výsledku

### Před:
```
20250731_213838_Shell_Invoice.pdf
20250731_213838_Shell_Receipt_Page1.pdf
20250731_213838_Shell_Receipt_Page2.pdf
20250731_213838_Shell_Attachment.pdf
```

### Po:
```
gas_station_20250731_213838_Shell_Invoice_merged.pdf
  Tagy: uctenka, benzin, cerpaci_shell, rok_2025, mesic_07
  Korespondent: SHELL
```

---

## 🔧 Konfigurace

### email_merge_workflow.sh:
```bash
# Upravit cesty a token
GMAIL_EXPORT_DIR="/Users/m.a.j.puzik/majconvert-gmail-all"
MERGED_OUTPUT_DIR="/Users/m.a.j.puzik/merged-pdfs-$(date +%Y%m%d)"
PAPERLESS_URL="http://localhost:8050"
PAPERLESS_TOKEN="your_token_here"
```

### Časový práh pro sloučení:
```bash
# Výchozí: 5 minut mezi soubory ze stejného emailu
python3 email_pdf_merger.py input output --threshold 10
```

---

## 📈 Statistiky

Po zpracování uvidíte:
```
📊 SOUHRN ZPRACOVÁNÍ
==================================================
📁 Celkem zpracováno: 147 souborů
🔗 Sloučeno: 42 dokumentů
📄 Ponecháno jednotlivě: 63 souborů
🏷️ Otagováno: 89 dokumentů
💡 Ušetřeno: 42 duplicitních souborů
```

---

## 🐛 Řešení problémů

### "pdftotext není nainstalován":
```bash
brew install poppler
```

### "Ghostscript není nainstalován":
```bash
brew install ghostscript
```

### "Paperless není dostupný":
```bash
# Zkontrolovat že Paperless běží
docker ps | grep paperless

# Získat správný token
docker exec paperless-ngx cat /usr/src/paperless/data/auth_token.txt
```

### Některé PDF se nesloučily:
- Zkontrolujte názvy souborů (musí mít formát `YYYYMMDD_HHMMSS_sender_subject.pdf`)
- Upravte časový práh: `--threshold 10` (pro 10 minut)

---

## 💡 Tipy

1. **Testování na malém vzorku:**
   ```bash
   # Vytvořit testovací složku s několika PDF
   mkdir test-input
   cp /path/to/gmail-export/*.pdf test-input/ | head -20
   python3 email_pdf_merger.py test-input test-output
   ```

2. **Dry-run pro Paperless:**
   Nejdřív zkontrolujte metadata v `.json` souborech před nahráním

3. **Batch processing:**
   Pro tisíce souborů rozdělte na menší dávky po 500-1000 souborech

---

## 📝 Struktura výstupních souborů

```
merged-pdfs/
├── invoice_20250731_213838_Vodafone_merged.pdf
├── invoice_20250731_213838_Vodafone_merged.json  # Metadata
├── gas_station_20250801_091234_Shell_merged.pdf
├── gas_station_20250801_091234_Shell_merged.json
└── merge_summary.json  # Souhrn celého zpracování
```

### Formát metadata (.json):
```json
{
  "type": "invoice",
  "tags": ["faktura", "VS_7917007602", "rok_2025", "mesic_08"],
  "correspondent": "Vodafone",
  "date": "2025-08-15",
  "vs": "7917007602"
}
```

---

## 🚀 Pokročilé použití

### Vlastní detektory:
Můžete přidat vlastní vzory do `email_pdf_merger.py`:
```python
self.czech_patterns['custom'] = {
    'keywords': ['moje_firma', 'specifický_text'],
    'regex': [r'vzor_(\d+)']
}
```

### API integrace:
Uploader podporuje všechna Paperless API pole:
- archive_serial_number (VS)
- correspondent
- document_type
- tags
- created (datum)

---

## 📄 Licence

MIT License - volně k použití a úpravám

---

**Vytvořil:** Claude Code Assistant  
**Datum:** 2025-08-27  
**Pro:** m.a.j.puzik - zpracování českých dokumentů