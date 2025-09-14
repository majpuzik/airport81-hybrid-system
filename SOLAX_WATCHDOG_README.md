# 🔋 SOLAX Battery Watchdog

Kompletní monitoring systém pro SOLAX baterii s připojením na Home Assistant a zobrazením detailních informací o stavu, nabíjení, vybíjení a důvodech.

## 📋 Dostupné scripty

### 1. **Kompletní Watchdog** 
```bash
python3 /Users/m.a.j.puzik/solax_battery_watchdog.py [options]

# Možnosti:
--once          # Zobrazit stav pouze jednou
-i 30           # Interval 30 sekund (default: 60s)
```

**Zobrazuje:**
- 📊 Stav nabití baterie (SOC %)
- 🔋 Aktuální akce (nabíjí/vybíjí/klid)
- 💭 Důvod akce
- 📈 Trend změny
- ⚡ Zdroj energie
- 🔌 Výkon baterie/AC/síť
- 🔧 SOLAX módy (pokud dostupné)
- ☀️ Dnešní/celková výroba
- 💡 Doporučení

### 2. **Rychlý Status**
```bash
python3 /Users/m.a.j.puzik/quick_solax_status.py
```

**Jednořádkový výstup:**
```
[20:59:54] ☀️ NABÍJÍ+VYRÁBÍ | SOC:57% | AC:2501W | Dnes:40.5kWh
```

### 3. **Monitor Loop**
```bash
./solax_monitor_loop.sh [interval]

# Příklady:
./solax_monitor_loop.sh          # Každých 60s
./solax_monitor_loop.sh 30       # Každých 30s
./solax_monitor_loop.sh 10       # Každých 10s
```

## 🔌 Konfigurace

### Home Assistant
- **URL:** http://192.168.10.35:8123
- **Token:** nakonfigurován v scriptu
- **Entity:** používá SOLAX Cloud integration

### Podporované entity
- `sensor.solax_cloud_battery_soc` - Stav nabití %
- `sensor.solax_cloud_power` - AC výkon W
- `sensor.solax_cloud_today` - Dnešní výroba kWh

## 📊 Status interpretace

### Akce baterie
- 🔋 **NABÍJÍ SE** - Baterie přijímá energii (>50W)
- ⚡ **VYBÍJÍ SE** - Baterie dodává energii (<-50W)  
- ⏸️ **KLID** - Minimální aktivita (-50W až +50W)

### Důvody
- 🚨 **KRITICKY NÍZKÝ SOC** - SOC < 25%
- ⚠️ **Nízký SOC** - SOC < 50%
- 🔌 **Nucené nabíjení ze sítě** - Grid charge ON
- ☀️ **Nabíjení ze solárů** - Fotovoltaika aktivní
- 🏠 **Pokrývá spotřebu domu** - Vybíjení pro dům
- 💰 **Prodej do sítě** - Přebytek do sítě
- ✅ **Baterie plná** - SOC > 95%
- ⚖️ **Vybalancovaný stav** - Normální provoz

### Status ikony
- 📈 **PLNÁ+VYRÁBÍ** - SOC>90% + AC>100W
- ☀️ **NABÍJÍ+VYRÁBÍ** - SOC>50% + AC>100W  
- 🔋 **DOBÍJÍ** - SOC<50% + AC>100W
- 🌙 **PLNÁ** - SOC>80% + AC<50W
- ⚡ **VYBÍJÍ** - SOC>25% + AC<50W
- 🚨 **KRITICKÉ** - SOC<25%

## 🚀 Rychlé spuštění

```bash
# Jednorázový status
python3 /Users/m.a.j.puzik/solax_battery_watchdog.py --once

# Kompletní monitoring každých 30s
python3 /Users/m.a.j.puzik/solax_battery_watchdog.py -i 30

# Jednoduchý loop každých 10s
./solax_monitor_loop.sh 10
```

## 📝 Logování

Watchdog automaticky loguje do `/tmp/solax_watchdog_YYYYMMDD.log`:
```json
{"timestamp": "2025-08-12 20:59:54", "soc": 57.0, "battery_power": 0, "action": "⏸️ KLID", "reason": "⚖️ Vybalancovaný stav", "source": "HA SOLAX Cloud"}
```

## 🔧 Troubleshooting

### ❌ "Žádný Home Assistant není dostupný"
- Zkontrolujte síťové připojení: `ping 192.168.10.35`
- Ověřte HA běží: `curl http://192.168.10.35:8123`
- Token může být neplatný - vytvořte nový v HA

### ❌ "SOLAX nedostupný"  
- SOLAX Cloud integration není nakonfigurovaná v HA
- Entity nejsou dostupné
- SOLAX API má výpadek

### 🔧 Test připojení
```bash
python3 /tmp/test_ha_connection.py
```

## 💡 Tipy

1. **Pro debugging:** přidejte `--once` pro jednorázový výstup
2. **Pro monitoring:** použijte kratší intervaly během kritických stavů
3. **Pro logování:** sledujte log soubory v `/tmp/`
4. **Pro automatizaci:** přidejte do cron nebo systemd

## 🎯 Účel

Tento watchdog nahrazuje Smart Charging Monitor do doby jeho opravy a poskytuje:
- Kontinuální monitoring stavu baterie
- Detekci kritických stavů
- Analýzu důvodů nabíjení/vybíjení
- Sledování zdrojů energie
- Doporučení pro optimalizaci