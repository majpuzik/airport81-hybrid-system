# Praktické příklady workflow v Paperless-ngx

## 🎬 Příklad 1: Netflix předplatné

### 1. Nahrání smlouvy
```
Dokument: Netflix_smlouva.pdf
Automaticky detekováno:
- Typ: Smlouva
- Korespondent: Netflix
- Částka: 199 Kč/měsíc
- Den splatnosti: 15.
```

### 2. Systém vytvoří
- ✅ Závazek s měsíční frekvencí
- ✅ Tagy: `smlouva`, `měsíční`, `předplatné`, `aktivní`
- ✅ Upomínky: 8. a 14. každý měsíc
- ✅ Custom fields vyplněny automaticky

### 3. Každý měsíc
- 8. den: Email "Netflix - 7 dní do splatnosti (199 Kč)"
- 14. den: Email "Netflix - zítra splatnost!"
- 15. den: Pokud nezaplaceno - "Netflix - DNES SPLATNOST!"

### 4. Při nahrání výpisu
```
Bankovní výpis obsahuje:
15.03. Netflix *subscription  VS: -  -199,00
```
Systém automaticky:
- ✅ Spáruje platbu
- ✅ Označí závazek jako zaplacený pro tento měsíc
- ✅ Zruší zbývající upomínky

## 📱 Příklad 2: Mobilní operátor O2

### 1. Nahrání smlouvy
```
Dokument: O2_smlouva_2023.pdf
Detekováno:
- Konec smlouvy: 31.12.2024
- Výpovědní lhůta: 30 dní
- Měsíční platba: 599 Kč
```

### 2. Systém nastaví
- ✅ Tag `možnost-výpovědi` se objeví 1.12.2024
- ✅ Tag `vypovědět-do:2024-12-01`
- ✅ Upomínka 30 dní předem

### 3. Notifikace
- 1.11.2024: "O2 - 30 dní do konce výpovědní lhůty"
- 24.11.2024: "O2 - 7 dní do konce výpovědní lhůty!"
- 1.12.2024: "O2 - POSLEDNÍ DEN PRO VÝPOVĚĎ!"

### 4. Dashboard zobrazí
V pohledu "⚡ Možnosti výpovědi":
```
O2 Mobilní tarif
Měsíční úspora: 599 Kč
Vypovědět do: 1.12.2024
[Odkaz na smlouvu]
```

## 🏠 Příklad 3: Roční pojištění domácnosti

### 1. Nahrání pojistky
```
Dokument: Allianz_pojistka_2024.pdf
Detekováno:
- Roční platba: 3.600 Kč
- Výročí: 1.4.2024
- Automatické prodloužení: ANO
```

### 2. Systém vytvoří
- ✅ Tag `roční`
- ✅ Upomínku 30 dní před výročím
- ✅ Upomínku 60 dní předem pro možnost změny

### 3. Roční cyklus
- 1.2.2024: "Allianz - 60 dní do obnovení pojistky (možnost změny)"
- 1.3.2024: "Allianz - 30 dní do splatnosti (3.600 Kč)"
- 25.3.2024: "Allianz - blíží se roční platba"

## 💡 Příklad 4: Elektřina - čtvrtletní zálohy

### 1. Nahrání smlouvy ČEZ
```
Detekováno:
- Čtvrtletní zálohy: 2.500 Kč
- Splatnost: 15. den prvního měsíce čtvrtletí
```

### 2. Automatické upomínky
- 8.1., 8.4., 8.7., 8.10.: Upomínka 7 dní předem
- 15.1., 15.4., 15.7., 15.10.: Den splatnosti

### 3. Roční vyúčtování
Při nahrání vyúčtování:
- Systém spáruje s existující smlouvou
- Aktualizuje výši záloh pokud se změnila
- Vytvoří upomínku na doplatek/přeplatek

## 📊 Měsíční report (automaticky 1. den v měsíci)

```
MĚSÍČNÍ REPORT PLATEB - Březen 2024
=====================================

Měsíční závazky celkem: 3.521 Kč
- Netflix: 199 Kč (zaplaceno)
- O2: 599 Kč (zaplaceno)
- Spotify: 149 Kč (čeká na platbu)
- Internet UPC: 499 Kč (zaplaceno)
- Úklid kanceláře: 2.075 Kč (faktura přijde)

Jednorázové platby tento měsíc: 1.250 Kč
- Doména example.cz: 250 Kč (splatnost 20.3.)
- Licence software: 1.000 Kč (splatnost 31.3.)

Po splatnosti: 1
- Spotify (149 Kč) - 2 dny po splatnosti

Možnosti úspor:
- O2: Možnost výpovědi 1.12.2024 (úspora 599 Kč/měsíc)
- UPC: Konkurence nabízí o 100 Kč levněji

Blížící se výročí:
- Pojištění Allianz: 1.4.2024 (3.600 Kč)
```

## 🔄 Workflow pro párování plateb

### 1. Přijde proforma faktura
```
Proforma č. 2024001
VS: 202400123
Částka: 5.000 Kč
```
Systém:
- ✅ Tag `proforma`, `k-zaplacení`
- ✅ Uloží VS pro párování

### 2. Nahrání bankovního výpisu
```
20.3. Platba přijatá  VS: 202400123  +5.000,00
```
Systém automaticky:
- ✅ Najde proformu podle VS
- ✅ Označí jako zaplacenou
- ✅ Vytvoří úkol "Vystavit fakturu pro VS: 202400123"

### 3. Vystavení finální faktury
- Uživatel vystaví fakturu
- Nahraje do Paperless
- Systém propojí všechny dokumenty

## 🎯 Tipy pro efektivní používání

### 1. Při nahrávání dokumentů
- ✅ Vždy nahrávejte kompletní smlouvy (ne jen podpisové strany)
- ✅ Skenujte faktury včetně QR kódů
- ✅ Bankovní výpisy ideálně v PDF z internetbankingu

### 2. Organizace
- ✅ Používejte korespondenty důsledně
- ✅ Vytvořte si vlastní tagy pro kategorie (např. `kancelář`, `domácnost`)
- ✅ Pravidelně kontrolujte pohled "Možnosti výpovědi"

### 3. Automatizace
- ✅ Nastavte automatický import z emailu
- ✅ Propojte s bankovním API (pokud banka podporuje)
- ✅ Používejte OCR pro ruční účtenky

## 📱 Mobilní přístup

Dashboard funguje skvěle na mobilu:
1. Otevřete Paperless v mobilním prohlížeči
2. Přidejte na plochu jako aplikaci
3. Dostávejte push notifikace o platbách

## 🔒 Bezpečnost

- Všechny dokumenty jsou šifrovány
- Přístup pouze s autentizací
- Možnost 2FA
- Pravidelné zálohy důležité!