# 🚀 LiteLLM Production Setup - KOMPLETNÍ

## ✅ Úspěšně nainstalováno a nakonfigurováno!

### 📊 Aktuální konfigurace:

| Komponenta | Hodnota |
|------------|---------|
| **API URL** | http://localhost:4000 |
| **Dashboard** | http://localhost:4000/ui |
| **API Key** | `sk-1234567890abcdef` |
| **UI Username** | `admin` |
| **UI Password** | `admin123` |
| **Databáze** | PostgreSQL (localhost:5432/litellm_db) |
| **Log** | `/tmp/litellm.log` |

### 🤖 Dostupné modely (Ollama):

- `llama3.1-70b` - Meta Llama 3.1 70B
- `llama3.3-70b` - Meta Llama 3.3 70B  
- `qwen2.5-coder-32b` - Qwen 2.5 Coder 32B
- `qwen2.5-32b` - Qwen 2.5 32B
- `mixtral-8x7b` - Mixtral MoE
- `mistral-7b` - Mistral 7B Instruct
- `deepseek-r1-14b` - DeepSeek R1 14B
- `czech-finance` - Český finanční model

### 🚀 Spuštění serveru:

```bash
./start_litellm_production.sh
```

Nebo manuálně:
```bash
cd ~
source litellm-venv/bin/activate
export LITELLM_MASTER_KEY="sk-1234567890abcdef"
export LITELLM_SALT_KEY="sk-SALT-KEY-DO-NOT-CHANGE-12345"
export DATABASE_URL="postgresql://litellm:litellm123@localhost:5432/litellm_db"
export UI_USERNAME="admin"
export UI_PASSWORD="admin123"
litellm --config litellm_production.yaml --port 4000
```

### 📝 Příklady použití:

#### 1. Seznam modelů:
```bash
curl http://localhost:4000/v1/models \
  -H "Authorization: Bearer sk-1234567890abcdef"
```

#### 2. Chat completion:
```bash
curl http://localhost:4000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-1234567890abcdef" \
  -d '{
    "model": "llama3.1-70b",
    "messages": [
      {"role": "user", "content": "Ahoj, jak se máš?"}
    ],
    "temperature": 0.7
  }'
```

#### 3. Python klient:
```python
import openai

client = openai.OpenAI(
    base_url="http://localhost:4000/v1",
    api_key="sk-1234567890abcdef"
)

response = client.chat.completions.create(
    model="czech-finance",
    messages=[
        {"role": "user", "content": "Analyzuj tuto fakturu..."}
    ]
)
print(response.choices[0].message.content)
```

### 🌐 Dashboard:

1. Otevřete: http://localhost:4000/ui
2. Přihlaste se:
   - Username: `admin`
   - Password: `admin123`
3. V dashboardu můžete:
   - Sledovat využití API
   - Spravovat API klíče
   - Monitorovat výkon
   - Konfigurovat modely

### 💾 Databáze:

PostgreSQL databáze ukládá:
- Konfiguraci modelů
- API klíče a uživatele
- Logy požadavků
- Statistiky využití

Připojení k databázi:
```bash
psql -U litellm -d litellm_db -h localhost
# Heslo: litellm123
```

### 🔧 Údržba:

#### Restart serveru:
```bash
pkill -f litellm
./start_litellm_production.sh
```

#### Přidání nového modelu:
1. Stáhněte model: `ollama pull nazev-modelu`
2. Přidejte do `~/litellm_production.yaml`
3. Restartujte server

#### Záloha databáze:
```bash
pg_dump -U litellm -h localhost litellm_db > litellm_backup.sql
```

### 🛠️ Řešení problémů:

| Problém | Řešení |
|---------|--------|
| Port 4000 obsazený | `lsof -ti :4000 \| xargs kill -9` |
| Databáze nefunguje | `brew services restart postgresql@16` |
| Ollama neběží | `ollama serve` |
| Chybí Prisma | `cd ~ && source litellm-venv/bin/activate && prisma generate` |

### 📁 Důležité soubory:

- Konfigurace: `~/litellm_production.yaml`
- Proměnné prostředí: `~/.env`
- Virtual environment: `~/litellm-venv/`
- Prisma schema: `~/schema.prisma`
- Spouštěcí skript: `~/start_litellm_production.sh`
- Log: `/tmp/litellm.log`

### 🎯 Výhody tohoto setupu:

1. **Jednotné API** - všechny modely přes OpenAI kompatibilní rozhraní
2. **Autentizace** - zabezpečený přístup pomocí API klíčů
3. **Perzistence** - konfigurace uložená v databázi
4. **Monitoring** - webový dashboard pro sledování
5. **Škálovatelnost** - připraveno pro produkční nasazení

---
**Instalace dokončena:** 20.8.2025
**Verze:** LiteLLM v1.75.8 + PostgreSQL 16.10