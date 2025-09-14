# 🎯 PyLoxone Integrace - Profesionální Nasazení

## ✅ Instalace dokončena!

### 🏠 Home Assistant je spuštěný
- **URL**: http://192.168.10.83:8123
- **Container ID**: dd86ea81e90f

### 🔌 Loxone připojení ověřeno
- **IP**: 192.168.10.68
- **Port**: 8080 (Gen2 Miniserver)
- **Uživatel**: admin
- **Heslo**: Max007

## 📋 Další kroky

### 1. První přihlášení do Home Assistant
1. Otevřete http://192.168.10.83:8123
2. Vytvořte účet administrátora
3. Nastavte název domácnosti

### 2. Aktivace PyLoxone
1. **Settings** → **Devices & Services**
2. Klikněte **+ ADD INTEGRATION**
3. Hledejte **Loxone**
4. Vyplňte:
   - Host: `192.168.10.68`
   - Port: `8080`
   - Username: `admin`
   - Password: `Max007`

### 3. Kontrola senzorů
1. **Developer Tools** → **States**
2. Do filtru napište: `loxone`
3. Měli byste vidět stovky entit

## 🔍 Monitoring

### Sledování logů
```bash
/Applications/Docker.app/Contents/Resources/bin/docker logs -f homeassistant | grep -i loxone
```

### Kontrola stavu
```bash
/Applications/Docker.app/Contents/Resources/bin/docker ps | grep homeassistant
```

### Restart při problémech
```bash
/Applications/Docker.app/Contents/Resources/bin/docker restart homeassistant
```

## 📊 Optimalizace pro stovky senzorů

### 1. Filtrování entit
Konfigurace již obsahuje optimalizované nastavení recorder:
- Ukládá pouze důležité domény
- Vylučuje UUID a interní kódy
- Uchovává data 7 dní

### 2. Dashboard organizace
Vytvořte karty podle místností:
```yaml
type: entities
title: Obývací pokoj
entities:
  - sensor.loxone_temperature_living
  - sensor.loxone_humidity_living
  - light.loxone_living_main
  - switch.loxone_living_socket_1
```

### 3. Automatizace
Příklad automatizace s Loxone senzory:
```yaml
automation:
  - alias: "Vysoká teplota alert"
    trigger:
      - platform: numeric_state
        entity_id: sensor.loxone_temperature_living
        above: 26
    action:
      - service: notify.mobile_app
        data:
          message: "Teplota v obýváku je {{ states('sensor.loxone_temperature_living') }}°C"
```

## ⚠️ Řešení problémů

### Entity se nenačítají
1. Restartujte Home Assistant
2. Zkontrolujte logy pro chyby
3. Ověřte připojení k Loxone

### Vysoké zatížení CPU
1. Omezte počet zaznamenávaných entit
2. Zvyšte interval aktualizace
3. Vypněte nepotřebné entity

### Ztráta připojení
PyLoxone se automaticky znovu připojí. Zkontrolujte:
- Síťové připojení
- Loxone Miniserver je online
- Firewall pravidla

## 🛡️ Zabezpečení

1. **Změňte výchozí hesla**
2. **Nastavte HTTPS** pro Home Assistant
3. **Omezte přístup** pouze z lokální sítě
4. **Pravidelně aktualizujte** Home Assistant

## 📝 Důležité soubory

- **Konfigurace**: `/Users/m.a.j.puzik/homeassistant/configuration_pyloxone.yaml`
- **Custom komponenty**: `/Users/m.a.j.puzik/homeassistant/custom_components/loxone/`
- **Databáze**: `/Users/m.a.j.puzik/homeassistant/home-assistant_v2.db`
- **Logy**: `/Users/m.a.j.puzik/homeassistant/home-assistant.log`

## 🚀 Profesionální provoz

Pro 100% spolehlivost:
1. **Monitoring**: Nastavte externí monitoring (Uptime Kuma)
2. **Zálohy**: Denní zálohy konfigurace
3. **UPS**: Zajistěte nepřerušitelné napájení
4. **Redundance**: Zvažte druhý Home Assistant jako zálohu

---
**Instalace dokončena!** Systém je připraven pro profesionální nasazení.