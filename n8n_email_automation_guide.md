# N8N E-mail Automatizace - Kompletní návod

## 🎯 Cíl: Automatické třídění Outlook a Gmail e-mailů

### 📋 Potřebné komponenty:
1. **N8N** (workflow automation)
2. **Gmail API** přístup
3. **Outlook/Microsoft Graph API** přístup
4. **Paperless-NGX** pro ukládání dokumentů

---

## 🚀 1. Instalace N8N

```bash
# Docker instalace
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n

# Nebo npm
npm install n8n -g
n8n start
```

Otevřete: http://localhost:5678

---

## 🔧 2. Nastavení Gmail integrace

### A. Vytvoření Gmail API credentials:
1. Jděte na [Google Cloud Console](https://console.cloud.google.com)
2. Vytvořte nový projekt nebo vyberte existující
3. Zapněte Gmail API
4. Vytvořte OAuth 2.0 credentials
5. Přidejte redirect URI: `http://localhost:5678/rest/oauth2-credential/callback`

### B. Nastavení v N8N:
1. Settings → Credentials → Add credential
2. Vyberte "Gmail OAuth2 API"
3. Vložte Client ID a Client Secret
4. Authorize a grant permissions

---

## 🔧 3. Nastavení Outlook integrace

### A. Vytvoření Microsoft App:
1. Jděte na [Azure Portal](https://portal.azure.com)
2. App registrations → New registration
3. Redirect URI: `http://localhost:5678/rest/oauth2-credential/callback`
4. API permissions → Microsoft Graph → Mail.Read, Mail.ReadWrite

### B. Nastavení v N8N:
1. Credentials → Add → Microsoft Outlook OAuth2 API
2. Vložte Application ID a Client Secret
3. Authorize

---

## 🤖 4. Hlavní Workflow - Email Processor

```json
{
  "name": "Email Auto Processor",
  "nodes": [
    {
      "parameters": {
        "triggerOn": "schedule",
        "rule": {
          "interval": [{"field": "minutes", "value": 5}]
        }
      },
      "type": "n8n-nodes-base.scheduleTrigger",
      "name": "Every 5 minutes"
    },
    {
      "parameters": {
        "resource": "message",
        "operation": "getAll", 
        "returnAll": false,
        "limit": 50,
        "simple": false,
        "filters": {
          "labelIds": ["INBOX"],
          "isUnread": true
        }
      },
      "type": "n8n-nodes-base.gmail",
      "name": "Get Gmail Messages"
    },
    {
      "parameters": {
        "resource": "message",
        "operation": "getAll",
        "returnAll": false, 
        "limit": 50,
        "filters": {
          "folder": "inbox",
          "isRead": false
        }
      },
      "type": "n8n-nodes-base.microsoftOutlook",
      "name": "Get Outlook Messages"
    },
    {
      "parameters": {
        "mode": "mergeByIndex"
      },
      "type": "n8n-nodes-base.merge",
      "name": "Merge Emails"
    }
  ]
}
```

---

## 🏷️ 5. Email Classifier Node (JavaScript)

```javascript
// Email Classification Logic
const classifyEmail = (subject, sender, body) => {
  const text = (subject + ' ' + sender + ' ' + body).toLowerCase();
  
  // Reklamy
  const adKeywords = [
    'newsletter', 'unsubscribe', 'offer', 'deal', 'sale', 
    'discount', 'promo', 'marketing', 'campaign'
  ];
  
  if (adKeywords.some(keyword => text.includes(keyword))) {
    return {
      category: 'advertisement',
      tags: ['reklama'],
      action: 'archive'
    };
  }
  
  // Faktury
  if (text.includes('invoice') || text.includes('faktura')) {
    return {
      category: 'invoice',
      tags: ['faktura'],
      action: 'move_to_folder',
      folder: 'Faktury'
    };
  }
  
  // Banking
  if (text.includes('bank') || text.includes('výpis')) {
    return {
      category: 'banking',
      tags: ['banka'],
      action: 'move_to_folder',
      folder: 'Banking'
    };
  }
  
  // Ostatní
  return {
    category: 'other',
    tags: ['nezařazeno'],
    action: 'keep_inbox'
  };
};

// Zpracování každého e-mailu
const results = [];
for (const item of $input.all()) {
  const email = item.json;
  const classification = classifyEmail(
    email.subject || '',
    email.from || '',
    email.bodyPreview || email.body || ''
  );
  
  results.push({
    ...email,
    classification
  });
}

return results;
```

---

## 📁 6. Action Nodes podle klasifikace

### A. Gmail Actions:
```javascript
// Gmail Label/Archive Action
if (classification.action === 'archive') {
  // Archive advertisement emails
  return [{
    json: {
      messageId: email.id,
      addLabelIds: ['ARCHIVE'],
      removeLabelIds: ['INBOX']
    }
  }];
}

if (classification.action === 'move_to_folder') {
  // Create/assign labels for categories
  return [{
    json: {
      messageId: email.id,
      addLabelIds: [`custom_${classification.folder}`]
    }
  }];
}
```

### B. Outlook Actions:
```javascript
// Outlook Folder Move
if (classification.action === 'move_to_folder') {
  return [{
    json: {
      messageId: email.id,
      destinationId: `folder_${classification.folder}`
    }
  }];
}
```

---

## 📎 7. Attachment Processing (PDF dokumenty)

```javascript
// Extract and process attachments
const processAttachments = async (email) => {
  const attachments = email.attachments || [];
  const results = [];
  
  for (const attachment of attachments) {
    if (attachment.filename?.toLowerCase().endsWith('.pdf')) {
      // Download attachment
      const fileData = await $this.helpers.getBinaryData(attachment.contentId);
      
      // Classify PDF
      const pdfClassification = classifyDocument(attachment.filename);
      
      // Send to Paperless
      const paperlessResult = await $this.helpers.httpRequestWithAuthentication.call(
        this,
        'paperlessApi',
        {
          method: 'POST',
          url: 'http://localhost:8050/api/documents/post_document/',
          formData: {
            document: {
              value: fileData,
              options: {
                filename: attachment.filename
              }
            },
            title: attachment.filename.replace('.pdf', ''),
            tags: pdfClassification.tags
          }
        }
      );
      
      results.push({
        filename: attachment.filename,
        classification: pdfClassification,
        paperless_id: paperlessResult.id
      });
    }
  }
  
  return results;
};
```

---

## 🔄 8. Kompletní Workflow struktura

```
┌─ Scheduler (5min) 
├─ Gmail Trigger ──┐
├─ Outlook Trigger ┘
├─ Merge Emails
├─ Classify Emails (JS)
├─ Split by Classification
├─ Advertisement Branch → Archive
├─ Invoice Branch → Move to Faktury + Extract PDF → Paperless  
├─ Banking Branch → Move to Banking
└─ Other Branch → Keep in Inbox
```

---

## 📊 9. Monitoring a reporting

```javascript
// Statistics Node
const stats = {
  processed: $input.all().length,
  advertisements: $input.all().filter(i => i.json.classification.category === 'advertisement').length,
  invoices: $input.all().filter(i => i.json.classification.category === 'invoice').length,
  timestamp: new Date().toISOString()
};

// Send to webhook nebo database
await $this.helpers.httpRequest({
  method: 'POST',
  url: 'http://localhost:3000/api/email-stats',
  body: stats,
  json: true
});

return [{ json: stats }];
```

---

## ⚙️ 10. Pokročilé nastavení

### A. Error Handling:
```javascript
try {
  // Email processing logic
} catch (error) {
  // Log error
  console.error('Email processing failed:', error);
  
  // Send notification
  await $this.helpers.httpRequest({
    method: 'POST',
    url: 'webhook-url-for-errors',
    body: { error: error.message, email: email.subject }
  });
  
  // Continue with next email
  return [];
}
```

### B. Rate Limiting:
```javascript
// Add delays between API calls
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
await delay(1000); // 1 second delay
```

---

## 🎯 Výsledek:

✅ **Automatické třídění e-mailů každých 5 minut**  
✅ **Reklamy archivovány**  
✅ **Faktury přesunuty do složky + PDF do Paperless**  
✅ **Bankovní výpisy organizovány**  
✅ **Statistiky a monitoring**  

**Žádná ruční práce potřeba!** 🚀

---

## 🔧 Spuštění:

1. Importujte workflow do N8N
2. Nastavte credentials pro Gmail a Outlook
3. Upravte klasifikační pravidla podle potřeby
4. Aktivujte workflow
5. Sledujte statistiky