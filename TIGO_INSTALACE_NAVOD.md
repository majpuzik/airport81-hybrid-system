# 🔧 INSTALACE TIGO ENERGY PRO HOME ASSISTANT

## 📦 PŘIDÁNÍ TIGO PŘES HACS:

### Metoda 1: PŘIDAT VLASTNÍ REPOZITÁŘ

1. **Otevřete HACS v HA:**
   - http://192.168.10.35:8123
   - V menu vlevo klikněte na **HACS**

2. **Přidejte vlastní repozitář:**
   - Klikněte na 3 tečky vpravo nahoře
   - Vyberte **Vlastní repozitáře** (Custom repositories)
   
3. **Přidejte Tigo repozitář:**
   - **URL repozitáře:** `https://github.com/mletenay/home-assistant-tigo`
   - **Kategorie:** Integration
   - Klikněte **PŘIDAT**

4. **Nainstalujte integraci:**
   - V HACS → **Integrace**
   - Hledejte **Tigo**
   - Klikněte na ni → **STÁHNOUT**
   - Restartovat HA

5. **Aktivujte integraci:**
   - **Nastavení** → **Zařízení a služby**
   - **+ PŘIDAT INTEGRACI**
   - Hledejte **Tigo**
   - Zadejte IP adresu vašeho Tigo CCA

### Metoda 2: MANUÁLNÍ INSTALACE

```bash
# Stáhnout do custom_components
./synology_ssh_connect.sh "echo 'Dasa_beda2208s' | sudo -S /usr/local/bin/docker exec homeassistant bash -c '
cd /config/custom_components
git clone https://github.com/mletenay/home-assistant-tigo.git tigo_energy
'"

# Restart HA
./synology_ssh_connect.sh "echo 'Dasa_beda2208s' | sudo -S /usr/local/bin/docker restart homeassistant"
```

## 🔍 ALTERNATIVNÍ TIGO INTEGRACE:

### 1. **mletenay/home-assistant-tigo** (DOPORUČENO)
- URL: `https://github.com/mletenay/home-assistant-tigo`
- Lokální přístup k Tigo CCA
- Nejaktivnější vývoj

### 2. **MartinStoffel/tigo**
- URL: `https://github.com/MartinStoffel/tigo`
- Jednodušší verze

### 3. **lukasz-pyrzyk/home-assistant-tigo-energy**
- URL: `https://github.com/lukasz-pyrzyk/home-assistant-tigo-energy`
- Cloud integrace

### 4. **ther3zz/TigoCCAParser**
- URL: `https://github.com/ther3zz/TigoCCAParser`
- MQTT přes parser

## ⚙️ KONFIGURACE TIGO:

Po instalaci budete potřebovat:
- **IP adresu Tigo CCA** (obvykle 192.168.10.xxx)
- **Přihlašovací údaje** (pokud jsou nastaveny)

### Najděte Tigo CCA IP:
```bash
# Scan sítě pro Tigo zařízení
nmap -p 80,443 192.168.10.0/24 | grep -B 2 "open"
```

### Test připojení:
```bash
# Zkuste otevřít v prohlížeči
open http://192.168.10.XXX/cgi-bin/mmdstatus
```

## 📊 CO ZÍSKÁTE:

- Monitoring každého optimizeru
- Výkon panelu
- Napětí a proud
- Teplota optimizeru
- Stav optimizeru
- Celkový výkon systému

## 🆘 PROBLÉMY:

### "Tigo nenalezeno v HACS"
→ Přidejte jako vlastní repozitář (viz výše)

### "Cannot connect to Tigo CCA"
→ Zkontrolujte IP adresu a síťové připojení

### "Authentication failed"
→ Zkontrolujte přihlašovací údaje v Tigo CCA

---
**Připraveno:** 2025-08-16
**Pro:** Synology NAS HA