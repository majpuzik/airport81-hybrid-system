# 🔋 SOLAX X3-ULTRA MODBUS - KOMPLETNÍ PRŮVODCE
=============================================
Datum: 2025-08-06 10:30
Status: 🔍 NALEZENO ŘEŠENÍ

## 🚨 KLÍČOVÉ ZJIŠTĚNÍ:

### 1. **MODBUS JE STANDARDNĚ VYPNUTÝ!**
- Modbus connection is by default **DISABLED**
- Musí být **POVOLEN** přes LCD menu inverteru

### 2. **NASTAVENÍ PŘES LCD DISPLEJ:**
```
Settings → Advanced Settings → Modbus
- Baud Rate: 9600 (výchozí)
- RS485 Addr: 1 (nebo 4 - zkontrolovat)
```

### 3. **ZNÁMÉ PROBLÉMY:**

#### A) **Multiple Connection Issue**
- SOLAX povoluje pouze **JEDNO** Modbus připojení současně
- Pokud je připojený PocketWiFi, Cloud gateway nebo jiné zařízení = blokuje Modbus TCP
- **ŘEŠENÍ**: Použít TCP multiplexer (což máme!)

#### B) **Connection Reset Errors**
Uživatelé hlásí stejné chyby jako my:
- "connection reset by peer"
- "broken pipe"
- Funguje chvíli, pak selže

**Možné příčiny:**
1. **Firmware issue** - nutný update
2. **StandBy mode** - inverter jde do spánku
3. **Konflikt s cloud připojením**

## 🎯 DOPORUČENÝ POSTUP:

### KROK 1: Zkontrolovat LCD menu
```
1. Jít k inverteru
2. LCD menu: Settings → Advanced Settings → Modbus
3. Ověřit:
   - Je Modbus povolen?
   - Jaká je adresa? (1 nebo 4)
   - Jaký je baud rate?
```

### KROK 2: Odpojit konkurenční připojení
- Vypnout PocketWiFi (pokud používáte)
- Odpojit cloud gateway
- Zkontrolovat, že nikdo jiný není připojen

### KROK 3: Restart inverteru (pokud možné)
```
FAQ doporučuje:
1. Restart router
2. Reload integrace v HA
3. Pokud nefunguje - odpojit PocketWiFi na 30s
4. Znovu reload integrace
```

### KROK 4: Použít správnou IP
Pro **X3-Ultra s PocketWiFi 3.0**:
```
1. Připojit se na WiFi: Wifi_Sxxxxxxxxx
2. Otevřít: http://5.8.8.8/
3. Login: admin / admin (nebo dongleSN)
4. Získat IP adresu inverteru
```

## 📊 TECHNICKÉ DETAILY:

### Podporované komunikace X3-Ultra:
- ✅ Modbus přes **RS485**
- ✅ Modbus přes **TCP** (port 502)
- ✅ Některé modely mají **vestavěný LAN port**

### Důležité registry (Gen5):
**POZOR**: X3-Ultra je Gen5 - registry se LIŠÍ od Gen4!
- Mnoho Select a Number entit se přesunulo na jiné registry
- Nutná správná integrace podporující Gen5

## 🔧 TROUBLESHOOTING:

### Pokud stále nefunguje:
1. **Zkontrolovat fyzické připojení**
   - POZOR: Port označený "COM" NENÍ Ethernet!
   - NEPŘIPOJOVAT COM port do switche - zničí se!

2. **Více inverterů?**
   - Každý musí mít JINOU Modbus adresu
   - Master: 1, Slave: 200, atd.

3. **Použít RS485 adaptér**
   - Pokud TCP nefunguje
   - Waveshare RS485 to Ethernet
   - Režim: "Modbus TCP to RTU"

## 💡 ZÁVĚR:

**Váš problém je pravděpodobně:**
1. ❌ Modbus není povolen v LCD menu
2. ❌ Jiné zařízení blokuje připojení (cloud/app)
3. ❌ Firmware potřebuje update

**Řešení:**
1. ✅ Povolit Modbus v menu inverteru
2. ✅ Odpojit konkurenční připojení
3. ✅ Použít multiplexer (už máme!)
4. ✅ Instalovat wills106/homeassistant-solax-modbus

---
**Zdroje:** 
- SolaX KB článek
- GitHub issues wills106/homeassistant-solax-modbus
- OpenHAB community fóra