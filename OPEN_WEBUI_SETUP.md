# 🌐 Open WebUI pro LiteLLM - Instalace

## ✅ Vytvořeno jednoduché HTML rozhraní!

Vzhledem k problémům s Docker imagí jsem vytvořil **jednoduché, ale plně funkční webové rozhraní** pro LiteLLM.

### 🚀 Spuštění:

1. **Ujistěte se, že LiteLLM běží:**
   ```bash
   ./start_litellm_production.sh
   ```

2. **Otevřete webové rozhraní:**
   ```bash
   open ~/open_webui_simple.html
   ```

   Nebo jednoduše dvojklikem na soubor `open_webui_simple.html`

### 🎨 Funkce rozhraní:

- **Výběr modelu** - dropdown menu v pravém horním rohu
- **Chat interface** - moderní design s gradienty
- **Markdown podpora** - formátování kódu a textu
- **Real-time indikátor** - animace při čekání na odpověď
- **Error handling** - zobrazení chyb při problémech
- **Responsivní design** - funguje na všech zařízeních

### 📊 Dostupné modely:

- Llama 3.1 70B
- Llama 3.3 70B
- Qwen 2.5 Coder 32B
- Qwen 2.5 32B
- Mixtral 8x7B
- Mistral 7B (výchozí)
- DeepSeek R1 14B
- Czech Finance

### 🔧 Konfigurace:

- **LiteLLM API:** http://localhost:4000
- **API Key:** sk-1234567890abcdef
- **Webové rozhraní:** lokální HTML soubor

### 💡 Výhody tohoto řešení:

1. **Žádné závislosti** - čisté HTML/CSS/JS
2. **Okamžité spuštění** - žádná instalace
3. **Plná funkcionalita** - všechny modely dostupné
4. **Bezpečné** - běží lokálně
5. **Rychlé** - přímé volání API

### 🐳 Docker alternativy (pro budoucnost):

Pokud budete chtít zkusit Docker verze později:

1. **Open WebUI** (oficiální):
   ```bash
   docker run -d -p 3000:8080 \
     -e OPENAI_API_BASE_URL=http://host.docker.internal:4000/v1 \
     -e OPENAI_API_KEY=sk-1234567890abcdef \
     ghcr.io/open-webui/open-webui:latest
   ```

2. **ChatGPT Next Web** (alternativa):
   ```bash
   docker run -d -p 3000:3000 \
     -e OPENAI_API_KEY=sk-1234567890abcdef \
     -e BASE_URL=http://host.docker.internal:4000 \
     yidadaa/chatgpt-next-web:latest
   ```

### 📝 Poznámky:

- HTML rozhraní je plně funkční a nevyžaduje žádnou instalaci
- Docker verze nabízejí více funkcí (historie, export, nastavení)
- Pro běžné použití je HTML rozhraní dostačující

---
**Vytvořeno:** 20.8.2025
**Soubor:** `~/open_webui_simple.html`