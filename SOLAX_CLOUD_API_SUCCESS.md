# ✅ SOLAX CLOUD API - ÚSPĚŠNÉ PŘIPOJENÍ!
=========================================
Datum: 2025-08-06 20:25
Status: ✅ FUNGUJE!

## 🎉 PŘIPOJENÍ ÚSPĚŠNÉ!

### Vaše údaje:
- **tokenID**: 20250807021517756732674 ✅
- **SN donglu**: SNNTF49WK7 ✅
- **Portal**: https://global.solaxcloud.com ✅

### Testovací URL:
```
https://global.solaxcloud.com:9443/proxy/api/getRealtimeInfo.do?tokenId=20250807021517756732674&sn=SNNTF49WK7
```

## 📊 AKTUÁLNÍ DATA Z VAŠEHO SOLAX:

| Parametr | Hodnota | Jednotka |
|----------|---------|----------|
| **Výkon AC** | -596 | W (dodávka do sítě) |
| **Dnešní výroba** | 64.1 | kWh |
| **Celková výroba** | 360.7 | kWh |
| **Dodávka do sítě** | -8286 | W |
| **SOC baterie** | 10 | % |
| **Výkon baterie** | 9 | W |
| **DC1 (string 1)** | 26 | W |
| **DC2 (string 2)** | 66 | W |
| **DC3 (string 3)** | 161 | W |
| **Typ inverteru** | 25 | (X3-Ultra) |
| **Poslední update** | 20:13:23 | |

## 🏠 PRO HOME ASSISTANT:

### 1. **Instalace přes HACS**:
```
HACS → Custom repositories
URL: https://github.com/frank8the9tank/Home-assistant-Solax-cloud
Category: Integration
```

### 2. **Konfigurace**:
```yaml
Username: váš email na global.solaxcloud.com
Password: vaše heslo
Token ID: 20250807021517756732674
Registration No: SNNTF49WK7
```

### 3. **Dostupné entity**:
- `sensor.solax_SNNTF49WK7_ac_power` (-596 W)
- `sensor.solax_SNNTF49WK7_battery_soc` (10%)
- `sensor.solax_SNNTF49WK7_today_yield` (64.1 kWh)
- `sensor.solax_SNNTF49WK7_battery_power` (9 W)
- `sensor.solax_SNNTF49WK7_grid_power` (-8286 W)
- atd...

## 📝 POZNÁMKY:

1. **Záporný výkon** = dodávka do sítě
2. **SOC 10%** = baterie téměř vybitá
3. **Update každých 5 minut** (cloud omezení)
4. **API limity**: 10,000 requestů/den

## 🚀 VÝHODY CLOUD API:

✅ Funguje se starým firmwarem donglu
✅ Žádné problémy s Modbus
✅ Jednoduchá instalace
✅ Historická data dostupná

## ⚠️ NEVÝHODY:

❌ Zpoždění 5 minut
❌ Závislost na internetu
❌ Omezené možnosti řízení

---
**Status**: CLOUD API PLNĚ FUNKČNÍ! 🎉