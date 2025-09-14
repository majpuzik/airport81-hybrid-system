# 💳 JAK KOUPIT API KLÍČE PRO PARSERY

## 🔵 ANYPARSER

### 📍 Kde koupit
**Studio:** https://studio.anyparser.com

### 💰 Cenový model - Pay Per Use
| Model | Cena za 1M znaků | Příklad použití |
|-------|------------------|-----------------|
| **Text** | $0.15 | PDF dokumenty |
| **OCR** | $2.00 | Skeny, účtenky |
| **VLM** | $3.50 | Složité dokumenty |
| **Crawler** | $0.50 | Web scraping |

### 🛒 Jak koupit kredity
1. Jděte na https://studio.anyparser.com
2. Klikněte **"Get Started"** nebo **"Start Free"**
3. Zaregistrujte se (email + heslo)
4. V dashboardu najděte **"Add Credits"** nebo **"Billing"**
5. Minimální nákup: **$5** (doporučuji začít s $10-20)
6. Platba kartou (Visa/Mastercard)

### 📊 Co dostanete za $10
- **Text extraction:** ~66 milionů znaků
- **OCR:** ~5 milionů znaků
- Pro MBW složku (~200 dokumentů):
  - Průměr 5000 znaků/dokument = 1M znaků
  - **Cena: $0.15 pro Text, $2 pro OCR**

### ✅ Výhody placeného API
- **Plná extrakce textu** (ne jen 1 znak)
- **Rychlost:** 9x rychlejší než PDF.co
- **Bez limitu stran**
- **Priority support**

---

## 🟠 PDF.co

### 📍 Kde koupit
**Dashboard:** https://app.pdf.co/account

### 💰 Aktuální stav
- **Zbývá:** 23,738 kreditů
- **Kapacita:** ~300 dokumentů
- **Průměr:** 80 kreditů/dokument

### 🛒 Jak dokoupit kredity
1. Přihlaste se na https://app.pdf.co
2. Email: **puzik@outlook.com**
3. Jděte do **Account → Buy Credits**
4. Vyberte balíček:

| Balíček | Kredity | Cena | Cena/kredit |
|---------|---------|------|-------------|
| Starter | 10,000 | $9.99 | $0.001 |
| Basic | 30,000 | $19.99 | $0.0007 |
| Pro | 100,000 | $49.99 | $0.0005 |
| Business | 300,000 | $99.99 | $0.0003 |

### 📊 Doporučení pro MBW
- MBW složka: ~200 dokumentů
- Potřeba: 200 × 80 = **16,000 kreditů**
- **Máte dost!** (23,738 kreditů)
- Dokupovat až když <5,000

---

## 🎯 KTERÉ KOUPIT?

### Momentální situace:
- ✅ **PDF.co máte dost kreditů** (23,738)
- ❌ **AnyParser jen demo** (10 stran)

### Doporučení:

#### 1️⃣ OKAMŽITĚ - Nic nekupovat!
- Použijte PDF.co (máte kredity)
- Zpracujte MBW dokumenty
- Otestujte na reálných datech

#### 2️⃣ PO VYČERPÁNÍ PDF.co kreditů:
**Pokud < 5,000 kreditů zbývá:**

**Option A: Dokoupit PDF.co**
- $19.99 za 30,000 kreditů
- Jednoduchý, ověřený
- Stejný workflow

**Option B: Zkusit AnyParser**
- $10-20 na test
- 9x rychlejší
- Modernější

### 💡 Můj tip:
1. **Nejdřív vyčerpejte PDF.co kredity** (23,738)
2. **Pak zkuste AnyParser za $10**
3. **Porovnejte na reálných datech**
4. **Rozhodněte se podle výsledků**

---

## 📱 RYCHLÝ NÁKUP

### AnyParser - Krok za krokem:
```bash
# 1. Registrace
open https://studio.anyparser.com

# 2. Po přihlášení získáte API klíč
# Vypadá takto: ap-xxxxxxxxxxxxxxxxxxxxx

# 3. Nahraďte v kódu:
ANYPARSER_KEY = "váš-nový-api-klíč"

# 4. Test
python3 test_anyparser_simple.py
```

### PDF.co - Již máte!
```python
# Váš API klíč (funguje):
API_KEY = "puzik@outlook.com_jBTKYojSItt25GcgtQakogOdYCwf63GXQDKUW46uhRQmJStwMG4ozND282mVn6Bf"

# Zbývající kredity: 23,738
# Stačí na: ~300 dokumentů
```

---

## ⚠️ DŮLEŽITÉ

### Před nákupem AnyParser:
1. **Otestujte kolik znaků** mají vaše dokumenty
2. **Spočítejte náklady** (Text vs OCR model)
3. **Začněte s $10** pro test

### Kalkulačka:
```python
# Průměrný dokument
znaku_na_dokument = 5000
pocet_dokumentu = 200

# Text model ($0.15/1M znaků)
cena_text = (znaku_na_dokument * pocet_dokumentu / 1_000_000) * 0.15
print(f"Text extraction: ${cena_text:.2f}")

# OCR model ($2.00/1M znaků)
cena_ocr = (znaku_na_dokument * pocet_dokumentu / 1_000_000) * 2.00
print(f"OCR extraction: ${cena_ocr:.2f}")
```

**Výsledek pro MBW (200 dokumentů):**
- Text model: **$0.15**
- OCR model: **$2.00**

---

*Aktualizováno: 30.1.2025*

**VERDIKT: Zatím nic nekupujte! Použijte PDF.co kredity které máte.**