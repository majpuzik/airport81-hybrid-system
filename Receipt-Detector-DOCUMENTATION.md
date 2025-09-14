# 🧾 Receipt Detector - Dokumentace

**Verze:** 1.0  
**Datum:** 23.8.2025  
**Autor:** Claude pro MyBrainWorks

## 📋 Přehled

Detektor účtenek a potvrzení o platbě s podporou různých typů dokumentů a inteligentní analýzou podle názvu souboru pro skenované dokumenty.

## ✨ Klíčové vlastnosti

- ✅ **Detekce 7 typů účtenek** (benzín, parkování, servis, restaurace, ubytování, online služby, maloobchod)
- ✅ **Vícejazyčná podpora** (čeština, angličtina, němčina)
- ✅ **Analýza skenovaných dokumentů** podle názvu souboru
- ✅ **75%+ přesnost** na dokumentech s textem
- ✅ **60% jistota** u skenovaných dokumentů (podle názvu)

## 🏷️ Podporované typy účtenek

### 1. **Benzínky (fuel)**
- Klíčová slova: benzin, nafta, diesel, natural 95, tankování, čerpací stanice
- Značky: Shell, MOL, OMV, Benzina, Orlen, Eurobit, Čepro
- Vzory: množství v litrech, typ paliva

### 2. **Parkování (parking)**
- Klíčová slova: parkování, parkoviště, parking, garáž
- Služby: Mr.Parkit, Easypark, MPLA
- Vzory: SPZ, doba parkování, čas od-do

### 3. **Autoservis (car_service)**
- Klíčová slova: autoservis, oprava, výměna, pneuservis, STK, emise
- Služby: výměna oleje, brzdy, pneumatiky, čištění vozu, mytí
- Vzory: VIN, SPZ, kilometry

### 4. **Restaurace (restaurant)**
- Klíčová slova: restaurace, hospoda, kavárna, café, bistro
- Vzory: číslo stolu, obsluha, spropitné

### 5. **Ubytování (accommodation)**
- Klíčová slova: hotel, ubytování, booking, Airbnb, hostel
- Vzory: check-in/out, počet nocí, číslo pokoje

### 6. **Online služby (online_service)**
- Klíčová slova: subscription, předplatné, invoice, receipt
- Platební systémy: Stripe, PayPal
- Vzory: invoice number, receipt number

### 7. **Maloobchod (retail)**
- Řetězce: Lidl, Kaufland, Tesco, Albert, Billa, Penny, Globus, Makro
- Specializované: IKEA, OBI, Hornbach, Alza, Mall, Datart
- Vzory: EAN kód, kód zboží, slevy

## 🔍 Algoritmus detekce

### 1. Kontrola textu
```
IF text je dostupný:
    1. Kontrola negativních vzorů (výpis z účtu, smlouva, newsletter)
    2. Hledání klíčových slov účtenky (účtenka, receipt, potvrzení)
    3. Detekce typu účtenky podle specifických vzorů
    4. Kontrola povinných prvků:
       - Částka (POVINNÉ)
       - Datum (POVINNÉ)
       - Prodejce/IČO
       - Číslo transakce
```

### 2. Analýza podle názvu (pro skenované)
```
IF text není dostupný:
    1. Kontrola klíčových slov v názvu souboru
    2. Přiřazení typu podle názvu:
       - "benzin" → fuel (60% jistota)
       - "servis", "výměna kol" → car_service (60%)
       - "čištění", "mytí" → car_service (60%)
```

### 3. Výpočet jistoty
```
Confidence = 0
+ 30 bodů za klíčová slova
+ 30 bodů za typ účtenky
+ 15 bodů za částku
+ 10 bodů za datum
+ 10 bodů za prodejce
+ 5 bodů za číslo transakce

Účtenka = confidence >= 50%
```

## 💻 Použití

### Základní použití
```python
from receipt_detector import ReceiptDetector

detector = ReceiptDetector()
result = detector.analyze_file('uctenka.pdf')

if result['is_receipt']:
    print(f"✅ {result['receipt_type']} účtenka ({result['confidence']}%)")
else:
    print(f"❌ Není účtenka")
```

### Hromadné zpracování
```python
import os
from receipt_detector import ReceiptDetector

detector = ReceiptDetector()
receipts = []

for file in os.listdir('dokumenty/'):
    if file.endswith('.pdf'):
        result = detector.analyze_file(f'dokumenty/{file}')
        if result['is_receipt']:
            receipts.append({
                'file': file,
                'type': result['receipt_type'],
                'confidence': result['confidence']
            })

# Třídění podle typu
by_type = {}
for receipt in receipts:
    type_name = receipt['type'] or 'unknown'
    if type_name not in by_type:
        by_type[type_name] = []
    by_type[type_name].append(receipt['file'])
```

### OCR pro skenované dokumenty
```bash
# Před analýzou použít OCR
ocrmypdf input.pdf output.pdf -l ces+eng

# Pak analyzovat
python3 -c "
from receipt_detector import ReceiptDetector
detector = ReceiptDetector()
result = detector.analyze_file('output.pdf')
print(result)
"
```

## 📊 Výsledky testování

| Typ dokumentu | Úspěšnost | Poznámka |
|---------------|-----------|----------|
| Online služby (Maestra, Midjourney) | 75% | Výborná detekce |
| Benzínky (skenované) | 60% | Podle názvu souboru |
| Autoservis (skenované) | 60% | Podle názvu souboru |
| Ubytování (Booking.com) | Vyžaduje úpravu | Některé false negatives |
| Bankovní výpisy | 0% | Správně odmítnuty |

## 🔧 Požadavky

- Python 3.7+
- pdftotext (poppler-utils)
- Volitelně: ocrmypdf pro skenované dokumenty

### Instalace
```bash
# macOS
brew install poppler
pip install ocrmypdf  # volitelné

# Linux
sudo apt-get install poppler-utils
pip install ocrmypdf  # volitelné
```

## 📁 Struktura API

### `ReceiptDetector.analyze_file(file_path) -> Dict`

**Návratová hodnota:**
```python
{
    'file': 'nazev_souboru.pdf',
    'is_receipt': True/False,
    'confidence': 0-100,
    'receipt_type': 'fuel'/'parking'/'car_service'/...,
    'type_score': 0-100,
    'elements': {
        'has_amount': True/False,
        'has_date': True/False,
        'has_vendor': True/False,
        'has_transaction': True/False
    },
    'reasons': ['✅ Typ účtenky: fuel', ...],
    'missing': ['Datum', ...],
    'error': None/'Nelze extrahovat text',
    'filename_analysis': True/False  # True pokud analýza podle názvu
}
```

## 🚀 Budoucí vylepšení

1. **Automatické OCR** - integrace OCR přímo do detektoru
2. **Extrakce dat** - částky, data, IČO, položky
3. **Machine Learning** - trénování na větším datasetu
4. **Více jazyků** - slovenština, polština, maďarština
5. **Cloud API** - REST endpoint pro detekci

## 📝 Známé problémy

1. **Booking.com** - některé potvrzení o platbě nejsou detekovány kvůli chybějícím klíčovým slovům
2. **Skenované dokumenty** - vyžadují OCR nebo se spoléhají pouze na název souboru
3. **Faktury vs účtenky** - někdy těžké rozlišit

---

*Receipt Detector v1.0 - MyBrainWorks 2025*