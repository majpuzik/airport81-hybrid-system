# 📊 HOME ASSISTANT - ZPRÁVA O STAVU INTEGRACÍ

**Datum:** 2025-08-17 12:50  
**Server:** Synology NAS 192.168.10.35:8123  
**API Token:** ✅ Funkční (nový token)

## ✅ FUNKČNÍ INTEGRACE:

### 1. **OTE/CZ Energy Spot Prices** ✅
- **Stav:** AKTIVNÍ (29 entit)
- **Senzory:** Aktuální cena, průměr, minimum, maximum
- **Konfigurace:** V configuration.yaml
- **Automace:** Upozornění na nízké/vysoké ceny

### 2. **Loxone** ✅
- **Stav:** ČÁSTEČNĚ AKTIVNÍ (5 entit)
- **Entity:**
  - sensor.loxone_software_version
  - sensor.meteo_loxone_jas
  - sensor.meteo_loxone_rychlost_vetru
  - sensor.meteo_loxone_teplota
  - binary_sensor.meteo_loxone_dest
- **Potřeba:** Plná konfigurace přes UI

### 3. **SOLAX Cloud** 🔄
- **Stav:** PRÁVĚ SE KONFIGURUJE
- **Údaje:** 
  - Username: majpuzik@gmail.com
  - Password: Max007
  - Token: 20250807021517756732674
  - SN: SNNTF49WK7
- **Akce:** Restart HA probíhá

## ⚠️ VYŽADUJÍ POZORNOST:

### 1. **Miele** ❌
- **Problém:** "Error setting up entry Home Assistant Cloud"
- **Příčina:** OAuth2 implementace chybí
- **Řešení:** 
  1. Odstranit integraci v UI
  2. Přihlásit se do Nabu Casa
  3. Přidat Miele znovu přes Cloud

### 2. **Home Assistant Cloud (Nabu Casa)** ❓
- **Stav:** Komponenta přidána, ale nepřihlášeno
- **Potřeba:** Přihlášení přes UI
- **URL:** http://192.168.10.35:8123/config/cloud

### 3. **Tigo Energy** ⚙️
- **Stav:** Nainstalováno, ale neaktivní
- **Složka:** /config/custom_components/tigo/
- **Potřeba:** Aktivace přes UI + IP adresa CCA

## 📝 CO DĚLAT DÁL:

### OKAMŽITÉ KROKY:
1. **Počkejte 3-5 minut** na restart HA
2. **Otevřete:** http://192.168.10.35:8123
3. **Zkontrolujte Home Assistant Cloud:**
   - Nastavení → Systém → Home Assistant Cloud
   - Přihlaste se, pokud ještě nejste

### PRO KAŽDOU INTEGRACI:

#### SOLAX Cloud:
- Po restartu by měly být vidět entity
- Zkontrolovat: Nastavení → Zařízení a služby → SOLAX

#### Loxone:
- Nastavení → Zařízení a služby
- Najít Loxone → Konfigurovat
- Zadat IP Loxone Miniserverz

#### Tigo:
- Nastavení → Zařízení a služby
- + PŘIDAT INTEGRACI → Tigo
- Zadat IP adresu Tigo CCA

#### Miele:
1. Odstranit současnou Miele integraci
2. Přihlásit se do Nabu Casa
3. Přidat Miele znovu

## 🔍 KONTROLNÍ PŘÍKAZY:

```bash
# Zkontrolovat SOLAX entity (po restartu)
curl -s "http://192.168.10.35:8123/api/states" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIzNzg0Njg1NWRkM2E0NGZhODlmNjM4OTZiY2Y1MTg5MCIsImlhdCI6MTc1NTQyNzU3MSwiZXhwIjoyMDcwNzg3NTcxfQ.7lfjLbfrgyuBDNTvooSO6ibH6okz8BnsF8E-qFwWMxA" \
  | jq '[.[] | select(.entity_id | contains("solax"))] | length'

# Zkontrolovat všechny integrace
curl -s "http://192.168.10.35:8123/api/config/config_entries/entry" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIzNzg0Njg1NWRkM2E0NGZhODlmNjM4OTZiY2Y1MTg5MCIsImlhdCI6MTc1NTQyNzU3MSwiZXhwIjoyMDcwNzg3NTcxfQ.7lfjLbfrgyuBDNTvooSO6ibH6okz8BnsF8E-qFwWMxA" \
  | jq '[.[] | {domain: .domain, state: .state}]'
```

## 📁 DŮLEŽITÉ SOUBORY:

- `/Users/m.a.j.puzik/.env.synology` - SSH přihlašovací údaje
- `/Users/m.a.j.puzik/.solax_monitor_config.json` - SOLAX konfigurace
- `/Users/m.a.j.puzik/synology_ssh_connect.sh` - SSH připojení
- `/Users/m.a.j.puzik/synology_ha_manager.sh` - HA management menu

## 🎯 CÍLOVÝ STAV:

- [ ] OTE/CZ Energy ✅ (HOTOVO)
- [ ] Loxone ✅ (ČÁSTEČNĚ - potřeba dokonfigurovat)
- [ ] SOLAX Cloud 🔄 (PROBÍHÁ)
- [ ] Tigo ⚙️ (ČEKÁ NA KONFIGURACI)
- [ ] Miele ❌ (ČEKÁ NA NABU CASA)
- [ ] Claude ❓ (NEBYL NALEZEN)

---
**Aktualizováno:** 2025-08-17 12:50