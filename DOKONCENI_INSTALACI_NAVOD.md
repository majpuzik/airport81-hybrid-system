# 🚀 NÁVOD PRO DOKONČENÍ INSTALACÍ V HOME ASSISTANT

## 📊 AKTUÁLNÍ STAV:

### ✅ HOTOVO:
- **OTE/CZ Energy:** 29 entit, funguje
- **Loxone:** 5 entit (meteo stanice), částečně funguje

### ⚙️ NUTNO DOKONČIT V UI:

## 1. SOLAX CLOUD 🌞

**SOLAX Cloud se MUSÍ konfigurovat přes UI, ne přes YAML!**

### Kroky:
1. Otevřete: http://192.168.10.35:8123
2. **Nastavení** → **Zařízení a služby**
3. **+ PŘIDAT INTEGRACI** (vpravo dole)
4. Hledejte **"SOLAX"** nebo **"Solax Cloud"**
5. Zadejte údaje:
   - **Username:** majpuzik@gmail.com
   - **Password:** Max007
   - **Token ID:** 20250807021517756732674 (pokud požaduje)
   - **SN:** SNNTF49WK7 (pokud požaduje)

### Odstranění chybné konfigurace z YAML:
```bash
# Odstraňte tyto řádky z configuration.yaml:
sensor:
  - platform: solax_cloud
    username: "majpuzik@gmail.com"
    password: "Max007"
    scan_interval: 60
```

## 2. TIGO ENERGY ⚡

### Kroky:
1. **Nastavení** → **Zařízení a služby**
2. **+ PŘIDAT INTEGRACI**
3. Hledejte **"Tigo"**
4. Pokud nenajdete:
   - Jděte do **HACS** → **Integrace**
   - Hledejte **"Tigo"**
   - Instalujte a restartujte HA
5. Po instalaci:
   - Zadejte **IP adresu vašeho Tigo CCA**
   - Obvykle: 192.168.10.xxx

### Najít Tigo CCA IP:
```bash
# Na Mac terminálu:
nmap -p 80,443 192.168.10.0/24 | grep -B 2 "open" | grep 192.168.10
```

## 3. LOXONE (DOKONČENÍ) 🏠

### Kroky pro plnou konfiguraci:
1. **Nastavení** → **Zařízení a služby**
2. Najděte **Loxone** (už tam je)
3. Klikněte na **KONFIGUROVAT**
4. Zadejte:
   - **IP Miniserveru:** (vaše IP)
   - **Uživatel:** (váš Loxone user)
   - **Heslo:** (vaše heslo)
5. Vyberte místnosti a zařízení k importu

## 4. MIELE 🏠

### Nejdřív opravit Cloud:
1. **Nastavení** → **Systém** → **Home Assistant Cloud**
2. Přihlaste se vašimi Nabu Casa údaji
3. Pokud se stránka načítá donekonečna:
   ```bash
   # Odstranit Miele integraci
   ./synology_ssh_connect.sh "echo 'Dasa_beda2208s' | sudo -S /usr/local/bin/docker exec homeassistant python3 << EOF
   import json
   with open('/config/.storage/config_entries', 'r') as f:
       data = json.load(f)
   entries = [e for e in data['data']['entries'] if e.get('domain') != 'miele']
   data['data']['entries'] = entries
   with open('/config/.storage/config_entries', 'w') as f:
       json.dump(data, f, indent=2)
   print('Miele odstraněno')
   EOF"
   
   # Restart HA
   ./synology_ssh_connect.sh "echo 'Dasa_beda2208s' | sudo -S /usr/local/bin/docker restart homeassistant"
   ```

### Po přihlášení do Cloud:
1. **Nastavení** → **Zařízení a služby**
2. **+ PŘIDAT INTEGRACI**
3. Hledejte **"Miele"**
4. Vyberte **"Via Home Assistant Cloud"**

## 5. CLAUDE 🤖

Claude není standardní HA integrace. Možnosti:

### Možnost A: OpenAI Compatible API
1. **Nastavení** → **Zařízení a služby**
2. **+ PŘIDAT INTEGRACI**
3. Hledejte **"OpenAI Conversation"**
4. Použít Claude API endpoint

### Možnost B: Custom Component
- Hledat v HACS komunitní integraci pro Claude/Anthropic

## 📝 KONTROLNÍ SEZNAM:

- [ ] SOLAX Cloud přidán přes UI
- [ ] Tigo nakonfigurován s IP adresou CCA
- [ ] Loxone plně nakonfigurován
- [ ] Nabu Casa přihlášen
- [ ] Miele funguje přes Cloud
- [ ] Claude řešení vybráno

## 🔍 OVĚŘENÍ:

Po dokončení zkontrolujte entity:

```bash
# Celkový počet entit
curl -s "http://192.168.10.35:8123/api/states" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIzNzg0Njg1NWRkM2E0NGZhODlmNjM4OTZiY2Y1MTg5MCIsImlhdCI6MTc1NTQyNzU3MSwiZXhwIjoyMDcwNzg3NTcxfQ.7lfjLbfrgyuBDNTvooSO6ibH6okz8BnsF8E-qFwWMxA" \
  | jq 'length'

# SOLAX entity
curl -s "http://192.168.10.35:8123/api/states" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIzNzg0Njg1NWRkM2E0NGZhODlmNjM4OTZiY2Y1MTg5MCIsImlhdCI6MTc1NTQyNzU3MSwiZXhwIjoyMDcwNzg3NTcxfQ.7lfjLbfrgyuBDNTvooSO6ibH6okz8BnsF8E-qFwWMxA" \
  | jq '[.[] | select(.entity_id | contains("solax"))] | length'
```

## 🆘 POMOC:

Pokud něco nefunguje:
1. Zkontrolujte logy: **Nastavení** → **Systém** → **Logy**
2. Restartujte HA
3. Zkontrolujte síťové připojení

---
**Vytvořeno:** 2025-08-17 12:55
**Pro:** Home Assistant na Synology NAS