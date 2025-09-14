# 🚀 AnyParser → Paperless Setup Guide

## 1. Instalace

```bash
# Instalace závislostí
pip install requests tkinter

# Spuštění aplikace
python anyparser_paperless_complete.py
```

## 2. Konfigurace API klíčů

Aplikace používá tyto API klíče (již nakonfigurované):

### AnyParser:
- **API Key:** `ap-29644980581060103a820f936e3356a8da481ac7afffd85d` (demo účet)
- **Limit:** ~100 stránek zdarma
- **Status:** Funkční pro menší dokumenty

### Paperless:
- **URL:** `http://localhost:8050`
- **Token:** `0f57f058dbe5d56e9ddd63b74251fd7655ed0932`

## 3. Jak používat aplikace

### Krok 1: Test připojení
1. Spusťte aplikaci
2. Klikněte "🔍 Test Připojení"
3. Počkejte na zelené "🟢 Připojeno"

### Krok 2: Výběr dokumentů
- **📂 Vybrat soubory** - jednotlivé PDF/obrázky
- **🗂️ Vybrat složku** - celá složka s dokumenty

### Krok 3: Kontrola typu dokumentu
- Aplikace automaticky rozpozná typ podle názvu
- Double-click na dokument → zobrazí metadata
- Můžete změnit typ ručně přes dropdown

### Krok 4: Zpracování
- **🔍 Analyzovat** - pouze extrakce, bez uploadu
- **📤 Nahrát** - upload již analyzovaných
- **⚡ Vše najednou** - kompletní proces

## 4. Podporované typy dokumentů

### 📄 Faktura
**Rozpozná:** faktura, invoice, daňový doklad
**Extrahuje:** číslo faktury, IČO, DIČ, částka, datum splatnosti, VS
**Tagy:** `faktura`, `účetnictví`, `daňový-doklad`

### 🏦 Bankovní výpis  
**Rozpozná:** výpis, statement, účet
**Extrahuje:** číslo účtu, období, zůstatky
**Tagy:** `banka`, `výpis`, `finance`

### 📋 Smlouva
**Rozpozná:** smlouva, contract, dohoda
**Extrahuje:** číslo smlouvy, smluvní strany, datum
**Tagy:** `smlouva`, `právní`, `dohoda`

### 🧾 Potvrzení/Účtenka
**Rozpozná:** účtenka, receipt, pokladní doklad
**Extrahuje:** obchodník, datum, částka, způsob platby
**Tagy:** `účtenka`, `potvrzení`, `výdaj`

### 🏛️ Úřední dokument
**Rozpozná:** úřad, policie, ministerstvo
**Extrahuje:** úřad, spisová značka, datum, předmět
**Tagy:** `úřad`, `oficiální`, `státní`

## 5. Výsledek v Paperless

Každý dokument bude mít:
- ✅ **Automatický název** podle typu a obsahu
- ✅ **Tagy** podle typu dokumentu  
- ✅ **Poznámky** s extrahovanými metadaty
- ✅ **Datum** (pokud nalezen)
- ✅ **Korespondent** (pokud rozpoznán)

## 6. Free Account limity

⚠️ **AnyParser omezení:**
- 100 stránek celkem na účet
- Každý dokument = 1+ stránka
- Demo účet může mít nižší limit

💡 **Optimalizace:**
- Zpracovávejte po menších dávkách (10-20 dokumentů)
- Prioritizujte nejdůležitější dokumenty
- Pro větší objemy zvažte placený účet

## 7. Troubleshooting

### "Connection Error"
- Zkontrolujte že Paperless běží na localhost:8050
- Ověřte API token v Paperless Settings

### "AnyParser Error" 
- Free limit možná dosažen
- Zkuste s novým účtem nebo plaťte

### "No metadata extracted"
- Některé dokumenty mohou být špatně skenované
- Zkuste s lepší kvalitou PDF

### GUI se nespustí
```bash
# macOS
brew install python-tk

# Ubuntu  
sudo apt-get install python3-tk
```

## 8. Rozšíření

### Přidání nového typu:
1. Upravte `DOCUMENT_TYPES` v kódu
2. Přidejte keywords a extraction patterns
3. Definujte tagy pro Paperless

### Vlastní extrakce:
- Upravte `extract_metadata()` metodu
- Přidejte regex pro vaše specifické údaje

Aplikace je hotová k použití! 🎯