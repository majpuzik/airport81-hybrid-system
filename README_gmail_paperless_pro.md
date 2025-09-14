# Gmail to Paperless-NGX Professional Processor

Komplexní řešení pro automatické zpracování emailů z Gmail s OCR, inteligentní klasifikací pomocí AI a importem do Paperless-NGX.

## Hlavní funkce

- **Automatické stahování emailů** z Gmail složky "[Gmail]/Alle Nachrichten"
- **Konverze do PDF s OCR** pomocí Adobe PDF Services API
- **Inteligentní klasifikace dokumentů** pomocí Ollama a českých AI modelů
- **Automatické třídění** do kategorií:
  - Office dokumenty
  - Smlouvy
  - Úřední sdělení
  - Lékařské zprávy
  - Předplatná
  - Platby (TV, internet, služby)
  - Obchodní nabídky
  - Spam (automaticky vyřazován)
- **Webové rozhraní** pro monitoring průběhu
- **Import do Paperless-NGX** s automatickým tagováním

## Požadavky

### Systémové závislosti
- Python 3.8+
- wkhtmltopdf - konverze HTML na PDF
- poppler-utils (pdftotext) - extrakce textu z PDF
- LibreOffice - konverze Office dokumentů
- ImageMagick - konverze obrázků
- Ollama - AI klasifikace

### Instalace systémových závislostí

**macOS:**
```bash
brew install wkhtmltopdf poppler imagemagick
# LibreOffice stáhnout z https://www.libreoffice.org/
# Ollama stáhnout z https://ollama.ai/
```

**Ubuntu/Debian:**
```bash
sudo apt-get install wkhtmltopdf poppler-utils imagemagick libreoffice
# Ollama instalovat podle návodu na https://ollama.ai/
```

## Instalace

1. **Spusťte instalační skript:**
   ```bash
   ./setup_gmail_paperless.sh
   ```

2. **Nastavte Gmail API:**
   - Jděte na https://console.cloud.google.com/
   - Vytvořte nový projekt
   - Povolte Gmail API
   - Vytvořte OAuth 2.0 credentials
   - Stáhněte jako `credentials.json`

3. **Nastavte Adobe PDF Services:**
   - Registrujte se na https://developer.adobe.com/document-services/
   - Získejte API credentials (zdarma 500 dokumentů/měsíc)
   - Zkopírujte client ID a secret

4. **Nastavte Paperless-NGX:**
   - Ujistěte se, že Paperless-NGX běží
   - Vytvořte API token v nastavení
   - Zkopírujte URL a token

5. **Vytvořte .env soubor:**
   ```bash
   cp .env.template .env
   # Vyplňte své údaje v .env
   ```

6. **Stáhněte Ollama model:**
   ```bash
   ollama pull qwen2.5:32b
   # Nebo použijte existující czech-finance:latest
   ```

## Použití

1. **Aktivujte virtuální prostředí:**
   ```bash
   source gmail_paperless_env/bin/activate
   ```

2. **Spusťte aplikaci:**
   ```bash
   python3 gmail_paperless_ngx_pro.py
   ```

3. **Otevřete webové rozhraní:**
   - Navigujte na http://localhost:7860
   - Nastavte počet emailů ke zpracování (10-300)
   - Klikněte na "Spustit zpracování"
   - Sledujte průběh a statistiky

## Klasifikace dokumentů

### Podporované typy dokumentů

1. **Office dokumenty** - Word, Excel, PowerPoint
2. **Smlouvy** - právní dokumenty, dohody
3. **Úřední sdělení** - dokumenty z úřadů
4. **Lékařské zprávy** - nemocniční a lékařské dokumenty
5. **Předplatná** - pravidelné platby
6. **Platby za TV** - televizní služby
7. **Platby za internet** - internetové připojení
8. **Platby za služby** - ostatní služby
9. **Obchodní nabídky** - komerční nabídky
10. **Spam** - automaticky filtrován

### Kvalita klasifikace

- Dokumenty s **80%+ jistotou** jsou automaticky zařazeny
- Dokumenty s nižší jistotou jdou do složky "nejasné"
- Kombinuje pattern matching a AI analýzu pro vyšší přesnost

## Struktura složek

```
gmail_paperless_export/
├── paperless-ngx-office/        # Office dokumenty
├── paperless-ngx-smlouvy/       # Smlouvy
├── paperless-ngx-uredni/        # Úřední sdělení
├── paperless-ngx-lekarske/      # Lékařské zprávy
├── paperless-ngx-predplatna/    # Předplatná
├── paperless-ngx-platby-tv/     # TV platby
├── paperless-ngx-platby-internet/# Internet platby
├── paperless-ngx-platby-sluzby/ # Ostatní služby
├── paperless-ngx-obchodni-nabidky/# Nabídky
├── paperless-ngx-nejasne/       # Nejasné dokumenty
├── paperless-ngx-spam/          # Spam
├── processing.log               # Log zpracování
└── processing_stats.json        # Statistiky
```

## Monitorování

Webové rozhraní zobrazuje:
- Počet zpracovaných dokumentů
- Úspěšnost klasifikace (%)
- Rozdělení podle typů dokumentů
- Průběh zpracování v reálném čase

## Řešení problémů

### Gmail API chyby
- Zkontrolujte `credentials.json`
- Smažte `token.json` a autorizujte znovu

### Adobe PDF chyby
- Ověřte správnost API credentials
- Zkontrolujte limit 500 dokumentů/měsíc

### Ollama chyby
- Ujistěte se, že Ollama běží: `ollama serve`
- Ověřte dostupnost modelu: `ollama list`

### Paperless import chyby
- Zkontrolujte API token
- Ověřte dostupnost Paperless-NGX

## Bezpečnost

- Credentials jsou uloženy lokálně v `.env`
- Gmail token má pouze read-only přístup
- Dokumenty jsou zpracovány lokálně
- Žádná data nejsou sdílena s třetími stranami (kromě Adobe OCR)

## Limity

- Adobe PDF Services: 500 dokumentů/měsíc zdarma
- Gmail API: 250 quota units per user per second
- Doporučeno: max 50 emailů najednou pro stabilitu

## Rozšíření

Script lze snadno rozšířit o:
- Další typy dokumentů
- Nové klasifikační vzory
- Jiné OCR služby
- Dodatečné výstupní formáty
- Pokročilé tagování v Paperless-NGX