# Instalace Loxone Stats na Synology NAS

## Postup přes File Station:

1. **Nahrajte archiv na NAS:**
   - Otevřete File Station v DSM
   - Vytvořte složku: `/volume1/docker/loxone-stats/`
   - Nahrajte soubor `loxone-stats.tar.gz` do této složky
   - Klikněte pravým tlačítkem na archiv → Extract → Extract Here

2. **Spusťte v Container Manager:**
   - Otevřete Container Manager
   - Jděte na Project → Create
   - Project name: `loxone-stats`
   - Path: vyberte `/volume1/docker/loxone-stats/`
   - Klikněte Next → Next → Done

3. **Přístup k aplikacím:**
   - InfluxDB: http://192.168.10.68:8087
     - Uživatel: admin
     - Heslo: adminpassword123
   - Grafana: http://192.168.10.68:3001
     - Uživatel: admin
     - Heslo: admin

## Struktura projektu:
```
loxone-stats/
├── docker-compose.yml
└── loxone-bridge/
    ├── Dockerfile
    ├── requirements.txt
    └── app.py
```

## Co aplikace dělá:
- Sbírá data z Loxone Miniservers
- Ukládá je do InfluxDB databáze
- Zobrazuje grafy a statistiky v Grafaně