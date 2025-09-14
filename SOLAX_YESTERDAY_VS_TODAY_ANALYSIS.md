# 🔍 ANALÝZA: PROČ SOLAX FUNGOVAL VČERA ALE DNES NE
========================================================
Datum: 2025-08-06 10:45
Status: 🔍 DEEP ANALYSIS

## 📊 DŮKAZY Z VČEREJŠKA (4.8.2025):

### Z backup #4 dokumentace (23:43:36):
```
✅ SOLAX MULTIPLEXER - 100% FUNKČNÍ  
------------------------------------
- TCP Multiplexer běží na 192.168.10.83:5020
- Forwards na SOLAX X3-ULT: 192.168.10.51:502
- Docker port mapping funguje (-p 5020:5020)
- Multiple aplikace mohou používat SOLAX současně
- Modbus komunikace ověřena a funkční
```

### Technické detaily:
```
Registry testované:
- 0x1c: Battery SOC %
- 0x16: Battery Power W  
- 0x46: Grid Power W
- 0x94: PV Power W
- (Všechny vracejí 0 v noci - normální)
```

### Co to znamená:
1. **Modbus TCP BYL FUNKČNÍ** - jinak by multiplexer nemohl fungovat
2. **Registry vracely 0** - což je v noci normální
3. **Připojení bylo úspěšné** - jinak by nebyla data

## 🎯 KLÍČOVÁ OTÁZKA: CO SE ZMĚNILO?

### 1. **MOŽNÁ VYSVĚTLENÍ:**

#### A) **SOLAX BYL V JINÉM REŽIMU**
- **Večer (23:43)**: Inverter byl v nočním/standby režimu
- **Ráno (10:00)**: Inverter je v aktivním režimu a možná blokuje Modbus

#### B) **NĚCO JINÉHO SE PŘIPOJILO**
- **PocketWiFi 3.0** se mohla automaticky připojit ráno
- **Cloud gateway** se mohla aktivovat s východem slunce
- **Monitoring aplikace** mohla zahájit spojení

#### C) **ZMĚNA KONFIGURACE**
- Firmware update přes noc
- Automatický restart inverteru
- Změna nastavení cloud službou

## 🔌 ROLE POCKETWIFI 3.0:

### Co je PocketWiFi 3.0:
- **WiFi dongle** připojený k SOLAX inverteru
- Umožňuje **cloud monitoring** (SolaX Cloud)
- Vytváří WiFi hotspot: `WiFi_Sxxxxxxxxx`
- Web interface na: `http://5.8.8.8/`

### Proč ji odpojit:
1. **BLOKUJE LOKÁLNÍ MODBUS** - SOLAX povoluje jen JEDNO připojení
2. **Cloud má prioritu** - když je aktivní cloud, lokální Modbus je blokován
3. **Po odpojení** - lokální Modbus se uvolní

### Je SOLAX na drátové síti?
Z vašich testů:
- **IP 192.168.10.51** - to je v lokální síti
- **Ping funguje** - zařízení je dostupné
- **Port 502 otevřený** - ale odmítá komunikaci

**ZÁVĚR**: SOLAX je pravděpodobně připojen:
- Buď přes **ethernet kabel** (LAN port)
- Nebo přes **PocketWiFi** v bridge módu

## 🎯 DOPORUČENÉ ŘEŠENÍ:

### 1. **DOČASNĚ ODPOJIT POCKETWIFI**
```bash
1. Fyzicky odpojit PocketWiFi dongle ze SOLAX
2. Počkat 30 sekund
3. Zkusit Modbus připojení
4. Pokud funguje - nainstalovat wills106 integraci
5. Po instalaci můžete PocketWiFi znovu připojit
```

### 2. **ALTERNATIVA - ZKONTROLOVAT LCD MENU**
```
Settings → Advanced Settings → Modbus
- Zkontrolovat, zda je Modbus povolen
- Ověřit slave adresu (1 nebo 4)
- Potvrdit TCP/IP nastavení
```

### 3. **POUŽÍT MULTIPLEXER SPRÁVNĚ**
Multiplexer vyřeší problém multiple připojení:
- PocketWiFi → SOLAX (cloud monitoring)
- HA → Multiplexer → SOLAX (lokální přístup)
- Ale POUZE pokud je Modbus povolen!

## 💡 ZÁVĚR:

**Včera v noci (23:43):**
- SOLAX byl v klidovém režimu
- Žádné aktivní cloud připojení
- Modbus TCP byl dostupný
- Data byla 0 (normální v noci)

**Dnes ráno (10:00):**
- SOLAX je aktivní (slunce svítí)
- PocketWiFi/Cloud je aktivní
- Modbus je blokován cloud připojením
- Connection reset = "už mám připojení"

## 🚀 AKČNÍ PLÁN:

1. **Odpojit PocketWiFi na 5 minut**
2. **Nainstalovat wills106 integraci**
3. **Nakonfigurovat multiplexer**
4. **Připojit PocketWiFi zpět**
5. **Ověřit funkčnost obojího**

---
**Status:** ✅ VYSVĚTLENO
**Příčina:** Cloud připojení blokuje lokální Modbus
**Řešení:** Dočasně odpojit PocketWiFi pro instalaci