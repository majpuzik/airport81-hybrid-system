# 📋 SOLAX + OTE API INTEGRACE - PRŮBĚŽNÁ DOKUMENTACE

## 🎯 ZADÁNÍ:
1. Vytvořit přímé připojení k SOLAX Cloud API (NE přes HA)
2. Vytvořit přímé připojení k OTE API (NE přes HA)
3. Přesunout ovládání nabíječky EV do Nastavení (včetně Povolení)
4. Odstranit původní blok nabíječky z hlavní stránky
5. Nahradit blokem Výroba FV se statistikami z API

## 📊 AKTUÁLNÍ STAV:
- [ ] SOLAX Cloud API připojení
- [ ] OTE API připojení  
- [ ] Dashboard změny
- [ ] Dokumentace

## 🔑 PŘIHLAŠOVACÍ ÚDAJE:

### SOLAX Cloud:
- Username: majpuzik@gmail.com
- Password: Max007
- Token: 20250807021517756732674
- SN: SNNTF49WK7
- API URL: https://www.solaxcloud.com/proxyApp/proxy/api/

### OTE:
- API URL: https://www.ote-cr.cz/cs/kratkodobe-trhy/elektrina/denni-trh/@@chart-data
- Formát: JSON
- Bez autentizace

## 📝 ZMĚNY:

### Změna #1: ✅ [DOKONČENO] Vytvoření SOLAX Cloud API klienta
- Soubor: solax_cloud_direct.py
- Funkce: Přímé volání SOLAX Cloud API
- Data: yield_today, yield_total, ac_power, battery_soc
- Test: ÚSPĚŠNÝ - získává real-time data (8798W, 24.7kWh dnes, SOC 96%)

### Změna #2: ✅ [DOKONČENO] Vytvoření OTE API klienta
- Soubor: ote_prices_direct.py
- Funkce: Získání aktuálních spot cen
- Data: current_price, daily_prices
- Test: ÚSPĚŠNÝ - aktuální cena 0.35 Kč/kWh, denní statistiky fungují

### Změna #3: ✅ [DOKONČENO] FVE Export Controller
- Soubor: fve_export_control.py
- Funkce: Automatické řízení exportu podle OTE cen
- Logika:
  - Záporná cena → STOP exportu
  - Cena < -0.5 Kč a SOC < 30% → Nabíjení ze sítě
  - Cena > 3 Kč → Maximální export
  - Jinak → Automatický režim
- Test: ÚSPĚŠNÝ - běží, rozhoduje podle podmínek

### Změna #4: ✅ [PŘIPRAVENO] Dashboard karty
- DASHBOARD_EV_NASTAVENI.yaml - Karta pro stránku Nastavení
- DASHBOARD_FV_VYROBA.yaml - Náhradní karta pro hlavní stránku
- Čeká na: SSH připojení k Synology pro aplikaci změn

### Změna #5: [ČEKÁ] Dashboard úpravy v HA
- Odstranit: Ovládání nabíječky EV z hlavní stránky
- Přidat: Výroba FV blok s daty z API
- Přesunout: Nabíječka do Nastavení

---
Dokument vytvořen: 2025-08-18
Poslední aktualizace: 2025-08-18 13:09