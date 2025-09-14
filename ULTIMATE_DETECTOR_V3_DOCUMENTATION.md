
# 📄 ULTIMATE DOCUMENT DETECTOR V3.0 - DOKUMENTACE

## ⚠️ KLÍČOVÉ OPRAVY:

### 1. PROFORMA vs SKUTEČNÁ FAKTURA:
- **PROFORMA** = předpis k platbě (NENÍ daňový doklad)
- **FAKTURA** = daňový doklad (JE účetní doklad)

### 2. DETEKČNÍ LOGIKA:
1. **Explicitní proforma** (95% confidence)
   - "proforma" v názvu nebo obsahu
   - "předpis k platbě", "advance invoice"
   
2. **Náležitosti české faktury** (85-99% confidence)
   - IČO, DIČ, částka v Kč, DPH, datum, číslo faktury
   - 5+ náležitostí = skutečná faktura
   
3. **Služby podle názvu** (85% confidence)  
   - čištění, sklenářství, kancelářská technika
   - nájem, servis, oprava
   
4. **Účtenky** (80% confidence)
   - scan_XXX soubory
   - "receipt", "účtenka"

### 3. TAGOVÁNÍ:
- **Proforma**: `typ:proforma` (oranžová) + `platební-předpis` (červená)
- **Faktura**: `typ:faktura` (zelená)
- **Účtenka**: `typ:uctenka` (modrá)
- **Výpis**: `typ:vypis` (fialová)

### 4. PRÁVNÍ ASPEKT:
Podle § 28 zákona o DPH musí daňový doklad obsahovat:
- IČO a DIČ dodavatele
- Datum uskutečnění zdanitelného plnění
- Rozpad DPH podle sazeb
- Celková částka

Proforma faktura tyto náležitosti obvykle nemá nebo
obsahuje text "není daňový doklad".

### 5. TESTOVÁNO NA:
✅ Automyčka Express P24FE00387 - 7/7 náležitostí = faktura
✅ Aerohosting proforma - označeno jako proforma
✅ 11 nejasných dokumentů - 8 překlasifikováno správně
