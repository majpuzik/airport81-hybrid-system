# 🔍 ANALÝZA NEROZPOZNANÝCH DOKUMENTŮ
**Datum:** 2025-09-02  
**Systém:** Paperless NGX - Port 8060  
**Detektor:** V7 FIXED

---

## 📊 SOUHRN
- **Celkem dokumentů:** 65
- **Úspěšně rozpoznáno:** 58 (89%)
- **Nerozpoznáno:** 7 (11%)

---

## ❌ NEROZPOZNANÉ DOKUMENTY

### 1️⃣ SCANY BEZ TEXTU (3 dokumenty)
Dokumenty, které jsou naskenované jako obrázky bez OCR.

| Dokument | Typ | Problém | Řešení |
|----------|-----|---------|--------|
| `scan_044 (5 files merged).pdf` | Sloučený scan | Žádný text k extrakci | OCR pomocí Tesseract |
| `KancTechnika_scan_037.pdf` | Kancelářská technika | Scan bez textu | OCR + přidat dodavatele do IČO DB |
| `Benzin_scan_035 (19 files merged).pdf` | 19 účtenek | Sloučené účtenky bez textu | OCR + rozdělit na jednotlivé |

### 2️⃣ UUID DOKUMENTY (2 dokumenty)
Dokumenty s UUID názvy - pravděpodobně email přílohy.

| Dokument | Obsah | Problém | Řešení |
|----------|-------|---------|--------|
| `WG34e3aca2-dacd-47a3-86ce-8b7619833b8a.pdf` | Neznámý | UUID název, text ale extrahován | AI analýza obsahu |
| `468d67ec-0b41-4067-a316-9c68fad3255c.pdf` | Neznámý | UUID název | AI analýza obsahu |

### 3️⃣ CHYBĚJÍCÍ FIRMY (2 dokumenty)
Firmy, které nejsou v IČO databázi.

| Dokument | Firma | Problém | Řešení |
|----------|-------|---------|--------|
| `Cerveny_Vymena Kol_2024 (3 files merged).pdf` | Autoservis Červený | Není v IČO databázi | Přidat IČO do databáze |
| `Benzin_scan_035` | Benzina | Není v IČO databázi | Přidat Benzina a.s. |

### 4️⃣ SPECIÁLNÍ DOKUMENTY (1 dokument)
Úřední/policejní dokumenty vyžadující speciální zpracování.

| Dokument | Typ | Problém | Řešení |
|----------|-----|---------|--------|
| `priloha_1554077270_0_Vyrozumění...` | Policejní/soudní | Speciální formát | Police document detector |

---

## 🔧 TECHNICKÉ DŮVODY SELHÁNÍ

### Hlavní příčiny:
1. **Chybějící text (43%)** - Scany bez OCR
2. **UUID názvy (29%)** - Email attachments s generovanými názvy
3. **Chybějící v databázi (29%)** - Firmy nejsou v IČO databázi

### Detailní analýza:
```python
# Typy problémů
problems = {
    'no_text': 3,      # 43% - Žádný extrahovatelný text
    'uuid_name': 2,    # 29% - UUID názvy souborů
    'missing_db': 2,   # 29% - Chybí v IČO databázi
}
```

---

## 💡 DOPORUČENÁ ŘEŠENÍ

### 1. OKAMŽITÉ ŘEŠENÍ - Rozšíření IČO databáze
```python
# Přidat do ICO_DATABASE:
'61859699': 'Benzina a.s.',           # Benzínky
'12345678': 'Autoservis Červený',     # Autoservis
'87654321': 'Kancelářská technika XY' # Dodavatel
```

### 2. OCR IMPLEMENTACE
```python
# Přidat OCR fallback do V7:
def extract_text_with_ocr(file_path):
    # Nejdřív zkus pdftotext
    text = extract_text_from_pdf(file_path)
    
    # Pokud málo textu, použij OCR
    if len(text) < 100:
        text = run_tesseract_ocr(file_path)
    
    return text
```

### 3. AI ANALÝZA PRO UUID
```python
# Pro UUID dokumenty použít AI:
if is_uuid_filename(filename):
    # Extrahuj text
    text = extract_text_from_pdf(file_path)
    
    # Pošli do AI pro analýzu
    classification = ai_classify_content(text)
    
    # Použij AI výsledek
    correspondent = classification.get('company')
```

### 4. SPECIÁLNÍ DETEKTORY
- Vytvořit `police_document_detector_v2.py`
- Vytvořit `receipt_merger_splitter.py` pro sloučené účtenky
- Vytvořit `autoservice_detector.py` pro autoservisy

---

## 📈 POTENCIÁL ZLEPŠENÍ

Po implementaci doporučení:
- **Současná úspěšnost:** 89% (58/65)
- **Očekávaná úspěšnost:** 95%+ (62/65)
- **Zbývající problematické:** ~3 dokumenty (speciální případy)

---

## 🎯 AKČNÍ PLÁN

### Priorita 1 - Rychlé vylepšení (+ 3 dokumenty)
- [ ] Rozšířit IČO databázi o 3 firmy
- [ ] Spustit manuální přiřazení pro UUID dokumenty

### Priorita 2 - OCR implementace (+ 3 dokumenty)  
- [ ] Přidat Tesseract OCR do V7
- [ ] Zpracovat scany bez textu

### Priorita 3 - Dlouhodobé řešení
- [ ] AI klasifikace pro neznámé dokumenty
- [ ] Automatické učení z úspěšných klasifikací
- [ ] Web interface pro manuální korekce

---

## 📊 STATISTIKA ÚSPĚŠNOSTI PO FIRMÁCH

| Firma | Rozpoznáno | Nerozpoznáno | Úspěšnost |
|-------|------------|--------------|-----------|
| ČSOB | 25 | 0 | 100% ✅ |
| Alza.cz | 19 | 0 | 100% ✅ |
| Media Bohemia World | 8 | 0 | 100% ✅ |
| Havas | 2 | 0 | 100% ✅ |
| **Benzina** | 0 | 1 | 0% ❌ |
| **Autoservis Červený** | 0 | 1 | 0% ❌ |
| **Kancelářská technika** | 0 | 1 | 0% ❌ |

---

*Vytvořeno: 2025-09-02 | Autor: Claude Code Assistant*