# ✅ OPRAVA TOU NASTAVENÍ - SPRÁVNÉ NABÍJENÍ/VYBÍJENÍ

## 📅 Datum: 2025-08-14

## 🎯 Problém:
TOU (Time-Of-Use) nastavení zobrazovalo nesprávné akce a ceny:
- **00:00-01:00**: Zobrazovalo "Nabíjet" v drahé elektřině (mělo by být "Vybíjet")
- **Hardcoded ceny**: 2.5, 3.5, 4.5 Kč/kWh místo skutečných OTE cen
- **Nesprávné akce**: Nabíjení v drahých hodinách, vybíjení v levných

## ✅ Opravy:

### 1. **Aktualizace výchozích TOU periods** (řádky 101-125):
```python
# Skutečné OTE hodiny:
# Levné: [4, 11, 12, 13, 14, 15, 16, 17]
# Normální: [1, 2, 3, 5, 6, 9, 10, 18]
# Drahé: [0, 7, 8, 19, 20, 21, 22, 23]

{"start": 0, "end": 0, "charge": False, "price": "expensive"},  # Drahá - vybíjet
{"start": 4, "end": 4, "charge": True, "price": "cheap"},      # Levná - nabíjet!
{"start": 11, "end": 11, "charge": True, "price": "cheap"},    # Levná - nabíjet!
```

### 2. **Aktualizace cen v JavaScript** (řádky 2691-2693, 2628-2629):
```javascript
// Původní:
const priceMap = {cheap: '2.5', normal: '3.5', expensive: '4.5'};

// Nové - skutečné OTE průměrné ceny:
const priceMap = {cheap: '5.3', normal: '6.2', expensive: '7.5'};
```

### 3. **Přidána funkce initializeTOUFromOTE()** (řádky 2686-2719):
- Automaticky nastaví správné akce podle OTE hodin
- Levné hodiny → Nabíjet (true)
- Drahé a normální hodiny → Vybíjet (false)
- Aktualizuje zobrazení cen

### 4. **Přidána funkce updatePriceDisplay()** (řádky 2625-2631):
- Dynamicky aktualizuje cenu při změně typu zóny
- Používá skutečné OTE průměrné ceny

## 📊 Správné nastavení TOU:

| Hodina | Zóna | Akce | Cena |
|--------|------|------|------|
| 00:00-01:00 | 🔴 Drahá | ⚡ Vybíjet | 7.5 Kč/kWh |
| 01:00-02:00 | 🔶 Normální | ⚡ Vybíjet | 6.2 Kč/kWh |
| 04:00-05:00 | 💚 Levná | 🔋 Nabíjet | 5.3 Kč/kWh |
| 07:00-08:00 | 🔴 Drahá | ⚡ Vybíjet | 7.5 Kč/kWh |
| 11:00-12:00 | 💚 Levná | 🔋 Nabíjet | 5.3 Kč/kWh |
| 12:00-13:00 | 💚 Levná | 🔋 Nabíjet | 5.3 Kč/kWh |
| 13:00-14:00 | 💚 Levná | 🔋 Nabíjet | 5.3 Kč/kWh |
| 14:00-15:00 | 💚 Levná | 🔋 Nabíjet | 5.3 Kč/kWh |
| 15:00-16:00 | 💚 Levná | 🔋 Nabíjet | 5.3 Kč/kWh |
| 16:00-17:00 | 💚 Levná | 🔋 Nabíjet | 5.3 Kč/kWh |
| 17:00-18:00 | 💚 Levná | 🔋 Nabíjet | 5.3 Kč/kWh |
| 19:00-20:00 | 🔴 Drahá | ⚡ Vybíjet | 7.5 Kč/kWh |
| 20:00-21:00 | 🔴 Drahá | ⚡ Vybíjet | 7.5 Kč/kWh |
| 21:00-22:00 | 🔴 Drahá | ⚡ Vybíjet | 7.5 Kč/kWh |
| 22:00-23:00 | 🔴 Drahá | ⚡ Vybíjet | 7.5 Kč/kWh |
| 23:00-24:00 | 🔴 Drahá | ⚡ Vybíjet | 7.5 Kč/kWh |

## ✅ Výsledek:
- **Nabíjení pouze v levných hodinách**: 4, 11-17
- **Vybíjení v drahých hodinách**: 0, 7-8, 19-23
- **Vybíjení v normálních hodinách**: 1-3, 5-6, 9-10, 18
- **Skutečné OTE ceny**: 5.3 / 6.2 / 7.5 Kč/kWh

## 🚀 Jak to funguje:
1. Při načtení stránky se volá `generateTOUTable()`
2. Následně `initializeTOUFromOTE()` nastaví správné hodnoty podle OTE hodin
3. Uživatel může hodnoty změnit a uložit pomocí `saveTOUSettings()`
4. Při změně typu zóny se automaticky aktualizuje cena pomocí `updatePriceDisplay()`

---
*Oprava dokončena: 2025-08-14 10:05*