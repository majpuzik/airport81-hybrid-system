# 🔍 ANALÝZA PROBLÉMU SOLAX PŘIPOJENÍ
====================================
Datum: 2025-08-06 10:25
Status: 🔴 IDENTIFIKOVÁN PROBLÉM

## 📊 SOUČASNÝ STAV:

### ✅ CO FUNGUJE:
1. **SOLAX je online** - ping OK (192.168.10.51)
2. **Port 502 je OTEVŘENÝ** - nmap ukazuje "open mbap"
3. **TCP připojení funguje** - nc se připojí
4. **Multiplexer běží** - na portu 5020
5. **HA vidí multiplexer** - 192.168.10.83:5020 dostupný

### ❌ CO NEFUNGUJE:
1. **Modbus komunikace** - Connection reset by peer
2. **Multiplexer forwarding** - žádné logy o připojení
3. **Čtení registrů** - všechny pokusy selhávají

## 🔍 IDENTIFIKOVANÝ PROBLÉM:

### SOLAX PRAVDĚPODOBNĚ POUŽÍVÁ JINÝ PROTOKOL NEBO KONFIGURACI:

1. **Možná není standard Modbus TCP:**
   - Port 502 je otevřený, ale neodpovídá na Modbus dotazy
   - Může používat proprietární protokol
   - Nebo vyžaduje specifickou inicializaci

2. **Rozdíl proti backup #4:**
   - Včera v noci možná SOLAX byl v jiném režimu
   - Nebo byl nakonfigurován jinak
   - Možná byl použit jiný slave ID nebo protokol

## 🎯 MOŽNÁ ŘEŠENÍ:

### 1. POUŽÍT SPRÁVNOU INTEGRACI:
Backup #4 uvádí, že SOLAX Modbus integrace byla `.disabled` protože X3-ULT nebyl oficiálně podporován. Možná potřebujeme:
- Speciální verzi integrace pro X3-ULT
- Jiný protokol než standard Modbus
- Specific initialization sequence

### 2. ZKONTROLOVAT DOKUMENTACI X3-ULT:
- X3-ULT může mít jiný komunikační protokol
- Možná vyžaduje autentizaci
- Nebo specifické registry

### 3. ALTERNATIVNÍ PŘÍSTUPY:
- SOLAX Cloud API místo lokálního Modbus
- RS485 místo TCP/IP
- Jiný port nebo protokol

## 📝 ZÁVĚR:

**Problém NENÍ v multiplexeru ani síťové konfiguraci.**

Problém je v tom, že SOLAX X3-ULT pravděpodobně:
1. Nepoužívá standard Modbus TCP protokol
2. Vyžaduje speciální inicializaci
3. Nebo je v režimu, který neumožňuje lokální přístup

## 🚀 DOPORUČENÝ POSTUP:

1. **Nainstalovat wills106/homeassistant-solax-modbus**
   - Tato integrace má podporu pro různé modely SOLAX
   - Možná obsahuje specifickou konfiguraci pro X3-ULT

2. **Zkontrolovat SOLAX nastavení**
   - Je povolen lokální přístup?
   - Je Modbus TCP aktivní?
   - Jaký je správný slave ID?

3. **Alternativy:**
   - SOLAX Cloud integrace
   - RS485 adapter
   - Jiná komunikační metoda

---
**Status:** 🔴 VYŽADUJE JINÝ PŘÍSTUP
**Příčina:** SOLAX X3-ULT pravděpodobně nepoužívá standard Modbus TCP