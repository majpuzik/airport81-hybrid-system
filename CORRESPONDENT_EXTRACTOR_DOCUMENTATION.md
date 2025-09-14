# Correspondent Extractor Documentation
**Modul pro automatickou identifikaci korespondentů z PDF dokumentů**

## 📋 Přehled
Tento modul automaticky extrahuje a identifikuje korespondenty (odesílatele/dodavatele) z PDF dokumentů pomocí rozpoznávání IČO, DIČ, názvů firem a bankovních účtů.

## 🎯 Hlavní funkce
- **Extrakce IČO/DIČ** - Rozpoznává české i zahraniční identifikační čísla
- **Databáze známých firem** - Obsahuje 30+ českých a německých společností
- **Rozpoznávání z hlavičky** - Extrahuje název firmy z prvních řádků dokumentu
- **Identifikace banky** - Rozpoznává banku podle čísla účtu
- **Email fallback** - Používá doménu emailu pokud nic jiného nenajde
- **Confidence scoring** - Hodnotí spolehlivost identifikace (0-100%)

## 🔧 Použití

### Základní použití
```python
from extract_correspondent_from_document import CorrespondentExtractor

extractor = CorrespondentExtractor()
result = extractor.identify_correspondent('cesta/k/dokumentu.pdf', 'email@firma.cz')

print(f"Korespondent: {result['name']}")
print(f"Confidence: {result['confidence']}%")
print(f"IČO: {result['ico']}")
print(f"DIČ: {result['dic']}")
```

### Integrace s Paperless-ngx
```python
from extract_correspondent_from_document import PaperlessCorrespondentUpdater

updater = PaperlessCorrespondentUpdater(
    paperless_url='http://localhost:8050',
    token='your_api_token'
)

# Vytvoří custom field 'email' v Paperless
email_field_id = updater.create_custom_field()

# Aktualizuje korespondenta pro dokument
updater.update_correspondent(document_id, pdf_path, email_from)
```

## 📊 Struktura výstupu
```python
{
    'name': 'Název firmy',           # Identifikovaný název
    'email': 'email@domena.cz',      # Email odesílatele
    'ico': '12345678',                # IČO (pokud nalezeno)
    'dic': 'CZ12345678',              # DIČ (pokud nalezeno)
    'bank_account': '123456/0100',    # Bankovní účet (pokud nalezen)
    'confidence': 95,                 # Spolehlivost 0-100%
    'source': 'ico_database'          # Zdroj identifikace
}
```

## 🏢 Databáze firem
Modul obsahuje předdefinovanou databázi známých firem:

### České firmy
- ČEZ Prodej (25085107)
- ČSOB (45274649)
- Vodafone CZ (27074358)
- O2 Czech Republic (70994226)
- T-Mobile CZ (27767639)
- ... a další

### Německé firmy
- Amazon EU (DE813936061)
- MediaMarkt (DE811126315)
- Conrad Electronic (DE815668292)
- ... a další

## 🔍 Vzory pro extrakci
- **IČO**: `IČO: 12345678`, `IČ 12345678`, `Company ID: 12345678`
- **DIČ**: `DIČ: CZ12345678`, `VAT: DE123456789`, `USt-IdNr: AT12345678`
- **Účet**: `Účet: 123456/0100`, `IBAN: CZ12 3456 7890 1234 5678 9012`
- **Email**: Automatické rozpoznávání emailových adres

## ⚙️ Požadavky
- Python 3.8+
- `pdftotext` (systémový balíček)
- `requests` (pro Paperless integraci)

## 📈 Úrovně spolehlivosti
- **100%** - Nalezeno IČO v databázi známých firem
- **95%** - Nalezeno DIČ v databázi
- **70%** - Extrahováno z hlavičky dokumentu
- **40%** - Odvozeno z emailové domény

## 🔄 Integrace s Gmail pipeline
Modul je integrován do `gmail_identifier_fak_ban_stv.py` pro automatickou identifikaci korespondentů při zpracování emailů:

```python
# V upload_to_paperless metodě
extractor = CorrespondentExtractor()
correspondent_info = extractor.identify_correspondent(pdf_path, email_from)

if correspondent_info['name']:
    print(f"👤 Korespondent: {correspondent_info['name']} (confidence: {correspondent_info['confidence']}%)")
    # Vytvoří nebo najde korespondenta v Paperless
```

## 📝 Poznámky
- Modul preferuje IČO/DIČ před jinými metodami identifikace
- Automaticky čistí a normalizuje názvy firem
- Podporuje české, německé a rakouské formáty DIČ
- Vytváří custom field 'email' v Paperless pro uchování původního emailu

## 🚀 Budoucí vylepšení
- [ ] Rozšíření databáze firem
- [ ] Podpora více jazyků
- [ ] Machine learning pro lepší rozpoznávání
- [ ] Cache pro rychlejší opakované zpracování

## 📄 Soubory
- **Hlavní modul**: `/Users/m.a.j.puzik/extract_correspondent_from_document.py`
- **Testy**: Spustit pomocí `python3 extract_correspondent_from_document.py <cesta_k_pdf>`
- **Integrace**: Automaticky používán v Gmail pipeline

---
*Vytvořeno: 2024-08-28*
*Autor: Claude Assistant*
*Verze: 1.0*