# 🎤 Instalace Whisper Addon pro Home Assistant

## Způsob 1: Přes Home Assistant Web UI

1. **Otevřete Home Assistant**: http://localhost:8123
2. **Settings → Add-ons → Add-on Store**
3. **Search**: "whisper"
4. **Nainstalujte**: "Whisper STT" addon
5. **Configuration**:
   ```yaml
   model: base
   language: cs
   beam_size: 1
   ```
6. **Start** addon

## Způsob 2: Přes Supervisor API

```bash
# List dostupných addon
curl -X GET "http://localhost:8123/api/supervisor/store" \
  -H "Authorization: Bearer SUPERVISOR_TOKEN"

# Install Whisper addon
curl -X POST "http://localhost:8123/api/supervisor/addons/core_whisper/install" \
  -H "Authorization: Bearer SUPERVISOR_TOKEN"
```

## Způsob 3: Manual přes Docker

Pokud není addon dostupný, můžeme spustit Whisper samostatně:

```bash
# Pull Whisper image
docker pull openai/whisper

# Run Whisper server
docker run -d --name whisper-stt \
  -p 9000:9000 \
  -e MODEL=base \
  -e LANGUAGE=cs \
  openai/whisper
```

## Po instalaci:

1. **Aktualizovat HA configuration.yaml**:
   ```yaml
   stt:
     - platform: whisper
       model: base  
       language: cs
   ```

2. **Restart Home Assistant**

3. **Test STT API**:
   ```bash
   curl -X POST http://localhost:8123/api/stt/stt.whisper \
     -H "Content-Type: audio/wav" \
     --data-binary @test.wav
   ```

## Current Status:

✅ Whisper konfigurace přidána do HA  
⏳ Čeká na instalaci Whisper addon  
🔄 AI Controller připraven na Whisper API

Systém automaticky použije Whisper pro STT jakmile bude dostupný, jinak padne zpět na Web Speech API.

## Test:

Až bude Whisper funkční, zkuste na http://localhost:5001:
- Klikněte na modrý mikrofon 🎤
- Řekněte "Je zavřený bazén?"
- Systém použije Whisper místo Web Speech API