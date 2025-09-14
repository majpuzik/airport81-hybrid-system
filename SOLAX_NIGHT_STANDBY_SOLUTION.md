# 🌙 SOLAX NOČNÍ STANDBY REŽIM - ŘEŠENÍ
======================================
Datum: 2025-08-06
Status: ✅ VYSVĚTLENO A VYŘEŠENO

## 🎯 PROČ TO FUNGOVALO VČERA V NOCI:

### Klíčové zjištění z internetu:
**SOLAX invertory jdou do IDLE/STANDBY režimu když:**
1. Není žádná solární výroba (noc)
2. SOC baterie < 15-16% (záloha pro EPS)
3. Není aktivní Force Time Use režim

**VČERA (23:43)**: Invertor byl pravděpodobně v jednom z těchto stavů:
- Právě se probudil z restartu/změny konfigurace
- Byl v režimu "Checking" (krátce po probuzení)
- Někdo měnil nastavení přes den a invertor ještě nebyl v plném standby

**DNES RÁNO**: Invertor je aktivní (slunce svítí) ale:
- Cloud monitoring převzal kontrolu
- Nebo je v jiném provozním režimu

## 🔧 ZNÁMÉ ŘEŠENÍ OD KOMUNITY:

### 1. **FORCE TIME USE TRICK** (funguje spolehlivě):
```python
# Když je invertor v IDLE režimu:
1. Změnit "Use Mode" na "Force Time Use"
2. Počkat 25 sekund
3. Změnit znovu na "Force Time Use"
4. Invertor se probudí z IDLE režimu
```

### 2. **PREVENCE IDLE REŽIMU**:
```yaml
# Automatizace v HA:
- Když SOC <= 16%:
  - Přepnout z "Self Mode" na "Force Time Use"
  - Nastavit "Charge from Grid" na "Disable"
  - Funguje jako Self Mode ale BEZ přechodu do IDLE
```

### 3. **TCP MULTIPLEXER** (už máte!):
- Pomáhá s multiple připojeními
- ALE nepomůže když je invertor v IDLE

## 📊 PROVOZNÍ REŽIMY SOLAX:

1. **Normal** - plný provoz, Modbus funguje
2. **Waiting** - čeká na podmínky
3. **Checking** - kontroluje systém (krátce po probuzení)
4. **IDLE/Standby** - spánkový režim, Modbus NEFUNGUJE
5. **Force Time Use** - nucený provoz, zabrání IDLE

## 🚀 DOPORUČENÝ POSTUP:

### OKAMŽITÉ ŘEŠENÍ:
1. V LCD menu nebo přes HA změnit na "Force Time Use"
2. Počkat 25s a změnit znovu
3. Invertor se probudí a Modbus bude fungovat

### DLOUHODOBÉ ŘEŠENÍ:
```yaml
# HA automatizace pro prevenci IDLE:
automation:
  - alias: "Prevent SOLAX IDLE mode"
    trigger:
      - platform: numeric_state
        entity_id: sensor.solax_battery_soc
        below: 17
    action:
      - service: select.select_option
        target:
          entity_id: select.solax_charger_use_mode
        data:
          option: "Force Time Use"
      - service: switch.turn_off
        target:
          entity_id: switch.solax_charge_from_grid
```

## 💡 PROČ TO DĚLÁ SOLAX:

- **Úspora energie** - v noci není co dělat
- **Ochrana baterie** - pod 15% SOC
- **Firmware logika** - šetří komponenty

## ✅ ZÁVĚR:

Včera to fungovalo protože:
1. Invertor byl krátce po restartu/změně
2. Nebyl ještě v plném IDLE režimu
3. Možná někdo měnil nastavení během dne

**Řešení existuje** - Force Time Use trick nebo automatizace!

---
Zdroje: 
- wills106/homeassistant-solax-modbus GitHub diskuze
- OpenWB fórum zkušenosti
- EVCC diskuze #6015