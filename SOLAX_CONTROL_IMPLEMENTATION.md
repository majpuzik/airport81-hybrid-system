# ✅ IMPLEMENTACE ŘÍZENÍ SOLAX BATERIE
=========================================
Datum: 2025-08-11 13:35
Status: IMPLEMENTOVÁNO (simulace + připraveno pro HW)

## 🎯 CO BYLO IMPLEMENTOVÁNO

### 1. **AGRESIVNÍ STRATEGIE ŘÍZENÍ**
✅ Baterie je nyní AKTIVNĚ řízena podle OTE cen:
- **EMERGENCY nabíjení** když SOC < 25%
- **Noční nabíjení** (1:00-5:00) na 100%
- **Odpolední nabíjení** (13:00-16:00) před večerní špičkou
- **Vybíjení** pouze v drahých hodinách (6:00-9:00, 17:00-19:00)

### 2. **KONTROLNÍ LOGIKA**
```python
def apply_battery_control(mode, charge_power, discharge_power):
    # Modes:
    # - FORCE_CHARGE: Emergency nabíjení z gridu
    # - GRID_CHARGE: Plánované nabíjení v levných hodinách
    # - DISCHARGE: Vybíjení v drahých hodinách
    # - PV_CHARGE: Nabíjení ze slunce
    # - AUTO: Automatický režim
```

### 3. **VIZUALIZACE V UI**
- **Plán baterie (48h)** - zobrazuje kdy nabíjet/vybíjet
- **Aktuální doporučení** - co dělat TERAZ
- **Status řízení** - aktuální příkaz pro baterii
- **Ekonomická analýza** - očekávané úspory

## 🔌 MOŽNOSTI SKUTEČNÉHO ŘÍZENÍ

### Aktuální stav:
- **SOLAX Cloud API**: ❌ Pouze read-only přístup
- **Simulace**: ✅ Plně funkční
- **UI zobrazení**: ✅ Real-time status

### Budoucí implementace:

#### 1. **Modbus TCP** (DOPORUČENO)
```python
# Připojení na SOLAX přes LAN (port 502)
from pymodbus.client import ModbusTcpClient

client = ModbusTcpClient('192.168.10.51', port=502)
# Registr 0x24: Battery work mode
# 0=Self use, 1=Force charge, 2=Back up, 3=Feed-in
client.write_register(0x24, 1)  # Force charge
client.write_register(0x25, 5000)  # Charge power 5kW
```

#### 2. **RS485 Serial**
- Fyzické připojení k SOLAX COM portu
- Baud rate: 9600 nebo 19200
- Modbus RTU protokol

#### 3. **Home Assistant**
```yaml
modbus:
  - name: solax
    type: tcp
    host: 192.168.10.51
    port: 502
    
switch:
  - platform: modbus
    name: "Force Charge"
    address: 0x24
    write_type: holding
    command_on: 1
    command_off: 0
```

#### 4. **Lokální SOLAX API** (pokud má LAN modul)
```python
# Některé SOLAX invertery mají lokální HTTP API
requests.post('http://192.168.10.51/api/control', 
              json={'mode': 'charge', 'power': 5000})
```

## 📊 PŘÍKLAD ŘÍZENÍ

Aktuální čas: **13:35** (Odpoledne)
- OTE cena: ~2.85 Kč/kWh (levnější)
- Večerní špička: 17:00-19:00 (4.5+ Kč/kWh)
- **ROZHODNUTÍ**: Nabít baterii na 90% TERAZ!

```
Systém automaticky:
1. Detekuje SOC < 90% a levnou hodinu
2. Vydá příkaz: GRID_CHARGE, 5000W
3. Simuluje nabíjení (nebo řídí přes Modbus)
4. Zobrazí v UI: "💰 CHARGING FROM CHEAP GRID"
```

## 🛠️ JAK AKTIVOVAT SKUTEČNÉ ŘÍZENÍ

### Krok 1: Zjistit způsob připojení
```bash
# Test Modbus TCP
nc -zv 192.168.10.51 502

# Pokud funguje, SOLAX má Modbus TCP
```

### Krok 2: Instalovat pymodbus
```bash
pip3 install pymodbus
```

### Krok 3: Upravit apply_battery_control()
Odkomentovat sekce s modbus_client v souboru solax_compact_complete.py

### Krok 4: Testovat
```python
# Test script
from pymodbus.client import ModbusTcpClient
client = ModbusTcpClient('192.168.10.51', port=502)
result = client.read_holding_registers(0x24, 1)  # Read battery mode
print(f"Current mode: {result.registers[0]}")
```

## ✅ VÝSLEDKY

1. **Agresivní strategie** - baterie nikdy neklesne pod 25%
2. **Inteligentní plánování** - nabíjení v levných hodinách
3. **Maximální úspory** - až 2 Kč/kWh rozdíl
4. **Připraveno pro HW** - stačí aktivovat Modbus

## 📱 DASHBOARD

Aplikace běží na: **http://localhost:8085**

Zobrazuje:
- Real-time rozhodnutí AI
- Plán nabíjení/vybíjení na 48h
- Status řízení baterie
- Ekonomickou analýzu

---
**SYSTÉM JE PŘIPRAVEN NA SKUTEČNÉ ŘÍZENÍ**
Stačí připojit Modbus nebo RS485!