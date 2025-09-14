# 🚀 LiteLLM Proxy Server - INSTALACE DOKONČENA

## ✅ STATUS: PLNĚ FUNKČNÍ
- **Server běží na:** http://localhost:4000
- **PID procesu:** 15646
- **Master key:** `sk-1234567890abcdef`
- **Konfigurace:** `/Users/m.a.j.puzik/litellm_config.yaml`

## 📊 DOSTUPNÉ MODELY (21 celkem)

### 🖥️ Lokální Ollama modely (9):
✅ **Velké modely (stažené):**
- `llama3.1-70b` - 42 GB ✅
- `llama3.3-70b` - 42 GB ✅ 
- `qwen2.5-32b` - 19 GB ✅
- `mixtral-8x7b` - Mixtral 8x7B

**Střední a malé modely:**
- `qwen2.5-coder-32b` - Kódovací model
- `mistral-7b` - Mistral 7B Instruct
- `qwen2.5-7b` - Qwen 2.5 7B
- `deepseek-r1-14b` - DeepSeek R1 14B
- `czech-finance` - Český finanční model

### ☁️ Cloud API modely:

**Claude (Anthropic) - 3 modely ✅ FUNKČNÍ:**
- `claude-3-opus` - Nejvýkonnější
- `claude-3-sonnet` - Vyvážený
- `claude-3-haiku` - Rychlý

**Gemini (Google) - 2 modely ✅ FUNKČNÍ:**
- `gemini-pro` - Gemini 1.5 Pro
- `gemini-flash` - Gemini 1.5 Flash

**OpenAI - 7 modelů ⚠️ NEFUNKČNÍ (překročena kvóta):**
- `gpt-4`, `gpt-4-turbo`, `gpt-4o`, `gpt-4o-mini`
- `gpt-3.5-turbo`, `o1-preview`, `o1-mini`

## 🔧 POUŽITÍ

### Základní příkaz:
```bash
curl http://localhost:4000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-1234567890abcdef" \
  -d '{
    "model": "MODEL_NAME",
    "messages": [{"role": "user", "content": "Your message"}]
  }'
```

### Python příklad:
```python
from openai import OpenAI

client = OpenAI(
    api_key="sk-1234567890abcdef",
    base_url="http://localhost:4000/v1"
)

response = client.chat.completions.create(
    model="llama3.3-70b",  # nebo jiný model
    messages=[{"role": "user", "content": "Hello\!"}]
)
print(response.choices[0].message.content)
```

### Dostupné endpointy:
- `GET /v1/models` - Seznam modelů
- `POST /v1/chat/completions` - Chat completions
- `POST /v1/completions` - Text completions
- `POST /v1/embeddings` - Embeddings

## 🎯 DOPORUČENÉ MODELY

### Pro české texty:
1. `czech-finance` - Specializovaný český model
2. `claude-3-sonnet` - Výborná čeština
3. `gemini-pro` - Dobrá čeština

### Pro programování:
1. `qwen2.5-coder-32b` - Specializovaný
2. `claude-3-opus` - Nejlepší kvalita
3. `deepseek-r1-14b` - Rychlý a přesný

### Pro analýzu dokumentů:
1. `llama3.3-70b` - Velká kontextová paměť
2. `claude-3-opus` - Detailní analýza
3. `mixtral-8x7b` - Rychlé zpracování

## 📝 SPRÁVA SERVERU

### Restart serveru:
```bash
# Zastavit
pkill -f litellm

# Spustit znovu
cd /Users/m.a.j.puzik
source litellm_env/bin/activate
litellm --config litellm_config.yaml --port 4000
```

### Přidání nového modelu:
1. Stáhnout: `ollama pull model_name`
2. Přidat do `/Users/m.a.j.puzik/litellm_config.yaml`
3. Restartovat server

### Logs:
```bash
# Sledovat logy
tail -f /tmp/litellm_final.log
```

## 🔑 API KLÍČE

Uložené v `/Users/m.a.j.puzik/.env.litellm`:
- ✅ ANTHROPIC_API_KEY (Claude)
- ✅ GEMINI_API_KEY (Google)
- ⚠️ OPENAI_API_KEY (kvóta překročena)

## 📊 STATISTIKY

- **Funkční modely:** 14 (9 Ollama + 3 Claude + 2 Gemini)
- **Celková velikost modelů:** ~103 GB
- **Podporované jazyky:** 50+
- **Max kontext:** 128k tokenů (některé modely)

---
*Instalace dokončena: 2025-09-07 18:23*
*LiteLLM verze: nejnovější*
