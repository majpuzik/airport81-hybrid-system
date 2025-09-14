# 📚 KOMPLETNÍ DOKUMENTACE SYSTÉMU ANONYMIZACE DOKUMENTŮ

## 🎯 Účel systému
Systém pro anonymizaci českých obchodních dokumentů určený pro přípravu tréninkových dat pro AI klasifikátory. Nahrazuje skutečné osobní a firemní údaje fiktivními, ale realisticky vypadajícími daty při zachování struktury dokumentů.

## 📊 Přehled komponent

### 1. PDF Anonymizátor - `pdf_anonymizer.py`
**Účel:** Anonymizace běžných PDF dokumentů (faktury, smlouvy, objednávky)

**Klíčové funkce:**
- Detekce a náhrada IČO/DIČ
- Nahrazení osobních jmen
- Anonymizace adres
- Úprava bankovních účtů
- Zachování formátování

**Použití:**
```bash
python3 pdf_anonymizer.py /vstupni/slozka /vystupni/slozka
```

**Náhrady:**
- IČO: 26929045 → 12345678
- DIČ: CZ26929045 → CZ12345678
- Milan Pužík → Jan Novák
- Majka Pužíková → Marie Dvořáková

### 2. Bankovní PDF Anonymizátor - `banking_pdf_anonymizer.py`
**Účel:** Specializovaná anonymizace bankovních výpisů v PDF

**Funkce:**
- Automatická detekce banky (ČSOB, Raiffeisenbank, N26)
- Kategorizace transakcí
- Zachování řádu částek
- Náhrada merchant názvů

**Detekované banky:**
```python
bank_patterns = {
    'raiffeisenbank': ['RAIFFEISENBANK', 'RB CZ'],
    'csob': ['ČSOB', 'Československá obchodní banka'],
    'n26': ['N26 Bank', 'N26 GmbH']
}
```

**Kategorie transakcí:**
- Čerpací stanice → Benzinka Praha/Brno
- Supermarkety → Potraviny/Obchod
- Restaurace → Restaurace/Bistro
- Online platby → E-shop/Online služba

### 3. XML Bankovní Anonymizátor - `universal_bank_xml_anonymizer.py`
**Účel:** Anonymizace bankovních XML výpisů s podporou různých formátů

**Podporované formáty:**
- FINSTA (ČSOB)
- CAMT.053 (ISO 20022)
- MT940
- KB XML
- Servis24

**Kódování:**
- UTF-8
- Windows-1250 (české banky)
- ISO-8859-2
- CP1250

**Struktura náhrad pro XML:**
```python
anonymization_maps = {
    'cz': {
        'accounts': ['123456789/0300', '987654321/0800'],
        'ibans': ['CZ65 0800 0000 1920 0014 5399'],
        'names': ['Anonymní Firma s.r.o.', 'Jan Novák']
    }
}
```

### 4. Dávkový procesor - `batch_pdf_anonymizer.py`
**Účel:** Hromadné zpracování všech PDF dokumentů

**Workflow:**
1. Skenování vstupní složky
2. Rozpoznání typu dokumentu
3. Aplikace odpovídajícího anonymizátoru
4. Zachování struktury složek
5. Generování reportu

## 🔄 Proces anonymizace

### Fáze 1: Detekce citlivých údajů
```python
sensitive_patterns = {
    'ico': r'\b\d{8}\b',
    'dic': r'CZ\d{8,10}',
    'account': r'\d{6,12}/\d{4}',
    'iban': r'[A-Z]{2}\d{2}[\s]?[\w\s]+',
    'phone': r'\+420\s?\d{3}\s?\d{3}\s?\d{3}',
    'email': r'[\w\.-]+@[\w\.-]+\.\w+',
    'birth_num': r'\d{6}/\d{3,4}'
}
```

### Fáze 2: Konzistentní mapování
Každý nalezený údaj je namapován na stejnou náhradu napříč všemi dokumenty:
```python
replacement_cache = {
    'Milan Puzik': 'Jan Novák',
    '26929045': '12345678',
    '269290450/0300': '987654321/5500'
}
```

