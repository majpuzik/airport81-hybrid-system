# 📚 VZORY DOKUMENTŮ - Učební databáze

## 1. FAKTURA - Alza.cz
**Soubory:** 
- Alza_2948803072.pdf (2 660,00 Kč)
- Alza_2949397329.pdf (2 319,00 Kč)

### Povinné znaky faktury ALZA:
- ✅ Text "Faktura - Daňový doklad - [10místné číslo]"
- ✅ Prodávající: Alza.cz a.s., IČO: 27082440, DIČ: CZ27082440
- ✅ Kupující: MyBrainWorks s.r.o., IČ: 03981428
- ✅ Datum vystavení, splatnosti, uskutečnění zdaň. plnění
- ✅ Variabilní symbol: 10místné číslo (5006701051, 5015142221)
- ✅ Rozpis položek s kódem, DPH 21%
- ✅ Vyčíslení DPH v Kč
- ✅ Text "Nehraďte, zaplaceno kartou"

### Identifikační vzory:
```
Faktura - Daňový doklad - \d{10}
IČ: \d{8}
DIČ: CZ\d{8,10}
Variabilní symbol: \d{10}
Vyčíslení DPH v Kč
Celkem: [\d\s]+,\d{2} Kč
```

### Struktura:
1. **Hlavička:** Prodávající (Alza.cz a.s.) s kompletními údaji
2. **Kupující:** MyBrainWorks s.r.o. s IČO a kontakty
3. **Položky:** Detailní rozpis s kódem, popisem, cenou bez/s DPH
4. **DPH souhrn:** Vyčíslení podle sazeb (21%)
5. **Platební údaje:** Číslo účtu, VS, způsob platby

---

## 2. FAKTURA - NB účetnictví s.r.o.
**Soubor:** NB Ucetnictvi_V_241029.pdf (18 150,00 Kč)

### Povinné znaky faktury NB účetnictví:
- ✅ Text "FAKTURA - DAŇOVÝ DOKLAD č. 241029"
- ✅ Dodavatel: NB účetnictví s.r.o., IČ: 25757377, DIČ: CZ25757377
- ✅ Odběratel: MyBrainWorks s.r.o., IČ: 03981428, DIČ: CZ03981428
- ✅ Variabilní symbol: 241029 (6místný)
- ✅ Datum vystavení: 09.07.2024
- ✅ Datum splatnosti: 23.07.2024
- ✅ Položka: "zpracování účetnictví a daň.přiznání za rok 2023"
- ✅ DPH 21%: 3 150,00 Kč
- ✅ Celkem: 18 150,00 Kč
- ✅ Bankovní spojení: ČSOB, č.ú. 154642241/0300
- ✅ QR kód pro platbu
- ✅ Text: "FAKTURA SESTAVENA V PROGRAMU PREMIER SYSTEM"

### Rozdíly oproti Alza fakturám:
- Kratší variabilní symbol (6 míst vs 10)
- Jiný formát titulku (FAKTURA - DAŇOVÝ DOKLAD č. vs Faktura - Daňový doklad -)
- Obsahuje QR kód
- Úrok z prodlení 0,050% za den

---

## 3. ÚČTENKA/PARAGON - Sklenářství Hasenbergerová
**Soubory:** Sklenarstvi_01.jpg až Sklenarstvi_05.jpg

### Povinné znaky dodacích listů Sklenářství:
- ✅ Text "DODACÍ LIST" v hlavičce
- ✅ Text "zjednodušený daňový doklad"
- ✅ Dodavatel: SKLENÁŘSTVÍ Hasenbergerová Eva
- ✅ IČO: 751 10 679
- ✅ Odběratel: ručně vyplněný (M. PUŽIL nebo M. RŮŽIL)
- ✅ Číslo dokladu v horním pravém rohu (30, 43, 52, 16, 11)
- ✅ Datum uskutečnění zdanitelného plnění
- ✅ Ručně psané položky (montování, prořazená čnička, materiálů, zásklení, olejení, dvířky)
- ✅ Částka "Kč" v pravém sloupci
- ✅ Celková částka v rámečku dole (1650,-, 1950,-, 2680,-, 2580,-, 1640,-)
- ✅ Razítko a podpis přebírajícího

### Rozdíly oproti klasickým fakturám:
- Ručně psaný dokument
- Předtištěný formulář s vyplněnými údaji
- Není elektronický, pouze sken
- Jednodušší struktura než plnohodnotná faktura

---

## 4. ÚČTENKA - 4ink (tonery)  
**Soubor:** Tonery_scan_027.jpg (Faktura VAT 30876/NM2/02/2024)

### Povinné znaky účtenky 4ink:
- ✅ Logo "4ink" v hlavičce
- ✅ Text "Faktura VAT" s číslem 30876/NM2/02/2024
- ✅ Dodavatel: NM REVOLUTION S.C., ul. Ślęzna 104/2, Wrocław
- ✅ NIP: 2771885812 (polské DIČ)
- ✅ Odběratel: MyBrainWorks s.r.o., Ocelkova 643/20, Praha
- ✅ NIP: CZO3981428  
- ✅ Položky: "EP-6046022CMY" komplet tonerů EPSON
- ✅ DPH 21%: 69,67 Kč  
- ✅ Celková částka: 493,00 Kč
- ✅ Text "Razem do zaplaty:" (polsky = Celkem k úhradě)
- ✅ Bankovní spojení: Pay/Payu/Kreditní karty
- ✅ Text "KASIA" na konci dokumentu

