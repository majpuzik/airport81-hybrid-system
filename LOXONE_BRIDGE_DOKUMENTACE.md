# Loxone MQTT Bridge - Profesionální řešení

## 🎯 Přehled
Loxone MQTT Bridge zajišťuje stabilní přenos dat z Loxone Miniserveru do Home Assistant přes MQTT s inteligentním filtrováním a rate limiting.

## ✅ Funkce
- **Rate limiting**: Max 10 zpráv/s na senzor
- **Filtrování malých změn**: 
  - Teplota: < 0.1°C
  - Vlhkost: < 1%
  - Výkon: < 5W
  - Světlo: < 2%
- **Automatické znovupřipojení**
- **Health monitoring**
- **MQTT Discovery** pro Home Assistant

## 🚀 Spuštění

### 1. Nastavení hesla Loxone
Upravte v `docker-compose.loxone-production.yml`:
```yaml
- LOXONE_PASS=Max007  # Změnit na vaše heslo
```

### 2. Spuštění bridge
```bash
cd /Users/m.a.j.puzik
docker-compose -f docker-compose.loxone-production.yml up -d
```

### 3. Kontrola stavu
```bash
# Monitoring skript
./loxone-bridge/monitoring.sh

# Sledování logů
docker logs -f loxone-bridge-production

# MQTT statistiky
docker exec mosquitto mosquitto_sub -t 'loxone/bridge/health' -C 1 | python3 -m json.tool
```

## 📊 Home Assistant konfigurace

### 1. Přidání MQTT integrace
- Settings → Devices & Services → Add Integration → MQTT
- Broker: `localhost` nebo `mosquitto`
- Port: `1883`

### 2. Automatické objevení senzorů
Bridge automaticky publikuje MQTT Discovery zprávy. Senzory se objeví v:
- Developer Tools → States
- Hledejte entity `sensor.loxone_*`

### 3. Přidání na dashboard
```yaml
# Příklad karty
type: entities
entities:
  - sensor.loxone_temperature_living
  - sensor.loxone_humidity_living
  - sensor.loxone_power_total
```

## 🔧 Řešení problémů

### Bridge se nepřipojuje k Loxone
1. Zkontrolujte IP adresu Loxone (výchozí: 192.168.10.68)
2. Ověřte uživatelské jméno a heslo
3. Zkontrolujte firewall

### Senzory se neobjevují v HA
1. Zkontrolujte MQTT integraci
2. Restartujte Home Assistant
3. Zkontrolujte logy: `docker logs loxone-bridge-production`

### Vysoké zatížení CPU
Upravte rate limiting v docker-compose:
```yaml
- RATE_LIMIT=5  # Snížit na 5 zpráv/s
```

## 📈 Monitoring

### Health endpoint
```bash
curl http://localhost:1883/loxone/bridge/health
```

### Metriky
- `messages_received`: Celkem přijato z Loxone
- `messages_forwarded`: Předáno do MQTT
- `efficiency_percent`: Účinnost filtrování

## 🛡️ Zabezpečení
- Hesla nejsou v logu
- Podpora MQTT autentizace
- Resource limity (256MB RAM, 0.5 CPU)

## 🔄 Údržba

### Restart bridge
```bash
docker-compose -f docker-compose.loxone-production.yml restart loxone-bridge
```

### Aktualizace
```bash
docker-compose -f docker-compose.loxone-production.yml pull
docker-compose -f docker-compose.loxone-production.yml up -d
```

### Záloha
MQTT data jsou v: `./mosquitto/data`

## 📝 Poznámky
- Bridge je navržen pro tisíce senzorů
- Automaticky se zotaví z výpadků
- Loguje do `/var/log/loxone_bridge.log` v kontejneru

## ⚠️ Důležité
Pro profesionální nasazení doporučujeme:
1. Změnit výchozí hesla
2. Nastavit MQTT autentizaci
3. Pravidelně kontrolovat logy
4. Monitorovat health endpoint