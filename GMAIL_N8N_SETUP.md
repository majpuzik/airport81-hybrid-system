# Gmail OAuth2 Setup pro n8n

## 1. Google Cloud Console Setup

1. Jděte na: https://console.cloud.google.com/
2. Vytvořte nový projekt nebo vyberte existující
3. Povolte Gmail API:
   - Menu → APIs & Services → Library
   - Hledejte "Gmail API"
   - Klikněte "Enable"

## 2. Vytvořte OAuth2 Credentials

1. APIs & Services → Credentials
2. Klikněte "Create Credentials" → "OAuth 2.0 Client ID"
3. Pokud nemáte OAuth consent screen:
   - Configure consent screen
   - User Type: External
   - App name: "n8n Gmail Integration"
   - User support email: váš email
   - Authorized domains: localhost (pro test)

4. Application type: **Web application**
5. Name: "n8n Gmail"
6. Authorized redirect URIs - DŮLEŽITÉ:
   ```
   http://localhost:5678/rest/oauth2-credential/callback
   ```

## 3. Zkopírujte credentials

Po vytvoření dostanete:
- **Client ID**: něco jako `123456789-abcdef.apps.googleusercontent.com`
- **Client Secret**: `GOCSPX-xxxxxxxxxxxxx`

## 4. V n8n nastavte Gmail OAuth2

1. Otevřete n8n: http://localhost:5678
2. V workflow dvojklik na Gmail node
3. Credentials → Create New → Gmail OAuth2
4. Vyplňte:
   - **Client ID**: zkopírujte z Google Console
   - **Client Secret**: zkopírujte z Google Console
   
5. Klikněte "Connect my account"
6. Budete přesměrováni na Google
7. Přihlaste se a povolte přístup
8. Budete vráceni do n8n

## 5. Paperless-ngx API Token

Pro upload do Paperless použijte tento token:
```
9815f947c7261f0d25378892b9351bda4539a01d
```

V Paperless Upload node nastavte:
- URL: `http://localhost:8050/api`
- Header: `Authorization: Token 9815f947c7261f0d25378892b9351bda4539a01d`

## Testování

1. V Gmail node nastavte:
   - Resource: Message
   - Operation: Get All
   - Query: `is:unread` nebo `after:2024/1/1`
   - Max Results: 10

2. Klikněte "Execute Node" pro test

## Troubleshooting

### Chyba "Access blocked"
- V Google Console → OAuth consent screen → Test users
- Přidejte váš email

### Chyba "Redirect URI mismatch"
- Zkontrolujte že máte PŘESNĚ:
  ```
  http://localhost:5678/rest/oauth2-credential/callback
  ```

### Rate limits
- Gmail API má limit 250 quota units per user per second
- Pro batch processing použijte delay mezi requesty

## Alternativa: App Password (jednodušší)

Pokud máte 2FA zapnuté:
1. Google Account → Security → 2-Step Verification
2. App passwords → Generate
3. V n8n použijte "Basic Auth" místo OAuth2
4. Email: váš Gmail
5. Password: vygenerované app password

---
Vytvořeno: 2024-08-07