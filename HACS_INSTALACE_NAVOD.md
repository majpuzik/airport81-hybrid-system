# 📦 HACS Instalace na Synology NAS - ČESKÝ NÁVOD

## ✅ CO JE HOTOVO:
- HACS soubory jsou již nainstalované v `/config/custom_components/hacs/`
- Home Assistant byl restartován
- HACS je detekován systémem

## 🔧 JAK DOKONČIT INSTALACI:

### 1. Otevřete Home Assistant
```
http://192.168.10.35:8123
```

### 2. Aktivujte HACS
1. Jděte do **Nastavení** → **Zařízení a služby**
2. Klikněte na **+ PŘIDAT INTEGRACI**
3. Do vyhledávání napište **HACS**
4. Klikněte na HACS

### 3. GitHub autorizace
1. Budete přesměrováni na GitHub
2. Přihlaste se svým GitHub účtem
3. Autorizujte HACS aplikaci
4. Získáte kód - zkopírujte ho

### 4. Dokončení
1. Vložte kód zpět do Home Assistant
2. Vyberte možnosti:
   - ✅ Povolit experimentální funkce (pro více integrací)
   - ✅ Povolit AppDaemon aplikace (pokud používáte)
   - ✅ Povolit NetDaemon aplikace (pokud používáte)
3. Klikněte na **ODESLAT**

### 5. Restart
Po instalaci restartujte Home Assistant:
```bash
./synology_ssh_connect.sh "echo 'Dasa_beda2208s' | sudo -S /usr/local/bin/docker restart homeassistant"
```

## 📱 PO INSTALACI HACS:

### Instalace integrací přes HACS:

1. **Loxone WebSocket**
   - HACS → Integrace → Hledat "Loxone"
   - Instalovat → Restartovat HA

2. **Solax Inverter Modbus**
   - HACS → Integrace → Hledat "Solax"
   - Instalovat → Restartovat HA

3. **Tigo CCA**
   - HACS → Integrace → Hledat "Tigo"
   - Instalovat → Restartovat HA

4. **Czech Energy Spot Prices** (už nainstalováno)
   - Již máte v custom_components

## 🔍 OVĚŘENÍ:

Po instalaci zkontrolujte entity:
```bash
# Počet HACS entit
curl -s -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI1ZjFmZjRhOGIyZTQ0NzYyOWRiNzMxMDY4ZWYyOGRkOCIsImlhdCI6MTc1NTM2MjEwMSwiZXhwIjoyMDcwNzIyMTAxfQ.Ua15HsAoUEK4rKWV7qFrWtJtnyAblkcvNyqfxR__Ggg" \
  "http://192.168.10.35:8123/api/states" | \
  jq '[.[] | select(.entity_id | contains("hacs"))] | length'
```

## 🆘 ŘEŠENÍ PROBLÉMŮ:

### "HACS nenalezen"
- Restartujte HA a zkuste znovu

### "GitHub autorizace selhala"
- Vytvořte Personal Access Token na GitHub:
  1. GitHub → Nastavení → Vývojářská nastavení
  2. Personal access tokens → Vygenerovat nový token
  3. Oprávnění: `repo` (všechny pod-položky)

### "Překročen limit požadavků"
- Počkejte hodinu nebo použijte GitHub token

## 📋 ČESKÉ NÁZVY V HOME ASSISTANT:

| Anglicky | Česky |
|----------|-------|
| Settings | Nastavení |
| Devices & Services | Zařízení a služby |
| Add Integration | Přidat integraci |
| Integrations | Integrace |
| Entities | Entity |
| Automations | Automatizace |
| Scripts | Skripty |
| Dashboards | Nástěnky |
| Energy | Energie |
| History | Historie |
| Logbook | Deník |
| Developer Tools | Nástroje pro vývojáře |
| Supervisor | Supervisor |
| Configuration | Konfigurace |
| Restart | Restartovat |
| Submit | Odeslat |
| Save | Uložit |
| Cancel | Zrušit |

---
**Připraveno:** 2025-08-16
**Pro:** Synology NAS 192.168.10.35
**Jazyk HA:** Čeština