### Specifika:
- Polský dodavatel
- Dvojjazyčný dokument (polština/čeština)
- Online nákup

---

## 5. PARAGON - Náhradní díly (výměna oleje)
**Soubor:** Vymena oleje_scan_20250112_18120375_0029.jpg  

### Povinné znaky paragonu Náhradní díly:
- ✅ Text "PARAGON" v hlavičce
- ✅ Text "zjednodušený daňový doklad č. F 1595318"
- ✅ Dodavatel: NÁHRADNÍ DÍLY Tomáš Havránek
- ✅ Adresa: Hradešín 186, 282 01 Český Brod
- ✅ Tel: 736 536 322, IČ: 73865150
- ✅ Položky servisní:
  - ELF olej 1L za 250 Kč
  - Vzduchový filtr 2ks za 800 Kč  
  - Motor olej 5W30 8L za 2400 Kč
  - Práce za 1000 Kč
- ✅ Celkem s DPH: 4450,- Kč
- ✅ Datum uskutečnění plnění
- ✅ Razítko a podpis

### Specifika:
- Servisní účtenka
- Kombinace zboží a práce
- Ručně doplňované údaje

---

## 6. BANKOVNÍ VÝPIS - ČSOB ✅ KONEČNĚ NALEZEN!
**Soubory:** 
- 269290450_20240131_1_MCZB.pdf (leden 2024)
- 269290450_20240331_3_MCZB.pdf (březen 2024)

### POVINNÉ znaky bankovního výpisu ČSOB:
- ✅ Text "VÝPIS Z ÚČTU" v hlavičce
- ✅ Údaje banky: Československá obchodní banka, a. s.
- ✅ Období: např. "1. 1. 2024 - 31. 1. 2024"
- ✅ Číslo účtu: 269290450/0300
- ✅ IBAN: CZ90 0300 0000 0002 6929 0450
- ✅ BIC: CEKOCZPP
- ✅ Rok/č. výpisu: např. 2024/1
- ✅ **Souhrnné informace** sekce obsahující:
  - Počáteční zůstatek (např. 10 392,82)
  - Konečný zůstatek (např. 2 429,22)
  - Celkové příjmy
  - Celkové výdaje
  - Počet kreditních/debetních položek
- ✅ **Přehled pohybů na účtu** - tabulka transakcí:
  - Datum
  - Označení platby
  - Protiúčet nebo poznámka
  - Částka
  - Zůstatek
- ✅ Strana: 1/2, 2/2 (vícestránkový dokument)
- ✅ Logo ČSOB v pravém horním rohu

### Specifika ČSOB výpisu:
- Modré záhlaví s informacemi o účtu
- Strukturovaná tabulka transakcí
- Poplatky za vedení účtu vždy na konci měsíce
- Identifikační čísla transakcí (1515, 1517, atd.)
- Variabilní symbol (VS), Konstantní symbol (KS), Specifický symbol (SS)

### Co NESMÍ být:
- ❌ Email s textem "výpis naleznete v příloze"
- ❌ Notifikace o novém výpisu
- ❌ Pouze informace O výpisu bez samotných transakcí

---

## 7. PRAVIDLO PRO EMAILY S PŘÍLOHAMI

**POKUD email obsahuje:**
- "v příloze"
- "attachment"
- "přiložen"

**MUSÍM:**
1. Najít odpovídající přílohu
2. Sloučit email s přílohou do jednoho PDF
3. Klasifikovat podle obsahu PŘÍLOHY, ne emailu

---

## 8. UČENÍ Z CHYB

### Chyba 1: Email o výpisu ≠ Výpis
```
Subject: CEB Info: Nový elektronický výpis
"Svůj výpis číslo 4 z účtu 269290450 naleznete v příloze"
```
→ Toto NENÍ výpis, je to EMAIL
→ Skutečný výpis: 269290450_20250430_4_MCZB.pdf (příloha)

### Chyba 2: Všechny dokumenty dostaly stejný tag
- Předchozí upload přiřadil 555 dokumentům tag "Bankovní výpis"
- Oprava: Každý dokument musí být klasifikován individuálně

---

## 9. KLASIFIKACE ÚČTENEK/PARAGONŮ

### Klíčové rozpoznávací znaky:
1. **DODACÍ LIST** - typicky ručně psaný, obsahuje položky zboží/služeb
2. **PARAGON** - zjednodušený daňový doklad
3. **Faktura VAT** - s číslem a rozpisem DPH
4. **Razítko a podpis** - často u ručních dokladů
5. **Celková částka** - obvykle v rámečku nebo zvýrazněná

### Typy účtenek v databázi:
- **Sklenářství** - dodací list, ručně psaný
- **Tonery (4ink)** - elektronická faktura z PL
- **Autoservis** - paragon za díly a práci

---

*Vzory aktualizovány: 26.8.2025*