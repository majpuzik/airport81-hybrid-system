# 🔧 SOLAX PŘIPOJENÍ PŘES MULTIPLEXER - ŘEŠENÍ
==============================================
Datum: 2025-08-06 15:30
Status: 🔍 DIAGNOSTIKA

## 📊 AKTUÁLNÍ STAV:

### ✅ CO FUNGUJE:
1. **Multiplexer běží** na 192.168.10.83:5020
2. **TCP připojení funguje** (ale okamžitě reset)
3. **PocketWiFi je aktivní** (port 502 otevřený)
4. **Přímé připojení** částečně funguje (slave 1,3 OK, 4 ne)

### ❌ PROBLÉM:
- "Connection reset by peer" na VŠECH slave ID (1,3,4)
- Stejná chyba přímé i přes multiplexer

## 🎯 KLÍČOVÝ PROBLÉM:

**MODBUS NENÍ POVOLEN V INVERTER MENU!**

### Kroky k povolení:

1. **Na PocketWiFi (http://5.8.8.8/)**:
   - Login: admin / sériové číslo donglu
   - Zkontrolovat nastavení sítě
   - Ověřit firmware verzi (musí být V3.004.03+)

2. **Na LCD INVERTERU**:
   ```
   Settings → Advanced Settings → Modbus
   - Enable Modbus: YES ✅
   - RS485 Addr: 1 (nebo 4)
   - Baud Rate: 9600
   ```

3. **Restart systému**:
   - Vypnout inverter
   - Odpojit PocketWiFi na 30s
   - Zapnout vše znovu

## 🔄 SPRÁVNÁ KONFIGURACE MULTIPLEXERU:

Váš multiplexer je nastaven správně:
```bash
docker run -d --name modbus-proxy-mapped \
  --restart unless-stopped \
  -p 5020:5020 \
  ghcr.io/ingmarstein/tcp-multiplexer \
  server -t 192.168.10.51:502 -l 5020 -p modbus -v
```

## 🚀 JAK SE PŘIPOJIT PŘES DEN:

### 1. **Povolit Modbus v inverteru** (KRITICKÉ!)
### 2. **Použít správný slave ID** (zkuste 1)
### 3. **V HA nakonfigurovat**:
   ```yaml
   Host: 192.168.10.83
   Port: 5020
   Slave ID: 1
   ```

## 💡 PROČ TO NEFUNGUJE:

1. **Modbus je VYPNUTÝ** v menu inverteru
2. **PocketWiFi jen předává** - pokud inverter nemá Modbus povolen, vrací reset
3. **Cloud monitoring** může blokovat, ale hlavní problém je vypnutý Modbus

## ✅ ŘEŠENÍ:

1. **OKAMŽITĚ**: Jděte k inverteru a povolte Modbus v LCD menu
2. **POTOM**: Multiplexer začne fungovat
3. **NAKONEC**: Instalujte wills106 integraci v HA

---
**DŮLEŽITÉ**: Bez povoleného Modbus v inverteru NIKDY nebude fungovat!