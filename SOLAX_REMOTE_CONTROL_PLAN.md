# 🔋 SOLAX X3-ULT REMOTE CONTROL - PLÁN NA ZÍTŘEK
====================================================
Datum: 2025-08-05 večer
Status: 📋 PŘIPRAVENO K IMPLEMENTACI

## 🌅 RANNÍ ÚKOLY (při slunci):

### 1. TEST REÁLNÉ FUNKČNOSTI
```bash
# Spustit test při aktivním SOLAX
export PATH="/Applications/Docker.app/Contents/Resources/bin:$PATH"
source /Users/m.a.j.puzik/solax_test_env/bin/activate
python3 /Users/m.a.j.puzik/test_solax_complete.py
```
**Očekávané výsledky:**
- ✅ SOLAX dostupný na 192.168.10.51:502
- ✅ Registry vrátí reálná data (PV výkon, SOC baterie)
- ✅ Multiplexer ukáže skutečné hodnoty

## 🔧 IMPLEMENTACE REMOTE CONTROL:

### 2. SOLAX MODBUS INTEGRACE
```bash
# Instalace přes HACS
HACS → Integrace → "wills106/homeassistant-solax-modbus"
```

**Konfigurace v HA:**
```yaml
# configuration.yaml
sensor:
  - platform: solax_modbus
    name: solax
    host: 192.168.10.83  # Přes multiplexer
    port: 5020
    modbus_addr: 1
```

### 3. REMOTE CONTROL ENTITY
**Klíčové entity:**
- `select.solax_remotecontrol_power_control` - výběr režimu
- `number.solax_remotecontrol_active_power` - nastavení výkonu
- `button.solax_remotecontrol_set` - aktivace příkazu

## ⚡ AUTOMATIZACE PODLE CEN:

### 4. ZÁKLADNÍ CENOVÉ AUTOMATIZACE
```yaml
# automations.yaml
- alias: "Levná elektřina - Nabíjení"
  trigger:
    - platform: numeric_state
      entity_id: sensor.electricity_price
      below: 0.08  # 8 centů/kWh
  action:
    - service: select.select_option
      target:
        entity_id: select.solax_remotecontrol_power_control
      data:
        option: "Enabled Battery Control"
    - service: number.set_value
      target:
        entity_id: number.solax_remotecontrol_active_power
      data:
        value: 5000  # 5kW nabíjení
    - service: button.press
      target:
        entity_id: button.solax_remotecontrol_set

- alias: "Drahá elektřina - Vybíjení"
  trigger:
    - platform: numeric_state
      entity_id: sensor.electricity_price
      above: 0.25  # 25 centů/kWh
  action:
    - service: select.select_option
      target:
        entity_id: select.solax_remotecontrol_power_control
      data:
        option: "Enabled Battery Control"
    - service: number.set_value
      target:
        entity_id: number.solax_remotecontrol_active_power
      data:
        value: -5000  # 5kW vybíjení
    - service: button.press
      target:
        entity_id: button.solax_remotecontrol_set
```

## 🎯 REŽIMY ŘÍZENÍ:

### Remote Control (doporučené - nešetří EEPROM):
1. **Enabled Battery Control**
   - ✅ Kladné hodnoty = nabíjení
   - ✅ Záporné hodnoty = vybíjení
   - ✅ Ideální pro časté změny

2. **Enabled Grid Control**
   - ✅ Řízení importu/exportu ze sítě
   - ✅ Kladné = import, záporné = export

### Klasické režimy (šetří EEPROM):
- Force Charge, Force Discharge
- Self Use, Stop Charge/Discharge

## 🤖 POKROČILÉ MOŽNOSTI:

### 5. PREDBOT ADDON (volitelné)
- Automatická optimalizace na 48 hodin
- Integrace s Octopus Energy
- Solcast PV prognózy
- Exportní sloty při vysokých cenách

### 6. MONITORING
- SOC baterie monitoring
- PV výkon predikce
- Cenové trendy elektřiny

## 📋 PRIORITA ÚKOLŮ:

### 🔴 VYSOKÁ (ráno):
1. ✅ Ranní test reálné funkčnosti
2. ✅ Instalace solax-modbus integrace
3. ✅ Konfigurace Remote Control

### 🟡 STŘEDNÍ (odpoledne):
4. ✅ Cenové automatizace
5. ✅ Test nabíjení/vybíjení

### 🟢 NÍZKÁ (večer):
6. ✅ PredBat setup
7. ✅ Pokročilé monitorování

## 💡 KLÍČOVÉ POZNATKY:

### ✅ VÝHODY X3-ULT:
- **Remote Control** - žádné EEPROM omezení
- **Write_multiple_registers** podpora
- **Gen4/Gen5** pokročilé funkce
- **Modbus multiplexer** stabilní komunikace

### ⚠️ UPOZORNĚNÍ:
- Používat **Remote Control** místo klasických režimů
- **EEPROM má limit** ~100,000 zápisů
- **Multiplexer je nutný** pro stabilní komunikaci

## 🎯 CÍL ZÍTŘKA:
**Kompletní automatizované řízení SolaX X3-ULT podle cen elektřiny s možností optimalizace výroby a spotřeby energie.**

---
**Status:** 📋 PLÁN PŘIPRAVEN
**Čas implementace:** ~4-6 hodin
**Očekávaný výsledek:** ✅ FUNKČNÍ SMART GRID OPTIMALIZACE