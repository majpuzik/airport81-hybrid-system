# 📋 DOKUMENTACE: Kompletní zpracování 500 dokumentů s OCR a klasifikací

## 🎯 CÍL
Zpracovat 500 PDF dokumentů z `/Users/m.a.j.puzik` s inteligentní klasifikací, sloučením emailů s přílohami, aplikací OCR na dokumenty bez textu a nahráním do Paperless-ngx.

## ✅ PŘEDPOKLADY
1. **Python 3** nainstalován
2. **ocrmypdf** pro OCR: `brew install ocrmypdf`
3. **Paperless-ngx** běžící na `http://localhost:8050`
4. **API token** pro Paperless: `ca8aea906da3a147d32c034322d97b20f9ba213f`
5. **Python knihovny**: PyPDF2, reportlab, requests

## 📝 KROKY PROCESU

### 1️⃣ VYMAZÁNÍ PAPERLESS
```bash
python3 delete_all_paperless_docs.py
```
- Vymaže všechny dokumenty, tagy a korespondenty z Paperless
- Připraví čistou databázi pro nový import

### 2️⃣ SPUŠTĚNÍ KOMPLETNÍHO ZPRACOVÁNÍ
```bash
python3 process_500_complete_ocr.py
```

## 🔧 CO DĚLÁ HLAVNÍ SKRIPT

### A. Vyhledání dokumentů
- Prohledává složky:
  - `/Users/m.a.j.puzik/Documents`
  - `/Users/m.a.j.puzik/Downloads`
  - `/Users/m.a.j.puzik/Desktop`
  - `/Users/m.a.j.puzik/majconvert-gmail-all`
- Najde prvních 500 PDF souborů (max 50MB každý)

### B. Seskupení souvisejících souborů
Inteligentně seskupuje soubory podle:
- **Čísla faktury** - např. všechny soubory s číslem `7917010153`
- **Variabilního symbolu** - např. `vs_12345678`
- **Email identifikátoru** - emaily a jejich přílohy
- **Data** - soubory se stejným datem
- **Obecného prefixu** - první část názvu souboru

### C. Kontrola a aplikace OCR
Pro každé PDF:
1. Zkontroluje, zda obsahuje text (prvních 3 stran)
2. Pokud má méně než 50 znaků textu → považuje za sken bez OCR
3. Aplikuje OCR pomocí `ocrmypdf`:
   ```bash
   ocrmypdf -l ces+eng --rotate-pages --deskew --clean --optimize 2 --skip-text input.pdf output.pdf
   ```
   - `-l ces+eng` - České a anglické OCR
   - `--rotate-pages` - Automaticky otočí stránky
   - `--deskew` - Vyrovná nakloněný text
   - `--clean` - Vyčistí pozadí
   - `--optimize 2` - Optimalizuje velikost
   - `--skip-text` - Přeskočí stránky s textem

### D. Sloučení souvisejících dokumentů
Pokud skupina obsahuje více souborů:
1. **Vytvoří titulní stranu** s informacemi:
   - Typ dokumentu
   - Počet sloučených souborů
   - Datum zpracování
   - OCR aplikováno: Ano/Ne
   - Extrahovaná metadata
   - Seznam sloučených souborů
2. **Sloučí všechny PDF** do jednoho dokumentu
3. **Uloží** s názvem: `{typ}_{identifikátor}_{časové_razítko}.pdf`

### E. Klasifikace dokumentů
Rozpoznává 7 typů dokumentů pomocí klíčových slov a vzorů:

