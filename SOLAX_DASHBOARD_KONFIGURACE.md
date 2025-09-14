# 🎨 SOLAX CLOUD DASHBOARD - KONFIGURACE KARET
=====================================

## 📍 KDE JSTE TEĎ:
V režimu úprav prázdného dashboardu "Solax Cloud"

## ➕ JAK PŘIDAT KARTY:

### KROK 1: Klikněte na modré kulaté tlačítko "+" vpravo dole

### KROK 2: Vyberte typ karty:
1. **"Přidat kartu"** → "Karta entit" (pro seznam hodnot)
2. **"Přidat kartu"** → "Měřič" (pro baterii)
3. **"Přidat kartu"** → "Graf" (pro historii)

## 📊 DOPORUČENÉ KARTY:

### 1. PŘEHLED VÝKONU (Karta entit)
```yaml
type: entities
title: Solax - Aktuální výkon
entities:
  - entity: sensor.solax_ac_power
    name: AC výkon
    icon: mdi:flash
  - entity: sensor.solax_pv_power_total
    name: FV výkon
    icon: mdi:solar-power
  - entity: sensor.solax_battery_power
    name: Výkon baterie
    icon: mdi:battery-charging
  - entity: sensor.solax_grid_power
    name: Výkon ze/do sítě
    icon: mdi:transmission-tower
```

### 2. STAV BATERIE (Měřič)
```yaml
type: gauge
entity: sensor.solax_battery_soc
name: Stav baterie
unit: '%'
min: 0
max: 100
severity:
  green: 50
  yellow: 20
  red: 10
needle: true
```

### 3. DENNÍ VÝROBA (Statistiky)
```yaml
type: statistic
entity: sensor.solax_today_yield
period:
  calendar:
    period: day
stat_type: state
name: Dnešní výroba
```

### 4. VŠECHNY ENTITY (Kompletní přehled)
```yaml
type: entities
title: Solax Cloud - Všechny hodnoty
entities:
  - entity: sensor.solax_ac_power
    name: AC výkon
  - entity: sensor.solax_battery_soc
    name: Stav baterie %
  - entity: sensor.solax_battery_power
    name: Výkon baterie
  - entity: sensor.solax_battery_temperature
    name: Teplota baterie
  - entity: sensor.solax_dc_power_pv1
    name: DC výkon PV1
  - entity: sensor.solax_dc_power_pv2
    name: DC výkon PV2
  - entity: sensor.solax_feedin_power
    name: Dodávka do sítě
  - entity: sensor.solax_grid_power
    name: Výkon ze/do sítě
  - entity: sensor.solax_house_load
    name: Spotřeba domu
  - entity: sensor.solax_pv_power_total
    name: Celkový FV výkon
  - entity: sensor.solax_today_feed_in
    name: Dnešní dodávka
  - entity: sensor.solax_today_yield
    name: Dnešní výroba
  - entity: sensor.solax_total_feed_in
    name: Celková dodávka
  - entity: sensor.solax_total_yield
    name: Celková výroba
```

## 🎯 JAK PŘIDAT KARTU:

1. Klikněte modré "+" tlačítko
2. Vyberte "Karta entit" 
3. Klikněte "Zobrazit editor kódu" (vpravo nahoře v kartě)
4. Smažte vše a vložte YAML kód výše
5. Klikněte "Uložit"

## 💡 TIPY:

- Začněte s kartou "PŘEHLED VÝKONU"
- Pak přidejte "STAV BATERIE" měřič
- Nakonec přidejte "VŠECHNY ENTITY" pro kompletní přehled

## ⚠️ POKUD NEVIDÍTE ENTITY:

1. Zkontrolujte v: Nastavení → Zařízení a služby → Solax Cloud
2. Klikněte na "1 zařízení" nebo počet entit
3. Zkontrolujte, že entity nejsou disabled

---
Po přidání karet klikněte "HOTOVO" vpravo nahoře!