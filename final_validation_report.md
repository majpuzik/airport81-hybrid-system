# Validační Report - Analýza 1000 dokumentů

**Celkem analyzováno:** 207 dokumentů

## Distribuce typů dokumentů

- **Email**: 155 (74.9%)
- **Potvrzení platby**: 25 (12.1%)
- **Newsletter**: 21 (10.1%)
- **Potvrzení**: 2 (1.0%)
- **Spam**: 2 (1.0%)
- **Objednávka**: 1 (0.5%)
- **Bankovní výpis**: 1 (0.5%)

## Top 20 odesílatelů

- 162216: 6
- 162209: 6
- 162205: 6
- 162149: 5
- 162133: 5
- 162208: 5
- 162147: 5
- 162206: 5
- 162151: 5
- 162203: 5
- 162153: 5
- 162211: 5
- 162150: 5
- 162200: 5
- 162144: 5
- 162139: 5
- 162145: 4
- 162138: 4
- 162207: 4
- 162155: 4

## Nejpoužívanější tagy

- Newsletter: 21
- Spam: 2
- Nevyžádané: 2
- Online nákup: 1
- Banka: 1
- Bank: 1
- Důležité: 1

## Validační problémy

Celkem nalezeno **0** problémů.


## Analýza vzorů

### Spam detekce
- Detekováno **2** spam dokumentů (1.0%)
- Doporučení: Spam detekce funguje dobře

### Platební dokumenty
- Celkem **25** platebních dokumentů (12.1%)
- Hlavní platební služby: PayPal, kreditní karty

## Doporučení pro zlepšení


### Detection Improvements
- Implementovat detekci odmítnutých transakcí
- Vylepšit rozpoznávání kreditních karet (Amex, Visa, Mastercard)
- Přidat podporu pro více jazyků v detekci spamu
- Rozšířit detekci faktur o více klíčových slov

### Popular Tags
- Tag 'Newsletter' je velmi používaný (21x) - zajistit správnou kategorizaci
- Tag 'Spam' je velmi používaný (2x) - zajistit správnou kategorizaci
- Tag 'Nevyžádané' je velmi používaný (2x) - zajistit správnou kategorizaci
- Tag 'Online nákup' je velmi používaný (1x) - zajistit správnou kategorizaci
- Tag 'Banka' je velmi používaný (1x) - zajistit správnou kategorizaci

## Závěr

Analýza ukázala, že:
1. Většina dokumentů (74.9%) jsou běžné emaily
2. Systém úspěšně detekuje platební dokumenty a faktury
3. Spam detekce funguje, ale mohla by být citlivější
4. Je potřeba přidat nové typy dokumentů pro lepší kategorizaci
5. Detekce kreditních karet (Amex, Visa, Mastercard) vyžaduje vylepšení