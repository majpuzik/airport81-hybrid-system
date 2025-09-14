# 📧 Nastavení Gmail API Credentials

## Kroky pro získání Gmail API credentials:

### 1. Google Cloud Console
1. Jděte na: https://console.cloud.google.com/
2. Vytvořte nový projekt nebo použijte existující

### 2. Povolit Gmail API
1. V menu vyberte "APIs & Services" → "Enable APIs and Services"
2. Najděte "Gmail API" a klikněte na "Enable"

### 3. Vytvořit OAuth 2.0 credentials
1. Jděte na "APIs & Services" → "Credentials"
2. Klikněte "Create Credentials" → "OAuth client ID"
3. Vyberte "Desktop app"
4. Pojmenujte ji např. "Paperless Gmail Sync"

### 4. Stáhnout credentials
1. Klikněte na stáhnout JSON
2. Uložte jako: `~/.gmail_credentials.json`

### 5. První spuštění
Při prvním spuštění se otevře browser pro autorizaci.

## Rychlá kontrola:
```bash
ls -la ~/.gmail_credentials.json
```

Pokud soubor existuje, můžete spustit pipeline.