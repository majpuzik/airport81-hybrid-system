# 📥 JAK IMPORTOVAT n8n WORKFLOW

## 🔧 ŘEŠENÍ KONFLIKTU WEBHOOK URL

Vytvořil jsem novou verzi workflow s unikátním webhook ID.

## 📋 POSTUP IMPORTU:

### 1. **Otevřete n8n**
```
http://localhost:5678
```
- Login: `admin`
- Password: `n8n-test-2024`

### 2. **Vytvořte nový workflow**
- Klikněte na **"+ New Workflow"**
- Nebo otevřete existující workflow

### 3. **Importujte soubor**
- Klikněte na menu (3 tečky) vpravo nahoře
- Vyberte **"Import from File"**
- Vyberte soubor: `/Users/m.a.j.puzik/n8n_mistral_workflow_v2.json`

### 4. **Aktivujte workflow**
- Po importu klikněte na **"Active"** toggle
- Workflow musí být aktivní (zelený toggle)

## 🌐 NOVÝ WEBHOOK URL:
```
http://localhost:5678/webhook/mistral-classify-v2
```

## 🧪 TEST WORKFLOW:

### Pomocí skriptu:
```bash
/Users/m.a.j.puzik/test_n8n_webhook.sh
```

### Manuálně:
```bash
curl -X POST http://localhost:5678/webhook/mistral-classify-v2 \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Test dokument pro klasifikaci",
    "filename": "test.pdf"
  }'
```

## ✅ WORKFLOW OBSAHUJE:

1. **Webhook Document Input** - příjem dokumentů na `/webhook/mistral-classify-v2`
2. **MCP Classify** - klasifikace přes MCP server (port 3001)
3. **Process Classification** - zpracování výsledků a prioritizace
4. **Send Response** - odpověď s výsledkem klasifikace

## 📁 KATEGORIE:
- faktura
- platba
- vypis
- reklama (automaticky přeskočeno)
- smlouva
- soudni (vysoká priorita)
- policie (vysoká priorita)
- urad (vysoká priorita)
- korespondence
- nabidka
- ostatni

## 🎯 PRIORITA:
- **Vysoká**: soudní, policejní, úřední
- **Střední**: faktury, platby
- **Nízká**: korespondence, nabídky
- **Přeskočeno**: reklamy

---

**Workflow je připraven k použití!** 🚀