# 🌩️ SOLAX CLOUD API PŘES HACS - AKTUÁLNÍ STAV 2024
===================================================
Datum: 2025-08-06
Status: 🔍 BETA INTEGRACE DOSTUPNÁ

## 📦 HLAVNÍ INTEGRACE: frank8the9tank/Home-assistant-Solax-cloud

### 🔗 Repository:
```
https://github.com/frank8the9tank/Home-assistant-Solax-cloud
```

### 🚀 INSTALACE:

1. **Otevřete HACS** v Home Assistant
2. Klikněte na **3 tečky** vpravo nahoře
3. Vyberte **"Custom repositories"**
4. Přidejte:
   - URL: `https://github.com/frank8the9tank/Home-assistant-Solax-cloud`
   - Category: **Integration**
5. Klikněte **ADD**
6. Najděte **"Solax cloud"** v HACS
7. Klikněte **DOWNLOAD**
8. Restartujte Home Assistant

### ⚠️ DŮLEŽITÉ:
- Použijte sériové číslo **PocketLAN/PocketWiFi** (NE inverteru!)
- Sériové číslo najdete na štítku PocketWiFi donglu
- Integrace je v BETA verzi

### 📋 KONFIGURACE:

Po restartu:
1. **Settings → Devices & Services**
2. **"+ ADD INTEGRATION"**
3. Hledejte **"Solax cloud"**
4. Vyplňte:
   - **Registration No**: Sériové číslo PocketWiFi (NE inverteru!)
   - **Username**: email ze solaxcloud.com
   - **Password**: heslo

## 🔧 ALTERNATIVNÍ ŘEŠENÍ:

### 1. **VRÁTIT POCKETWIFI + LOKÁLNÍ MODBUS**
Protože PocketWiFi poskytuje Modbus bránu:
```bash
1. Vrátit PocketWiFi zpět do SOLAX
2. V LCD menu inverteru: Settings → Advanced Settings → Modbus → Enable
3. Použít wills106/homeassistant-solax-modbus integraci
4. Konfigurace přes multiplexer na 192.168.10.83:5020
```

### 2. **RS485 ADAPTÉR**
Pro přímé připojení bez PocketWiFi:
- **Waveshare RS485 to Ethernet Converter**
- Režim: Modbus TCP to RTU
- Připojit k RS485 portu SOLAX

### 3. **ESPHOME BRIDGE**
Vlastní řešení:
- ESP32 + RS485 modul
- Konfigurace přes ESPHome
- Vlastní WiFi bridge

## 📊 SROVNÁNÍ ŘEŠENÍ:

| Řešení | Výhody | Nevýhody |
|--------|--------|----------|
| **Cloud API** | ✅ Funguje vždy<br>✅ Historická data | ❌ Zpoždění 5 min<br>❌ Závislost na internetu |
| **Lokální Modbus** | ✅ Real-time data<br>✅ Plná kontrola | ❌ Složitější setup<br>❌ Problémy s PocketWiFi |
| **RS485 adaptér** | ✅ Spolehlivé<br>✅ Bez konfliktů | ❌ Další hardware<br>❌ Kabeláž |

## 🎯 DOPORUČENÍ PRO VÁŠ PŘÍPAD:

Protože:
- PocketWiFi poskytuje Modbus bránu
- Bez PocketWiFi není Modbus dostupný
- SOLAX je na ethernet síti

**Nejlepší řešení:**
1. Vraťte PocketWiFi zpět
2. Povolit Modbus v LCD menu
3. Použít lokální Modbus integraci s multiplexerem
4. Záložně nainstalovat Cloud API

---
**Aktualizováno:** 2025-08-06
**Zdroj:** GitHub frank8the9tank, HA Community fórum