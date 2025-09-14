# 🔋 SOLAX Smart Charging Monitor v0.6 - FINÁLNÍ DOKUMENTACE
**Datum: 13.8.2025 23:25**

## 🎯 HLAVNÍ ÚSPĚCHY

### ✅ 1. PŘÍMÉ PŘIPOJENÍ NA SOLAX CLOUD API
- **Problém:** Home Assistant zobrazoval staré/cache data (SOC 56% místo skutečných 10%)
- **Řešení:** Implementováno přímé čtení ze SOLAX Cloud API
- **Konfigurace:** `data_source: "solax_cloud"` 
- **Výsledek:** Monitor nyní zobrazuje správné real-time SOC 10%

### ✅ 2. KOMPLETNÍ KALKULACE CEN S POPLATKY
- **Implementována funkce `calculate_final_price()`** která počítá:
  - OTE spot cenu (2.5/3.5/4.5 Kč/kWh)
  - Poplatky Bezdodavatele (99 Kč/MWh)
  - ČEZ distribuce D56d (NT: 344, VT: 1436 Kč/MWh)
  - Systémové služby (135 Kč/MWh)
  - POZE podporu (599 Kč/MWh)
  - OTE operátor (6 Kč/MWh)
  - DPH 21%
  - Stálé platby za 50A jistič (630 Kč/měsíc)

### ✅ 3. FINÁLNÍ CENY ELEKTŘINY
```
🟢 Levné hodiny (1-5, 11-16):    6.03 Kč/kWh
⚪ Normální hodiny:               7.24 Kč/kWh
🔴 Drahé hodiny (6-9, 17-19):    9.77 Kč/kWh
```

## 📊 AKTUÁLNÍ STAV SYSTÉMU

### Baterie (SOLAX X3-ULT)
- **SOC:** 10% (přímá data ze SOLAX Cloud)
- **Kapacita:** 40 kWh
- **Cílové SOC:** 80%
- **Potřeba nabít:** 28 kWh
- **Nabíjecí výkon:** 16 kW

### Monitor
- **URL:** http://localhost:8089
- **Zdroj dat:** SOLAX Cloud (přímé API)
- **Update interval:** 1 minuta
- **Režim:** SELF_USE

### Náklady na nabití (28 kWh)
- **V levných hodinách:** 169 Kč
- **V normálních hodinách:** 203 Kč  
- **V drahých hodinách:** 274 Kč
- **Úspora:** 105 Kč (levné vs drahé)

## 🔧 TECHNICKÉ ZMĚNY

### 1. Konfigurace (řádky 55-57)
```python
data_source: str = "solax_cloud"  # Přímé SOLAX Cloud API
solax_username: str = "majpuzik@gmail.com"
solax_password: str = "Max007"
```

### 2. Funkce calculate_final_price (řádky 129-204)
```python
def calculate_final_price(ote_spot_price: float, hour: int = None) -> dict:
    # Kompletní výpočet všech poplatků
    # Vrací detailní rozpis ceny včetně DPH
```

### 3. GUI - Nová karta s cenami (řádky 1534-1600)
- Zobrazuje aktuální OTE cenu
- Rozpis všech poplatků
- Finální cenu s DPH
- Aktuální tarif (NT/VT)

### 4. Přímé SOLAX Cloud API (řádky 832-890)
```python
def get_data_from_solax_cloud(self) -> dict:
    # Rate limiting 1 req/min
    # Automatický fallback na HA při chybě
    # Vrací SOC, battery_power, today_yield
```

## 📈 OPTIMALIZACE NABÍJENÍ

### Časové zóny
- **Levné hodiny:** 1-5, 11-16 (11 hodin)
- **Normální hodiny:** 0, 10, 20-23 (6 hodin)
- **Drahé hodiny:** 6-9, 17-19 (7 hodin)

### Strategie
1. **SOC < 25%:** Nabíjet i v normálních hodinách
2. **SOC 25-80%:** Nabíjet pouze v levných hodinách
3. **SOC > 80%:** Nenabíjet
4. **Drahé hodiny:** Vybíjet do domu

## 🚀 SPUŠTĚNÍ

```bash
# Spustit monitor
python3 solax_smart_charging_monitor.py

# Otevřít GUI
open http://localhost:8089

# Zkontrolovat log
tail -f /tmp/monitor_solax_direct.log
```

## 📝 DŮLEŽITÉ SOUBORY

1. **Hlavní aplikace:** `/Users/m.a.j.puzik/solax_smart_charging_monitor.py`
2. **Konfigurace:** `/Users/m.a.j.puzik/.solax_monitor_config.json`
3. **Historie nabíjení:** `/Users/m.a.j.puzik/.solax_charging_history.json`

## ⚠️ ZNÁMÉ PROBLÉMY A ŘEŠENÍ

### Problém: HA zobrazuje staré data
- **Příčina:** HA SOLAX integrace cachuje data 8+ hodin
- **Řešení:** Použít přímé SOLAX Cloud API (`data_source: "solax_cloud"`)

### Problém: Timeout při přihlášení k SOLAX Cloud
- **Příčina:** Pomalá odezva SOLAX serverů
- **Řešení:** Monitor automaticky použije existující token nebo přepne na HA

### Problém: Nesprávné NT/VT tarify
- **Příčina:** Špatné časové rozmezí
- **Řešení:** NT: 20:00-6:00, VT: 6:00-20:00

## 🎉 VÝSLEDEK

Monitor nyní:
- ✅ Čte správná data přímo ze SOLAX Cloud (SOC 10%)
- ✅ Počítá kompletní ceny včetně všech poplatků a DPH
- ✅ Zobrazuje finální ceny v GUI (6.03-9.77 Kč/kWh)
- ✅ Automaticky optimalizuje nabíjení podle cen
- ✅ Funguje spolehlivě s minutovými updaty

---
*SOLAX Smart Charging Monitor v0.6 © by majp*
*Dokumentace vytvořena: 13.8.2025 23:25*