# Gmail API Setup Guide pro Mistral OCR Test

## Kroky pro nastavení Gmail API

### 1. Vytvoření projektu v Google Cloud Console
1. Jděte na https://console.cloud.google.com/
2. Vytvořte nový projekt nebo vyberte existující
3. Pojmenujte projekt (např. "Mistral OCR Gmail")

### 2. Povolení Gmail API
1. V levém menu klikněte na "APIs & Services" > "Library"
2. Vyhledejte "Gmail API"
3. Klikněte na Gmail API a pak na "Enable"

### 3. Vytvoření OAuth 2.0 credentials
1. Jděte na "APIs & Services" > "Credentials"
2. Klikněte na "Create Credentials" > "OAuth client ID"
3. Pokud je to poprvé, musíte nejdřív nakonfigurovat OAuth consent screen:
   - Vyberte "External" (pokud nemáte Google Workspace)
   - Vyplňte povinná pole (název aplikace, email)
   - Přidejte svůj email do Test users
4. Pro OAuth client ID:
   - Application type: "Desktop app"
   - Name: "Mistral OCR Client"
5. Klikněte "Create"

### 4. Stažení credentials
1. Po vytvoření klikněte na tlačítko stažení (download JSON)
2. Uložte soubor jako `credentials.json` do stejné složky jako `mistral_ocr_test.py`

### 5. První spuštění
1. Při prvním použití Gmail funkce se otevře prohlížeč
2. Přihlaste se svým Google účtem
3. Povolte aplikaci přístup k vašemu Gmail (jen čtení)
4. Aplikace vytvoří soubor `token.pickle` pro budoucí použití

## Instalace závislostí

```bash
pip install -r requirements.txt
```

## Použití v aplikaci

1. Spusťte aplikaci: `python mistral_ocr_test.py`
2. Klikněte na tlačítko "Gmail"
3. Aplikace automaticky načte emaily podle zadaného filtru
4. Vyberte email ze seznamu
5. Klikněte "Konvertovat vybraný email"
6. Email bude stažen včetně všech příloh a převeden na jedno PDF

## Výchozí vyhledávací filtr

Aplikace defaultně hledá emaily od bank:
```
from:csob OR from:česká spořitelna OR from:komerční banka
```

Můžete změnit na jakýkoliv Gmail search query, např.:
- `has:attachment` - všechny emaily s přílohami
- `from:@csob.cz after:2024/1/1` - emaily od ČSOB po 1.1.2024
- `subject:výpis` - emaily s "výpis" v předmětu

## Bezpečnost

- Aplikace má pouze READ přístup k emailům
- Token je uložen lokálně v `token.pickle`
- Credentials nejsou nikam odesílány
- Pro odvolání přístupu jděte na https://myaccount.google.com/permissions