# TIGO Monitor - Finální řešení

## Situace

Tigo Energy Intelligence (EI) API vyžaduje **Premium subscription** pro automatický přístup k datům jednotlivých panelů. Bez této placené služby nelze automaticky získávat data optimizérů.

## Implementované řešení

### 1. Primární zdroj dat: SOLAX Cloud API
Monitor používá reálná data z SOLAX invertoru:
- **Celkový výkon FVE** v reálném čase
- **Výkon jednotlivých stringů** (DC1, DC2, DC3)
- **String DC4** - není připojen (0W)
- Data se aktualizují každou minutu

### 2. Odhad stavu panelů
Ze stringových dat odhadujeme:
- Počet aktivních panelů
- Výkon skupin podle orientace
- Detekci problémů (odpojený string, nulový výkon)

### 3. Web Dashboard
- **Port:** 8091
- **URL:** http://localhost:8091
- Zobrazuje výkon v reálném čase
- Skupiny panelů podle orientace
- Detekce problémů

## Spuštění

### Nastavení (jednorázově):
```bash
/Users/m.a.j.puzik/setup_tigo_final.sh
```
Uloží přihlašovací údaje pro manuální kontrolu.

### Monitoring:
```bash
/Users/m.a.j.puzik/run_tigo_integrated.sh
```
Spustí monitor s reálnými daty ze SOLAX.

### Web Dashboard:
```bash
/Users/m.a.j.puzik/run_tigo_web.sh
```
Otevře web rozhraní na portu 8091.

## Manuální kontrola panelů

Pro detailní kontrolu jednotlivých panelů:
1. Přihlaste se na https://ei.tigoenergy.com
2. Použijte uložené přihlašovací údaje
3. Zkontrolujte stav jednotlivých optimizérů

## Data která monitor zobrazuje

### Ze SOLAX API (reálná):
- ✅ Celkový výkon FVE (kW)
- ✅ Výkon stringů DC1, DC2, DC3 (W)
- ✅ Status DC4 (odpojený)
- ✅ Napětí, proud, teplota

### Odhady:
- ⚠️ Počet aktivních panelů (odhad ze stringů)
- ⚠️ Výkon skupin podle orientace (proporční rozdělení)
- ⚠️ Detekce problémů (na úrovni stringů)

## Omezení

1. **Bez Premium Tigo účtu** nelze získat data jednotlivých optimizérů
2. Monitor zobrazuje **agregovaná data po stringách**, ne jednotlivé panely
3. Pro přesnou diagnostiku je nutná **manuální kontrola** přes Tigo EI web

## Alternativy

1. **Zakoupit Premium subscription** od Tigo
2. **Kontaktovat instalatéra** pro přístup k datům
3. **Použít Tigo mobilní aplikaci** pro ruční kontrolu
4. **Lokální připojení** přes Tigo Access Point (TAP)

## Souhrn

Monitor poskytuje dostatečné informace pro běžný provoz:
- Sledování celkového výkonu
- Detekce výpadků stringů
- Základní diagnostika

Pro detailní analýzu jednotlivých panelů je nutný Premium účet nebo manuální kontrola.