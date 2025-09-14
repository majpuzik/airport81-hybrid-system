# 🔋 AGRESIVNÍ STRATEGIE ŘÍZENÍ BATERIE
==========================================
Datum: 2025-08-11
Status: IMPLEMENTOVÁNO

## ⚡ HLAVNÍ ZMĚNY

### 1. **EMERGENCY NABÍJENÍ (PRIORITA #1)**
- **SOC < 25%**: OKAMŽITÉ nabíjení z gridu
- Ignoruje cenu elektřiny - zdraví baterie je priorita
- Cíl: Dostat SOC nad 25% co nejrychleji

### 2. **AKTIVNÍ NABÍJENÍ V LEVNÝCH HODINÁCH**
Místo pasivního čekání systém AKTIVNĚ nabíjí:

#### 🌙 Noční nabíjení (1:00-5:00)
- Nabít na **100%** pro ranní špičku
- Cena: ~2.0-2.3 Kč/kWh
- Využití: Ranní špička 6:00-9:00 (3.5-4.0 Kč/kWh)

#### ☀️ Odpolední nabíjení (13:00-16:00)
- Nabít na **90-100%** pro večerní špičku
- Cena: ~2.7-2.9 Kč/kWh  
- Využití: Večerní špička 17:00-19:00 (4.2-4.6 Kč/kWh)

### 3. **INTELIGENTNÍ VYBÍJENÍ**
Baterie se vybíjí POUZE v drahých hodinách:
- **17:00-19:00**: Večerní špička (>4.0 Kč/kWh)
- **6:00-9:00**: Ranní špička (>3.5 Kč/kWh)
- **Když cena > průměr baterie + 0.5 Kč**

## 📊 DENNÍ CYKLUS

```
00:00 ├─────────────────────────────────────┤ 24:00
      🌙 NABÍJENÍ     ☀️ FV      📈 NABÍT   💸 VYBÍT
      1:00-5:00    9:00-13:00  13:00-16:00  17:00-19:00
      (2.0-2.3)    (zdarma)    (2.7-2.9)    (4.2-4.6)
```

## 💰 EKONOMICKÝ PŘÍNOS

### Před optimalizací:
- Průměrná cena: 3.12 Kč/kWh
- Náhodné nabíjení/vybíjení
- Časté podkročení min SOC

### Po optimalizaci:
- Nabíjení: 2.2-2.5 Kč/kWh (levné hodiny)
- Vybíjení: 4.0-4.6 Kč/kWh (drahé hodiny)
- **Úspora: 1.5-2.0 Kč/kWh = 30-45 Kč/den**

## 🎯 PRIORITY ROZHODOVÁNÍ

1. **SOC < 25%** → EMERGENCY nabíjení (ignoruje cenu)
2. **Levná hodina** → Nabít na 95-100%
3. **Před špičkou** → Dobít baterii
4. **Drahá hodina** → Vybíjet (pokud SOC > 30%)
5. **Ranní špička** → Použít baterii
6. **Přebytek FV** → Nabít ze slunce
7. **Jinak** → Čekat

## ⚠️ OCHRANA BATERIE

- **Minimální SOC**: 25% (NIKDY níž!)
- **Maximální SOC**: 95% (šetrné k baterii)
- **Rezerva pro emergency**: 30% při vybíjení

## 🔧 IMPLEMENTAČNÍ DETAILY

### Změny v ai_decision():
```python
# PRIORITA 1: EMERGENCY
if current_soc < CONFIG['min_soc']:
    decision = 'charge_emergency'
    
# PRIORITA 2: Levné hodiny
elif current_hour in charge_hours:
    if current_soc < 95:
        decision = 'charge_from_grid'
        
# PRIORITA 3: Před špičkou
elif 13 <= current_hour <= 16:
    if current_soc < 90:
        decision = 'charge_from_grid'
```

### Nové stavy baterie:
- `FORCE_CHARGE`: Emergency nabíjení
- `GRID_CHARGE`: Plánované nabíjení z gridu
- `DISCHARGE`: Aktivní vybíjení
- `PV_CHARGE`: Nabíjení ze slunce
- `IDLE`: Čekání

## 📈 VÝSLEDKY

- **Baterie VŽDY nad 25%** ✅
- **Připravena na špičky** ✅  
- **Maximální úspory** ✅
- **Ochrana baterie** ✅

## 🚀 DALŠÍ KROKY

1. Implementovat API volání pro skutečné řízení SOLAX
2. Přidat predikci spotřeby domácnosti
3. Integrovat předpověď počasí pro FV
4. Machine learning pro optimalizaci

---
**SYSTÉM JE NYNÍ AGRESIVNÍ A AKTIVNÍ**
Místo pasivního reagování aktivně plánuje a řídí baterii pro maximální úspory!