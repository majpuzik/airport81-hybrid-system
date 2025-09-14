# 🏠 SOLAX CLOUD INTEGRACE DO HOME ASSISTANT
===========================================
Datum: 2025-08-06 20:35
Status: 📋 NÁVOD PRO INSTALACI

## ✅ VAŠE FUNKČNÍ ÚDAJE:
```
Portal: https://global.solaxcloud.com
Token: 20250807021517756732674
SN: SNNTF49WK7
```

## 🚀 KROK 1: INSTALACE PŘES HACS

### A) Přidání custom repository:
1. V HA jděte do: **HACS** (v levém menu)
2. Klikněte na **3 tečky** vpravo nahoře
3. Vyberte **Custom repositories**
4. Přidejte:
   ```
   Repository: https://github.com/frank8the9tank/Home-assistant-Solax-cloud
   Category: Integration
   ```
5. Klikněte **ADD**

### B) Instalace integrace:
1. V HACS klikněte na **Integrations**
2. Klikněte **+ EXPLORE & DOWNLOAD REPOSITORIES**
3. Hledejte: **"Solax cloud"**
4. Klikněte na ni a pak **DOWNLOAD**
5. Vyberte nejnovější verzi
6. Klikněte **DOWNLOAD**
7. **RESTARTUJTE Home Assistant**

## 🚀 KROK 2: KONFIGURACE PO RESTARTU

1. Jděte do: **Settings → Devices & Services**
2. Klikněte **+ ADD INTEGRATION**
3. Hledejte: **"Solax cloud"**
4. Vyplňte:
   ```
   Username: váš email na global.solaxcloud.com
   Password: vaše heslo
   Token ID: 20250807021517756732674
   Registration No: SNNTF49WK7
   ```
5. Klikněte **SUBMIT**

## 📊 KROK 3: DOSTUPNÉ ENTITY

Po úspěšné instalaci budete mít:

### Základní senzory:
- `sensor.solax_ac_power` - Aktuální AC výkon
- `sensor.solax_battery_soc` - Stav baterie %
- `sensor.solax_battery_power` - Výkon baterie
- `sensor.solax_grid_power` - Výkon ze/do sítě
- `sensor.solax_pv_power_total` - Celkový FV výkon
- `sensor.solax_today_yield` - Dnešní výroba

### Statistiky:
- `sensor.solax_total_yield` - Celková výroba
- `sensor.solax_today_feed_in` - Dnešní dodávka do sítě
- `sensor.solax_total_feed_in` - Celková dodávka do sítě

## 🎨 KROK 4: PŘIDÁNÍ DO DASHBOARDU

### Jednoduchá karta:
```yaml
type: entities
title: SOLAX Cloud Data
entities:
  - entity: sensor.solax_ac_power
    name: AC výkon
  - entity: sensor.solax_battery_soc
    name: Baterie
  - entity: sensor.solax_pv_power_total
    name: FV výkon
  - entity: sensor.solax_today_yield
    name: Dnešní výroba
```

### Gauge karta pro baterii:
```yaml
type: gauge
entity: sensor.solax_battery_soc
name: Stav baterie
unit: '%'
min: 0
max: 100
severity:
  green: 50
  yellow: 20
  red: 10
```

## ⚠️ MOŽNÉ PROBLÉMY:

### "Unknown error occurred":
- Zkontrolujte username/password
- Ověřte token na global.solaxcloud.com

### "No devices found":
- Zkontrolujte SN donglu
- Ověřte, že zařízení je viditelné v cloud účtu

### Data se neaktualizují:
- Cloud API má 5min zpoždění
- Zkontrolujte internetové připojení

## 📝 POZNÁMKY:

1. **Update interval**: 5 minut (cloud omezení)
2. **Záporné hodnoty**: Minus = dodávka do sítě
3. **API limity**: 10,000 requestů/den
4. **Historická data**: Dostupná přes History v HA

---
**Hotovo!** Po instalaci budete mít SOLAX data v HA! 🎉