| Typ | Klíčová slova | Vzory | Skóre |
|-----|--------------|-------|-------|
| **Faktura** | faktura, invoice, rechnung, bill, vyúčtování, daňový doklad | faktura č. \d+, IČO: \d{8}, DIČ: CZ\d{8}, celkem k úhradě | 5 |
| **Účtenka** | účtenka, receipt, potvrzení, payment, pokladní doklad | účtenka č. \d+, receipt #\d+, pokladní doklad | 4 |
| **Bankovní výpis** | výpis, statement, banka, account, zůstatek, balance | výpis z účtu, account statement, zůstatek: [\d,]+ | 4 |
| **Lékařská zpráva** | lékař, doctor, urosanté, pacient, vyšetření, diagnóza | lékařská zpráva, medical report, rodné číslo | 4 |
| **Smlouva** | smlouva, contract, dohoda, agreement, smluvní strany | smlouva o \w+, předmět smlouvy | 4 |
| **Newsletter** | newsletter, digest, alert, update, novinky, zpravodaj | google alert, daily digest | 3 |
| **Reklama** | akce, sleva, nabídka, výprodej, sale, discount, autoscout | \d+% sleva, akční nabídka, limited time | 3 |

### F. Extrakce metadat
Z každého dokumentu extrahuje:
- **IČO** - 8místné identifikační číslo
- **DIČ** - daňové identifikační číslo (CZ + 8-10 číslic)
- **VS** - variabilní symbol (5+ číslic)
- **Číslo dokumentu** - faktury, účtenky apod.
- **Částka** - v Kč, EUR, USD

### G. Upload do Paperless
Pro každý dokument:
1. Vytvoří nebo najde odpovídající **tag** podle typu
2. Připraví **title** ve formátu: `{Typ} č. {číslo}` nebo `{Typ} VS {variabilní_symbol}`
3. Nahraje dokument přes API s metadaty

## 📂 VÝSTUPNÍ STRUKTURA

```
/Users/m.a.j.puzik/processed_500_ocr/
├── merged/          # Sloučené dokumenty
│   ├── invoice_*.pdf
│   ├── receipt_*.pdf
│   └── ...
├── ocr/             # Dokumenty po OCR
│   └── *.pdf
├── classified/      # Klasifikované jednotlivé dokumenty
│   └── *.pdf
└── report_*.json    # Finální report se statistikami
```

## 📊 STATISTIKY A REPORT

Skript průběžně zobrazuje:
- Každých **50 dokumentů** - průběžný status
- **Finální report** s:
  - Celkovým počtem zpracovaných souborů
  - Počtem skupin a sloučených dokumentů
  - Počtem dokumentů s aplikovaným OCR
  - Rozložením typů dokumentů s procenty
  - Seznamem případných chyb

Report se také ukládá jako JSON s kompletními statistikami.

## 🔍 ŘEŠENÍ PROBLÉMŮ

### OCR nefunguje
```bash
# Zkontroluj instalaci
ocrmypdf --version

# Reinstalace
brew reinstall ocrmypdf
```

### Paperless API nereaguje
```bash
# Zkontroluj, že Paperless běží
docker ps | grep paperless

# Restart Paperless
docker-compose restart paperless-ngx
```

### Nedostatečná práva k souborům
```bash
# Oprav práva
chmod 644 *.pdf
```

## 🚀 OPTIMALIZACE

1. **OCR pouze kde je potřeba** - skript automaticky detekuje PDF bez textu
2. **Paralelní zpracování** - možno upravit pro více vláken
3. **Batch upload** - dokumenty se nahrávají postupně, ne všechny najednou
4. **Timeout pro OCR** - 60 sekund na dokument, při překročení použije originál

## 📈 OČEKÁVANÉ VÝSLEDKY

- **Úspěšnost klasifikace**: 90%+ pro známé typy dokumentů
- **Rychlost**: ~1-2 dokumenty/sekundu (bez OCR), ~10-30 sekund/dokument (s OCR)
- **Sloučení**: Automatické spojení emailů s přílohami
- **Metadata**: Extrakce klíčových údajů pro snadné vyhledávání

## 🎯 FINÁLNÍ KONTROLA

Po dokončení zkontroluj:
1. ✅ Všechny dokumenty nahrány do Paperless
2. ✅ Správné tagy přiřazeny
3. ✅ Metadata extrahována
4. ✅ Emaily sloučeny s přílohami
5. ✅ OCR aplikováno na skeny

---
*Dokumentace vytvořena: 26.8.2025*