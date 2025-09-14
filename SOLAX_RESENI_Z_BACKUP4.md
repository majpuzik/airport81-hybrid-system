# 🔋 SOLAX ŘEŠENÍ Z BACKUP #4 (HA-Loxone-FINAL-backup-20250804-234336)
=====================================================================================
Datum extrakce: 2025-08-05 18:43
Status: ✅ FUNKČNÍ ŘEŠENÍ IDENTIFIKOVÁNO

## 🎯 ZÁKLADNÍ INFORMACE:
========================

**Backup obsahuje:**
- ✅ Kompletní TCP Multiplexer řešení
- ✅ Ověřenou funkční konfiguraci  
- ✅ Docker networking řešení
- ⚠️ SOLAX Modbus integrace byla deaktivována (.disabled)

## 🔧 TECHNICKÉ ŘEŠENÍ:

### 1. TCP MULTIPLEXER - HLAVNÍ KOMPONENTA
```bash
# Docker kontejner pro TCP multiplexing
docker run -d \
  --name modbus-proxy-mapped \
  --restart unless-stopped \
  -p 5020:5020 \
  ghcr.io/ingmarstein/tcp-multiplexer \
  server -t 192.168.10.51:502 -l 5020 -p modbus -v
```

**Konfigurace:**
- Multiplexer port: `5020`
- Target SOLAX: `192.168.10.51:502` 
- Protocol: `modbus`
- Verbose logging: aktivní

### 2. SÍŤOVÁ KONFIGURACE
```
Mac Mini IP: 192.168.10.83
SOLAX X3-ULT IP: 192.168.10.51:502
Multiplexer endpoint: 192.168.10.83:5020
Home Assistant: localhost:8123
```

**Klíčové Docker networking řešení:**
- ❌ `localhost:5020` nefunguje z HA kontejneru
- ✅ `192.168.10.83:5020` funguje správně
- ✅ Host IP address místo localhost

### 3. MODBUS REGISTRY (testované)
```
0x1c: Battery SOC %
0x16: Battery Power W  
0x46: Grid Power W
0x94: PV Power W
```
**Poznámka:** V noci vrací všechny hodnoty 0 (normální chování)

## 📋 IMPLEMENTAČNÍ KROKY:

### KROK 1: Spustit TCP Multiplexer
```bash
# Současný stav z backup #4
docker run -d \
  --name modbus-proxy-mapped \
  --restart unless-stopped \
  -p 5020:5020 \
  ghcr.io/ingmarstein/tcp-multiplexer \
  server -t 192.168.10.51:502 -l 5020 -p modbus -v
```

### KROK 2: Instalovat SOLAX Modbus integraci
```
HACS → Integrace
Vyhledat: "SolaX Modbus"
Download/Stáhnout
Restart Home Assistant
```

### KROK 3: Konfigurace SOLAX Modbus
```
Nastavení → Zařízení a služby → "+ Přidat integraci"
Vyhledat: "SolaX Modbus"
```

**Parametry (z backup #4):**
- Host: `192.168.10.83` (POZOR: NE localhost!)
- Port: `5020`
- Interface: `tcp`
- Plugin: `solax`
- Inverter name suffix: `Inverter`
- Scan interval: `15s`
- TCP type: `tcp`
- Timeout: `5s`

## 🚨 KRITICKÉ POZOROVÁNÍ Z BACKUP #4:

### ✅ CO FUNGOVALO:
1. **TCP Multiplexer běžel na portu 5020**
2. **Multiple aplikace mohly používat SOLAX současně**
3. **Modbus komunikace byla ověřena a funkční**
4. **Docker port mapping fungoval (-p 5020:5020)**

### ⚠️ DŮVOD DEAKTIVACE:
- SOLAX X3-ULT model nebyl oficiálně podporován
- Integrace byla označena jako `.disabled`
- Infrastruktura byla připravena pro budoucí použití

### 🔍 DOCKER NETWORKING FIX:
**Problem:** HA kontejner nemohl přistupovat k `localhost:5020`
**Solution:** Použití host IP `192.168.10.83:5020`

## 🎯 SOUČASNÉ APLIKOVÁNÍ:

### Zkontrolovat aktuální stav:
```bash
# Je multiplexer spuštěný?
docker ps | grep modbus-proxy

# Test připojení
nc -zv 192.168.10.83 5020
```

### Aktivovat SOLAX Modbus:
```bash
# Pokud je ve složce .disabled
mv /Users/m.a.j.puzik/homeassistant/custom_components/solax_modbus.disabled \
   /Users/m.a.j.puzik/homeassistant/custom_components/solax_modbus

# Restart HA
docker restart homeassistant
```

## 💡 KLÍČOVÉ POZNATKY Z BACKUP #4:

1. **Multiplexer je NUTNOST** - SOLAX blokuje multiple connections
2. **Host IP je KLÍČOVÉ** - localhost nefunguje z kontejneru
3. **Registry fungují** - jen v noci vrací nuly
4. **Systém byl PRODUCTION READY** - jen X3-ULT nebyl podporován

## 🚀 VÝHODY TOHOTO ŘEŠENÍ:

✅ **Multiple aplikace** mohou používat SOLAX současně
✅ **Síťové problémy vyřešeny** (localhost vs IP)
✅ **Testované registry** s reálnými daty
✅ **Docker infrastruktura** připravena
✅ **Backup dokumentace** kompletní

## 📊 AKTUÁLNÍ RECOMMENDATIONS:

1. **Zkontrolovat** zda multiplexer stále běží
2. **Otestovat** připojení k portu 5020
3. **Aktivovat** SOLAX Modbus integraci
4. **Použít** host IP místo localhost
5. **Testovat** ráno při slunci pro reálná data

---
**Status:** ✅ ŘEŠENÍ IDENTIFIKOVÁNO A ZDOKUMENTOVÁNO
**Zdroj:** HA-Loxone-FINAL-backup-20250804-234336
**Extrahováno:** Claude Code Assistant
**Připraveno k aplikování:** ANO