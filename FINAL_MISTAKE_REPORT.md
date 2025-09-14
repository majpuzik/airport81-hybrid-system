# 🔴 REPORT: JAK JSEM ŠPATNĚ DETEKOVAL BANKOVNÍ VÝPISY

## 📊 Shrnutí mé chyby

**Detekoval jsem dokumenty POUZE podle názvu souboru, NE podle obsahu!**

## ❌ Můj špatný přístup

```python
# Toto jsem dělal - ŠPATNĚ!
if 'statement' in filename_lower or 'vypis' in filename_lower:
    result['type'] = 'Bankovní výpis'
```

**Problém:** Detekce pouze podle názvu souboru, bez analýzy obsahu

## ✅ Správný přístup

```python
# Správná detekce podle obsahu
def is_bank_statement(pdf_path):
    # Kontrola zůstatků
    if 'počáteční zůstatek' in text or 'konečný zůstatek' in text:
        score += 3
    
    # Počet transakcí
    if transaction_count > 5:
        score += 3
    
    # Vyloučit potvrzení
    if 'payment receipt' in text or 'thank you for your payment' in text:
        return False
```

## 📈 Statistiky chyb

### V Paperless NGX
- **Celkem dokumentů označených jako "Bankovní výpis":** 52
- **Z toho ŠPATNĚ:** 49 (94% chybovost!)
- **Správně:** 3

### Typy chyb
1. **Payment Receipts označené jako bankovní výpisy:** 49
   - Midjourney receipts: 10
   - Stability AI receipts: 7
   - Eleven Labs receipts: 8
   - KREA.AI receipts: 6
   - GitHub receipts: 2
   - Home Assistant Cloud receipts: 3
   - Anthropic receipts: 2
   - ZEMITH.COM receipts: 5
   - Další receipts: 6

2. **Skutečné bankovní výpisy:** 3
   - ČSOB elektronické výpisy
   - Account statement

## 🎯 Klíčové rozdíly

### Bankovní výpis MUSÍ obsahovat:
- ✅ Počáteční a konečný zůstatek
- ✅ Více než 5 transakcí
- ✅ Číslo účtu / IBAN
- ✅ Přehled pohybů na účtu

### Payment Receipt obsahuje:
- ❌ Pouze jednu transakci
- ❌ "Thank you for your payment"
- ❌ "Your receipt from..."
- ❌ Order/Invoice number

## 💡 Poučení

**NIKDY nedetekovat dokumenty pouze podle názvu souboru!**

Správná detekce vyžaduje:
1. Extrakci textu z PDF
2. Analýzu obsahu
3. Kontrolu specifických markerů
4. Vyloučení falešných pozitiv

## 🔧 Náprava

Vytvořil jsem:
1. `proper_bank_statement_detector.py` - správná detekce
2. `fix_paperless_tags.py` - oprava chybných tagů
3. Tento report jako varování do budoucna

## 📝 Seznam chybně označených dokumentů

Všech 49 dokumentů s "Your receipt from..." jsou špatně označeny jako bankovní výpisy a měly by být přetagovány na "Potvrzení o platbě".

---

**Datum:** 2025-08-27
**Chybovost:** 94%
**Závěr:** Toto byla trapná chyba, která ukazuje důležitost analýzy obsahu dokumentu místo spoléhání na názvy souborů.