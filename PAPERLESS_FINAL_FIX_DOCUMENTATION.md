# Paperless-NGX Email Processing - Finální Oprava

## Shrnutí problému
- 30,500 z 32,000 dokumentů nebylo zpracováno
- Hlavní příčina: Chybný pre-consume script který vracel prázdné soubory
- Sekundární příčina: Gotenberg nepřijímal jednotky v rozměrech (8.27in místo 8.27)

## Aplikované opravy

### 1. Pre-consume Script
Obnovena funkční konfigurace s `combined_preprocessor.sh` který:
- Sanitizuje názvy souborů (odstraňuje emoji, speciální znaky)
- Aplikuje 3-úrovňové opravy emailů (ultimate, advanced, basic)
- Opravuje CSS jednotky pro Gotenberg
- Zvětšuje malé obrázky
- Čistí HTML od externích odkazů

### 2. Skripty zkopírované do kontejneru
```bash
/usr/src/paperless/scripts/
├── combined_preprocessor.sh      # Hlavní orchestrátor
├── filename_sanitizer.py         # Čistí názvy souborů
├── email_fix_ultimate.py         # Nejpokročilejší oprava emailů
├── email_fix_advanced.py         # Záložní oprava
├── email_fix_preprocessor.py     # Základní oprava
└── gotenberg_unit_fix.py         # Odstraňuje jednotky z CSS
```

### 3. Konfigurace v docker-compose.yml
```yaml
environment:
  - PAPERLESS_PRE_CONSUME_SCRIPT=/usr/src/paperless/scripts/combined_preprocessor.sh
  - PAPERLESS_POST_CONSUME_SCRIPT=/usr/src/paperless/scripts/paperless_post_consume_tax.py
  - PAPERLESS_CONSUMER_ENABLE_EMAIL=true
  - PAPERLESS_CONSUMER_EMAIL_ATTACHMENT_EXTENSION=eml
  - PAPERLESS_EMAIL_PARSER=mime
  - PAPERLESS_EMAIL_STRIP_HEADERS=true
  - PAPERLESS_EMAIL_EXTRACT_ATTACHMENTS=true
  - PAPERLESS_EMAIL_MAX_ATTACHMENT_SIZE=50000000
```

### 4. Konfigurace v docker-compose.override.yml
```yaml
environment:
  PAPERLESS_PRE_CONSUME_SCRIPT: /usr/src/paperless/scripts/combined_preprocessor.sh
  PAPERLESS_POST_CONSUME_SCRIPT: /usr/src/paperless/scripts/post_consume_full.sh
  PAPERLESS_TIKA_ENDPOINT: http://tika:9998
  PAPERLESS_GOTENBERG_ENDPOINT: http://gotenberg:3000
```

## Instalované závislosti
```bash
docker exec paperless-ngx pip install chardet
```

## Stav systému
- ✅ Pre-consume script funkční
- ✅ Gotenberg unit fix aplikován
- ✅ Závislosti nainstalovány
- ✅ Paperless-NGX restartován
- ✅ Dokumenty připraveny ke zpracování

## Poznámky
- V systému je 2,654 .eml souborů
- Gotenberg verze 7.10.2 (verze 8.x má přísnější bezpečnostní omezení)
- Tika je dostupná jako fallback pro problematické soubory

## Monitorování
```bash
# Sledovat zpracování
docker logs -f paperless-ngx | grep "Combined Preprocessor"

# Kontrola chyb
docker logs paperless-ngx 2>&1 | grep -E "Error|Failed" | grep -v "Unauthorized"
```