# 📋 HOME ASSISTANT - DOKUMENTACE INTEGRACÍ
==========================================
Datum: 2025-08-06
Verze HA: 2025.7.4

## 🏠 AKTIVNÍ INTEGRACE:

### 1. **LOXONE** ✅
- **Typ**: PyLoxone
- **Host**: 192.168.10.68:8080
- **Uživatel**: admin
- **Unique ID**: 504F94A08263
- **Funkce**: 
  - Ovládání osvětlení
  - Žaluzie
  - Scény
  - Klimatizace
  - Závlaha

### 2. **SOLAX MODBUS** ⚠️ (částečně funkční)
- **Typ**: solax_modbus (wills106)
- **Host**: 192.168.10.83:5020 (přes multiplexer)
- **Inverter**: X3-Ultra G2
- **Slave ID**: 4
- **Status**: Čeká na firmware update donglu
- **Problém**: PocketWiFi+LAN V1.002.09 (nutný V3.004.03+)

### 3. **OTE SPOTOVÉ CENY** ✅ (NOVĚ PŘIDÁNO!)
- **Typ**: Czech Energy Spot Prices
- **Měna**: CZK
- **Jednotka**: kWh
- **Entity**:
  - `sensor.current_spot_electricity_price`
  - `sensor.current_spot_electricity_hour_order`
  - `sensor.lowest_energy_price_today`
  - `sensor.highest_energy_price_today`
  - `sensor.current_spot_electricity_is_cheapest`

### 4. **HACS** ✅
- **Verze**: 2.0.5
- **Experimental**: Povoleno
- **Custom repositories**:
  - rnovacek/homeassistant_cz_energy_spot_prices

### 5. **ZÁKLADNÍ INTEGRACE** ✅
- Sun (sledování slunce)
- Shopping List
- Google Translate TTS
- Radio Browser
- Met.no (počasí)
- go2rtc (streaming)
- Backup

## 🔧 KONFIGURACE:

### configuration.yaml:
```yaml
default_config:

frontend:
  themes: !include_dir_merge_named themes

automation: !include automations.yaml
script: !include scripts.yaml
scene: !include scenes.yaml
```

### Síťová konfigurace:
- **HA IP**: 192.168.10.83
- **HA Port**: 8123
- **Loxone**: 192.168.10.68
- **SOLAX**: 192.168.10.51 (přes dongle)
- **Multiplexer**: 192.168.10.83:5020

## 📊 STAV SYSTÉMU:

### ✅ Funkční:
- Loxone ovládání
- OTE spotové ceny
- HACS integrace
- Základní HA funkce

### ⚠️ Čeká na opravu:
- SOLAX Modbus (nutný firmware update)
- Remote battery control

### 🚀 Plánované:
- PredBat optimalizace
- Automatizace podle cen elektřiny
- ApexCharts vizualizace

## 💾 ZÁLOHY:

### Předchozí backupy:
1. HA-Loxone-FINAL-backup-20250804-234336
2. HA-PROBLEMS-backup-20250805-143401
3. HA-Loxone-AI-Integration-backup-20250805-164002
4. PyLoxone-Experimental-Area-backup-20250805-172507

### Aktuální backup:
**HA-OTE-Integration-backup-20250806** (vytváří se)

---
Vytvořeno: 2025-08-06
Účel: Dokumentace pro správu a zálohování