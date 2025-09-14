# SOLAX BATTERY STATUS - SKUTEČNÝ STAV
=======================================

## DŮLEŽITÉ IP ADRESY
- **Home Assistant:** 192.168.10.35:8123
- **SOLAX Inverter:** NEZNÁMÁ (NE 192.168.10.51 - to je vzduchotechnika!)
- **Ovládání:** POUZE přes Home Assistant API

## ZÍSKÁNÍ SKUTEČNÉHO STAVU BATERIE

### 1. Připojení k Home Assistant
```bash
HA_URL="http://192.168.10.35:8123"
HA_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIyMGFmMjMzZjliNzg0Y2MzOWFmMjQ2YTIyZjI4YjRlYSIsImlhdCI6MTc1NTAxMjA0MSwiZXhwIjoyMDcwMzcyMDQxfQ.m03ZJeeL0pOZkdwNU_o2SODUj6ciytKqsHpdhl2ZRuk"
```

### ⚠️ PROBLÉM: Token vypršel
- Současný token vrací 401 Unauthorized
- Je potřeba získat nový Long-Lived Access Token z Home Assistant
- Postup:
  1. Otevřít http://192.168.10.35:8123
  2. Jít do Profile → Long-Lived Access Tokens
  3. Create Token
  4. Uložit nový token

### 2. Test API připojení
```bash
curl -H "Authorization: Bearer $HA_TOKEN" "$HA_URL/api/"
```

### 3. Získat všechny SOLAX entity
```bash
curl -H "Authorization: Bearer $HA_TOKEN" "$HA_URL/api/states" | \
  jq '.[] | select(.entity_id | contains("solax"))'
```

## PARAMETRY K ZJIŠTĚNÍ
- SOC (State of Charge) - aktuální stav baterie v %
- Battery Power - aktuální výkon baterie (W)
- PV Power - výkon ze solárních panelů (W)
- Grid Power - výkon ze/do sítě (W)
- Load Power - spotřeba domácnosti (W)
- Battery Temperature - teplota baterie (°C)
- Work Mode - aktuální režim (Self Use / Force Charge / TOU)

## FORCE CHARGE AKTIVACE
Force Charge se musí aktivovat POUZE přes Home Assistant service call, NE přímým Modbus připojením!

## AKTUÁLNÍ STAV BATERIE (12.8.2025 17:23)
✅ **ÚSPĚŠNĚ ZJIŠTĚNO Z HOME ASSISTANT**

### 🔋 HLAVNÍ PARAMETRY:
- **SOC (Stav baterie):** 57%
- **Aktuální výkon:** 2,501 W (2.5 kW)
- **Dnešní výroba:** 40.5 kWh
- **Poslední aktualizace:** 16:58:42

### ⏰ VÝPOČET NABÍJENÍ NA 90%:
- Aktuální SOC: 57%
- Cílový SOC: 90%
- Potřebné kWh: 13.2 kWh
- Čas nabíjení při 16kW: **0.8 hodiny (48 minut)**

### 📊 DOSTUPNÉ ENTITY V HA:
- `sensor.solax_cloud_battery_soc` - Stav baterie (%)
- `sensor.solax_cloud_power` - Aktuální výkon (W)
- `sensor.solax_cloud_today` - Dnešní výroba (kWh)

### ⚠️ POZNÁMKY:
- Data jsou z SOLAX Cloud (ne přímé připojení)
- Aktualizace každých cca 5-10 minut
- Pro Force Charge je potřeba použít HA service call

## JAK ZÍSKAT NOVÝ TOKEN
1. Otevřít prohlížeč: http://192.168.10.35:8123
2. Přihlásit se do Home Assistant
3. Kliknout na profil (vlevo dole)
4. Najít "Long-Lived Access Tokens"
5. Kliknout "Create Token"
6. Pojmenovat např. "SOLAX Monitor"
7. Zkopírovat token (zobrazí se jen jednou!)
8. Uložit token do konfigurace

## CHYBY K VYVAROVÁNÍ
❌ NIKDY se nepřipojovat přímo na IP adresy bez ověření
❌ NIKDY nepoužívat přímé Modbus připojení
❌ 192.168.10.51 = VZDUCHOTECHNIKA, ne SOLAX!
✅ Vždy použít Home Assistant API na 192.168.10.35

## ✅ ÚSPĚŠNĚ SPUŠTĚNÝ MONITOR SE SKUTEČNÝMI DATY
**Čas:** 12.8.2025 18:12
**URL:** http://localhost:8091
**Stav:** BĚŽÍ SE SKUTEČNÝMI DATY

### 📊 Aktuální zobrazená data:
- **SOC:** 57% (skutečné, ne 10% demo)
- **Výkon:** 2,501 W (skutečný, ne falešných 16kW)
- **Dnešní výroba:** 40.5 kWh
- **Zdroj:** Home Assistant (192.168.10.35)
- **Status:** real_data: true

### 🚀 Spuštění monitoru:
```bash
python3 /Users/m.a.j.puzik/solax_monitor_real.py
```

Monitor běží na portu 8091 a automaticky:
- Načítá data z Home Assistant každých 30 sekund
- Zobrazuje skutečný stav baterie
- Počítá čas nabíjení na 90% (aktuálně 50 minut při 16kW)
- Má indikátor "REAL DATA" v hlavičce