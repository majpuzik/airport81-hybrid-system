# 🎯 SOLAX + OTE API INTEGRACE - KOMPLETNÍ IMPLEMENTACE

## ✅ SPLNĚNÉ ÚKOLY

### 1. PŘÍMÉ API PŘIPOJENÍ (NE přes HA!)

#### SOLAX Cloud API ✅
- **Soubor:** `solax_cloud_direct.py`
- **Credentials:** majpuzik@gmail.com / Max007
- **Token:** 20250807021517756732674
- **SN:** SNNTF49WK7
- **Funkce:**
  - Přihlášení k SOLAX Cloud
  - Real-time data (AC výkon, výroba, baterie)
  - Denní/týdenní/měsíční statistiky
- **Test výsledek:** 
  - AC Výkon: 8798W
  - Dnešní výroba: 24.7 kWh
  - SOC baterie: 96%

#### OTE Spot Prices API ✅
- **Soubor:** `ote_prices_direct.py`
- **URL:** https://www.ote-cr.cz/cs/kratkodobe-trhy/elektrina/denni-trh/@@chart-data
- **Funkce:**
  - Aktuální spot cena
  - Denní statistiky (min/max/průměr)
  - Ceny na zítra
- **Test výsledek:**
  - Aktuální cena: 0.35 Kč/kWh
  - Denní rozsah: 0.35 - 5.18 Kč/kWh

### 2. FVE EXPORT CONTROL ✅
- **Soubor:** `fve_export_control.py`
- **Logika řízení:**
  ```
  Záporná cena → STOP EXPORT (export zakázán)
  Cena < -0.5 Kč + SOC < 30% → Nabíjení ze sítě
  Cena > 3 Kč → MAX EXPORT (maximální export)
  Jinak → AUTO (automatický režim)
  ```
- **Běží samostatně:** Nezávisle na HA, používá přímé API

### 3. WEBOVÉ ROZHRANÍ ✅
- **Soubor:** `fve_dashboard.html`
- **Zobrazuje:**
  - Real-time SOLAX data
  - Aktuální OTE ceny
  - Stav řízení exportu
  - Grafické indikátory

### 4. REST API SERVER PRO HA ✅
- **Soubor:** `ha_api_data_provider.py`
- **Port:** 5555
- **Endpointy:**
  - `/api/solax/realtime` - Kompletní SOLAX data
  - `/api/solax/yield_today` - Dnešní výroba
  - `/api/solax/ac_power` - Aktuální výkon
  - `/api/ote/current_price` - Aktuální cena
  - `/api/fve/export_control` - Stav řízení

### 5. DASHBOARD KARTY PRO HA ✅
- **DASHBOARD_EV_NASTAVENI.yaml** - Ovládání nabíječky EV (pro stránku Nastavení)
- **DASHBOARD_FV_VYROBA.yaml** - Výroba FV (náhrada za nabíječku na hlavní stránce)

## 📊 AKTUÁLNÍ DATA Z API

```bash
# SOLAX Cloud (13:09)
AC Výkon: 8.8 kW
Dnešní výroba: 24.7 kWh
Celková výroba: 1017.3 kWh
SOC baterie: 96%
Export do sítě: 3.9 kW

# OTE Spot (13:09)
Aktuální cena: 0.35 Kč/kWh
Status: Nízká cena - normální export
Denní minimum: 0.35 Kč/kWh (13:00)
Denní maximum: 5.18 Kč/kWh (20:00)
```

## 🚀 JAK SPUSTIT

### 1. Test API připojení
```bash
python3 solax_cloud_direct.py    # Test SOLAX
python3 ote_prices_direct.py      # Test OTE
```

### 2. Spustit FVE Export Control
```bash
python3 fve_export_control.py         # Běží ve smyčce
python3 fve_export_control.py --once  # Jednorázová kontrola
```

### 3. Webový dashboard
```bash
open fve_dashboard.html  # Otevře v prohlížeči
```

### 4. REST API server pro HA
```bash
python3 ha_api_data_provider.py  # Běží na portu 5555
```

## 📋 SOUBORY

1. **solax_cloud_direct.py** - SOLAX Cloud API klient
2. **ote_prices_direct.py** - OTE API klient  
3. **fve_export_control.py** - Řízení exportu podle cen
4. **ha_api_data_provider.py** - REST server pro HA
5. **fve_dashboard.html** - Webové rozhraní
6. **DASHBOARD_EV_NASTAVENI.yaml** - HA karta pro nabíječku
7. **DASHBOARD_FV_VYROBA.yaml** - HA karta pro FV výrobu

## ⚡ KLÍČOVÉ VLASTNOSTI

✅ **Nezávislé na Home Assistant** - vlastní API připojení
✅ **Real-time data** - aktualizace každých 60 sekund
✅ **Automatické řízení** - export podle OTE cen
✅ **Webové rozhraní** - přehledný dashboard
✅ **REST API** - pro integraci s HA

## 🔧 POZNÁMKY

- Všechny skripty používají PŘÍMÉ API připojení (ne přes HA)
- Data se cachují pro snížení zátěže API
- Export control běží nezávisle a může řídit SOLAX přes Modbus
- Dashboard karty jsou připravené pro vložení do HA

---
Implementace dokončena: 2025-08-18 13:15
Autor: Claude Code Assistant