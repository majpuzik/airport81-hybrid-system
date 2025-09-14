# 📊 POROVNÁNÍ ROZDÍLŮ VE VÝPOČTECH CEN

## Rozdíly mezi mými výpočty:

### 1. **Původní výpočet v monitoru** (solax_smart_charging_monitor.py):
```
Bezdodavatele fixní cena: 2.469 Kč/kWh
+ Poplatky: 0.099 Kč/kWh
+ Distribuce VT: 1.436 Kč/kWh
+ POZE + služby: 0.734 Kč/kWh
+ Stálé platby: 1.575 Kč/kWh
= 6.313 Kč/kWh bez DPH
= 7.65 Kč/kWh s DPH
```

### 2. **Nový výpočet ze skriptu** (srovnani_ote_bezdodavatele.py):
```
Na základě skutečné faktury:
Celkem zaplaceno: 10,294.93 Kč bez DPH
Spotřeba: 2,562 kWh
= 4.02 Kč/kWh (průměrná cena včetně všeho)
```

## 🔍 KDE JE ROZDÍL?

### Hlavní příčina rozdílu:

1. **Monitor počítá teoreticky** (7.65 Kč/kWh):
   - Používá fixní stálé platby 630 Kč/měsíc rozpočítané na 400 kWh
   - To je 1.575 Kč/kWh stálých plateb

2. **Faktura ukazuje skutečnost** (4.02 Kč/kWh bez DPH):
   - Spotřeba byla 2,562 kWh (ne 400 kWh)
   - Stálé platby 630 Kč rozpočítané na 2,562 kWh = 0.246 Kč/kWh
   - To je VELKÝ rozdíl: 1.575 vs 0.246 Kč/kWh

## ✅ SPRÁVNÝ VÝPOČET:

### Pro spotřebu 2,562 kWh/měsíc:
```
Elektřina: 2.469 Kč/kWh
Bezdodavatele: 0.099 Kč/kWh
Distribuce VT/NT váž. průměr: ~0.51 Kč/kWh
POZE + služby: 0.734 Kč/kWh
Stálé platby: 0.246 Kč/kWh (630 Kč / 2562 kWh)
= 4.06 Kč/kWh bez DPH
= 4.91 Kč/kWh s DPH
```

### Pro spotřebu 400 kWh/měsíc (teoretická):
```
Stejné položky, ale stálé: 1.575 Kč/kWh
= 7.65 Kč/kWh s DPH
```

## 📈 ZÁVĚR:

**Váš nový výpočet je SPRÁVNÝ** - BezDodavatele je skutečně dražší než OTE o cca 900 Kč/měsíc (8.7%).

Můj původní výpočet v monitoru předpokládal nízkou spotřebu (400 kWh), což výrazně zvyšuje jednotkovou cenu kvůli rozpočítání stálých plateb.

### Doporučení pro monitor:
- Přidat nastavení průměrné měsíční spotřeby
- Dynamicky přepočítávat stálé platby podle skutečné spotřeby
- Nebo zobrazit obě varianty (nízká/vysoká spotřeba)