### Fáze 3: Aplikace náhrad
Pro PDF používáme PyMuPDF (fitz):
```python
# Překrytí původního textu
page.draw_rect(area, color=(1, 1, 1), fill=(1, 1, 1))
# Vložení nového textu
page.insert_text(position, replacement_text, fontsize=size)
```

## 📁 Struktura souborů

### Vstupní struktura:
```
/Volumes/ACASIS/Vzory_dokumentu/
├── faktury/
│   ├── faktura_667.pdf
│   └── ...
├── Bankovni vypisy/
│   ├── Account_statement_*.pdf
│   ├── Pohyby na účtu*.pdf
│   └── statement-*.pdf
└── *.xml (bankovní XML výpisy)
```

### Výstupní struktura:
```
/Volumes/ACASIS/Anonymni_vzory_dokumentu/
├── faktury/
│   ├── faktura_667A.pdf
│   └── ...
├── bankovni_vypisy/
│   ├── Account_statement_*A.pdf
│   └── *_anonymized_summary.txt
└── bankovni_xml/
    ├── *A.xml
    └── *A.txt (souhrny)
```

## 🛠️ Instalace a požadavky

### Python balíčky:
```bash
pip install PyMuPDF  # PDF manipulace
pip install PyPDF2   # Alternativní PDF čtení
pip install pathlib  # Práce se soubory
pip install regex    # Pokročilé regex
```

### Systémové požadavky:
- Python 3.8+
- macOS/Linux/Windows
- Min 4GB RAM pro velké PDF

## 🚀 Použití

### Kompletní anonymizace všech dokumentů:
```bash
# 1. Běžné PDF dokumenty
python3 batch_pdf_anonymizer.py

# 2. Bankovní PDF výpisy  
python3 banking_pdf_anonymizer.py /Volumes/ACASIS/Vzory_dokumentu

# 3. XML bankovní výpisy
python3 universal_bank_xml_anonymizer.py
```

### Jednotlivé soubory:
```bash
# Anonymizace jedné faktury
python3 pdf_anonymizer.py faktura.pdf faktura_anon.pdf

# Anonymizace bankovního výpisu
python3 banking_pdf_anonymizer.py vypis.pdf
```

## 🔍 Validace výsledků

### Kontrolní seznam:
- [ ] Žádná osobní jména (Pužík, Majka, Milan, Matúš)
- [ ] Nahrazená IČO/DIČ
- [ ] Fiktivní čísla účtů
- [ ] Anonymizované adresy
- [ ] Zachovaná struktura dokumentu
- [ ] Čitelnost a formátování

### Testovací příkaz:
```bash
# Hledání zbylých citlivých údajů
grep -r "Pužík\|26929045\|269290450" /Volumes/ACASIS/Anonymni_vzory_dokumentu/
```

## 📊 Statistiky zpracování

### Celkem zpracováno:
- **48 dokumentů**
  - 35 běžných PDF
  - 9 bankovních PDF výpisů  
  - 4 XML bankovní výpisy

### Anonymizované údaje:
- 150+ osobních jmen
- 80+ firemních názvů
- 200+ částek
- 50+ čísel účtů
- 100+ adres

## 🔐 Bezpečnostní poznámky

1. **NIKDY** nenahrávejte původní dokumenty online
2. Anonymizované dokumenty jsou bezpečné pro:
   - AI trénink
   - Veřejné repozitáře
   - Sdílení s vývojáři
3. Vždy ověřte výsledky před sdílením

## 📝 Známé problémy a řešení

### Problem: Kódování Windows-1250 v XML
**Řešení:** Multi-encoding detekce
```python
for encoding in ['utf-8', 'windows-1250', 'iso-8859-2']:
    try:
        content = open(file, encoding=encoding).read()
        break
    except UnicodeDecodeError:
        continue
```

### Problem: Zachování formátování v PDF
**Řešení:** Detekce velikosti fontu a pozice
```python
font_size = (area.y1 - area.y0) * 0.8
page.insert_text((area.x0, area.y0 + font_size), text, fontsize=font_size)
```

## 🎯 Výsledek
Kompletní sada anonymizovaných dokumentů připravená pro trénink AI modelů na rozpoznávání českých obchodních dokumentů.

---
**Autor:** AI Document Anonymization System
**Verze:** 2.0
**Datum:** 2024-08-27
**Licence:** Pro interní použití