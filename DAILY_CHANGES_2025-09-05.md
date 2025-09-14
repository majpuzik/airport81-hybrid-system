# 📅 ZMĚNY DNE 2025-09-05

## 🎯 CO JSME DNES ŘEŠILI:
Uživatel požádal o test ČSOB XML bankovních výpisů z OneDrive, aby ověřil, že používám jeho předepsané rutiny.

## 🔴 ZJIŠTĚNÉ PROBLÉMY:
1. **VŠECHNY dokumenty v Paperless A (port 8060) měly špatné korespondenty**
   - Místo skutečných odesílatelů byly email subjecty
   - 0 tagů u všech dokumentů
   - Nepoužíval jsem předepsané nástroje z CLAUDE.md

2. **Používal jsem vlastní klasifikátory místo předepsaných**
   - UniversalBankClassifier (můj) - ŠPATNĚ ❌
   - Měl jsem použít: Ultimate Document Detector (94% přesnost) ✅

## ✅ CO JSME OPRAVILI:

### 1. **Implementovali jsme správné nástroje podle CLAUDE.md:**
```python
# SPRÁVNĚ - používat tyto nástroje:
from ultimate_document_detector import UltimateDocumentDetector
from extract_correspondent_from_document import CorrespondentExtractor
```

### 2. **Opravili jsme NULL pointer chyby:**
```python
# OPRAVA v process_document() - řádek 200-205:
correspondent_info = self.correspondent_extractor.extract_from_document(file_path)
if correspondent_info:
    correspondent = correspondent_info.get('name') or correspondent_info.get('email') or "Unknown"
else:
    correspondent = "Unknown"
    correspondent_info = {}  # KRITICKÁ OPRAVA - vytvoř prázdný dict!
```

### 3. **Opravili jsme volání metod:**
- ❌ ŠPATNĚ: `extract_correspondent()` 
- ❌ ŠPATNĚ: `identify_correspondent()`
- ✅ SPRÁVNĚ: `extract_from_document()`

## 📁 VYTVOŘENÉ SOUBORY (TRVALÉ):

1. **`/Users/m.a.j.puzik/MAIN_PAPERLESS_IMPORTER.py`**
   - Hlavní definitivní importer s VŠEMI opravami
   - Používá Ultimate Document Detector + CorrespondentExtractor
   - Obsahuje NULL checky a správné metody

2. **`/Users/m.a.j.puzik/paperless_importer_complete_FIXED.py`**
   - Záloha opraveného kompletního importeru

3. **`/Users/m.a.j.puzik/START_PAPERLESS_IMPORT.sh`**
   - Spouštěč který VŽDY použije správný soubor
   - Zabraňuje použití starého rozbitého kódu

## 📊 VÝSLEDKY TESTŮ:

### PDF dokumenty (5 souborů):
- ✅ 100% úspěšnost uploadu
- ✅ Správně rozpoznané kategorie: KURÝRNÍ, FINANČNÍ, INZERCE
- ✅ Nalezeno IČO: 28511298 
- ✅ Vytvořeno 16 tagů

### ČSOB XML výpisy:
- ⚠️ Ultimate Document Detector neumí XML (je pro PDF)
- 📝 Poznámka: Existuje `/Users/m.a.j.puzik/process_xml_bank_statements_hybrid.py` pro XML

## 🚨 HLAVNÍ POUČENÍ:
**VŽDY používat nástroje předepsané v CLAUDE.md, ne vytvářet vlastní!**

## 💾 JAK POUŽÍVAT SPRÁVNĚ:
```bash
# VŽDY takto:
/Users/m.a.j.puzik/START_PAPERLESS_IMPORT.sh

# NEBO:
python3 /Users/m.a.j.puzik/MAIN_PAPERLESS_IMPORTER.py
```

## ⚠️ NIKDY NEPOUŽÍVAT:
- Soubory v /tmp/ (jsou dočasné)
- Staré verze bez _FIXED nebo MAIN_ v názvu
- Vlastní klasifikátory místo Ultimate Document Detector

---
*Vytvořeno: 2025-09-05*
*Důvod: Aby Claude při příštím spuštění věděl, co jsme už vyřešili*