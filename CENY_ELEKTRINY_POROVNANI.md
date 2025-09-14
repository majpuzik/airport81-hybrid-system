# 💰 POROVNÁNÍ CEN ELEKTŘINY - IMPLEMENTOVÁNO

## ✅ Co bylo implementováno

### 1. Vedle sebe dva výpočty
- **OTE SPOT** - dynamická cena podle burzy
- **BEZDODAVATELE** - fixní tarif 2.47 Kč/kWh z vyúčtování

### 2. Skutečné fixní poplatky ČEZ
Přidány všechny poplatky včetně:
- **Distribuce ČEZ** - tarif D56d s VT/NT sazbami
- **Systémové služby** - 134.75 Kč/MWh 
- **Podpora POZE** - 599 Kč/MWh
- **Operátor trhu OTE** - 5.81 Kč/MWh
- **Stálé platby**:
  - Jistič 3x50A: 480 Kč/měsíc
  - Stálý plat za odběrné místo: 150 Kč/měsíc
  - Přepočteno na kWh podle měsíční spotřeby (2500 kWh)

### 3. Přirážka Bezdodavatele
- 99 Kč/MWh (0.099 Kč/kWh) podle vyúčtování

### 4. DPH 21%
- Aplikováno na všechny složky ceny

## 📊 Aktuální výsledky porovnání

### OTE SPOT (aktuální hodina)
- Elektřina: 0.0014 Kč/kWh (spot cena)
- Bezdodavatel fee: 0.099 Kč/kWh
- Distribuce: 1.44 Kč/kWh
- Stálé platby: 0.252 Kč/kWh
- **FINÁLNÍ CENA s DPH: 3.06 Kč/kWh**

### BEZDODAVATELE
- Elektřina: 2.469 Kč/kWh (fixní)
- Bezdodavatel fee: 0.099 Kč/kWh
- Distribuce: 1.44 Kč/kWh  
- Stálé platby: 0.252 Kč/kWh
- **FINÁLNÍ CENA s DPH: 6.05 Kč/kWh**

### Výsledek
✅ **OTE SPOT je LEVNĚJŠÍ o 2.99 Kč/kWh**
💰 **Měsíční úspora: 7,464 Kč** (při spotřebě 2500 kWh)

## 🖥️ GUI zobrazení

Implementováno v sekci "💰 Porovnání cen elektřiny - VEDLE SEBE":
1. Dva sloupce vedle sebe s barevným odlišením
2. Detailní rozpis všech poplatků
3. Výsledek porovnání s výpočtem úspor
4. Informační poznámka s vysvětlením výpočtu

## 📍 Kde najít

**Web rozhraní:** http://localhost:8089
**Soubor:** `/Users/m.a.j.puzik/solax_smart_charging_monitor.py`
**Řádky:** 1766-1936 (GUI sekce)

## 🔧 Technické detaily

### Funkce pro výpočet cen:
- `calculate_final_price()` - OTE spot cena s poplatky (řádky 223-303)
- `calculate_bezdodavatele_price()` - fixní tarif s poplatky (řádky 304-381)

### Vstupní parametry:
- OTE spot cena (Kč/MWh)
- Hodina (pro určení VT/NT tarifu)
- Měsíční spotřeba (výchozí 2500 kWh)

### Výstup:
Dictionary s detailním rozpisem všech složek ceny včetně finální ceny s DPH

---
*Implementováno: 14.8.2025*
*SOLAX Smart Charging Monitor v0.6*