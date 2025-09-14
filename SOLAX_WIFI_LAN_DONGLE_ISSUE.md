# 🚨 KRITICKÉ ZJIŠTĚNÍ: PocketWiFi+LAN DONGLE
============================================
Datum: 2025-08-06 19:20
Status: ❌ PROBLÉM IDENTIFIKOVÁN

## 🔴 HLAVNÍ PROBLÉM:

### Váš dongle: **PocketWiFi+LAN V1.002.09**
- **WIFI + LAN v jednom** (nelze odebrat jen WiFi část!)
- **Firmware V1.002.09** je PŘÍLIŠ STARÝ!
- **Minimum pro Modbus**: V3.004.03

## 📊 CO TO ZNAMENÁ:

1. **Bez donglu = SOLAX není v síti** ✅ (potvrzeno)
2. **S donglem = Modbus NEFUNGUJE** (starý firmware)
3. **Nemůžete použít jiný adaptér** (dongle poskytuje síťové připojení)

## 🎯 JEDINÉ ŘEŠENÍ:

### **UPDATE FIRMWARE DONGLU!**

#### Kroky:
1. **Kontaktovat SolaX support**
   - Email: service@solaxpower.com
   - Požádat o firmware V3.004.03 nebo novější
   - Uvést sériové číslo donglu

2. **Lokální update** (pokud získáte firmware):
   ```
   - Připojit se na WiFi donglu
   - http://5.8.8.8/ → System → Update firmware
   - Nahrát nový firmware
   ```

3. **Remote update** (bezpečnější):
   - SolaX support může updatovat vzdáleně
   - Nutný přístup k internetu

## ⚠️ DŮLEŽITÉ POZNÁMKY:

### Proč to včera fungovalo?
- Možná jste testovali jiný protokol/port
- Nebo dongle měl dočasně aktivní nějaký debug režim
- Starší firmware může být nestabilní

### Alternativní řešení:
1. **Cloud API** (funguje i se starým firmwarem)
2. **Výměna za novější dongle** (PocketWiFi 3.0)
3. **Přímé RS485** připojení (pokud má inverter RS485 port)

## 💡 ZÁVĚR:

**Váš současný firmware V1.002.09 NEPODPORUJE Modbus správně!**

Dokumentace jasně říká:
> "Pocket WiFi 3.0 with Firmware V3.004.03 and above is only officially supported"

**BEZ UPDATE FIRMWARU NEBUDE LOKÁLNÍ MODBUS FUNGOVAT!**

---
Zdroje:
- wills106 dokumentace (FAQ sekce)
- SolaX firmware update guide
- Community reports o starších verzích