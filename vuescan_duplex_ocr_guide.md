# VueScan - Správné nastavení pro OBOUSTRANNÉ skenování s OCR

## ✅ NASTAVENÍ PRO OBOUSTRANNÉ SKENOVÁNÍ (HP OfficeJet Pro 8610):

### 1. **Input Tab (Vstup)**
- **Source:** Document Feeder
- **Mode:** Document  
- **Media:** Text
- **Duplex:** ✅ **YES** (pro oboustranné)
- **Page size:** A4 nebo Auto
- **Pages:** počet LISTŮ (ne stránek!) - např. 5 listů = 10 stránek

### 2. **Crop Tab (Ořez)**  
- **Crop size:** Auto nebo Maximum
- **Auto crop:** All pages
- NIKDY nepoužívejte Manual pro vícestránkové dokumenty!

### 3. **Output Tab (Výstup)**
- **PDF multi page:** ✅ ON
- **OCR:** ✅ ON (pokud máte Pro verzi)
- **OCR Language:** Czech
- **Make searchable PDF:** ✅ ON
- Nebo nechte OCR vypnuté a použijte ocrmypdf po skenování

### 4. **Scan Tab**
- Klikněte **Scan All** (ne jen Scan)

## 📋 SPRÁVNÝ POSTUP:

1. **Vložte dokumenty do ADF lícem NAHORU**
2. **Nastavte Duplex = YES**
3. **Klikněte Preview** (náhled první strany)
4. **Klikněte Scan All**
5. VueScan automaticky:
   - Naskenuje první stranu každého listu
   - Otočí listy
   - Naskenuje druhou stranu každého listu
   - Seřadí správně: 1,2,3,4,5,6,7,8,9,10

## 🔄 WORKFLOW S OCR:

### Pokud VueScan nemá OCR nebo nefunguje:
1. **Skenujte s VueScan** (Duplex = YES, bez OCR)
2. **Po skenování spusťte:**
```bash
/opt/homebrew/Cellar/ocrmypdf/16.10.1/bin/ocrmypdf \
  -l ces+eng \
  --rotate-pages \
  --deskew \
  --optimize 3 \
  ~/Desktop/scan.pdf \
  ~/Desktop/scan_ocr.pdf
```

## ⚠️ DŮLEŽITÉ PRO HP 8610:
- Dokumenty vkládejte **lícem NAHORU**
- První strana musí být **nahoře**
- ADF automaticky otáčí listy pro druhou stranu

## 🚨 ČASTÉ CHYBY:
❌ **Duplex = NO** - naskenuje jen jednu stranu
❌ **Pages = 10** při 5 listech - VueScan čeká na 10 listů
❌ **Manual crop** - pokazí ořez na různých stranách

## 💡 TIPY:
- Pro jednostranné: **Duplex = NO**
- Pro kombinaci (některé listy oboustranné): skenujte zvlášť a pak spojte PDF
- Test: zkuste nejdřív 1 list oboustranně pro ověření nastavení