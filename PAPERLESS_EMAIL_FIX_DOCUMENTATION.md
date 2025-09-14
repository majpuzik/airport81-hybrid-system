# Paperless-NGX Email Processing Fix Documentation

## Problém
Paperless-NGX nezpracovával správně emaily - ze 32,000 dokumentů bylo 30,500 nezpracovaných. Hlavní chyba:
```
Error while executing pre-consume script: Command '['/custom/scripts/enhanced_smart_consume.sh', '/tmp/paperless/paperless-mail-cgqyf68f.eml']' returned non-zero exit status 1.
```

## Příčina
1. **Nesprávná cesta ke skriptu**: Docker compose měl nastaven jiný pre-consume script než byl skutečně používán v kontejneru
2. **Komplexní zpracování emailů**: Script `enhanced_smart_consume.sh` se snažil konvertovat emaily přes Gotenberg, což selhávalo a vracelo prázdné soubory
3. **Chybějící konfigurace**: Nebyly nastaveny správné parametry pro zpracování emailů

## Řešení

### 1. Oprava konfigurace v docker-compose.yml
```yaml
# Změněno z:
- PAPERLESS_PRE_CONSUME_SCRIPT=/usr/src/paperless/scripts/safe_preprocessor.sh

# Na:
- PAPERLESS_PRE_CONSUME_SCRIPT=/usr/src/paperless/scripts/simple_email_preprocessor.sh

# Přidány parametry pro lepší zpracování emailů:
- PAPERLESS_EMAIL_STRIP_HEADERS=true
- PAPERLESS_EMAIL_EXTRACT_ATTACHMENTS=true
- PAPERLESS_EMAIL_MAX_ATTACHMENT_SIZE=50000000
```

### 2. Vytvoření jednoduchého email preprocessoru
Soubor: `/paperless_scripts/simple_email_preprocessor.sh`
- Minimální zpracování emailů
- Nekoncertuje emaily, nechává to na Paperless
- Pouze kontroluje validitu souborů
- Čistí názvy souborů od problematických znaků

### 3. Script pro přepracování selhavších dokumentů
Soubor: `reprocess_failed_emails.py`
- Najde všechny dokumenty s chybami nebo prázdným obsahem
- Stáhne originály a znovu je nahraje ke zpracování
- Zachová metadata (tagy, korespondenty, typy dokumentů)

## Použití

### 1. Restartovat Paperless s novou konfigurací:
```bash
cd /Users/m.a.j.puzik/paperless-docker-services
docker compose down
docker compose up -d
```

### 2. Přepracovat selhavší dokumenty:
```bash
cd /Users/m.a.j.puzik/paperless-docker-services
python3 reprocess_failed_emails.py
```

## Výsledek
- Emaily se nyní zpracovávají správně bez konverzí
- Paperless sám extrahuje text z emailů pomocí MIME parseru
- Přílohy se extrahují automaticky
- Menší zatížení systému

## Poznámky
- Gotenberg verze 7.10.2 je zachována (verze 8.x má přísnější bezpečnostní omezení)
- Tika je stále k dispozici pro zpracování příloh
- Email parser je nastaven na "mime" pro nejlepší kompatibilitu