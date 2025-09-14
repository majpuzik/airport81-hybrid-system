# 🌐 Nabu Casa Remote Access - Kompletní návod

## 🔗 Vaše Remote URLs

### Home Assistant UI:
**https://[vase-jmeno].ui.nabu.casa**
- Funguje odkudkoliv bez VPN
- Stejné přihlašovací údaje jako lokálně
- Všechny funkce jako doma

### Webhooks pro API:
**https://[vase-jmeno].ui.nabu.casa/api/webhook/loxone_light_control_secure_2025**
**https://[vase-jmeno].ui.nabu.casa/api/webhook/loxone_query_secure_2025**

## 📱 Co můžete hned vyzkoušet:

### 1. Mobile Access
- Otevřete cloud URL na mobilu
- Přihlaste se stejnými údaji
- Ovládejte světla, teploty, bazén

### 2. Google Assistant Integration
```
"Ok Google, zapni světlo v jídelně"
"Ok Google, nastav teplotu ložnice na 22 stupňů"  
"Ok Google, zavři bazén"
```

### 3. Remote API Calls
```bash
# Zapnout světlo v jídelně ze vzdáleného místa
curl -X POST https://[vase-jmeno].ui.nabu.casa/api/webhook/loxone_light_control_secure_2025 \
  -H "Content-Type: application/json" \
  -d '{"action": "turn_on", "location": "jidelna"}'

# Dotaz na stav bazénu
curl -X POST https://[vase-jmeno].ui.nabu.casa/api/webhook/loxone_query_secure_2025 \
  -H "Content-Type: application/json" \
  -d '{"question": "Je zavřený bazén?"}'
```

## 🏠 Voice Assistant s Cloud STT

### Priorita STT engínů:
1. **🥇 Nabu Casa Cloud** (nejlepší pro češtinu)
2. **🥈 Local Whisper** (offline záloha)  
3. **🥉 Web Speech API** (prohlížečová záloha)

### Test z mobilu:
- Otevřete: https://[vase-jmeno].ui.nabu.casa:5001
- Voice control funguje i vzdáleně!
- Debug panel ukáže "Trying Nabu Casa Cloud STT"

## 🤖 Google Home Setup

### Automatický import:
1. **Google Home app** → ⚙️ **Settings**
2. **Works with Google** → 🔍 **"Home Assistant Cloud"**
3. **Link** → Přihlaste se účtem majpuzik@gmail.com
4. **Import entities** - automaticky se přidají:
   - "Světlo v jídelně"
   - "Světlo v kuchyni"
   - "Světlo v obýváku" 
   - "Klimatizace ložnice"
   - "Zastření bazénu"

### Voice Commands:
```
"Ok Google, zapni jídelnu"
"Ok Google, vypni světlo v kuchyni"
"Ok Google, nastav topení ložnice na 23"
"Ok Google, zavři bazén"
```

## 📲 Home Assistant Companion App

### Setup External Access:
1. **HA Companion App** → ⚙️ **Settings**
2. **Companion App** → **Home Assistant URL**
3. **Add** cloud URL jako external
4. **Auto-switch** mezi local/remote

## 🔐 Bezpečnost

### Automaticky zajištěno:
✅ **SSL/TLS** - automatické HTTPS  
✅ **Authentication** - vaše HA přihlašovací údaje  
✅ **Firewall** - pouze povolené porty  
✅ **Šifrování** - end-to-end encryption  

### Webhook Security:
- Unikátní ID: `loxone_light_control_secure_2025`
- Pouze JSON POST požadavky
- Logování všech přístupů

## 💰 Costs & Benefits

### Cena: $6.50/měsíc
### Zahrnuje:
✅ Remote UI access  
✅ Cloud STT/TTS (nejlepší pro češtinu)  
✅ Google Assistant integration  
✅ Alexa integration  
✅ Automatické SSL certifikáty  
✅ 24/7 uptime monitoring  

### ROI pro váš projekt:
- **Žádné VPN** potřeba
- **SSL vyřešeno** automaticky
- **Voice quality** lepší než lokální Whisper
- **Mobile access** odkudkoliv

## 🚀 Next Steps

### Ihned dostupné:
1. **Test remote UI** - otevřete cloud URL
2. **Import do Google Home** - automatická integrace
3. **Mobile app setup** - external URL
4. **Voice control** - funguje i vzdáleně

### Pokročilé možnosti:
- **IFTTT integrace** přes webhooks
- **Telegram boty** s remote příkazy  
- **External monitoring** systémů
- **Backup voice access** při výpadku internetu doma

**Status: ✅ Plně funkční remote access připraven!**