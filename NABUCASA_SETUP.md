# ☁️ Nastavení Nabu Casa Cloud pro Home Assistant

## Účet a přihlášení:

**Email**: majpuzik@gmail.com  
**Heslo**: Dasa_beda2208n

## Instalace přes Home Assistant UI:

### 1. Otevřete Home Assistant
http://localhost:8123

### 2. Přejděte do Settings
- Settings → System → Network → Home Assistant Cloud

### 3. Přihlašte se k Nabu Casa
- Klikněte "Sign in"
- Email: majpuzik@gmail.com
- Password: Dasa_beda2208n

### 4. Aktivujte služby
- ✅ **Remote Control** - pro vzdálený přístup
- ✅ **Voice Assistant** - pro cloud STT/TTS
- ✅ **Google Assistant** - pro Google Home integraci
- ✅ **Amazon Alexa** - pro Alexa integraci

### 5. Konfigurace STT
Po přihlášení bude automaticky dostupné:
- `stt.cloud` - Nabu Casa Cloud STT
- `tts.cloud` - Nabu Casa Cloud TTS

## Testování:

Po aktivaci zkuste na http://localhost:5001:
1. Klikněte na modrý mikrofon 🎤
2. Řekněte "Je zavřený bazén?"
3. V debug panelu uvidíte: "Trying Nabu Casa Cloud STT"

## Výhody Nabu Casa Cloud STT:

✅ **Nejlepší přesnost** pro češtinu  
✅ **Rychlé zpracování** v cloudu  
✅ **Podpora diakritiky** (ěščřžýáíé)  
✅ **Automatické aktualizace** modelů  
✅ **Žádná lokální instalace** potřebná  

## Fallback pořadí:

1. **Nabu Casa Cloud** (nejlepší)
2. **Local Whisper** (záloha)
3. **Web Speech API** (poslední možnost)

## Po nastavení:

Restartujte Home Assistant:
```bash
docker-compose restart homeassistant
```

Pak rebuild AI controller:
```bash
docker-compose build loxone-ai && docker-compose up -d loxone-ai
```

## Cena:

- **$6.50/měsíc** pro Home Assistant Cloud
- **Zdarma trial** na 30 dní
- Zahrnuje remote access + voice services

## Status:

✅ Konfigurace přidána do HA  
✅ AI Controller připraven  
⏳ Čeká na přihlášení k Nabu Casa účtu