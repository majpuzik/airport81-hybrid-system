# 📝 JAK POUŽÍVAT VI EDITOR - JEDNODUCHÝ NÁVOD

## ⚡ RYCHLÝ PRŮVODCE PRO ÚPRAVU SOUBORU

### 1️⃣ OTEVŘÍT SOUBOR:
```bash
vi /config/configuration.yaml
```

### 2️⃣ PŘEJÍT NA KONEC SOUBORU:
- Stiskněte: **Shift + G** (velké G)
- Dostanete se na poslední řádek

### 3️⃣ ZAČÍT PSÁT (INSERT MODE):
- Stiskněte: **i**
- Dole uvidíte: `-- INSERT --`
- Teď můžete psát!

### 4️⃣ NAPSAT/VLOŽIT TEXT:
Napište nebo vložte (Cmd+V na Mac):
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
        
    switches:
      - name: "SOLAX Grid Charge"
        address: 0x0027
        write_type: holding
        command_on: 1
        command_off: 0
        slave: 1
```

### 5️⃣ ULOŽIT A UKONČIT:
1. Stiskněte **ESC** (ukončí INSERT mode)
2. Napište: **:wq**
3. Stiskněte **Enter**

**HOTOVO!** ✅

---

## 🔧 ZÁKLADNÍ PŘÍKAZY VI:

### REŽIMY:
- **i** = INSERT mode (psaní)
- **ESC** = Zpět do COMMAND mode

### POHYB (v COMMAND mode):
- **h** = Vlevo
- **j** = Dolů  
- **k** = Nahoru
- **l** = Vpravo
- **G** = Konec souboru
- **gg** = Začátek souboru
- **$** = Konec řádku
- **0** = Začátek řádku

### EDITACE:
- **i** = Vložit před kurzor
- **a** = Vložit za kurzor
- **o** = Nový řádek pod
- **O** = Nový řádek nad
- **dd** = Smazat řádek
- **u** = Undo (vrátit zpět)

### ULOŽENÍ:
- **:w** = Uložit
- **:q** = Ukončit
- **:wq** = Uložit a ukončit
- **:q!** = Ukončit BEZ uložení

---

## 🚨 PANIKA! JAK VYSTOUPIT BEZ ULOŽENÍ:

1. Stiskněte **ESC**
2. Napište: **:q!**
3. Stiskněte **Enter**

---

## 💡 ALTERNATIVA - POUŽÍT ECHO:

Pokud se vi zdá složité, můžete přidat text takto:

```bash
# Přejít na konec souboru a přidat
echo '
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
        
    switches:
      - name: "SOLAX Grid Charge"
        address: 0x0027
        write_type: holding
        command_on: 1
        command_off: 0
        slave: 1
' >> /config/configuration.yaml
```

---

## 🎯 KOMPLETNÍ PŘÍKLAD PRO VÁŠ PŘÍPAD:

```bash
# 1. SSH na Synology
ssh -p 4438 admin@192.168.10.35

# 2. Najít HA kontejner
sudo docker ps | grep homeassistant

# 3. Vstoupit do kontejneru (nahraďte CONTAINER_ID)
sudo docker exec -it CONTAINER_ID bash

# 4. Zálohovat konfiguraci
cp /config/configuration.yaml /config/configuration.yaml.backup

# 5. Editovat
vi /config/configuration.yaml

# 6. V editoru:
#    - Shift+G (jít na konec)
#    - i (insert mode)
#    - Vložit YAML konfiguraci
#    - ESC
#    - :wq
#    - Enter

# 7. Ukončit kontejner
exit

# 8. Restartovat HA
sudo docker restart CONTAINER_ID

# 9. Ukončit SSH
exit
```

---

## 🆘 NEJJEDNODUŠŠÍ ŘEŠENÍ:

Pokud nechcete vi, použijte tento jednořádkový příkaz v kontejneru:

```bash
cat >> /config/configuration.yaml << 'EOF'

# SOLAX Modbus ovládání
modbus:
  - name: solax
    type: tcp
    host: 192.168.10.51
    port: 502
    sensors:
      - name: "SOLAX Battery SOC"
        address: 0x001C
        unit_of_measurement: "%"
        device_class: battery
        slave: 1
    switches:
      - name: "SOLAX Grid Charge"
        address: 0x0027
        write_type: holding
        command_on: 1
        command_off: 0
        slave: 1
EOF
```

**To je vše! Zkopírujte a vložte.**