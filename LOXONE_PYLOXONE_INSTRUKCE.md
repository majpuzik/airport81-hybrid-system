# 🏠 Home Assistant s PyLoxone - Manuální nastavení

Home Assistant je spuštěný a běží na: **http://localhost:8123**

## 📋 Kroky pro přidání Loxone:

### 1. Přihlaste se do Home Assistant
- Otevřete: http://localhost:8123
- Při prvním spuštění vytvořte administrátorský účet

### 2. Přidejte Loxone integraci
1. V levém menu klikněte na **Settings** (Nastavení) ⚙️
2. Vyberte **Devices & Services** (Zařízení a služby)
3. Klikněte na modré tlačítko **+ ADD INTEGRATION** vpravo dole
4. Do vyhledávání napište: **Loxone**
5. Klikněte na **PyLoxone**

### 3. Vyplňte údaje pro připojení
- **Miniserver type**: Miniserver Gen2
- **Host/IP**: 192.168.10.68
- **Port**: 8080
- **Username**: admin
- **Password**: Max007

### 4. Pokud integrace není vidět
Zkuste:
1. Vyčistit cache prohlížeče (Ctrl+Shift+R nebo Cmd+Shift+R)
2. Restartovat Home Assistant:
   ```bash
   /Applications/Docker.app/Contents/Resources/bin/docker restart homeassistant
   ```
3. Počkat 2 minuty a zkusit znovu

## 🔍 Kontrola senzorů
Po úspěšném přidání:
1. Jděte do **Developer Tools** → **States**
2. Do filtru napište: **loxone**
3. Měli byste vidět všechny Loxone senzory

## ⚠️ Řešení problémů

### "Invalid handler specified"
Pokud se objeví tato chyba:
1. Restartujte Home Assistant
2. Zkuste jiný prohlížeč
3. Vyčistěte cookies pro localhost:8123

### Integrace se nenačítá
```bash
# Zkontrolujte logy
/Applications/Docker.app/Contents/Resources/bin/docker logs -f homeassistant | grep -i loxone

# Ověřte, že PyLoxone je nainstalovaná
ls -la /Users/m.a.j.puzik/homeassistant/custom_components/loxone/
```

### Loxone se nepřipojuje
1. Ověřte, že Loxone je dostupný:
   ```bash
   curl -u admin:Max007 http://192.168.10.68:8080/jdev/sps/status
   ```
2. Zkuste port 80 místo 8080
3. Zkontrolujte firewall

## 📊 Monitorování
```bash
# Sledování logů v reálném čase
/Applications/Docker.app/Contents/Resources/bin/docker logs -f homeassistant

# Kontrola využití zdrojů
/Applications/Docker.app/Contents/Resources/bin/docker stats homeassistant
```

## 🚀 Pro 100% spolehlivost
1. Nastavte automatický restart kontejneru
2. Pravidelně zálohujte konfiguraci
3. Monitorujte logy pro chyby
4. Omezte počet zaznamenávaných entit pro lepší výkon

---
**Důležité**: PyLoxone je nainstalovaná v `/Users/m.a.j.puzik/homeassistant/custom_components/loxone/`