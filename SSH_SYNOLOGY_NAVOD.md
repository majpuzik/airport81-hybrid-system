# 🔐 JAK SE PŘIPOJIT NA SYNOLOGY NAS PŘES SSH (Port 4438)

## 📝 RYCHLÝ PŘÍKAZ:

```bash
ssh -p 4438 admin@192.168.10.35
```

Pak zadejte heslo když se zeptá.

---

## 🔧 KROK ZA KROKEM:

### KROK 1: Otevřete Terminal na Mac
- Stiskněte **Cmd + Space**
- Napište **Terminal**
- Stiskněte **Enter**

### KROK 2: Připojte se přes SSH
Napište tento příkaz:
```bash
ssh -p 4438 admin@192.168.10.35
```

### KROK 3: Zadejte heslo
- Objeví se: `admin@192.168.10.35's password:`
- Napište heslo (nebude vidět když píšete)
- Stiskněte **Enter**

### KROK 4: Jste připojeni!
Uvidíte něco jako:
```
admin@DiskStation:~$
```

---

## 📁 KAM DÁL PO PŘIPOJENÍ:

### 1. Najděte Home Assistant kontejner:
```bash
sudo docker ps | grep homeassistant
```

### 2. Vstupte do HA kontejneru:
```bash
sudo docker exec -it homeassistant bash
```

### 3. Editujte configuration.yaml:
```bash
cd /config
nano configuration.yaml
```

### 4. Přidejte SOLAX konfiguraci NA KONEC:
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
        
      - name: "SOLAX Battery Power"
        address: 0x0016
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

### 5. Uložte soubor:
- **Ctrl + X** (pro ukončení)
- **Y** (pro uložení)
- **Enter** (potvrzení)

### 6. Restartujte Home Assistant:
```bash
exit  # Ukončit kontejner
sudo docker restart homeassistant
```

### 7. Počkejte 2-3 minuty

### 8. Ukončete SSH:
```bash
exit
```

---

## ❌ ČASTÉ PROBLÉMY:

### Problém: "Connection refused"
**Řešení:** SSH není zapnuté na Synology
1. Otevřete DSM: http://192.168.10.35:5000
2. Control Panel → Terminal & SNMP
3. Zapněte SSH
4. Port nastavte na 4438

### Problém: "Permission denied"
**Řešení:** Špatné heslo nebo uživatel
- Zkuste uživatele `root` místo `admin`
- Nebo přes DSM resetujte heslo

### Problém: "Host key verification failed"
**Řešení:** Smazat staré klíče
```bash
ssh-keygen -R "[192.168.10.35]:4438"
```

---

## 🧪 TEST PO INSTALACI:

Po restartu HA spusťte na Mac:
```bash
python3 /Users/m.a.j.puzik/test_solax_control.py
```

Pokud vidíte:
```
✅ sensor.solax_battery_soc: 32%
✅ switch.solax_grid_charge: off
```

**FUNGUJE TO!** 🎉

---

## 📱 ALTERNATIVA - Přes webové rozhraní:

Pokud nechcete SSH, můžete použít File Editor v HA:
1. http://192.168.10.35:8123
2. Settings → Add-ons → File editor
3. Otevřete configuration.yaml
4. Přidejte stejnou konfiguraci
5. Restart HA

---

## 🆘 POTŘEBUJETE POMOC?

Pošlete screenshot z:
```bash
ssh -p 4438 admin@192.168.10.35
sudo docker ps
```