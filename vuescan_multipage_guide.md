# VueScan - Správné nastavení pro vícestránkové skenování

## 🔴 PROBLÉM:
VueScan uložil pouze prostřední část jedné stránky místo všech 5 stránek

## ✅ SPRÁVNÉ NASTAVENÍ PRO VÍCESTRÁNKOVÉ SKENOVÁNÍ:

### 1. **Output Tab (Výstup)**
- **PDF multi page** = ON ✅ (pro PDF s více stránkami)
- **JPEG file** = OFF (pokud chcete PDF)
- **Number of pages** = 5 (nebo kolik potřebujete)
- **File name** = např. "dokument|" (| znamená automatické číslování)

### 2. **Input Tab (Vstup)**
- **Mode** = Document Feeder (pro ADF)
- **Pages** = 5 (počet stránek k naskenování)
- **Auto scan** = OFF (pro ruční kontrolu každé stránky)

### 3. **Crop Tab (Ořez)**
- **Crop size** = Auto nebo Maximum ⚠️
- NIKDY ne Manual pro vícestránkové dokumenty!
- **Auto crop** = All pages (ne Single page)

### 4. **Scan Tab**
- **Multi page** = ON
- **Page** = zobrazuje aktuální stránku (1 of 5, 2 of 5...)

## 📋 SPRÁVNÝ POSTUP:

1. **Vložte všechny dokumenty do ADF**
2. **Nastavte parametry výše**
3. **Klikněte Preview** pro náhled první stránky
4. **Klikněte Scan** - naskenuje všechny stránky
5. **VueScan automaticky vytvoří vícestránkový PDF**

## 🚨 ČASTÉ CHYBY:

❌ **Manual crop** - aplikuje stejný ořez na všechny stránky
❌ **Single page crop** - ořízne jen jednu stránku
❌ **Scan to separate files** - vytvoří oddělené soubory místo jednoho PDF
❌ **Zapomenuté nastavení "Number of pages"**

## 💡 TIP PRO OPRAVU:

Pokud už máte špatně naskenováno:
1. Resetujte VueScan: Cmd+R
2. Načtěte výchozí nastavení: File → Default options
3. Nastavte znovu podle návodu výše
4. Skenujte znovu

## 🔧 ALTERNATIVA - Image Capture (macOS):

Pokud VueScan dělá problémy:
1. Otevřete **Image Capture** (Snímání obrazu)
2. Vyberte scanner
3. Zaškrtněte **Use Document Feeder**
4. Nastavte **Scan Mode: Document Feeder**
5. **Format: PDF**
6. **Scan To: Desktop**
7. Klikněte **Scan**

Image Capture automaticky vytvoří vícestránkový PDF bez problémů s ořezem.