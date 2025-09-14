# ✅ OPRAVA GRAFU "OPTIMÁLNÍ NABÍJECÍ OKNO" - ZELENÉ SLOUPCE

## 📅 Datum: 2025-08-14

## 🎯 Problém:
Graf "📈 Optimální nabíjecí okno" nezobraoval žádné zelené sloupce - pouze šedé a červené, i když by měl zobrazovat zelené sloupce pro levné OTE hodiny.

## 🔧 Příčina:
Graf používal **porovnání cen místo OTE hodin** pro určení barev sloupců:
- **Špatná logika**: `if (price <= CHEAP_THRESHOLD)` - porovnával skutečné ceny s prahy 5.5 Kč/kWh
- **Skutečné OTE ceny**: ~5.3-7.5 Kč/kWh - většina byla nad prahem 5.5 Kč/kWh
- **Výsledek**: Žádné zelené sloupce, protože ani levné hodiny nebyly pod 5.5 Kč/kWh

## ✅ Řešení:

### 1. **Oprava konfigurace OTE hodin** (řádky 167-170):
```python
# PŮVODNÍ (nesprávné hodiny):
cheap_hours: List[int] = field(default_factory=lambda: [1,2,3,4,5,11,12,13,14,15,16])
expensive_hours: List[int] = field(default_factory=lambda: [6,7,8,9,17,18,19])

# NOVÉ (správné OTE hodiny):
cheap_hours: List[int] = field(default_factory=lambda: [4,11,12,13,14,15,16,17])  # Zelené - levné hodiny
expensive_hours: List[int] = field(default_factory=lambda: [0,7,8,19,20,21,22,23])  # Červené - drahé hodiny
# Normální hodiny [1,2,3,5,6,9,10,18] - automaticky vypočtené
```

### 2. **Oprava logiky barev v grafu** (řádky 2388-2411):
```javascript
// PŮVODNÍ (špatně - používalo ceny):
const price = chart.data.datasets[0].data[hour] || 6.2;
if (price <= CHEAP_THRESHOLD) {
    normalColor = 'rgba(16, 185, 129, 0.8)';
}

// NOVÉ (správně - používá OTE hodiny):
const cheapHours = {{ config.cheap_hours | tojson }};
const expensiveHours = {{ config.expensive_hours | tojson }};

if (cheapHours.includes(hour)) {
    normalColor = 'rgba(16, 185, 129, 0.8)';  // ZELENÁ
} else if (expensiveHours.includes(hour)) {
    normalColor = 'rgba(239, 68, 68, 0.8)';   // ČERVENÁ
} else {
    normalColor = 'rgba(107, 114, 128, 0.8)'; // ŠEDÁ
}
```

### 3. **Oprava aktualizační funkce** (řádky 2516-2527):
```javascript
// PŮVODNÍ (špatně - podle cen):
window.chargingChart.data.datasets[0].backgroundColor = data.prices_today.map(price => {
    if (price <= CHEAP_THRESHOLD) return COLOR_CHEAP;
    if (price >= EXPENSIVE_THRESHOLD) return COLOR_EXPENSIVE;
    return COLOR_NORMAL;
});

// NOVÉ (správně - podle hodin):
window.chargingChart.data.datasets[0].backgroundColor = Array.from({length: 24}, (_, hour) => {
    if (cheapHours.includes(hour)) return COLOR_CHEAP;
    if (expensiveHours.includes(hour)) return COLOR_EXPENSIVE;
    return COLOR_NORMAL;
});
```

### 4. **Oprava Jinja2 template chyb** (řádky 2106, 2110):
```html
<!-- PŮVODNÍ (nefungovalo v Jinja2): -->
value="{{ config.ha_port if hasattr(config, 'ha_port') else '8123' }}"

<!-- NOVÉ (funguje): -->
value="{{ config.ha_port or '8123' }}"
```

## 📊 Výsledek:

Graf "📈 Optimální nabíjecí okno" nyní správně zobrazuje:

| Hodina | Barva | Zóna | Poznámka |
|--------|-------|------|----------|
| 00:00 | 🔴 Červená | Drahá | Vybíjet |
| 04:00 | 🟢 **ZELENÁ** | **Levná** | **Nabíjet** |
| 11:00-17:00 | 🟢 **ZELENÁ** | **Levná** | **Nabíjet** |
| 19:00-23:00 | 🔴 Červená | Drahá | Vybíjet |
| Ostatní | 🔘 Šedá | Normální | Podle potřeby |

## 🚀 Testování:
Monitor běží na `http://localhost:8089` s:
- ✅ Správnými OTE hodinami
- ✅ **Zelenými sloupci v levných hodinách** 4, 11-17
- ✅ Červenými sloupci v drahých hodinách 0, 7-8, 19-23  
- ✅ Šedými sloupci v normálních hodinách 1-3, 5-6, 9-10, 18

## 🎯 Klíčové poučení:
**Graf musí používat hodiny (OTE zóny), ne porovnání cen!**
- OTE zóny jsou definované časově: levné hodiny jsou vždy 4, 11-17
- Ceny se liší den od dne, ale OTE zóny zůstávají stejné
- Pro zobrazení barev = použít `cheapHours.includes(hour)`
- Pro výpočty = použít skutečné ceny `data.prices_today[hour]`

---
*Oprava dokončena: 2025-08-14 10:45*
*Status: ✅ FUNKČNÍ - Graf zobrazuje zelené sloupce!*