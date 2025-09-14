# TIGO Cloud API - Návod k nastavení

## Krok 1: Získání přístupu k Tigo Cloud

Pro monitoring jednotlivých panelů potřebujete:
1. Účet na https://ei.tigoenergy.com
2. Premium data subscription (placená služba)
3. Přihlašovací údaje od instalatéra

## Krok 2: Nastavení API

Spusťte nastavovací skript:
```bash
/Users/m.a.j.puzik/setup_tigo_api.sh
```

Skript vás provede:
- Zadáním přihlašovacích údajů
- Ověřením připojení k Tigo Cloud
- Získáním seznamu vašich systémů
- Uložením údajů pro budoucí použití

## Krok 3: Testování připojení

Ověřte, že připojení funguje:
```bash
/Users/m.a.j.puzik/test_tigo_connection.sh
```

## Krok 4: Spuštění monitoru

### Jednorázová kontrola:
```bash
/Users/m.a.j.puzik/run_tigo_integrated.sh once
```

### Kontinuální monitoring (každou minutu):
```bash
/Users/m.a.j.puzik/run_tigo_integrated.sh
```

### Web dashboard (port 8091):
```bash
/Users/m.a.j.puzik/run_tigo_web.sh
```

## Zdroje dat

Monitor automaticky používá nejlepší dostupný zdroj:

1. **TIGO Cloud API** (preferováno)
   - Data jednotlivých panelů/optimizérů
   - Detailní diagnostika
   - Teploty, napětí, proudy

2. **SOLAX Cloud API** (záloha)
   - Data po stringách (DC1-DC4)
   - Celkový výkon
   - Odhady stavu panelů

## Řešení problémů

### "Přístup odmítnut"
- Vyžaduje Premium subscription
- Kontaktujte Tigo support nebo instalatéra

### "Nelze se připojit"
- Zkontrolujte internetové připojení
- Ověřte správnost přihlašovacích údajů

### "Žádné systémy"
- Účet nemá přiřazené systémy
- Kontaktujte instalatéra

## API Endpoints

- Tigo Cloud API v3: https://api2.tigoenergy.com
- Tigo EI Portal: https://ei.tigoenergy.com
- Dokumentace: https://support.tigoenergy.com

## Kontakt

Pro získání Premium přístupu:
- Tigo Energy support
- Váš solární instalatér
- https://www.tigoenergy.com/contact