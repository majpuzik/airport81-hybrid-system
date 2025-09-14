# Smart Home with Loxone + Home Assistant + AI

Kompletní řešení pro inteligentní domácnost s Loxone Miniservrem, Home Assistant, Grafana a AI kontrolou.

## 🎯 Funkce

### ✅ Co systém umí:
- **Loxone integrace** - Ovládání přes Home Assistant
- **AI příkazy** - Přirozený jazyk: "Zvyš teplotu v ložnici na 24°C"
- **Bezpečnostní kontrola** - Automatická validace příkazů
- **Grafana dashboardy** - Vizualizace dat a statistiky
- **Automatická diagnostika** - "Zjisti proč je voda studená"
- **Self-monitoring** - Systém kontroluje sám sebe

### 🔒 Bezpečnostní limity:
- Podlahové topení: max 28°C
- Teplota místnosti: 16-30°C
- Teplota vody: 30-75°C
- Automatické zastření bazénu pod 20°C

## 🚀 Rychlý start

### 1. Spuštění systému
```bash
# Stáhnout a spustit
./start-smart-home.sh
```

### 2. Konfigurace API klíčů
Editujte `.env` soubor:
```bash
OPENAI_API_KEY=sk-your-openai-key
HA_TOKEN=your-home-assistant-token
```

### 3. Přístup k službám
- **Home Assistant**: http://localhost:8123
- **Grafana**: http://localhost:3000 (admin/admin123)
- **Portainer**: http://localhost:9000
- **Node-RED**: http://localhost:1880

## 🏗️ Architektura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Loxone        │    │  Home Assistant │    │   Grafana       │
│  192.168.10.68  │◄──►│    (Core)       │◄──►│  (Dashboards)   │
│  admin/Max007   │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         ▲                        ▲                        ▲
         │                        │                        │
         ▼                        ▼                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   MQTT Broker   │    │   Loxone AI     │    │   InfluxDB      │
│  (Mosquitto)    │    │  (AI Control)   │    │   (Database)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🤖 AI Příkazy

### Příklady příkazů:
```
"Zvyš teplotu v ložnici na 24°C"
→ Validace bezpečnosti → Provedení → Ověření

"Zjisti proč je voda ve sprše studená"  
→ Diagnostika bojleru → Analýza → Doporučení → Auto-oprava

"Když je venku pod 20°C, zastři bazén"
→ Automatická pravidla → Monitoring → Provedení
```

### Bezpečnostní kontrola:
```
"Nastav podlahové topení na 35°C"
→ ❌ ZAMÍTNUTO: Překračuje bezpečný limit 28°C

"Nastav teplotu v ložnici na 24°C"  
→ ✅ POVOLENO: V bezpečném rozsahu 16-30°C
```

## 📊 Grafana Dashboardy

### Předdefinované dashboardy:
1. **Loxone Overview** - Celkový přehled systému
2. **Temperature Monitoring** - Sledování teplot
3. **Energy Consumption** - Spotřeba energie
4. **AI Commands Log** - Historie AI příkazů
5. **Safety Alerts** - Bezpečnostní výstrahy

### Custom metriky:
- Teploty v reálném čase
- Stav všech systémů
- Energetická spotřeba
- AI příkazy a jejich úspěšnost
- Bezpečnostní incidenty

## 🔧 Detailní konfigurace

### Loxone připojení
```yaml
# homeassistant/configuration.yaml
loxone:
  host: 192.168.10.68
  username: admin
  password: Max007
  port: 80
```

### AI API Endpoints
```bash
# Zpracování příkazu
POST /api/command
{
  "command": "validate_command",
  "parameters": {
    "user_command": "Zvyš teplotu na 24°C"
  }
}

# Stav systému  
GET /api/state

# Bezpečnostní limity
GET /api/safety-limits
```

## 🛡️ Bezpečnost

### Automatické kontroly:
- **Temperature limits** - Kontrola všech teplotních příkazů
- **System validation** - Ověření provedení příkazů
- **Emergency shutdown** - Nouzové vypnutí při problémech
- **Connection monitoring** - Sledování připojení k Loxone

### Validační proces:
1. **AI parsing** - Rozpoznání příkazu
2. **Safety check** - Kontrola bezpečnostních limitů
3. **Execution** - Provedení příkazu
4. **Verification** - Ověření výsledku
5. **Logging** - Záznam do logů

## 🐳 Docker služby

```yaml
services:
  homeassistant:  # Port 8123
  influxdb:       # Port 8086  
  grafana:        # Port 3000
  mqtt:           # Port 1883, 9001
  nodered:        # Port 1880
  loxone-ai:      # Port 5000
  portainer:      # Port 9000
```

## 🔍 Troubleshooting

### Časté problémy:

#### Loxone připojení
```bash
# Test připojení
curl http://192.168.10.68/jdev/sps/io

# Kontrola logů
docker logs loxone-ai
```

#### AI příkazy nefungují
1. Zkontrolujte OPENAI_API_KEY v .env
2. Ověřte připojení k Loxone
3. Zkontrolujte logy: `docker logs loxone-ai`

### Užitečné příkazy:
```bash
# Zobrazit logy všech služeb
docker-compose logs -f

# Restart konkrétní služby
docker-compose restart homeassistant

# Záloha konfigurace
tar -czf backup-$(date +%Y%m%d).tar.gz homeassistant/ grafana/ loxone-ai/
```

---

## 🎉 Hotovo!

Váš inteligentní domov je připraven! Systém automaticky:
- ✅ Validuje všechny příkazy
- ✅ Monitoruje bezpečnostní limity  
- ✅ Diagnostikuje problémy
- ✅ Generuje grafy a statistiky
- ✅ Posílá notifikace

**Good luck a užijte si svůj smart home! 🏠🤖**