# Skenování s OCR na macOS - Kompletní průvodce

## 🎯 NEJLEPŠÍ ŘEŠENÍ: VueScan Pro s OCR

### VueScan nastavení pro OCR:
1. **Output Tab:**
   - **OCR Text** = ON ✅
   - **OCR Language** = Czech (nebo English)
   - **PDF multi page** = ON
   - **Make searchable PDF** = ON ✅ (vytvoří prohledávatelné PDF)

2. **Crop Tab:**
   - **Crop size** = Auto
   - **Auto crop** = All pages

3. **Scan Tab:**
   - Klikněte **Scan**
   - VueScan automaticky provede OCR

## 🆓 BEZPLATNÉ ALTERNATIVY:

### 1. **macOS Monterey+ vestavěné OCR** (ZDARMA)
```bash
# Naskenujte pomocí Image Capture, pak:
# 1. Otevřete PDF v Preview
# 2. Vyberte text kurzorem - macOS automaticky rozpozná text
# 3. File → Export as PDF (zachová OCR vrstvu)
```

### 2. **Tesseract OCR** (ZDARMA, open-source)
```bash
# Instalace
brew install tesseract
brew install tesseract-lang  # pro češtinu

# Použití
tesseract input.pdf output -l ces+eng pdf
```

### 3. **ocrmypdf** (NEJLEPŠÍ bezplatná možnost)
```bash
# Instalace
brew install ocrmypdf

# Použití - přidá OCR vrstvu do PDF
ocrmypdf -l ces+eng input.pdf output.pdf

# S optimalizací a rotací
ocrmypdf -l ces+eng --rotate-pages --optimize 3 input.pdf output.pdf
```

## 📱 DOPORUČENÝ WORKFLOW:

### Rychlé řešení pomocí ocrmypdf:
```bash
# 1. Naskenujte s Image Capture nebo VueScan (bez OCR)
# 2. Spusťte OCR:
ocrmypdf -l ces+eng ~/Desktop/scan.pdf ~/Desktop/scan_ocr.pdf
```

### Automatický skript pro OCR: