# 🌩️ SOLAX CLOUD API - KOMPLETNÍ NÁVOD
======================================
Datum: 2025-08-06 20:10
Status: ✅ OVĚŘENÉ ŘEŠENÍ

## 🎯 SPRÁVNÉ PŘIPOJENÍ PŘES SOLAX CLOUD API

### 1. **ZÍSKÁNÍ tokenID** (NE API key!)
```
1. Přihlaste se na: https://www.solaxcloud.com (nebo global.solaxcloud.com)
2. Jděte do: User Center → Service → API
   NEBO: Service → Third party ecosystem (novější verze)
3. Najděte/vygenerujte "tokenID"
4. POZOR: Není to "API key" ale "tokenID"!
```

**DŮLEŽITÉ**: V novějších verzích portálu může být API sekce pod:
- Service → Third party ecosystem → Create new key
- Zde vytvořte nový klíč pro Home Assistant

### 2. **SPRÁVNÉ SÉRIOVÉ ČÍSLO**
- Použijte SN **WiFi/LAN donglu** (NE inverteru!)
- Najdete ho:
  - Na štítku donglu
  - V SolaX Cloud aplikaci
  - V SSID WiFi hotspotu

### 3. **TESTOVACÍ URL**
```bash
https://www.solaxcloud.com:9443/proxy/api/getRealtimeInfo.do?tokenId=YOUR_TOKEN_ID&sn=YOUR_SERIAL_NUMBER
```

## ⚠️ ČASTÉ CHYBY:

### ❌ "API klíč neplatný" - DŮVODY:

1. **Používáte špatný typ klíče**
   - ✅ SPRÁVNĚ: tokenID z portálu
   - ❌ ŠPATNĚ: API key, heslo, sériové číslo

2. **Špatné SN**
   - ✅ SPRÁVNĚ: SN donglu (např. SW3XXXXXXX)
   - ❌ ŠPATNĚ: SN inverteru

3. **Překlepy**
   - Pozor na: 1/l, O/0
   - Zkopírujte znovu

4. **Zařízení není na vašem účtu**
   - Zkontrolujte v seznamu zařízení

5. **Starý token**
   - Vygenerujte nový

6. **API limity**
   - Max 10 dotazů/minutu
   - Max 10,000 dotazů/den

## ✅ KONTROLNÍ CHECKLIST:

- [ ] Přihlášen na SolaX Cloud web (www nebo global)
- [ ] Sekce Service → API nebo Service → Third party ecosystem
- [ ] Vytvořen nový klíč v Third party ecosystem (pokud potřeba)
- [ ] Zkopírován tokenID (ne API key!)
- [ ] SN donglu (ne inverteru!)
- [ ] Zařízení viditelné v účtu
- [ ] Test URL funguje

## 🚀 INTEGRACE DO HOME ASSISTANT:

### Pro integraci frank8the9tank:
```yaml
Username: váš email
Password: vaše heslo  
Registration No: SN donglu
Token ID: váš tokenID
```

### Pro jiné integrace:
```yaml
API URL: https://www.solaxcloud.com:9443/proxy/api/
Token: váš tokenID
Serial: SN donglu
```

## 💡 DŮLEŽITÉ POZNÁMKY:

1. **tokenID ≠ API key** - většina návodů to plete!
2. **SN donglu ≠ SN inverteru** - zásadní rozdíl!
3. **Nový token** - pokud nefunguje, vygenerujte nový
4. **Role uživatele** - někdy nutné povolit od admina
5. **Third party ecosystem** - v novějších verzích portálu vytvořte klíč zde
6. **global.solaxcloud.com** - některé účty jsou na global portálu

## 📞 POKUD STÁLE NEFUNGUJE:

1. Vygenerujte nový tokenID
2. Ověřte práva u instalační firmy
3. Kontaktujte SolaX support
4. Zkuste jiný prohlížeč/počítač

---
**TIP**: Standardní "API key" NEPOTŘEBUJETE!
Stačí: tokenID (z portálu) + SN (donglu)