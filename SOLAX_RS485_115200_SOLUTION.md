# 🔌 SOLAX X3-ULTRA RS485 PŘIPOJENÍ - BAUD 115200
=================================================
Datum: 2025-08-06 16:00
Status: 🔍 ALTERNATIVNÍ ŘEŠENÍ

## 💡 VAŠE POSTŘEH: RS485 s baud rate 115200

### Co víme o X3-Ultra RS485:
1. **Výchozí baud rate**: 9600 (standard)
2. **Maximální podporovaný**: až 115200 (některé modely)
3. **RS485 port**: COM1 na inverteru
4. **Piny**: 4 (modrý) = A, 5 (bílo-modrý) = B

## 🎯 PROČ BY TO MOHLO FUNGOVAT:

### 1. **PocketWiFi možná používá jiný protokol**
- Modbus TCP na portu 502 může být jen "wrapper"
- Skutečná komunikace může být proprietární
- Baud 115200 = vysokorychlostní komunikace

### 2. **X3-Ultra Gen5 specifika**
- Novější generace může mít jiné výchozí nastavení
- LCD menu může ukazovat jiný baud rate než TCP

### 3. **Dva nezávislé RS485 busy**
- Piny 1,2,7,8 = hlavní bus
- Piny 3,4,5,6 = záložní bus
- Různé rychlosti pro různé účely?

## 🔧 JAK OTESTOVAT:

### 1. **Zkontrolovat LCD menu inverteru**:
```
Settings → Advanced Settings → Modbus
- Baud Rate: ??? (zkontrolovat!)
- RS485 Addr: 1 nebo 4
```

### 2. **RS485 adaptér test**:
```python
# Test různých baud rates
baud_rates = [9600, 19200, 38400, 57600, 115200]
for baud in baud_rates:
    # Zkusit komunikaci
```

### 3. **Waveshare RS485 to Ethernet**:
- Nastavit jako "Modbus TCP to RTU bridge"
- Port: 502
- Baud rate: zkusit 115200
- Data bits: 8, Stop bits: 1, Parity: None

## 📊 MOŽNÉ SCÉNÁŘE:

### A) **PocketWiFi dělá převod protokolů**
- RS485 (115200) → TCP (502)
- Proprietární protokol → Standard Modbus

### B) **Dva různé komunikační kanály**
- Modbus RTU: 9600 baud (standard)
- Proprietární: 115200 baud (rychlý)

### C) **Firmware specifika**
- Novější firmware používá vyšší rychlost
- Starší dokumentace uvádí 9600

## 🚀 DOPORUČENÝ POSTUP:

1. **Vypnout PocketWiFi**
2. **Připojit RS485 adaptér přímo**
3. **Zkusit různé baud rates**:
   - 115200 (vaše doporučení)
   - 57600
   - 38400
   - 19200
   - 9600 (standard)

4. **Použít správné piny**:
   - Pin 4 (modrý) → A
   - Pin 5 (bílo-modrý) → B

## 💡 ZÁVĚR:

Máte pravdu - problém může být v komunikační rychlosti!
- PocketWiFi možná překládá mezi různými protokoly
- 115200 baud je neobvyklé pro Modbus, ale možné
- X3-Ultra Gen5 může mít jiné nastavení než dokumentace

**Test přímého RS485 připojení odhalí pravdu!**

---
Zdroje:
- wills106 dokumentace (podporuje až 115200)
- SolaX KB článek o RS485 portech
- OpenEnergyMonitor komunita zkušenosti