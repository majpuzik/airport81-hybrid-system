# Návrh vylepšení pro Paperless-NGX

## 1. Nové typy dokumentů (přidat do administrace)

### Finanční dokumenty
- **Doručovací avízo** - pro sledování zásilek
- **Potvrzení objednávky** - oddělené od faktury
- **Potvrzení předplatného** - pro pravidelné služby
- **Účetní doklad** - obecný daňový doklad
- **Výpis American Express** - specifický typ
- **Výpis Visa** - specifický typ
- **Výpis Mastercard** - specifický typ

### Komunikační dokumenty
- **Marketingová nabídka** - pro cílené nabídky
- **Notifikace služby** - systémová upozornění
- **Systémové upozornění** - technické zprávy
- **Výzva k akci** - urgentní dokumenty
- **Zrušení služby** - důležité pro archivaci

### Logistické dokumenty
- **Potvrzení doručení** - od dopravců
- **Sledování zásilky** - tracking info

## 2. Nové štítky/tagy

### Prioritní štítky
- **Urgent** - vyžaduje okamžitou akci
- **Nutná akce** - do určitého data
- **Ke schválení** - čeká na schválení
- **Vyřízeno** - zpracováno
- **Archivovat** - k dlouhodobé archivaci

### Finanční štítky
- **Daňový doklad** - pro účetnictví
- **Pravidelná platba** - opakující se
- **Předplatné** - aktivní služby
- **E-shop** - nákupy online
- **AliExpress** - specifický e-shop (NE American Express!)

### Logistické štítky
- **Doprava** - vše kolem přepravy
- **Sledování zásilky** - aktivní tracking
- **Zrušeno** - zrušené objednávky/služby

### Marketingové štítky
- **Marketingová nabídka** - cílený marketing
- **Systémové upozornění** - technické info

## 3. Vlastní pole (Custom Fields)

### Pro bankovní výpisy
```json
{
  "bank_name": "název banky",
  "period": "MM/YYYY",
  "account_number": "číslo účtu",
  "balance": "konečný zůstatek"
}
```

### Pro faktury
```json
{
  "invoice_number": "číslo faktury",
  "due_date": "datum splatnosti",
  "amount": "částka",
  "currency": "měna",
  "variable_symbol": "variabilní symbol"
}
```

### Pro platební dokumenty
```json
{
  "transaction_id": "ID transakce",
  "payment_method": "PayPal/Card/Bank",
  "status": "approved/declined",
  "merchant": "obchodník"
}
```

### Pro zásilky
```json
{
  "tracking_number": "číslo zásilky",
  "carrier": "dopravce",
  "delivery_date": "datum doručení",
  "status": "in_transit/delivered"
}
```

## 4. Pracovní postupy (Workflows)

### Automatické workflow pro faktury
1. Dokument typu "Faktura" → automaticky přidat tag "Důležité"
2. Pokud obsahuje "due_date" → přidat tag "Nutná akce"
3. Po zaplacení → změnit tag na "Vyřízeno"

### Workflow pro bankovní výpisy
1. Typ "Bankovní výpis" → přidat tag "Banka" + název banky
2. Automaticky extrahovat období do custom field
3. Po kontrole → tag "Archivovat"

### Workflow pro platby
1. PayPal potvrzení → typ "Potvrzení o platbě" + tag "PayPal"
2. Odmítnuté platby → tag "Platba odmítnuta" + "Nutná akce"
3. Úspěšné platby → tag "Platba schválena" + "Vyřízeno"

### Workflow pro zásilky
1. Doručovací avízo → tag "Doprava" + "Sledování zásilky"
2. Po doručení → změnit na "Vyřízeno"
3. Problémové zásilky → tag "Nutná akce"

## 5. Automatizační pravidla

### Pravidlo: Detekce spamu
```
IF document_content CONTAINS ["sleva", "akce", "výprodej", "300 Kč", "kupón"]
AND correspondent NOT IN ["důvěryhodní_odesílatelé"]
THEN set type = "Spam", add tag = "Nevyžádané"
```

