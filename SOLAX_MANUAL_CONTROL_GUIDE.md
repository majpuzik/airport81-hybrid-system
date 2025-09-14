# 📱 MANUÁLNÍ OVLÁDÁNÍ SOLAX PŘES CLOUD
==========================================
Datum: 2025-08-11 13:40
Status: PŘIPRAVENO K POUŽITÍ

## 🚨 AKTUÁLNÍ SITUACE
- **SOC: 10%** (KRITICKY NÍZKÉ!)
- **Požadavek: OKAMŽITÉ NABÍJENÍ**
- **Systém vydal příkaz: FORCE_CHARGE**

## 📱 JAK NASTAVIT PŘES SOLAX CLOUD

### Webové rozhraní:
1. Otevřete: **https://cloud.solaxcloud.com**
2. Přihlaste se vašimi údaji
3. **Device Management** → **Remote Setting**
4. Zadejte SN: **SNNTF49WK7**
5. Klikněte **Login**

### Mobilní aplikace:
1. Otevřete **SolaX Cloud** app
2. Vyberte váš střídač
3. **Remote Setting**

## ⚡ EMERGENCY NABÍJENÍ (HNED!)

### 1. Nastavte Work Mode:
```
Work Mode: Self Use (Vlastní spotřeba)
```

### 2. Nastavte Battery Settings:
```
Battery Min SOC: 25%
Battery Max SOC: 95%
Grid Charge: ENABLE ✅
```

### 3. Nastavte Charge Time:
```
Charge Start Time 1: 13:00 (nebo NOW)
Charge End Time 1: 16:00 (+3 hodiny)
```

### 4. Vypněte Discharge:
```
Discharge Start Time 1: 23:00
Discharge End Time 1: 23:01
(nebo DISABLE)
```

### 5. Export Control:
```
Export Power Limit: 0W
(žádný export během nabíjení)
```

## 📊 INTELIGENTNÍ PLÁNOVÁNÍ

### Levné hodiny (nabíjení):
- **Noc**: 01:00 - 05:00 (2.0-2.3 Kč/kWh)
- **Odpoledne**: 13:00 - 16:00 (2.7-2.9 Kč/kWh)

### Drahé hodiny (vybíjení):
- **Ráno**: 06:00 - 09:00 (3.5-4.0 Kč/kWh)
- **Večer**: 17:00 - 19:00 (4.2-4.6 Kč/kWh)

## 🔧 PROVOZNÍ REŽIMY

### Self Use (Vlastní spotřeba)
- Priorita: Domácnost
- Přebytky do baterie
- Grid jako backup

### Feed-in Priority (Export)
- Priorita: Export do sítě
- Maximální výkon do gridu
- Pro vybíjení ve špičkách

### Backup Mode
- Baterie jako záloha
- Minimální vybíjení
- Pro ochranu baterie

## 📝 ČASOVÉ PROFILY

### Ranní nabíjení:
```
Charge Start 1: 01:00
Charge End 1: 05:00
Discharge: DISABLED
```

### Večerní vybíjení:
```
Discharge Start 1: 17:00
Discharge End 1: 19:00
Charge: DISABLED
Export Control: 5000W
```

## ⚠️ DŮLEŽITÉ

1. **Změny se projeví za 1-5 minut**
2. **Při SOC < 25% VŽDY nabíjet!**
3. **Kontrolujte display střídače**
4. **Systém loguje všechna rozhodnutí**

## 🎯 AUTOMATIZACE

Dashboard na **http://localhost:8085** automaticky:
- Analyzuje OTE ceny
- Navrhuje optimální časy
- Zobrazuje instrukce
- Loguje všechny příkazy

**Pokud máte Modbus TCP:**
```bash
pip3 install pymodbus
# Systém se pokusí řídit automaticky
```

## 📞 PODPORA

- SOLAX Support: support@solaxpower.com
- Dokumentace: kb.solaxpower.com
- Dashboard: http://localhost:8085

---
**NASTAVTE EMERGENCY CHARGE IHNED!**
Baterie má pouze 10% - hrozí poškození!