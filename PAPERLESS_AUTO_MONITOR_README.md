# Paperless-ngx Automatický Monitor Chyb

## Přehled
Automatický systém pro detekci a opravu častých chyb v Paperless-ngx.

## Funkce
- 🔍 Kontroluje logy každých 20 minut
- 🔧 Automaticky opravuje známé chyby
- 📝 Dokumentuje všechny opravy
- 🚨 Loguje všechny aktivity

## Podporované chyby

### 1. Ghostscript rasterizing failed
- **Příčina**: Malé PNG obrázky s nízkým rozlišením
- **Oprava**: Automatické zvětšení a nastavení DPI

### 2. Gotenberg 500 Error
- **Příčina**: Nekompatibilní verze Gotenberg
- **Oprava**: Kontrola verze, doporučení upgrade na 7.8

### 3. Corrupt Image Files
- **Příčina**: Poškozené obrázkové soubory
- **Oprava**: Detekce a označení pro manuální opravu

### 4. Low DPI Images
- **Příčina**: Obrázky s DPI = 1
- **Oprava**: Převzorkování na DPI = 72

### 5. Tiny Images
- **Příčina**: Obrázky menší než 50px
- **Oprava**: Zvětšení na minimálně 300px

## Použití

### Spuštění monitoru
```bash
./start-paperless-monitor.sh
```

### Zastavení monitoru
```bash
./stop-paperless-monitor.sh
```

### Kontrola stavu
```bash
# Zkontrolovat, zda běží
ps aux | grep paperless-auto-fix-monitor

# Zobrazit log
tail -f paperless-auto-fix.log
```

## Soubory
- `paperless-auto-fix-monitor.py` - Hlavní skript
- `paperless-auto-fix.log` - Log všech aktivit
- `PAPERLESS_AUTO_FIXES.md` - Dokumentace oprav
- `paperless-monitor.pid` - PID běžícího procesu

## Konfigurace
Upravte v `paperless-auto-fix-monitor.py`:
- `CHECK_INTERVAL` - Interval kontrol (výchozí: 20 minut)
- `PAPERLESS_URL` - URL Paperless instance
- `PAPERLESS_TOKEN` - API token

## Rozšíření
Pro přidání nové chyby:
1. Přidejte pattern do `ERROR_PATTERNS`
2. Implementujte opravnou funkci
3. Monitor automaticky začne detekovat a opravovat

## Bezpečnost
- Monitor pouze opravuje dokumenty, nikdy je nemaže trvale
- Všechny opravy jsou logovány
- Původní soubory jsou přepsány opravenými verzemi