# 📦 HACS Instalace na Synology NAS

## ✅ CO JE HOTOVO:
- HACS soubory jsou již nainstalované v `/config/custom_components/hacs/`
- Home Assistant byl restartován
- HACS je detekováno systémem

## 🔧 JAK DOKONČIT INSTALACI:

### 1. Otevřete Home Assistant
```
http://192.168.10.35:8123
```

### 2. Aktivujte HACS
1. Jděte do **Settings** (Nastavení) → **Devices & Services** (Zařízení a služby)
2. Klikněte na **+ ADD INTEGRATION** (Přidat integraci)
3. Vyhledejte **HACS**
4. Klikněte na HACS

### 3. GitHub autorizace
1. Budete přesměrováni na GitHub
2. Přihlaste se svým GitHub účtem
3. Autorizujte HACS aplikaci
4. Získáte kód - zkopírujte ho

### 4. Dokončení
1. Vložte kód zpět do Home Assistant
2. Vyberte možnosti:
   - ✅ Enable experimental features (pro více integrací)
   - ✅ Enable AppDaemon apps (pokud používáte)
   - ✅ Enable NetDaemon apps (pokud používáte)
3. Klikněte na **SUBMIT**

### 5. Restart
Po instalaci restartujte Home Assistant:
```bash
./synology_ssh_connect.sh "echo 'Dasa_beda2208s' | sudo -S /usr/local/bin/docker restart homeassistant"
```

## 📱 PO INSTALACI:

### Instalace integrací přes HACS:

1. **Loxone WebSocket**
   - HACS → Integrations → Search "Loxone"
   - Install → Restart HA

2. **Solax Inverter Modbus**
   - HACS → Integrations → Search "Solax"
   - Install → Restart HA

3. **Tigo CCA**
   - HACS → Integrations → Search "Tigo"
   - Install → Restart HA

4. **Czech Energy Spot Prices** (už nainstalováno)
   - Již máte v custom_components

## 🔍 OVĚŘENÍ:

Po instalaci zkontrolujte:
```bash
# Počet HACS repozitářů
curl -s -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI1ZjFmZjRhOGIyZTQ0NzYyOWRiNzMxMDY4ZWYyOGRkOCIsImlhdCI6MTc1NTM2MjEwMSwiZXhwIjoyMDcwNzIyMTAxfQ.Ua15HsAoUEK4rKWV7qFrWtJtnyAblkcvNyqfxR__Ggg" \
  "http://192.168.10.35:8123/api/states" | \
  jq '[.[] | select(.entity_id | contains("hacs"))] | length'
```

## 🆘 PROBLÉMY?

### "HACS not found"
- Restartujte HA a zkuste znovu

### "GitHub authorization failed"
- Vytvořte Personal Access Token na GitHub:
  1. GitHub → Settings → Developer settings
  2. Personal access tokens → Generate new token
  3. Scopes: `repo` (všechny pod-položky)

### "Rate limit exceeded"
- Počkejte hodinu nebo použijte GitHub token

---
**Připraveno:** 2025-08-16
**Pro:** Synology NAS 192.168.10.35