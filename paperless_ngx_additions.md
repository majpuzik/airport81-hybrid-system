# Paperless-NGX - Nové položky k přidání

## 1. NOVÉ KORESPONDENTY (Correspondents)

### Přidat do administrace:
```
Dropbox
Google Datenexport  
Jaroslav Foltánek
KnihyDobrovsky.cz
Montblanc
Nooz Optics
Quora Digest
```

### Už existující (ponechat):
- AliExpress
- Amazon
- American Express
- Apple
- Balíkovna
- Google
- Česká pošta
- PayPal
- atd.

---

## 2. NOVÉ TYPY DOKUMENTŮ (Document Types)

### Přidat do administrace:
```
Celnické řízení
Digest novinky
Dotazník spokojenosti
Export dat
Informace o bezpečnosti
Informace o přihlášení
Knihovní newsletter
Notifikace doručování
Notifikace o zásilce
Potvrzení převzetí balíku
Sledování zásilky
Výprodejová nabídka
```

### Už existující (ponechat):
- Bankovní výpis
- Doručovací avízo
- Email
- Faktura
- Marketingová nabídka
- Newsletter
- Potvrzení doručení
- Potvrzení nákupu
- atd.

---

## 3. NOVÉ ŠTÍTKY (Tags)

### Přidat do administrace:
```
Balíkovna
Celní úřad
Digest
Dropbox
Export dat
Informační email
Jaroslav Foltánek
KnihyDobrovsky
Knihovní novinky
Mezinárodní doprava
Montblanc
Nooz Optics
Převzetí balíku
Quora
Spokojenost zákazníka
Výprodej
Zboží na cestě
```

### Už existující (ponechat):
- AliExpress
- Amazon
- American Express
- Doprava
- E-shop
- Google
- Newsletter
- Online nákup
- PayPal
- Sledování zásilky
- atd.

---

## 4. CUSTOM FIELDS (Vlastní pole)

### Pro typ "Dotazník spokojenosti":
```json
{
  "order_number": "číslo objednávky",
  "rating_requested": "požadované hodnocení",
  "shop_name": "název obchodu"
}
```

### Pro typ "Celnické řízení":
```json
{
  "tracking_number": "číslo zásilky",
  "customs_status": "stav celního řízení",
  "customs_office": "celní úřad",
  "completion_date": "datum dokončení"
}
```

### Pro typ "Export dat":
```json
{
  "service_name": "název služby",
  "export_date": "datum exportu",
  "file_size": "velikost dat",
  "download_expires": "vypršení odkazu"
}
```

### Pro typ "Sledování zásilky":
```json
{
  "tracking_number": "číslo zásilky",
  "carrier": "dopravce",
  "current_status": "aktuální stav",
  "delivery_estimate": "odhad doručení"
}
```

### Pro typ "Knihovní newsletter":
```json
{
  "bookstore": "knihkupectví",
  "newsletter_type": "typ newsletteru",
  "featured_books": "doporučené knihy",
  "special_offers": "speciální nabídky"
}
```

---

## 5. WORKFLOW RULES (Automatizační pravidla)

### Pravidlo: AliExpress dokumenty
```
IF correspondent = "AliExpress"
AND document_content CONTAINS ["bestellung", "order"]
THEN add tags = ["AliExpress", "Online nákup", "E-shop"]
```

### Pravidlo: Dotazníky spokojenosti
```
IF document_content CONTAINS ["bewertung", "zufriedenheit", "satisfaction", "how was"]
THEN set type = "Dotazník spokojenosti", add tags = ["Spokojenost zákazníka"]
```

### Pravidlo: Celnické řízení
```
IF document_content CONTAINS ["zoll", "customs", "celní", "zollabfertigung"]
THEN set type = "Celnické řízení", add tags = ["Celní úřad", "Mezinárodní doprava"]
```

