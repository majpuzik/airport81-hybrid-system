# 🔧 JAK PŘIPOJIT SOLAX K HOME ASSISTANT - KROK ZA KROKEM

## ⚠️ DŮLEŽITÉ: Máte 2 možnosti

### MOŽNOST A: Přes SSH (doporučeno)
### MOŽNOST B: Přes webové rozhraní HA

---

## 📋 MOŽNOST A: Přes SSH Terminal

### KROK 1: Otevřete Terminal na Mac
```bash
# Otevřete Terminal (Cmd+Space, napište "Terminal")
```

### KROK 2: Připojte se na Home Assistant
```bash
ssh root@192.168.10.35
# nebo
ssh admin@192.168.10.35
# Zadejte heslo když se zeptá
```

### KROK 3: Najděte configuration.yaml
```bash
cd /config
ls -la
# Měli byste vidět soubor configuration.yaml
```

### KROK 4: Zálohujte původní konfiguraci
```bash
cp configuration.yaml configuration.yaml.backup
```

### KROK 5: Otevřete editor
```bash
nano configuration.yaml
# nebo
vi configuration.yaml
```

### KROK 6: Přidejte SOLAX konfiguraci NA KONEC souboru
```yaml
# SOLAX Modbus ovládání
modbus:
  - name: solax
    type: tcp
    host: 192.168.10.51  # IP vašeho SOLAX střídače
    port: 502
    timeout: 10
    retries: 3
    
    sensors:
      - name: "SOLAX Battery SOC"
        address: 0x001C
        unit_of_measurement: "%"
        device_class: battery
        slave: 1
        scan_interval: 30
        
      - name: "SOLAX Battery Power"
        address: 0x0016
        unit_of_measurement: "W"
        device_class: power
        slave: 1
        
      - name: "SOLAX PV Power"
        address: 0x000A
        unit_of_measurement: "W"
        device_class: power
        slave: 1
        
    switches:
      - name: "SOLAX Grid Charge"
        address: 0x0027
        write_type: holding
        command_on: 1
        command_off: 0
        slave: 1
```

### KROK 7: Uložte soubor
```
# V nano: Ctrl+X, pak Y, pak Enter
# Ve vi: Esc, pak :wq, pak Enter
```

### KROK 8: Restartujte Home Assistant
```bash
ha core restart
# nebo
docker restart homeassistant
```

### KROK 9: Počkejte 2-3 minuty

### KROK 10: Zkontrolujte, že to funguje
```bash
# Ukončete SSH: 
exit
```

---

## 🖥️ MOŽNOST B: Přes webové rozhraní

### KROK 1: Otevřete Home Assistant
```
http://192.168.10.35:8123
```

### KROK 2: Jděte do nastavení
- Klikněte na "Settings" (Nastavení)
- Pak "Add-ons" (Doplňky)

### KROK 3: Nainstalujte File Editor
- Klikněte "Add-on Store"
- Najděte "File editor" nebo "VS Code"
- Klikněte "Install"
- Po instalaci klikněte "Start"

### KROK 4: Otevřete File Editor
- Klikněte na "File editor" v menu
- Nebo "Open Web UI"

### KROK 5: Najděte configuration.yaml
- V levém panelu klikněte na `configuration.yaml`

### KROK 6: Přidejte konfiguraci
- Sjeďte úplně dolů
- Přidejte tento text NA KONEC:

```yaml
# SOLAX Modbus ovládání
modbus:
  - name: solax
    type: tcp
    host: 192.168.10.51
    port: 502
    timeout: 10
    retries: 3
    
    sensors:
      - name: "SOLAX Battery SOC"
        address: 0x001C
        unit_of_measurement: "%"
        device_class: battery
        slave: 1
        scan_interval: 30
        
    switches:
      - name: "SOLAX Grid Charge"
        address: 0x0027
        write_type: holding
        command_on: 1
        command_off: 0
        slave: 1
```

