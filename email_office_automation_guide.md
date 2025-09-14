# 📧 Email Office Document Automation Guide

## 🎯 Co tento systém dělá

Automaticky zpracovává emaily z **Gmail** a **Outlook** se zaměřením na:
- **Rozpoznávání Office dokumentů** (Word, Excel, PowerPoint, PDF)
- **Automatickou klasifikaci** (faktury, smlouvy, reporty, nabídky)
- **Inteligentní třídění** do složek
- **AI analýzu obsahu** dokumentů
- **Notifikace** o důležitých dokumentech

## 📋 Podporované formáty

### Microsoft Office
- `.docx`, `.doc` - Word dokumenty
- `.xlsx`, `.xls` - Excel tabulky  
- `.pptx`, `.ppt` - PowerPoint prezentace

### Další formáty
- `.pdf` - PDF dokumenty
- `.odt`, `.ods`, `.odp` - OpenDocument formáty
- `.csv` - CSV tabulky
- `.rtf` - Rich Text Format
- `.txt` - Textové soubory

## 🔧 Instalace N8N

### 1. Docker instalace (doporučeno)
```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  -v ~/n8n-files:/files \
  n8nio/n8n
```

### 2. NPM instalace
```bash
npm install n8n -g
n8n start
```

## 🔑 Nastavení credentials

### Gmail OAuth2
1. Jděte na [Google Cloud Console](https://console.cloud.google.com)
2. Vytvořte nový projekt nebo vyberte existující
3. Povolte Gmail API
4. Vytvořte OAuth2 credentials
5. Přidejte redirect URI: `http://localhost:5678/rest/oauth2-credential/callback`

### Outlook OAuth2  
1. Jděte na [Azure Portal](https://portal.azure.com)
2. Registrujte novou aplikaci
3. Přidejte permissions: `Mail.Read`, `Mail.ReadWrite`
4. Vytvořte client secret
5. Přidejte redirect URI

### OpenAI API
1. Získejte API klíč z [OpenAI Platform](https://platform.openai.com)
2. Vložte do N8N credentials

## 📥 Import workflow

1. Otevřete N8N na `http://localhost:5678`
2. Klikněte na **Import workflow**
3. Vložte obsah souboru `n8n_email_office_automation.json`
4. Nastavte všechny credentials

## ⚙️ Konfigurace workflow

### Trigger nastavení
- **Interval**: Každých 5 minut (lze změnit)
- **Timezone**: Europe/Prague

### Email filtry
- Gmail: `is:unread has:attachment`
- Outlook: `hasAttachments eq true and isRead eq false`

### AI analýza
Model: `gpt-4-turbo-preview` (lze změnit na `gpt-3.5-turbo` pro nižší náklady)

### Kategorie dokumentů

| Typ | Priorita | Složka | Akce |
|-----|----------|---------|------|
| Faktura | Vysoká | Invoices | Zpracovat platbu |
| Smlouva | Vysoká | Contracts | Právní kontrola |
| Objednávka | Vysoká | Orders | Zpracovat objednávku |
| Nabídka | Střední | Offers | Vyhodnotit |
| Report | Nízká | Reports | Archivovat |

## 🚀 Spuštění

1. **Aktivujte workflow** přepínačem v N8N
2. **Testujte** kliknutím na "Execute Workflow"
3. **Monitorujte** v sekci Executions

## 📊 Python klasifikátor

Pro pokročilé použití můžete použít Python skript:

```python
from office_document_classifier import OfficeDocumentClassifier

classifier = OfficeDocumentClassifier()

# Identifikace dokumentu
doc_info = classifier.identify_document("faktura_2024.pdf")

# Klasifikace s obsahem
classification = classifier.classify_document(doc_info, text_content)
```

## 🔍 Klíčová slova pro klasifikaci

### České
- **Faktury**: faktura, daňový doklad, IČO, DIČ, k úhradě, splatnost
- **Smlouvy**: smlouva, dohoda, smluvní strany, podmínky, podpis
- **Objednávky**: objednávka, obj. číslo, dodací lhůta

### Anglické  
- **Invoices**: invoice, tax document, VAT, total, due date
- **Contracts**: contract, agreement, parties, terms, signature
- **Orders**: order, purchase order, order number, delivery

## 📱 Notifikace

Workflow podporuje notifikace přes:
- Slack
- Telegram
- Email
- Webhook

## 🛠️ Troubleshooting

### Email se nezpracovávají
- Zkontrolujte credentials
- Ověřte email filtry
- Zkontrolujte permissions

### AI analýza nefunguje
- Ověřte OpenAI API klíč
- Zkontrolujte kredit
- Snižte model na GPT-3.5

### Dokumenty se špatně klasifikují
- Upravte klíčová slova v Python skriptu
- Zvyšte confidence threshold
- Přidejte více tréninkových dat

## 📈 Rozšíření

### Další integrace
- **Paperless-ngx**: Automatický upload dokumentů
- **Google Drive**: Zálohování dokumentů
- **Účetní systémy**: Přímý import faktur
- **CRM**: Propojení s kontakty

### Machine Learning
- Trénování vlastního modelu pro klasifikaci
- OCR pro skenované dokumenty
- Extrakce strukturovaných dat

## 📝 Příklady použití

### 1. Automatické zpracování faktur
- Email s fakturou → Rozpoznání → Extrakce údajů → Upload do účetnictví

### 2. Správa smluv
- Email se smlouvou → Klasifikace → Notifikace právnímu → Archivace

### 3. Sledování objednávek
- Email s objednávkou → Vytvoření úkolu → Notifikace skladu → Potvrzení

## 🔒 Bezpečnost

- Používejte OAuth2 místo hesel
- Šifrujte citlivá data
- Pravidelně rotujte API klíče
- Monitorujte přístupy

## 📚 Další zdroje

- [N8N dokumentace](https://docs.n8n.io)
- [N8N workflow templates](https://n8n.io/workflows)
- [Community forum](https://community.n8n.io)
- [Video tutoriály](https://www.youtube.com/n8n)