### Pravidlo: Důležité dokumenty
```
IF document_type IN ["Faktura", "Smlouva", "Bankovní výpis", "Právní dokument"]
THEN add tag = "Důležité"
```

### Pravidlo: Platební dokumenty
```
IF correspondent = "PayPal" 
OR document_content CONTAINS ["payment", "receipt", "transaction"]
THEN set type = "Potvrzení o platbě", add tag = "Transakce"
```

### Pravidlo: Rozlišení AliExpress vs American Express
```
IF correspondent CONTAINS "aliexpress" OR "ali express"
THEN set correspondent = "AliExpress", add tag = "E-shop"

IF document_content CONTAINS "american express" AND NOT "aliexpress"
THEN set correspondent = "American Express", add tag = "Kreditní karta"
```

## 6. Návrh nových zobrazení

### Dashboard widgety
1. **Dokumenty vyžadující akci** - filtrovány podle tagů "Nutná akce", "Ke schválení"
2. **Platební přehled** - součet plateb za měsíc podle custom fields
3. **Sledování zásilek** - aktivní zásilky s tracking info
4. **Expirace dokumentů** - dokumenty s tagem "Brzy končí platnost"

### Saved Views (Uložená zobrazení)
1. **Účetnictví** - Faktury + Účetní doklady + Daňové doklady
2. **Bankovnictví** - Všechny výpisy + platební potvrzení
3. **Logistika** - Doručovací avíza + sledování zásilek
4. **Ke zpracování** - Dokumenty s tagy "Nutná akce", "Ke schválení"
5. **Archiv** - Dokumenty s tagem "Vyřízeno" starší než 3 měsíce

## 7. Integrace s Mistral AI

### Konfigurace
```yaml
PAPERLESS_OCR_MODE: skip
PAPERLESS_OCR_SKIP_ARCHIVE_FILE: never
PAPERLESS_CONSUMER_ENABLE_BARCODES: true
PAPERLESS_CONSUMER_ENABLE_ASN_BARCODE: true

# Mistral AI konfigurace
PAPERLESS_AI_PROVIDER: mistral
PAPERLESS_AI_API_KEY: o8FiyjoqaUUjuXnpQ9JvesSl4zKyz2UT
PAPERLESS_AI_MODEL: pixtral-12b-2409
```

### Pre-processing hook
```python
# /scripts/mistral_preprocessor.py
def preprocess_document(file_path):
    # 1. Quick categorization (SPAM/INFO/DULEZITE)
    category = mistral_quick_check(file_path)
    
    # 2. Based on category, apply different processing
    if category == "SPAM":
        return {"type": "Spam", "tags": ["Spam", "Nevyžádané"]}
    elif category == "INFO":
        return mistral_simple_analysis(file_path)
    else:  # DULEZITE
        return mistral_full_analysis(file_path)
```

## 8. Bezpečnostní doporučení

1. **Oddělené zpracování spamu** - automaticky do karantény
2. **Validace platebních dokumentů** - kontrola částek a merchant
3. **Audit trail** - logování všech automatických akcí
4. **Pravidelné kontroly** - report nerozpoznaných dokumentů

## 9. Implementační priorita

### Fáze 1 (Okamžitě)
- Přidat nové typy dokumentů
- Implementovat základní tagy
- Nastavit workflow pro faktury a platby

### Fáze 2 (Do měsíce)
- Custom fields pro klíčové typy
- Automatizační pravidla
- Saved views

### Fáze 3 (Do 3 měsíců)
- Plná integrace Mistral AI
- Dashboard widgety
- Pokročilé workflow

## 10. Metriky úspěchu

- 95%+ správně kategorizovaných dokumentů
- <5% dokumentů vyžadujících manuální zásah
- 100% platebních dokumentů správně označených
- 0% záměna AliExpress/American Express