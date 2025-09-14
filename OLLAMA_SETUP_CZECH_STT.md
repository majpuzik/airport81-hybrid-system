# 🎤 Nastavení českého rozpoznávání řeči v Ollama

## Co potřebujete udělat na Mac mini M4:

### 1. Instalace Ollama (pokud není nainstalován)
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

### 2. Stažení českého Whisper modelu
```bash
# Základní Whisper model pro češtinu
ollama pull whisper

# Nebo specificky český model (pokud existuje)
ollama pull whisper:large-v3
```

### 3. Alternativa - Vosk model pro češtinu
```bash
# Stáhnout český Vosk model
ollama pull vosk-cs

# Nebo použít multilingual model
ollama pull whisper:multilingual
```

### 4. Spuštění Ollama na správném portu
```bash
# Spustit na portu 11434 (standardní)
ollama serve

# Nebo na jiném portu
OLLAMA_HOST=0.0.0.0:11434 ollama serve
```

### 5. Test dostupnosti
```bash
# Test z terminálu
curl http://localhost:11434/api/tags

# Test ze sítě
curl http://192.168.10.68:11434/api/tags
```

## Současný stav systému:

✅ **Frontend**: Implementován lokální záznam audia + fallback na Web Speech API
✅ **Backend**: Připraven endpoint `/api/speech-to-text` 
✅ **Mobilní podpora**: Detekce zařízení a optimalizace pro mobily
⏳ **Ollama STT**: Čeká na spuštění Ollama na Mac mini

## Jak to funguje:

1. **Desktop/Laptop**: Snaží se použít lokální nahrávání + Ollama STT
2. **Fallback**: Pokud Ollama není dostupný, použije Web Speech API
3. **Mobily**: Automatická detekce a optimalizace pro dotykové ovládání

## Doporučené modely pro češtinu:

1. **whisper:large-v3** - Nejlepší kvalita, pomalejší
2. **whisper:medium** - Kompromis rychlost/kvalita  
3. **whisper:small** - Rychlý, menší přesnost
4. **vosk-cs** - Specificky pro češtinu (pokud dostupný)

## Poznámky:

- Mac mini M4 s 64GB RAM zvládne i největší modely
- Pro reálný čas použijte medium nebo small model
- Systém automaticky detekuje mobilní zařízení
- Debug panel ukazuje co se děje s audio vstupem

## Když bude Ollama funkční:

Web rozhraní na http://localhost:5001 se automaticky přepne na lokální STT a bude zobrazovat:
- "Nahrávám..." při záznamu
- "Zpracovávám s Ollama..." při rozpoznávání  
- "Rozpoznáno: [text]" při úspěchu