### Pravidlo: Sledování zásilek
```
IF document_content CONTAINS ["tracking", "paket", "zásilka", "delivery"]
OR correspondent IN ["DHL", "PPL", "Česká pošta", "Balíkovna"]
THEN set type = "Sledování zásilky", add tags = ["Doprava", "Sledování zásilky"]
```

### Pravidlo: Export dat
```
IF correspondent CONTAINS "export" OR "datenexport"
OR document_content CONTAINS ["data export", "download", "backup"]
THEN set type = "Export dat", add tags = ["Export dat", "Systémové upozornění"]
```

### Pravidlo: Knihovní newslettery
```
IF correspondent CONTAINS ["knihy", "bookstore", "library"]
OR document_content CONTAINS ["knihy", "books", "novinky"]
THEN set type = "Knihovní newsletter", add tags = ["Knihovní novinky", "Newsletter"]
```

---

## 6. SAVED VIEWS (Uložená zobrazení)

### View: "Mezinárodní nákupy"
- Filtr: tags contains ["AliExpress", "Amazon", "Mezinárodní doprava"]
- Seřadit: podle data, nejnovější první

### View: "Sledování zásilek"  
- Filtr: type = "Sledování zásilky" OR "Notifikace o zásilce"
- Seřadit: podle data, nejnovější první

### View: "Newslettery a informace"
- Filtr: type contains ["Newsletter", "Digest novinky", "Knihovní newsletter"]
- Seřadit: podle correspondent

### View: "Bezpečnostní notifikace"
- Filtr: tags contains ["Systémové upozornění", "Informace o bezpečnosti"]
- Seřadit: podle data, nejnovější první

### View: "Celnické a dopravní"
- Filtr: tags contains ["Celní úřad", "Mezinárodní doprava", "Doprava"]
- Seřadit: podle data, nejnovější první

---

## 7. DASHBOARD WIDGETS

### Widget: "Aktivní zásilky"
- Zobrazí: dokumenty s tagem "Zboží na cestě"
- Filtr: vytvořeno za posledních 30 dní

### Widget: "Čekající akce"
- Zobrazí: dokumenty s tagy ["Nutná akce", "Ke schválení"]
- Filtr: nevyřízené

### Widget: "Nedávné nákupy"
- Zobrazí: dokumenty s tagy ["Online nákup", "E-shop"]
- Filtr: posledních 14 dní

---

## 8. AUTOMATICKÉ TAGGING RULES

### Podle odesílatele:
```
AliExpress → ["AliExpress", "E-shop", "Online nákup"]
Balíkovna → ["Balíkovna", "Doprava", "Převzetí balíku"]  
Česká pošta → ["Česká pošta", "Doprava"]
Dropbox → ["Dropbox", "Systémové upozornění"]
Google → ["Google", "Systémové upozornění"]
KnihyDobrovsky.cz → ["KnihyDobrovsky", "Knihovní novinky"]
Montblanc → ["Montblanc", "Marketingová nabídka"]
Quora Digest → ["Quora", "Digest", "Newsletter"]
```

### Podle klíčových slov:
```
"bewertung|satisfaction|spokojenost" → ["Spokojenost zákazníka"]
"zoll|customs|celní" → ["Celní úřad", "Mezinárodní doprava"]  
"tracking|sledování|zásilka" → ["Sledování zásilky", "Doprava"]
"export|backup|download" → ["Export dat"]
"knihy|books|novinky" → ["Knihovní novinky"]
"sale|výprodej|sleva" → ["Výprodej", "Akční nabídka"]
```

---

## 9. PRIORITA IMPLEMENTACE

### FÁZE 1 - Okamžitě:
1. Přidat nové korespondenty (7 položek)
2. Přidat nové typy dokumentů (12 položek)  
3. Přidat nové štítky (17 položek)

### FÁZE 2 - Do týdne:
1. Nastavit automatizační pravidla
2. Vytvořit saved views
3. Nakonfigurovat basic custom fields

### FÁZE 3 - Do měsíce:
1. Dashboard widgets
2. Pokročilé workflow rules
3. Detailní custom fields pro všechny typy