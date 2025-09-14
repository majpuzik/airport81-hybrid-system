# 🔧 OPRAVA VÝPOČTU CEN - Stálé platby před DPH

## ❌ CHYBA (původní výpočet)
Stálé platby byly přičítány AŽ PO výpočtu DPH:
```
Celkem bez DPH: 6.775 Kč
DPH 21%: 1.423 Kč  
Celkem s DPH: 8.198 Kč
+ Stálé platby: 1.575 Kč
= FINÁLNÍ: 9.77 Kč/kWh ❌
```

## ✅ OPRAVA (správný výpočet)
Stálé platby se přičítají PŘED výpočtem DPH:
```
Celkem bez DPH: 8.350 Kč (včetně stálých plateb!)
DPH 21%: 1.753 Kč
= FINÁLNÍ: 10.10 Kč/kWh ✅
```

## 📊 NOVÉ FINÁLNÍ CENY

| Zóna | OTE | Distribuce | Finální cena | Změna |
|------|-----|------------|--------------|-------|
| 🟢 Levné (1-5, 11-16) | 2.5 Kč | NT | **6.36 Kč/kWh** | +0.33 Kč |
| ⚪ Normální | 3.5 Kč | NT | **7.57 Kč/kWh** | +0.33 Kč |
| 🔴 Drahé (6-9, 17-19) | 4.5 Kč | VT | **10.10 Kč/kWh** | +0.33 Kč |

## 💰 DOPAD NA NABÍJENÍ BATERIE (28 kWh)

| Kdy nabíjet | Stará cena | Nová cena | Náklady |
|-------------|------------|-----------|---------|
| 🟢 Levné hodiny | 169 Kč | **178 Kč** | +9 Kč |
| ⚪ Normální hodiny | 203 Kč | **212 Kč** | +9 Kč |
| 🔴 Drahé hodiny | 274 Kč | **283 Kč** | +9 Kč |

## 📝 TECHNICKÁ ZMĚNA

**Soubor:** `solax_smart_charging_monitor.py`
**Funkce:** `calculate_final_price()` (řádky 172-186)

```python
# PŘED (chybně):
celkem_bez_dph = (ote + bezd + dist + system + poze + ote_op)
dph = celkem_bez_dph * 0.21
celkem_s_dph = celkem_bez_dph + dph
celkem_final = celkem_s_dph + stale_platby  # ❌

# PO (správně):
celkem_bez_dph = (ote + bezd + dist + system + poze + ote_op + stale_platby)
dph = celkem_bez_dph * 0.21
celkem_final = celkem_bez_dph + dph  # ✅
```

## ✅ OVĚŘENÍ

Pro drahé hodiny (7:00, VT tarif, OTE 4.5 Kč/kWh):
- Součet před DPH: 4.500 + 0.099 + 1.436 + 0.135 + 0.599 + 0.006 + 1.575 = **8.350 Kč**
- DPH 21%: 8.350 × 0.21 = **1.753 Kč**
- FINÁLNÍ CENA: 8.350 + 1.753 = **10.10 Kč/kWh** ✅

---
*Opraveno: 14.8.2025 07:54*