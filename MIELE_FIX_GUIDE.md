# 🔧 OPRAVA MIELE INTEGRACE

## ❌ PROBLÉM:
"Nastavení se nezdařilo: Zkontrolujte logy"

## 🔍 PŘÍČINY:
1. **Chybí Home Assistant Cloud (Nabu Casa) předplatné**
2. **Chybí Miele@home účet**
3. **Nesprávné přihlašovací údaje**

## ✅ ŘEŠENÍ:

### Možnost 1: ODSTRANIT A PŘIDAT ZNOVU

1. **Odstranit Miele integraci:**
   - Otevřete http://192.168.10.35:8123
   - **Nastavení** → **Zařízení a služby**
   - Najděte **Miele**
   - Klikněte na 3 tečky → **Odstranit**

2. **Restartovat HA:**
   ```bash
   ./synology_ssh_connect.sh "echo 'Dasa_beda2208s' | sudo -S /usr/local/bin/docker restart homeassistant"
   ```

3. **Přidat Miele znovu:**
   - **Nastavení** → **Zařízení a služby**
   - **+ PŘIDAT INTEGRACI**
   - Hledejte **Miele**
   - Vyberte metodu připojení:
     - **Via Home Assistant Cloud** (vyžaduje Nabu Casa)
     - **Direct API** (lokální připojení)

### Možnost 2: LOKÁLNÍ MIELE API (DOPORUČENO)

1. **Vytvořte Miele Developer účet:**
   - Jděte na https://www.miele.com/developer/
   - Zaregistrujte se
   - Vytvořte aplikaci

2. **Získejte API credentials:**
   - Client ID
   - Client Secret

3. **Přidejte do configuration.yaml:**
   ```yaml
   miele:
     client_id: YOUR_CLIENT_ID
     client_secret: YOUR_CLIENT_SECRET
     lang: cs-CZ
   ```

4. **Restartovat HA**

### Možnost 3: PŘES HACS - ALTERNATIVNÍ INTEGRACE

1. **V HACS hledejte:**
   - "Miele@home"
   - "MieleAtHome"
   
2. **Instalovat a konfigurovat**

## 📝 KONTROLNÍ SEZNAM:

- [ ] Máte Miele@home účet?
- [ ] Máte zařízení přidané v Miele@home aplikaci?
- [ ] Máte Home Assistant Cloud (Nabu Casa)?
- [ ] Nebo máte Miele Developer API klíče?

## 🆘 POKUD NEPOTŘEBUJETE MIELE:

**Můžete integraci odstranit:**
1. **Nastavení** → **Zařízení a služby**
2. Najděte **Miele**
3. Klikněte na 3 tečky → **Odstranit**

## 💡 ALTERNATIVA BEZ MIELE:

Pokud nemáte Miele spotřebiče, můžete integraci úplně odstranit a HA bude fungovat bez problémů.

---
**Připraveno:** 2025-08-16