### KROK 7: Uložte
- Klikněte na ikonu diskety nebo Ctrl+S

### KROK 8: Zkontrolujte konfiguraci
- Settings → System → YAML configuration reloading
- Klikněte "CHECK CONFIGURATION"
- Musí říct "Configuration valid!"

### KROK 9: Restartujte
- Settings → System → Restart
- Klikněte "Restart Home Assistant"
- Počkejte 2-3 minuty

---

## ✅ JAK POZNÁTE, ŽE TO FUNGUJE?

### 1. Zkontrolujte entity v HA:
```
http://192.168.10.35:8123
Developer Tools → States
Hledejte: sensor.solax_battery_soc
```

### 2. Spusťte test z Terminálu:
```bash
python3 /Users/m.a.j.puzik/test_solax_control.py
```

---

## ❌ ČASTÉ PROBLÉMY

### Problém: "Connection refused" na portu 502
**Řešení:** SOLAX má vypnutý Modbus
- Jděte do webového rozhraní SOLAX (192.168.10.51)
- Najděte Modbus nastavení
- Zapněte Modbus TCP
- Port: 502

### Problém: "Invalid config" v HA
**Řešení:** Špatné odsazení v YAML
- YAML je citlivý na mezery
- Používejte 2 mezery, ne TAB
- Zkontrolujte, že je vše správně odsazené

### Problém: Entity se neobjeví
**Řešení:** 
1. Počkejte 5 minut po restartu
2. Zkontrolujte HA logy:
   - Settings → System → Logs
   - Hledejte chyby s "modbus" nebo "solax"

---

## 📞 POTŘEBUJETE POMOC?

Pokud něco nefunguje, pošlete mi:
1. Screenshot z HA logů
2. Výstup z: `curl http://192.168.10.51:502` 
3. IP adresu vašeho SOLAX střídače

---

## 🎯 CO SE STANE PO ÚSPĚŠNÉM PŘIPOJENÍ?

1. **V Home Assistant se objeví nové entity:**
   - `sensor.solax_battery_soc` (skutečné SOC)
   - `switch.solax_grid_charge` (ovládání nabíjení)

2. **Automatický skript začne SKUTEČNĚ ovládat střídač**
   - Už ne jen "mock" entity
   - Příkazy půjdou přímo do střídače

3. **Uvidíte změny na displeji střídače**
   - Když script zapne nabíjení, střídač to ukáže
   - SOC se bude měnit podle příkazů

---

## 🚀 RYCHLÝ TEST PO INSTALACI

Vytvořte testovací soubor:
```bash
cat > /Users/m.a.j.puzik/test_solax_control.py << 'EOF'
import requests

HA_URL = "http://192.168.10.35:8123"
HA_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI1MGQzNDY5NjUyYTA0Mzg1OGI4Yzc2OTNmZTIxMjAzMCIsImlhdCI6MTc1NDkxNjE1NCwiZXhwIjoyMDcwMjc2MTU0fQ.Q1DbhVpPEeMD_lySWgI587Wj6iAOpJ8hZbRWBiTm91Q"

headers = {"Authorization": f"Bearer {HA_TOKEN}"}

# Test čtení
response = requests.get(f"{HA_URL}/api/states/sensor.solax_battery_soc", headers=headers)
if response.status_code == 200:
    print(f"✅ SOC: {response.json().get('state')}%")
else:
    print("❌ Entity sensor.solax_battery_soc neexistuje")

# Test ovládání
response = requests.post(
    f"{HA_URL}/api/services/switch/turn_on",
    headers=headers,
    json={"entity_id": "switch.solax_grid_charge"}
)
if response.status_code in [200, 201]:
    print("✅ Nabíjení ZAPNUTO")
else:
    print("❌ Switch switch.solax_grid_charge neexistuje")
EOF

python3 /Users/m.a.j.puzik/test_solax_control.py
```

---

**TO JE VŠE! Postupujte krok za krokem a napište mi, kde jste se zasekli.**