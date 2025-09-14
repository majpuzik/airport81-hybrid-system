# 📊 POROVNÁNÍ PARSERŮ - V7 vs V8 vs V9
**Datum:** 2025-09-02  
**Port:** 8060 (VŽDY!)  

---

## 🏆 PŘEHLED VERZÍ

| Verze | Název | Technologie | Úspěšnost | Cena | Rychlost |
|-------|-------|-------------|-----------|------|----------|
| **V7** | FIXED | pdftotext only | 89% | Zdarma | Nejrychlejší |
| **V8** | OCR | + Tesseract OCR | 90% | Zdarma | Střední |
| **V9** | UNIFIED | + PDF.co + AnyParser | 95%+ | Placené API | Pomalejší |

---

## 🔍 DETAILNÍ SROVNÁNÍ

### V7 - Základní text extraction
```python
# Pouze pdftotext
result = subprocess.run(['pdftotext', '-l', '10', file, '-'])
text = result.stdout
```

**VýHODY:**
- ✅ Nejrychlejší (0.1s/dokument)
- ✅ Zdarma
- ✅ Nezávislé na externích službách

**NEVÝHODY:**
- ❌ Nefunguje na scany (obrázky)
- ❌ Žádné strukturované data
- ❌ Nerozpozná tabulky

### V8 - S Tesseract OCR
```python
# pdftotext + OCR fallback
if len(text) < 100:
    images = pdf2image.convert_from_path(pdf)
    text = pytesseract.image_to_string(images)
```

**VÝHODY:**
- ✅ Funguje na scany
- ✅ Pořád zdarma
- ✅ Podporuje 100+ jazyků

**NEVÝHODY:**
- ❌ Pomalejší (2-5s/dokument s OCR)
- ❌ Stále žádné strukturované data
- ❌ OCR může mít chyby

### V9 - Unified Parser (NOVÉ!)
```python
# PDF.co + AnyParser + Tesseract
pdf_co_data = parse_with_pdf_co(file)      # Strukturovaná data
anyparser_data = parse_with_anyparser(file) # Tabulky
ocr_text = run_tesseract_ocr(file)         # Fallback
```

**VÝHODY:**
- ✅ **Strukturovaná data** (IČO, částky, položky)
- ✅ **Extrakce tabulek** z faktur
- ✅ **Výplně formulářů** (PDF forms)
- ✅ **Nejvyšší přesnost** 95%+
- ✅ **JSON output** pro další zpracování

**NEVÝHODY:**
- ❌ Placené API (limitů)
- ❌ Pomalejší (3-10s/dokument)
- ❌ Závislost na externích službách

---

## 💰 CENOVÁ KALKULACE

### Pro 65 dokumentů MBW:

| Parser | Cena | Credits | Poznámka |
|--------|------|---------|----------|
| **V7 + V8** | **0 Kč** | 0 | Kompletně zdarma |
| **PDF.co** | ~32 Kč | 65 credits | 0.50 Kč/dokument |
| **AnyParser** | Zdarma | 65/100 | Free tier stačí |
| **V9 CELKEM** | **~32 Kč** | - | Jednorázově |

### Pro 170,000 dokumentů (celá databáze):

| Parser | Měsíčně | Ročně | Poznámka |
|--------|----------|--------|----------|
| **V7 + V8** | **0 Kč** | **0 Kč** | Zdarma navždy |
| **PDF.co** | 2,500 Kč | 30,000 Kč | Enterprise plan |
| **AnyParser** | 1,000 Kč | 12,000 Kč | Pro plan |
| **V9 CELKEM** | **3,500 Kč** | **42,000 Kč** | Velmi drahé! |

---

## 🎯 CO DOSTANETE S KAŽDOU VERZÍ

### V7 - Základní data:
```json
{
  "correspondent": "ČSOB",
  "date": "2024-01-15",
  "type": "bank_statement"
}
```

### V8 - V7 + OCR text:
```json
{
  "correspondent": "Benzina a.s.",
  "date": "2024-04-26",
  "type": "receipt",
  "ocr_text": "OMV 2002 Pávov Sever..."
}
```

### V9 - Kompletní strukturovaná data:
```json
{
  "correspondent": "Alza.cz a.s.",
  "vendor_ico": "27082440",
  "invoice_number": "2952181547",
  "date": "2024-04-16",
  "due_date": "2024-04-30",
  "total_amount": 12499.00,
  "currency": "CZK",
  "items": [
    {
      "description": "Samsung Galaxy S24",
      "quantity": 1,
      "price": 10329.75,
      "tax": 2169.25
    }
  ],
  "tax_details": {
    "base": 10329.75,
    "vat_21": 2169.25,
    "total": 12499.00
  },
  "tables": [...],
  "confidence": 95
}
```

---

## 🤔 DOPORUČENÍ

### KDY POUŽÍT KTEROU VERZI?

#### POUŽÍVEJTE V7:
- ✅ Pro velké množství dokumentů (170k+)
- ✅ Když stačí základní metadata
- ✅ Pro bankovní výpisy (dobře strukturované)
- ✅ Když je rychlost priorita

#### POUŽÍVEJTE V8:
- ✅ Pro scany a fotografie dokumentů
- ✅ Když potřebujete OCR zdarma
- ✅ Pro dokumenty bez textu
- ✅ Jako univerzální řešení

#### POUŽÍVEJTE V9:
- ✅ Pro důležité faktury (potřebujete částky)
- ✅ Pro daňové účely (strukturovaná data)
- ✅ Pro export do účetních systémů
- ✅ Když potřebujete tabulky a položky
- ✅ Pro malé množství dokumentů (<100/měsíc)

---

## 💡 HYBRIDNÍ PŘÍSTUP (DOPORUČENO!)

```python
def smart_parse(file_path, document_type=None):
    """
    Inteligentní výběr parseru podle typu dokumentu
    """
    
    # Bankovní výpisy - stačí V7
    if 'mczb' in file_path.lower() or document_type == 'bank_statement':
        return use_v7_parser(file_path)
    
    # Scany - potřebují V8
    if 'scan' in file_path.lower() or has_no_text(file_path):
        return use_v8_parser(file_path)
    
    # Důležité faktury - použij V9
    if is_important_invoice(file_path):
        return use_v9_parser(file_path)
    
    # Default - V8 (univerzální)
    return use_v8_parser(file_path)
```

---

## 📦 INSTALACE

### V7 - Minimální požadavky:
```bash
brew install poppler  # pro pdftotext
pip3 install requests
```

### V8 - OCR požadavky:
```bash
brew install tesseract tesseract-lang poppler
pip3 install pytesseract pdf2image pillow
```

### V9 - Plná instalace:
```bash
# Vše z V8 plus:
pip3 install requests python-dotenv

# Získejte API klíče:
# PDF.co: https://app.pdf.co/api-key
# AnyParser: https://anyparser.com/api

# Nastavte environment:
export PDF_CO_API_KEY='your-key'
export ANYPARSER_API_KEY='your-key'
```

---

## 🎯 ZÁVĚR

**Pro Paperless NGX na portu 8060:**

1. **Začněte s V8** - univerzální, zdarma, 90% úspěšnost
2. **Přidejte V9** jen pro důležité faktury
3. **Hybridní přístup** je nejlepší - využívá výhody všech verzí

---

*Vytvořeno: 2025-09-02 | Port: 8060*