# 🏠 Smart Home System - Instalace dokončena!

## ✅ Všechny služby běží

### 🌐 Přístupové adresy:
- **Home Assistant**: http://localhost:8123
- **Grafana**: http://localhost:3400 (admin/admin123)
- **Portainer**: http://localhost:9000
- **Node-RED**: http://localhost:1880
- **InfluxDB**: http://localhost:8086
- **Loxone AI API**: http://localhost:5000
- **MQTT Broker**: localhost:1883

### 📊 Loxone konfigurace:
- Host: 192.168.10.68
- User: admin
- Pass: Max007

### 🤖 Příklady AI příkazů:
- "Zvyš teplotu v ložnici na 24°C"
- "Zjisti proč je voda ve sprše studená"
- "Když je pod 20°C, zastři bazén"

### ⚙️ Co zbývá nastavit:

1. **Konfigurace API klíčů** - Editujte `.env` soubor:
   ```bash
   OPENAI_API_KEY=sk-your-openai-key
   HA_TOKEN=your-home-assistant-token
   ```

2. **Home Assistant** - Při prvním přihlášení:
   - Vytvořte účet
   - Nastavte Loxone integraci
   - Vygenerujte Long-lived Access Token

3. **Loxone MQTT** - V Loxone Config:
   - Přidejte MQTT Gateway
   - Nastavte broker: váš_počítač:1883
   - Namapujte zařízení

### 🔒 Bezpečnostní limity jsou nastaveny:
- Podlahové topení: max 28°C
- Pokojová teplota: 16-30°C
- Teplota vody: 30-75°C
- Automatické zastření bazénu pod 20°C

### 📝 Poznámka:
Grafana běží na portu **3400** místo 3000 (port byl obsazen).

---
Systém je připraven k použití! 🎉