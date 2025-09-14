# 🚀 N8N Test Environment - Setup Guide

## ✅ Status: BĚŽÍ!

**URL:** http://localhost:5678  
**Username:** admin  
**Password:** n8n-test-2024

## 📝 Jak importovat workflow

1. **Otevřete N8N** v prohlížeči: http://localhost:5678
2. **Přihlaste se** (admin / n8n-test-2024)
3. **Klikněte na menu** (levý horní roh) → **Workflows**
4. **Klikněte na "Import"** tlačítko
5. **Vyberte soubor:** `advanced_document_recognition_n8n.json`

## 🔑 Nastavení Credentials

Po importu workflow musíte nastavit credentials:

### 1. Gmail OAuth2
- Klikněte na Gmail node
- Create credentials → OAuth2
- Client ID & Secret z Google Cloud Console
- Authorize přístup

### 2. OpenAI API
- Klikněte na AI Document Analysis node  
- Create credentials → API Key
- Vložte váš OpenAI API key

### 3. Paperless-ngx API
- HTTP Request node → Create credentials
- Header Auth
- Name: `Authorization`
- Value: `Token YOUR_PAPERLESS_TOKEN`

## 🧪 Testování workflow

### 1. Test s demo daty
- Klikněte na **Execute Workflow** (vpravo nahoře)
- Workflow se spustí s prázdnými daty

### 2. Test s reálným emailem
- V Gmail node klikněte na **Execute node**
- Načtou se vaše nepřečtené emaily
- Sledujte průběh zpracování

### 3. Test jednotlivých částí
- Můžete kliknout na jakýkoliv node
- **Execute node** spustí jen danou část
- Výsledky vidíte v "Output" tabu

## 📊 Monitoring

### Execution history
- Menu → Executions
- Vidíte všechny běhy workflow
- Kliknutím zobrazíte detaily

### Logs
```bash
docker logs n8n-test -f
```

## 🛠️ Úpravy workflow

### Změna filtrů
- **Spam Filter node** - upravte keywords
- **Document Classification** - přidejte nové typy

### Změna tagů pro Paperless
- **Prepare for Paperless node**
- Upravte mapování `paperlessTags`

## 🔧 Troubleshooting

### Workflow nefunguje
1. Zkontrolujte credentials
2. Ověřte permissions (Gmail API)
3. Zkontrolujte logy

### Email se nenačítají
- Gmail node → Settings → Query
- Změňte na `is:unread` (všechny nepřečtené)

### AI analýza selhává
- Zkontrolujte OpenAI kredit
- Snižte model na `gpt-3.5-turbo`

## 🛑 Zastavení prostředí

```bash
docker compose -f docker-compose.n8n-test.yml down
```

Zachovat data:
```bash
docker compose -f docker-compose.n8n-test.yml stop
```

## 🔄 Migrace do produkce

1. **Export workflow**
   - Menu → Workflows → Select → Download

2. **Export credentials**
   - Musíte nastavit znovu v produkci

3. **Import do Paperless N8N**
   - Stejný postup jako test import

## 📚 Další kroky

1. **Přizpůsobte spam filtry** pro vaše potřeby
2. **Trénujte klasifikaci** na vašich dokumentech
3. **Nastavte notifikace** (Slack/Telegram)
4. **Automatizujte schedule** (každých 5 minut)