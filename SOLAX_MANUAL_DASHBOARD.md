# 🎨 RUČNÍ VYTVOŘENÍ SOLAX DASHBOARDU

## ✅ DATA FUNGUJÍ! 
Entity mají hodnoty:
- **sensor.ac_power** = 2354 W (aktuální výkon)
- **sensor.yield_today** = dnešní výroba
- **sensor.battery_power** = výkon baterie

## 📋 JAK VYTVOŘIT DASHBOARD RUČNĚ:

### 1. UPRAVIT EXISTUJÍCÍ SOLAX DASHBOARD:

1. Otevřete: http://192.168.10.35:8123
2. Klikněte na **SOLAX** v levém menu
3. Klikněte na **3 tečky** vpravo nahoře
4. Vyberte **"Upravit dashboard"** nebo **"Edit Dashboard"**
5. Klikněte **"Spustit"** nebo **"Start"**

### 2. PŘIDAT KARTY:

#### KARTA 1: GAUGE (Velký ukazatel)
1. Klikněte **"+ Přidat kartu"**
2. Vyberte **"Gauge"** (měřidlo)
3. Nastavte:
   - **Entity:** sensor.ac_power
   - **Název:** FV Výkon
   - **Jednotka:** W
   - **Min:** 0
   - **Max:** 20000
4. **Uložit**

#### KARTA 2: ENTITIES (Seznam hodnot)
1. Klikněte **"+ Přidat kartu"**
2. Vyberte **"Entities"**
3. Přidejte entity:
   - sensor.yield_today (Dnešní výroba)
   - sensor.battery_power (Výkon baterie)
   - sensor.feedin_power (Do sítě)
   - sensor.battery_status (Stav baterie)
4. **Uložit**

#### KARTA 3: HISTORY GRAPH (Graf)
1. Klikněte **"+ Přidat kartu"**
2. Vyberte **"History Graph"**
3. Nastavte:
   - **Title:** Graf výkonu - Dnes
   - **Entity:** sensor.ac_power
   - **Hours to show:** 24
4. **Uložit**

#### KARTA 4: HISTORY GRAPH (Týden)
1. Klikněte **"+ Přidat kartu"**
2. Vyberte **"History Graph"**
3. Nastavte:
   - **Title:** Graf výkonu - Týden
   - **Entity:** sensor.ac_power
   - **Hours to show:** 168
4. **Uložit**

### 3. DOKONČIT:
1. Klikněte **"Hotovo"** nebo **"Done"** (vpravo nahoře)

## 🎯 NEBO RYCHLÁ METODA - RAW EDITOR:

1. V editačním módu klikněte na **3 tečky**
2. Vyberte **"Raw configuration editor"**
3. Nahraďte vše tímto:

```yaml
title: SOLAX
views:
  - title: Přehled
    path: prehled
    cards:
      - type: gauge
        entity: sensor.ac_power
        name: FV Výkon
        unit: W
        min: 0
        max: 20000
        needle: true
        
      - type: entities
        title: Aktuální hodnoty
        entities:
          - entity: sensor.yield_today
            name: Dnešní výroba
          - entity: sensor.battery_power
            name: Výkon baterie
          - entity: sensor.feedin_power
            name: Do sítě
          - entity: sensor.battery_status
            name: Stav baterie
            
      - type: history-graph
        title: Graf výkonu - Dnes
        entities:
          - sensor.ac_power
        hours_to_show: 24
        
      - type: history-graph
        title: Graf výkonu - Týden
        entities:
          - sensor.ac_power
        hours_to_show: 168
        
      - type: horizontal-stack
        cards:
          - type: entity
            entity: sensor.mppt1_power
            name: MPPT 1
          - type: entity
            entity: sensor.mppt2_power
            name: MPPT 2
            
      - type: entities
        title: Baterie
        entities:
          - sensor.battery_voltage
          - sensor.battery_current
          - sensor.battery_temperature_1
          - sensor.battery_temperature_2
          - sensor.battery_cycle_count
```

4. Klikněte **"Uložit"**

## 📊 VŠECHNY DOSTUPNÉ ENTITY:

```
sensor.ac_power - AC výkon (W)
sensor.yield_today - Dnešní výroba (kWh)
sensor.yield_total - Celková výroba (kWh)
sensor.battery_power - Výkon baterie (W)
sensor.battery_status - Stav baterie
sensor.battery_voltage - Napětí baterie (V)
sensor.battery_current - Proud baterie (A)
sensor.battery_temperature_1 - Teplota 1 (°C)
sensor.battery_temperature_2 - Teplota 2 (°C)
sensor.battery_cycle_count - Počet cyklů
sensor.feedin_power - Do sítě (W)
sensor.mppt1_power - MPPT 1 výkon (W)
sensor.mppt2_power - MPPT 2 výkon (W)
sensor.ac_phase_1_power - Fáze L1 (W)
sensor.ac_phase_2_power - Fáze L2 (W)
sensor.ac_phase_3_power - Fáze L3 (W)
```

---
**Vytvořeno:** 2025-08-17 13:50