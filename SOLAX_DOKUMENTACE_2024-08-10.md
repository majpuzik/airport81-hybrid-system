# SOLAX Energy Manager - Dokumentace stavu
**Datum:** 2024-08-10 20:00  
**Verze:** 1.3 (s OTE pricing a energy balance)

## 🚨 KRITICKÝ STAV BATERIE
- **SOC: 10-11%** (výrazně pod minimem 25%)
- **Baterie se nenabíjí** kvůli problému v aplikaci
- **Emergency charging NEFUNGUJE**

## ✅ VYŘEŠENÉ PROBLÉMY

### 1. Grid Power Calculation
- **Problém:** `feedinpower` parameter z SOLAX API dával nesmyslné hodnoty (-5119W místo 217W)
- **Řešení:** Implementován **energy balance výpočet**
  ```python
  grid_flow = load_power - pv_power - battery_power
  ```
- **Status:** ✅ FUNKČNÍ

### 2. OTE Pricing pro bezDodavatele
- **Problém:** Používaly se klasické D56d tarify místo OTE spot cen
- **Řešení:** 
  - `track_battery_cost()` - používá OTE ceny pro nabíjení z gridu
  - `ai_decision()` - používá OTE ceny pro price comparison
  - `calculate_costs()` - používá OTE ceny pro grid náklady
- **Status:** ✅ FUNKČNÍ

### 3. SOC Limits Configuration
- **Problém:** Chyběla persistence a UI pro nastavení min/max SOC
- **Řešení:** 
  - Přidán save button v UI
  - Config se ukládá do `solax_config.json`
  - Načítá se při startu
- **Status:** ✅ FUNKČNÍ

## ❌ NEVY ŘEŠENÉ PROBLÉMY

### 1. Emergency Charging Nefunguje
- **Symptom:** Při SOC 10% < min_soc 25% se baterie nenabíjí
- **Očekávané chování:** `charge_emergency` režim bez ohledu na cenu
- **Skutečné chování:** Baterie neaktivní (4W)
- **Možné příčiny:**
  - AI decision se nevolá nebo nedokončuje
  - SOLAX API nereaguje na příkazy
  - Chyba v aplikační logice

### 2. Aplikace se zasekává
- **Symptom:** Při startu aplikace timeout nebo prázdné logy
- **Možné příčiny:**
  - Nekonečná smyčka v inicializaci
  - Problém s Flask/SocketIO
  - Více instancí běží současně

## 📋 KONFIGURACE

### Tarif: bezDodavatele D56d
```python
TARIF_CONFIG = {
    'supplier': 'bezDodavatele',
    'tarif': 'D56d',
    'vt_hours': [17, 18],  # VT 17:00-19:00
    'distribuce_nt': 0.206,
    'distribuce_vt': 1.236,
    'ostatni_poplatky': 0.695,
    'dph': 1.21
}
```

### Battery Configuration
```json
{
  "battery_mode": "auto",
  "min_soc": 25,
  "target_soc": 80,
  "update_interval": 60
}
```

### SOLAX API
- **Token:** 20250807021517756732674
- **Serial:** SNNTF49WK7
- **URL:** https://www.solaxcloud.com/proxyApp/proxy/api/getRealtimeInfo.do

## 📊 CENOVÉ HODNOTY

### OTE Spot Ceny (mock data)
```python
hourly_prices = {
    0: 1.8, 1: 1.7, 2: 1.6, 3: 1.5,  # Noc - levné
    6: 2.2, 7: 2.5, 8: 2.8,          # Ráno - dražší
    17: 2.9, 18: 3.2,                # VT hodiny - nejdražší
    19: 3.0, 20: 2.7, 21: 2.4        # Večer - klesá
}
```

### Výpočet finální ceny
```python
total_price_per_kwh = (
    ote_prices['our_price'] +        # OTE + marže
    TARIF_CONFIG[f'distribuce_{tarif.lower()}'] +  # Distribuce
    TARIF_CONFIG['ostatni_poplatky']  # Ostatní
) * TARIF_CONFIG['dph']  # DPH 21%
```

## 🔧 AI DECISION LOGIKA

### Prioritní rozhodování
1. **Emergency Charging** (SOC < min_soc)
   ```python
   if current_soc < CONFIG['min_soc']:
       decision = 'charge_emergency'
   ```
   
2. **PV Available** (PV > 100W)
   - Přebytek → nabíjet z PV
   - Deficit → doplnit z baterie pokud levnější než grid

3. **Price Based** (bez PV)
   - Levná elektřina (NT) → nabíjet
   - Drahá elektřina (VT) → vybíjet pokud baterie levnější

## 🚀 SPUŠTĚNÍ APLIKACE

```bash
cd /Users/m.a.j.puzik
python3 solax_compact_complete.py

# Aplikace běží na: http://localhost:8085
```

## 🔍 DEBUG ENDPOINTY

- `/` - Hlavní UI
- `/debug` - Grid calculation, config, AI debug
- `/api/status` - Kompletní status
- `/api/config` - Aktuální konfigurace
- `/api/update_soc` - Update SOC limits

## ⚠️ TODO PRO RÁNO

1. **URGENT: Opravit emergency charging**
   - Musí fungovat při SOC < min_soc
   - Ignorovat ceny a další podmínky

2. **Debug AI decision**
   - Zjistit proč se nevolá nebo nedokončuje
   - Přidat více logování

3. **Failsafe mechanismus**
   - Pokud SOC < 10%, vždy charge_emergency
   - Nezávisle na AI decision

4. **Test SOLAX API**
   - Ověřit že příkazy skutečně fungují
   - Možná delay mezi příkazy?

## 📁 SOUBORY

- **Hlavní aplikace:** `/Users/m.a.j.puzik/solax_compact_complete.py`
- **Konfigurace:** `/Users/m.a.j.puzik/solax_config.json`
- **Tato dokumentace:** `/Users/m.a.j.puzik/SOLAX_DOKUMENTACE_2024-08-10.md`

## 💡 POZNÁMKY

- Baterie má kapacitu 40 kWh
- Minimální SOC by nemělo klesnout pod 10% (ochrana baterie)
- Emergency charging má nejvyšší prioritu
- OTE ceny jsou nejnižší v noci (1.5-1.8 Kč/kWh kolem 2-4 hodiny)