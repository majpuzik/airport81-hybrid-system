# Gmail Identifier - Dokumentace
## Faktury, Bankovní výpisy, Účtenky

### 📋 Přehled
Kompletní pipeline pro automatické zpracování emailů z Gmail do Paperless-ngx s identifikací dokumentů.

### ✨ Funkce
- **Načítání emailů z Gmail** pomocí IMAP s App Password
- **Vytváření PDF souborů** včetně sloučení příloh
- **OCR zpracování** pro vyhledávání v textu
- **Automatická identifikace**:
  - 📑 Faktury
  - 🏦 Bankovní výpisy
  - 🧾 Účtenky
- **Upload do Paperless-ngx** přes MCP API
- **Správné tagování**:
  - Typ dokumentu: `gmail`
  - Štítky: kategorie dokumentu + úroveň jistoty
  - Korespondent: automaticky z odesílatele
- **Tracking zpracovaných** emailů (neduplikuje)

### 🚀 Použití

```python
from gmail_identifier_fak_ban_stv import GmailIdentifierFakBanStv

# Konfigurace
config = {
    'gmail_user': 'váš_email@gmail.com',
    'gmail_password': 'vaše_app_heslo',
    'paperless_url': 'http://localhost:8050',
    'paperless_token': 'váš_token'
}

# Vytvořit instanci
processor = GmailIdentifierFakBanStv(config)

# Zpracovat 100 emailů
processor.run(max_emails=100)
```

### 📁 Struktura souborů
```
/Volumes/ACASIS/gmail_paperless_export/
├── pdfs/                    # PDF soubory s OCR
├── processed_emails.json    # Databáze zpracovaných emailů
└── gmail_load_report_*.json # Reporty zpracování
```

### 🏷️ Struktura v Paperless-ngx

#### Typy dokumentů
- `gmail` - všechny dokumenty z emailu

#### Štítky
- `faktura` - identifikované faktury
- `bankovní výpis` - identifikované výpisy
- `účtenka` - identifikované účtenky
- `neurčeno` - neidentifikované
- `email` - označení původu
- `Nízká jistota` / `Střední jistota` / `Vysoká jistota` - confidence level

#### Korespondenti
Automaticky vytváření z odesílatelů emailů

### 📊 Statistiky
Po zpracování se zobrazí:
- Počet zpracovaných emailů
- Počet identifikovaných typů dokumentů
- Úspěšnost uploadu do Paperless
- Počet chyb

### ⚙️ Požadavky
- Python 3.8+
- `ocrmypdf` nainstalovaný v systému
- Gmail App Password
- Paperless-ngx běžící na localhost:8050
- Externí disk /Volumes/ACASIS

### 🔑 Gmail App Password
1. Jděte na https://myaccount.google.com/security
2. Zapněte 2FA
3. Vytvořte App Password pro Mail
4. Použijte vygenerované heslo v konfiguraci

### 📝 Poznámky
- Zpracované emaily se ukládají do databáze a znovu se nezpracovávají
- OCR je aplikováno na všechny PDF pro lepší vyhledávání
- Identifikace používá pokročilé scorovací algoritmy
- Všechny dokumenty dostávají typ `gmail` pro snadné filtrování

### 🐛 Řešení problémů
- **IMAP připojení selhává**: Zkontrolujte App Password
- **OCR timeout**: Velké PDF soubory mohou trvat déle
- **Upload selhává**: Zkontrolujte Paperless API token
- **Externí disk nenalezen**: Zkontrolujte připojení /Volumes/ACASIS

### 📈 Výkon
- Zpracování 100 emailů: ~5-10 minut
- OCR rychlost: ~2-5 sekund/stránku
- Upload: ~1 sekunda/dokument

### 🔄 Aktualizace
Verze 1.0 - 2024-08-28
- První stabilní verze
- Kompletní pipeline Gmail → Paperless-ngx
- Automatická identifikace dokumentů
- MCP API integrace