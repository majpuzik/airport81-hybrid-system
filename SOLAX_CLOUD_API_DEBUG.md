# 🔍 SOLAX CLOUD API - DEBUGGING
================================
Datum: 2025-08-06 20:20
Status: ❌ Token Invalid

## 📊 TESTOVACÍ ÚDAJE:
- **tokenID**: 20250803221326929030314
- **SN donglu**: SNNTF49WK7
- **Portal**: https://global.solaxcloud.com (ne www!)

## ❌ VÝSLEDEK TESTU:
```json
{
  "exception": "token invalid!",
  "code": 103,
  "success": false
}
```

## 🎯 MOŽNÉ PŘÍČINY:

### 1. **Používáte GLOBAL portal**
- Váš účet je na: https://global.solaxcloud.com
- NE na: https://www.solaxcloud.com
- Token z jednoho portálu NEFUNGUJE na druhém!

### 2. **Token je neplatný/starý**
- Vygenerujte NOVÝ token
- Na správném portálu: global.solaxcloud.com

### 3. **Špatné místo pro token**
- User Center → Service → API
- Někdy označeno jako "Service Platform"

## ✅ SPRÁVNÝ POSTUP:

1. **Přihlaste se na**: https://global.solaxcloud.com
2. **Najděte**: User Center → Service → API
3. **Vygenerujte NOVÝ tokenID**
4. **Testovací URL pro GLOBAL**:
```
https://global.solaxcloud.com:9443/proxy/api/getRealtimeInfo.do?tokenId=NOVY_TOKEN&sn=SNNTF49WK7
```

## 💡 DŮLEŽITÉ:
- **global.solaxcloud.com** ≠ **www.solaxcloud.com**
- Jsou to RŮZNÉ systémy!
- Token z jednoho NEFUNGUJE na druhém

## 🚀 PRO HOME ASSISTANT:

Pokud používáte global portal, možná budete muset:
1. Upravit URL v integraci
2. Nebo použít jinou integraci podporující global API

---
**AKCE**: Vygenerujte nový token na global.solaxcloud.com!