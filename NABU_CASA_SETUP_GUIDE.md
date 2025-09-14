# 🌩️ NASTAVENÍ HOME ASSISTANT CLOUD (NABU CASA)

## 📊 AKTUÁLNÍ STAV:
- **Cloud komponenta:** ✅ Přidána do configuration.yaml
- **Cloud auth:** ❌ Není nakonfigurován (nepřihlášen)
- **Miele integrace:** ⚠️ Čeká na Cloud připojení

## 🔧 JAK OPRAVIT:

### Krok 1: PŘIHLÁSIT SE DO NABU CASA

1. **Otevřete Home Assistant:**
   ```
   http://192.168.10.35:8123
   ```

2. **Jděte do nastavení Cloud:**
   - **Nastavení** → **Home Assistant Cloud**
   - NEBO přímo: http://192.168.10.35:8123/config/cloud

3. **Pokud se stránka načítá donekonečna:**
   ```bash
   # Restartovat HA
   ./synology_ssh_connect.sh "echo 'Dasa_beda2208s' | sudo -S /usr/local/bin/docker restart homeassistant"
   ```
   - Počkejte 3-5 minut
   - Zkuste znovu

4. **Přihlašte se:**
   - Klikněte na **"Přihlásit se"** nebo **"Log in"**
   - Zadejte váš Nabu Casa email
   - Zadejte heslo
   - Potvrďte

### Krok 2: AKTIVOVAT MIELE PŘES CLOUD

Po úspěšném přihlášení do Nabu Casa:

1. **Nastavení** → **Zařízení a služby**
2. **+ PŘIDAT INTEGRACI**
3. Hledejte **"Miele"**
4. Vyberte **"Via Home Assistant Cloud"**
5. Následujte instrukce pro přihlášení do Miele@home

### Krok 3: OVĚŘIT FUNKČNOST

```bash
# Zkontrolovat Cloud status
curl -X GET \
  "http://192.168.10.35:8123/api/cloud/status" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI4NGEyOWNmYWUzODE0NDMxOWE2OWMwMTEzOTg2YTk0OSIsImlhdCI6MTc1NDkzOTIwMCwiZXhwIjoyMDcwMjk5MjAwfQ.ZTHPUcm4EztS-OpMRij_S1q1AbNtW0bB5tmQtApXvyY"
```

## 🔍 ALTERNATIVY POKUD CLOUD NEFUNGUJE:

### Možnost A: DOČASNĚ ODSTRANIT MIELE

Pokud Miele blokuje načítání:

```bash
# Odstranit Miele z config_entries
./synology_ssh_connect.sh "echo 'Dasa_beda2208s' | sudo -S /usr/local/bin/docker exec homeassistant bash -c 'python3 << EOF
import json
with open(\"/config/.storage/config_entries\", \"r\") as f:
    data = json.load(f)
entries = [e for e in data[\"data\"][\"entries\"] if e.get(\"domain\") != \"miele\"]
data[\"data\"][\"entries\"] = entries
with open(\"/config/.storage/config_entries\", \"w\") as f:
    json.dump(data, f, indent=2)
print(\"Miele odstraněno\")
EOF'"

# Restart HA
./synology_ssh_connect.sh "echo 'Dasa_beda2208s' | sudo -S /usr/local/bin/docker restart homeassistant"
```

### Možnost B: POUŽÍT MIELE BEZ CLOUD

1. Vytvořte Miele Developer účet na https://www.miele.com/developer/
2. Získejte API credentials
3. Přidejte do configuration.yaml:

```yaml
miele:
  client_id: YOUR_CLIENT_ID
  client_secret: YOUR_CLIENT_SECRET
  lang: cs-CZ
```

## 💡 VÝHODY NABU CASA:

- ✅ Vzdálený přístup odkudkoli
- ✅ Google Assistant / Alexa integrace
- ✅ Jednoduché OAuth integrace (Miele, Nest, atd.)
- ✅ Podpora vývoje Home Assistant
- ✅ Žádné nastavování portů/VPN

## 📝 KONTROLNÍ SEZNAM:

- [ ] Máte aktivní Nabu Casa předplatné?
- [ ] Znáte přihlašovací údaje?
- [ ] Funguje internet na Synology?
- [ ] Je HA aktualizovaný?

## 🆘 KONTAKT:

Pokud máte problémy s Nabu Casa účtem:
- Web: https://www.nabucasa.com/
- Support: https://www.nabucasa.com/support/

---
**Vytvořeno:** 2025-08-17
**Pro:** Home Assistant na Synology NAS