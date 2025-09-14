# 🌩️ SOLAX CLOUD API - INSTALAČNÍ NÁVOD
=======================================

## 📋 PŘEDPOKLADY:
- HACS je nainstalován
- Máte účet na solaxcloud.com
- Znáte sériové číslo inverteru

## 🚀 KROK 1: Získání Token ID

1. Přihlaste se na: https://www.solaxcloud.com
2. Jděte do: **Service → API Management**
3. Klikněte na **"Request API Access"**
4. Vyplňte formulář:
   - Purpose: "Home Assistant Integration"
   - Description: "Local monitoring and control"
5. Po schválení dostanete **Token ID**

## 🚀 KROK 2: Instalace integrace v HACS

1. V HA jděte do: **HACS → Integrations**
2. Klikněte na **"+ EXPLORE & DOWNLOAD REPOSITORIES"**
3. Hledejte: **"SolaX Power Cloud API"**
4. Vyberte integraci od **@sopelj**
5. Klikněte **DOWNLOAD**
6. Restartujte Home Assistant

## 🚀 KROK 3: Konfigurace

1. Po restartu: **Settings → Devices & Services**
2. Klikněte **"+ ADD INTEGRATION"**
3. Hledejte: **"SolaX Power"**
4. Vyplňte:
   - **Username**: váš email ze solaxcloud.com
   - **Password**: vaše heslo
   - **Token ID**: získaný token
   - **Registration No**: sériové číslo inverteru

## 📊 DOSTUPNÉ ENTITY:

### Základní data:
- `sensor.solax_[SN]_battery_soc` - Stav baterie %
- `sensor.solax_[SN]_battery_power` - Výkon baterie W
- `sensor.solax_[SN]_grid_power` - Odběr/dodávka do sítě W
- `sensor.solax_[SN]_pv_power_total` - Celkový PV výkon W
- `sensor.solax_[SN]_load_power` - Spotřeba domu W

### Denní statistiky:
- `sensor.solax_[SN]_today_yield` - Dnešní výroba kWh
- `sensor.solax_[SN]_today_consumption` - Dnešní spotřeba kWh
- `sensor.solax_[SN]_today_battery_charge` - Nabito do baterie kWh
- `sensor.solax_[SN]_today_battery_discharge` - Vybito z baterie kWh

### Řízení (pokud podporováno):
- `select.solax_[SN]_work_mode` - Pracovní režim
- `number.solax_[SN]_battery_min_soc` - Minimální SOC %

## ⚡ VÝHODY CLOUD API:

✅ **Funguje vždy** - není závislé na lokální síti
✅ **Historická data** - až 6 měsíců zpět
✅ **Žádné problémy s Modbus** - používá HTTPS
✅ **Oficiální podpora** - přímo od SolaX

## ⚠️ NEVÝHODY:

❌ **Závislost na internetu** - potřebuje připojení
❌ **Zpoždění** - data aktualizována každých 5 minut
❌ **Omezené řízení** - ne všechny funkce dostupné
❌ **API limity** - max 10,000 requestů/den

## 🔧 ALTERNATIVNÍ INTEGRACE:

Pokud oficiální nefunguje, zkuste:
1. **klaasnicolaas/home-assistant-solax** 
   - Repo: https://github.com/klaasnicolaas/home-assistant-solax
   - Podporuje více modelů

2. **squishykid/solax**
   - Repo: https://github.com/squishykid/solax
   - Python knihovna pro různé modely

## 📝 POZNÁMKY:

- Některé funkce Remote Control nemusí být dostupné přes API
- Pro plnou kontrolu je stále nejlepší lokální Modbus
- Cloud API je dobrá záloha když lokální přístup nefunguje

---
Vytvořeno: 2025-08-06
Status: Cloud API jako alternativa k lokálnímu Modbus
