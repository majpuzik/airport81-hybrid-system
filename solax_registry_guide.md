# SOLAX X3-ULT Registry Guide

## ✅ OVĚŘENÉ REGISTRY S REÁLNÝMI DATY

### AC Napětí (Oblast 0x060x)
- `0x060e`: 383 - Možná AC Voltage L1
- `0x060f`: 455 - Možná AC Voltage L2  
- `0x0611`: 306 - Možná AC Voltage L3
- `0x0612`: 347 - Další AC parametr

### Výkon (Oblast 0x090x)
- `0x090a`: 360 - Možná aktuální výkon (W)
- `0x0902`: 1500 - Možná max výkon nastavení
- `0x0906`: 1500 - Možná další výkon konfigurace

### Konfigurace (Oblast 0x0a0x)
- `0x0a00`: 1500 - Základní konfigurace
- `0x0a04`: 360 - Výkon parametr
- `0x0a05`: 215 - Další hodnota
- `0x0a08`: 405 - Parametr
- `0x0a10`: 990 - Vysoká hodnota (možná celkový výkon?)

### Systémové (Oblast 0x0200)
- `0x0200`: 1 - Status flag
- `0x0201`: 2 - Status flag
- `0x0203`: 10 - Malá hodnota
- `0x0208`: 8242 - Možná sériové číslo/ID

## 🔧 KONFIGURACE V HOME ASSISTANT

### Multiplexer připojení:
- **Host**: `192.168.10.83`
- **Port**: `5020`
- **Slave ID**: `1` (obvykle)

### Doporučené senzory pro testování:
```yaml
modbus:
  - name: "solax_test"
    host: 192.168.10.83
    port: 5020
    sensors:
      - name: "SOLAX AC Voltage L1"
        address: 1550  # 0x060e
        data_type: uint16
        unit_of_measurement: "V"
        scale: 0.1
        
      - name: "SOLAX Current Power"  
        address: 2314  # 0x090a
        data_type: uint16
        unit_of_measurement: "W"
        
      - name: "SOLAX High Value"
        address: 2576  # 0x0a10  
        data_type: uint16
        unit_of_measurement: "W"
```

## 📝 POZNÁMKY

1. **Adresy jsou v decimálním formátu** pro HA:
   - 0x060e = 1550 decimal
   - 0x090a = 2314 decimal
   - 0x0a10 = 2576 decimal

2. **Jednotky jsou odhadované** - testujte a upravte scale faktory

3. **X3-ULT není oficiálně podporován** - používáme multiplexer pro test

4. **Hodnoty se mohou měnit** v závislosti na denní době a zatížení

## 🚀 TESTOVÁNÍ

Spusťte `python test_solax_realtime.py` pro ověření aktuálních hodnot před konfigurací v HA.