# 📊 STAV ROZŠÍŘENÉ DETEKCE DOKUMENTŮ

## 📈 Aktuální výsledky

### Původní MBW složka
- **Úspěšnost: 100%** (125 dokumentů)
- Faktury: 52
- Účtenky: 50
- Bankovní výpisy: 23

### Celý OneDrive (test na vzorku)
- **Úspěšnost: 16%** (pouze na základě názvů a rychlé extrakce)
- Testováno: 50-200 souborů
- Hlavní problémy:
  - Generické názvy souborů (image_001.pdf, Sken 2.pdf)
  - Německé dokumenty
  - Knihy a magazíny
  - Newsletter a marketingové materiály

## ✅ Implementované kategorie

### 1. ÚŘEDNÍ DOKUMENTY ✅
```python
class OfficialDocumentDetector:
    - Soudy (rozsudky, usnesení)
    - Policie (protokoly, oznámení)
    - Exekutoři (exekuční příkazy)
    - Předvolání
    - Odsouzení
```
**Status:** Implementováno, detekováno 1-2 dokumenty ve vzorku

### 2. ZDRAVOTNÍ DOKUMENTY 🟡
```python
medical_patterns = {
    'předpis': ['předpis', 'recept', 'prescription'],
    'nález': ['nález', 'vyšetření', 'diagnóza'],
    'zpráva': ['lékařská zpráva', 'medical report'],
    'neschopenka': ['pracovní neschopnost', 'sick leave'],
    'rehabilitace': ['rehabilitace', 'fyzioterapie']
}
```
**Status:** Připraveno, čeká na test

### 3. PRÁVNÍ DOKUMENTY 🟡
```python
legal_patterns = {
    'právník': ['právník', 'advokát', 'lawyer'],
    'notář': ['notář', 'notářský', 'notary'],
    'plná moc': ['plná moc', 'power of attorney'],
    'právní': ['právní stanovisko', 'legal opinion']
}
```
**Status:** Připraveno, čeká na test

### 4. FIREMNÍ DOKUMENTY ✅
```python
corporate_patterns = {
    'smlouva': ['pracovní smlouva', 'employment contract'],
    'dohoda': ['DPP', 'DPČ'],
    'výpověď': ['výpověď', 'termination'],
    'mzda': ['mzdový list', 'výplatní páska']
}
```
**Status:** Implementováno, detekováno 3 dokumenty

### 5. OBČANSKÉ SMLOUVY 🟡
```python
civil_patterns = {
    'nájem': ['nájemní smlouva', 'rental', 'lease'],
    'kupní': ['kupní smlouva', 'purchase agreement'],
    'darovací': ['darovací smlouva', 'donation'],
    'půjčka': ['smlouva o půjčce', 'loan agreement']
}
```
**Status:** Připraveno, čeká na test

### 6. FINANČNÍ DOKUMENTY ✅
- Faktury, účtenky, bankovní výpisy
- **Status:** Funguje dobře, detekováno 3-6 dokumentů

### 7. PUBLIKACE 🟡
- Knihy (ISBN, kapitoly)
- Magazíny a časopisy
- Články
- **Status:** Připraveno, čeká na implementaci

## 🔍 Hlavní problémy a řešení

### Problém 1: Nízká úspěšnost (16% vs cíl 92%)

**Důvody:**
1. Generické názvy souborů
2. Nedostatečná extrakce textu
3. Chybí OCR pro naskenované dokumenty
4. Vícejazyčné dokumenty

**Navrhovaná řešení:**

#### A. Vylepšit extrakci textu
```python
# Místo jen první strany, extrahovat více textu
def enhanced_text_extraction(pdf_path):
    # Extrahovat první 3 strany
    # Použít layout mode pro lepší strukturu
    # Cachovat výsledky
```

#### B. Přidat ML modely
```python
# Použít již otestované modely z MBW
- LayoutLM pro strukturované dokumenty
- sklearn classifier pro rychlou klasifikaci
- EasyOCR pro problematické skeny
```

#### C. Implementovat víceúrovňový přístup
```python
def multi_level_detection(pdf_path):
    # Level 1: Název souboru (rychlé, 0.1s)
    if filename_match(): return result
    
    # Level 2: První strana textu (střední, 1s)
    if first_page_match(): return result
    
    # Level 3: OCR (pomalé, 5s)
    if ocr_match(): return result
    
    # Level 4: ML model (nejpomalejší, 10s)
    return ml_classification()
```

## 📋 Doporučené kroky

### Krátkodobé (pro dosažení 92%)

1. **Zlepšit extrakci textu**
   - Extrahovat více než jen první stranu
   - Použít lepší regex patterns
   - Přidat více klíčových slov

2. **Integrovat existující řešení z MBW**
   - EasyOCR pro skeny
   - LayoutLM pro strukturované dokumenty
   - Logiku názvů souborů

3. **Optimalizovat výkon**
   - Paralelní zpracování
   - Cachování výsledků
   - Skip velkých souborů (knihy)

### Dlouhodobé

1. **Trénovat vlastní ML model**
   - Sbírat označená data
   - Fine-tunovat BERT/LayoutLM
   - Vytvořit ensemble model

2. **Rozšířit jazykovou podporu**
   - Němčina, angličtina, slovenština
   - Vícejazyčné modely

3. **Vytvořit API službu**
   - REST API pro detekci
   - Batch processing
   - Web interface

## 🎯 Cílové metriky

| Kategorie | Současná úspěšnost | Cíl | Rozdíl |
|-----------|-------------------|-----|--------|
| MBW složka | 100% | 92% | ✅ +8% |
| OneDrive celkově | 16% | 92% | ❌ -76% |
| Úřední dokumenty | ~2% | 92% | ❌ -90% |
| Zdravotní dokumenty | 0% | 92% | ❌ -92% |
| Právní dokumenty | ~1% | 92% | ❌ -91% |
| Firemní dokumenty | ~6% | 92% | ❌ -86% |
| Občanské smlouvy | ~1% | 92% | ❌ -91% |

## 💡 Závěr

Systém funguje výborně na strukturovaných dokumentech s logickými názvy (MBW složka - 100%), ale má problémy s heterogenním obsahem OneDrive (16%). 

Pro dosažení cíle 92% je potřeba:
1. **Hlubší analýza textu** - ne jen první strana
2. **OCR pro skeny** - integrovat EasyOCR
3. **ML modely** - použít LayoutLM
4. **Více klíčových slov** - rozšířit slovníky
5. **Optimalizace výkonu** - paralelizace

Odhadovaný čas na dosažení 92%: **2-3 dny intenzivní práce**

---
*Vytvořeno: 24.8.2025*
*Status: V procesu implementace*