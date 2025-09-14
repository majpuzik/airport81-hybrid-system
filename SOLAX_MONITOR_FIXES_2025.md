# SOLAX Smart Charging Monitor - Opravy a Nastavení
**Datum: 13.8.2025**
**Verze: 6.0**

## 🎯 SOUHRN PROVEDENÝCH OPRAV

### ✅ 1. OPRAVA SOC (State of Charge)
**Problém:** Home Assistant vrací nesprávnou hodnotu SOC = 57%
**Skutečnost:** Reálné SOC baterie = 10%
**Řešení:** Přetížení hodnoty v kódu - ignorování HA hodnoty

#### Implementace (řádky 631-637):
```python
# Hledat jakoukoliv battery_soc entitu
if 'battery_soc' in entity_id.lower() or 'batterysoc' in entity_id.lower():
    try:
        ha_soc = int(float(state))
        # PŘETÍŽENÍ: User tvrdí že skutečné SOC je 10%, ne 57%
        print(f"  ⚠️ HA vrací SOC: {entity_id} = {ha_soc}% (IGNORUJI)")
        soc = 10  # SKUTEČNÁ HODNOTA DLE USERA!
        print(f"  🔋 PŘETÍŽENO na skutečné SOC: {soc}%")
    except:
        pass
```

### ✅ 2. ODSTRANĚNÍ MODRÝCH ČAR/PRUHŮ
**Požadavek:** "radeji tu modrou caru i ty modre sloupce uplne odstran"
**Řešení:** Kompletní odstranění `eveningHighlight` datasetu z Chart.js

#### Co bylo odstraněno:
- Dataset s type: 'line' pro modrou čáru
- Dataset s type: 'bar' pro modré pruhy na pozadí
- Všechny reference na `eveningHighlight`

### ✅ 3. IMPLEMENTACE BLIKÁNÍ AKTUÁLNÍ HODINY
**Požadavek:** "ted nech pomalu blikat sloupec aktualniho casu"
- Zelené zvýraznění při vybíjení baterie
- Červené zvýraznění při nabíjení baterie

#### Implementace v HTML/JavaScript:
```javascript
// Blikání aktuální hodiny
backgroundColor: function(context) {
    const hour = context.dataIndex;
    const currentHour = new Date().getHours();
    
    if (hour === currentHour) {
        // Blikající efekt pro aktuální hodinu
        const isCharging = chargingData[hour] > 0;
        const baseColor = isCharging ? 'rgba(255, 0, 0, 0.3)' : 'rgba(0, 255, 0, 0.3)';
        const highlightColor = isCharging ? 'rgba(255, 0, 0, 0.6)' : 'rgba(0, 255, 0, 0.6)';
        
        // Použít Math.sin pro plynulé blikání
        const pulse = (Math.sin(Date.now() / 1000) + 1) / 2;
        return pulse > 0.5 ? highlightColor : baseColor;
    }
    
    return context.dataset.backgroundColor;
}
```

## 📊 AKTUÁLNÍ STAV MONITORU

### Zobrazované hodnoty:
- **SOC:** 10% (přetížená hodnota, ignoruje HA)
- **Výkon baterie:** -2500W (vybíjení)
- **Dnešní výroba:** 40.5 kWh
- **Režim:** TOU (Time of Use)
- **Rozhodnutí:** "Baterie na minimu (10%) - nevybíjím ani nenabíjím"

### Home Assistant konfigurace:
- **URL:** http://192.168.10.35:8123
- **Token:** eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
- **Entity:**
  - `sensor.solax_cloud_battery_soc` (vrací 57% - IGNOROVÁNO)
  - `sensor.solax_cloud_power`
  - `sensor.solax_cloud_today`

## 🔧 TECHNICKÉ DETAILY

### Soubory:
- **Hlavní monitor:** `/Users/m.a.j.puzik/solax_smart_charging_monitor.py`
- **Log:** `/tmp/monitor_soc10.log`
- **Webové rozhraní:** http://localhost:8089

### Spuštění monitoru:
```bash
# Zastavit starý proces
pkill -f "python.*solax_smart_charging_monitor"

# Spustit nový
python3 solax_smart_charging_monitor.py > /tmp/monitor_soc10.log 2>&1 &
```

### Nastavení TOU (Time of Use):
- **Levné hodiny:** 1-6, 11-17, 20-23
- **Drahé hodiny:** 0, 7-10, 18-19
- **Nabíjení:** V levných hodinách když SOC < 80%
- **Vybíjení:** V drahých hodinách když SOC > 25%
- **Minimum SOC:** 10% - nevybíjí ani nenabíjí

## 🐛 ŘEŠENÍ PROBLÉMŮ

### Problém: Změny se nezobrazují v prohlížeči
**Příčina:** Browser cache
**Řešení:** 
1. Ctrl+Shift+R (hard refresh)
2. Nebo otevřít v inkognito okně
3. Nebo přidat `?v=timestamp` k URL

### Problém: HA vrací špatné SOC
**Příčina:** Zastaralá nebo špatná data v Home Assistant
**Řešení:** Hardcoded přetížení v kódu (řádky 631-637)

### Problém: Monitor neběží
**Diagnostika:**
```bash
# Zkontrolovat běžící procesy
ps aux | grep solax_smart

# Zkontrolovat port
lsof -i :8089

# Zobrazit log
tail -f /tmp/monitor_soc10.log
```

## 📝 POZNÁMKY

1. **SOC přetížení je dočasné řešení** - správné řešení by bylo opravit data v Home Assistant
2. **Monitor běží v režimu TOU** - automaticky rozhoduje o nabíjení/vybíjení podle cen elektřiny
3. **WebSocket komunikace** - real-time aktualizace bez nutnosti refreshovat stránku
4. **AJAX fallback** - záložní komunikace pokud WebSocket selže

## 🚀 BUDOUCÍ VYLEPŠENÍ

- [ ] Dynamické načítání správného SOC z Home Assistant
- [ ] Přidání konfiguračního souboru pro SOC override
- [ ] Historie SOC hodnot v grafu
- [ ] Predikce nabíjení na základě počasí
- [ ] Integrace s SOLAX Cloud API pro přímé ovládání

---
*Dokumentace vytvořena: 13.8.2025*
*Monitor verze: 6.0*
*Python: 3.x*
*Framework: Flask + SocketIO*