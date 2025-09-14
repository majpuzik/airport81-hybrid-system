# 🔋 SOLAX CLOUD API - TESTOVACÍ ÚDAJE
=====================================
Datum: 2025-08-06 20:15
Status: 🔐 PŘIPRAVENO K TESTU

## 📋 VAŠE ÚDAJE:

### tokenID:
```
20250803221326929030314
```

## ❓ CO JEŠTĚ POTŘEBUJETE:

### 1. **Sériové číslo (SN) donglu**
- Najdete na štítku PocketWiFi+LAN donglu
- Formát: např. SW3XXXXXXX nebo podobně
- NENÍ to SN inverteru!

### 2. **Testovací URL**
Jakmile máte SN donglu, sestavte URL:
```
https://www.solaxcloud.com:9443/proxy/api/getRealtimeInfo.do?tokenId=20250803221326929030314&sn=VASE_SN_DONGLU
```

## 🚀 JAK OTESTOVAT:

1. **V prohlížeči**:
   - Nahraďte `VASE_SN_DONGLU` skutečným SN
   - Vložte URL do prohlížeče
   - Měli byste dostat JSON data

2. **Příklad odpovědi** (pokud funguje):
```json
{
  "success": true,
  "data": {
    "inverterSN": "...",
    "batteryCapacity": "...",
    "batteryPower": "...",
    ...
  }
}
```

3. **Chybová odpověď**:
```json
{
  "success": false,
  "message": "token is invalid" // nebo jiná chyba
}
```

## 📝 PRO HOME ASSISTANT:

### Frank8the9tank integrace:
```yaml
Username: váš email na solaxcloud.com
Password: vaše heslo
Token ID: 20250803221326929030314
Registration No: SN vašeho donglu
```

## ⚠️ BEZPEČNOST:
- Nesdílejte tokenID veřejně
- Token má platnost (může vypršet)
- Při problémech vygenerujte nový

---
**Potřebujete**: Sériové číslo donglu pro dokončení testu!