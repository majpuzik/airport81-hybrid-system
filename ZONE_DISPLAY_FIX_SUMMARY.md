# ✅ OPRAVA ZOBRAZENÍ ZÓN V DETAILNÍM PLÁNU NABÍJENÍ

## 🎯 Problém:
Detailní plán nabíjení zobrazoval **VŠECHNY hodiny jako "Drahá zóna"** (červené), i když podle OTE cen máme:
- 🟢 Levné hodiny: [4, 11, 12, 13, 14, 15, 16, 17]
- ⚪ Normální hodiny: [1, 2, 3, 5, 6, 9, 10, 18] 
- 🔴 Drahé hodiny: [0, 7, 8, 19, 20, 21, 22, 23]

## 🔧 Příčina:
JavaScript kód v HTML template používal **hardcoded hodnoty cen** (2.5, 3.5, 4.5 Kč/kWh) pro určení zón místo skutečných hodin z konfigurace.

## ✅ Řešení:

### 1. **Detailní plán nabíjení** (řádky 2362-2378):
```javascript
// PŮVODNÍ KÓD (špatně):
if (price <= 2.5) {
    zoneType = 'cheap';
} else if (price >= 4.5) {
    zoneType = 'expensive';
}

// NOVÝ KÓD (správně):
const cheapHours = {{ config.cheap | tojson }};
const expensiveHours = {{ config.expensive | tojson }};

if (cheapHours.includes(h)) {
    zoneType = 'cheap';
} else if (expensiveHours.includes(h)) {
    zoneType = 'expensive';
}
```

### 2. **Plotly graf** (řádky 3004-3012):
```javascript
// Barvy určené podle hodin, ne podle cen
const colors = Array.from({length: 24}, (_, h) => {
    if (cheapHours.includes(h)) return 'rgba(16, 185, 129, 0.8)';
    if (expensiveHours.includes(h)) return 'rgba(239, 68, 68, 0.8)';
    return 'rgba(107, 114, 128, 0.8)';
});
```

### 3. **SVG graf** (řádky 3123-3129):
```javascript
// Použití skutečných zón pro barvy
let color = '#6b7280';
if (cheapHours.includes(h)) color = '#10b981';
if (expensiveHours.includes(h)) color = '#ef4444';
```

### 4. **Legendy** (řádky 1873-1876, 3161-3168):
- Odstraněny hardcoded ceny z legend
- Zobrazují se pouze názvy zón nebo skutečné hodiny

## 📊 Výsledek:
Detailní plán nabíjení nyní správně zobrazuje:
- 🟢 **Levné zóny** v hodinách 4, 11-17
- 🟡 **Normální zóny** v hodinách 1-3, 5-6, 9-10, 18
- 🔴 **Drahé zóny** v hodinách 0, 7-8, 19-23

## 🚀 Testování:
Monitor běží na `http://localhost:8089` a správně zobrazuje:
- Detailní plán nabíjení se správnými zónami
- Graf s barevným rozlišením podle skutečných OTE hodin
- Legendy bez hardcoded cen

---
*Oprava dokončena: 2025-08-14*