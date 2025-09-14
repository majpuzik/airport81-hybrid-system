# 📊 REÁLNÁ TESTOVACÍ DATA - VZORKY PRO VALIDACI

**Datum extrakce:** 2025-09-06  
**Počet dokumentů:** 5 PDF souborů  
**Úspěšnost extrakce:** 100% (5/5)

---

## ✅ ÚSPĚŠNĚ EXTRAHOVANÉ DOKUMENTY

### 1️⃣ **Sante_Faktura_110240606_ID_304391.pdf**
- **Typ:** Faktura (invoice) ✅
- **IČO:** 61854093 (TeamPrevent-Santé, s.r.o.)
- **Jazyk:** Čeština
- **Klíčové údaje:**
  - Dodavatel: TeamPrevent-Santé, s.r.o.
  - Odběratel: MyBrainWorks s.r.o.
  - Částka: 15,900 Kč
  - VS: 110240606
  - Datum splatnosti: 15.03.2024

**Text sample:**
```
Pen. ústav : Bank. spojení : UniCredit Bank Czech Republic, a.s.
TeamPrevent-Santé, s.r.o.
IČ: 61854093
Odběratel: MyBrainWorks s.r.o.
Ocelkova 643/20, 198 00 Praha
DAŇOVÝ DOKLAD FAKTURA 110240606
Zdravotní služby v rozsahu bronzové karty 15 900,00 Kč
```

### 2️⃣ **NB Ucetnictvi_V_241029.pdf**
- **Typ:** Faktura (invoice) ✅
- **IČO:** 25757377 (NB účetnictví s.r.o.)
- **DIČ:** CZ25757377
- **Jazyk:** Čeština
- **Klíčové údaje:**
  - Dodavatel: NB účetnictví s.r.o.
  - Částka: 18,150 Kč (včetně DPH)
  - VS: 241029
  - Účet: 154642241/0300

**Text sample:**
```
FAKTURA - DAŇOVÝ DOKLAD č. 241029
NB účetnictví s.r.o.
IČ: 25757377, DIČ: CZ25757377
Odběratel: MyBrainWorks s.r.o.
zpracování účetnictví a daň.přiznání za rok 2023
```

### 3️⃣ **RFIshop_202437341.pdf**
- **Typ:** Faktura (invoice) ✅
- **IČO:** 08139105 (Zonepi s.r.o.)
- **DIČ:** CZ08139105
- **Jazyk:** Čeština
- **Klíčové údaje:**
  - E-shop faktura
  - Raspberry Pi komponenty
  - VS: 577082
  - Platba: Online kreditní kartou

**Text sample:**
```
Faktura - daňový doklad 202437341
DODAVATEL: Zonepi s.r.o., IČO: 08139105
ODBĚRATEL: MyBrainWorks s.r.o., IČO: 03981428
Pi - Transparentní akrylová krabička s chladiči
```

### 4️⃣ **Alza_2952181547.pdf**
- **Typ:** Faktura (invoice) ✅
- **IČO:** 27082440 (Alza.cz a.s.)
- **DIČ:** CZ27082440
- **Jazyk:** Čeština
- **Klíčové údaje:**
  - E-commerce faktura
  - Elektronika
  - FastReport PDF export

### 5️⃣ **Potten und Pannen_1124115359.pdf**
- **Typ:** Faktura (invoice) ✅
- **IČO:** 25730452
- **Jazyk:** Čeština/Němčina (mixed)
- **Klíčové údaje:**
  - Německý název firmy
  - České IČO

---

## 🔍 ANALÝZA EXTRAKCE

### Úspěšnost detekce:
| Parametr | Úspěšnost | Poznámka |
|----------|-----------|----------|
| Typ dokumentu | 5/5 (100%) | Všechny správně jako "invoice" |
| IČO extrakce | 5/5 (100%) | Všechna IČO nalezena |
| DIČ extrakce | 2/5 (40%) | Pouze u některých faktur |
| Jazyk | 5/5 (100%) | Správně detekován CZ/DE |
| Částka | 3/5 (60%) | Ne všude jednoznačná |

### Extrakční metody:
- **PyPDF2:** 5/5 úspěšných
- **pdfplumber:** 0/5 (nebyl potřeba fallback)

---

## 🧪 TESTOVACÍ DATA PRO VALIDACI

### Pro Document Classifier:
```python
test_cases = [
    {
        'filename': 'Sante_Faktura_110240606_ID_304391.pdf',
        'expected': 'invoice',
        'confidence': 0.95,
        'has_ico': True,
        'vendor': 'TeamPrevent-Santé'
    },
    {
        'filename': 'NB_Ucetnictvi_V_241029.pdf',
        'expected': 'invoice',
        'confidence': 0.98,
        'has_ico': True,
        'has_dic': True,
        'vendor': 'NB účetnictví'
    },
    {
        'filename': 'RFIshop_202437341.pdf',
        'expected': 'invoice',
        'confidence': 0.92,
        'is_eshop': True,
        'vendor': 'Zonepi/RFIshop'
    }
]
```

### Pro Correspondent Extractor:
```python
correspondent_validation = {
    '61854093': 'TeamPrevent-Santé, s.r.o.',
    '25757377': 'NB účetnictví s.r.o.',
    '08139105': 'Zonepi s.r.o.',
    '27082440': 'Alza.cz a.s.',
    '25730452': 'Potten und Pannen',
    '03981428': 'MyBrainWorks s.r.o.'  # Odběratel
}
```

---

## 📈 METRIKY PRO BENCHMARK

### Performance:
- **Průměrná doba extrakce:** < 100ms per PDF
- **Průměrná velikost textu:** 1,695 znaků
- **Úspěšnost první metody:** 100%

### Kvalita dat:
- **Strukturované faktury:** 100%
- **Obsahují IČO:** 100%
- **Obsahují DIČ:** 40%
- **Parsovatelné částky:** 60%

---

## 🎯 EDGE CASES K TESTOVÁNÍ

1. **Mixed language** - Potten und Pannen (DE/CZ)
2. **E-commerce faktury** - Alza, RFIshop
3. **Služby faktury** - TeamPrevent, NB účetnictví
4. **Multi-page** - Alza (2 stránky)
5. **Special characters** - české znaky v názvech

---

## 💡 DOPORUČENÍ PRO TESTOVÁNÍ

1. **Document Classifier:**
   - Všechny soubory by měly být klasifikovány jako "invoice" s confidence > 0.9
   - Test language detection (CZ vs DE)

2. **Correspondent Extractor:**
   - Validace proti známým IČO
   - Test extrakce z různých formátů (s.r.o., a.s., GmbH)

3. **Performance:**
   - Batch processing 5 souborů < 1 sekunda
   - Memory usage < 50MB

4. **Edge cases:**
   - Test s poškozenými PDF
   - Test s scan-only PDF (bez textu)
   - Test s velmi velkými PDF (100+ stran)

---

*Data připravena pro comprehensive reliability test refaktorovaných modulů*