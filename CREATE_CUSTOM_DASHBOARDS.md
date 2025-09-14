# 🎨 JAK VYTVOŘIT VLASTNÍ DASHBOARDY PRO INTEGRACE

## 🚀 VYTVOŘENÍ DASHBOARDU PRO SOLAX:

1. **Nastavení** → **Dashboardy**
2. **+ PŘIDAT DASHBOARD**
3. Zadejte:
   - **Název:** SOLAX
   - **Ikona:** mdi:solar-power
   - **URL:** solax
4. **Zobrazit v postranním panelu:** ✅ (zaškrtnout!)
5. **VYTVOŘIT**

Teď se SOLAX objeví v levém menu!

## 📋 DOPORUČENÉ DASHBOARDY:

### 1. SOLAX Dashboard:
```yaml
Název: SOLAX
Ikona: mdi:solar-power
URL: solax
```

### 2. Loxone Dashboard:
```yaml
Název: Loxone
Ikona: mdi:home-automation
URL: loxone
```

### 3. Energie Dashboard:
```yaml
Název: Energie
Ikona: mdi:lightning-bolt
URL: energie
```

## 🎯 CO PŘIDAT NA DASHBOARD:

### SOLAX Dashboard:
- Výkon FV (W)
- Stav baterie (%)
- Spotřeba domu (W)
- Dnešní výroba (kWh)
- Grid power (W)

### Loxone Dashboard:
- Teploty
- Osvětlení
- Žaluzie
- Meteo stanice

### Energie Dashboard:
- OTE aktuální cena
- SOLAX výroba
- Spotřeba
- Predikce

## 📝 JAK PŘIDAT KARTY:

1. Otevřete nový dashboard
2. Klikněte **"+ PŘIDAT KARTU"**
3. Vyberte typ karty:
   - **Gauge** - pro zobrazení hodnot (výkon, %)
   - **Graph** - pro historii
   - **Entities** - seznam entit
   - **Energy** - speciální pro energii

4. Vyberte entity z vašich integrací

## 🎨 PŘÍKLAD SOLAX KARTY:

```yaml
type: gauge
entity: sensor.solax_battery_soc
name: Baterie
unit: '%'
min: 0
max: 100
severity:
  green: 50
  yellow: 30
  red: 10
```

## 💡 TIP:
Po vytvoření dashboardu s "Zobrazit v postranním panelu" se objeví v levém menu jako HACS!

---
**Vytvořeno:** 2025-08-17 13:15