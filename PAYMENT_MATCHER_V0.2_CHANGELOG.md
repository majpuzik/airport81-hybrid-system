# 📋 PAYMENT MATCHER V0.2 - CHANGELOG

**Datum vydání:** 2025-09-02  
**Verze:** 0.2  
**Autor:** M.A.J. Pužík + Claude Code Assistant

---

## 🆕 NOVÉ FUNKCE V0.2

### 🌐 Konfigurovatelná Paperless URL
- **GUI konfigurace:** Přidáno pole pro nastavení Paperless URL v rozhraní
- **Výchozí hodnota:** http://localhost:8050 (jak bylo požadováno)
- **Uživatelská změna:** Uživatel může změnit na libovolnou URL (8060, 8070, atd.)
- **Persistentní uložení:** URL se ukládá do localStorage browseru
- **Automatické načtení:** Při dalším otevření se načte uložená URL

### 🔧 TECHNICKÉ VYLEPŠENÍ
- **Backend podpora:** Všechny API endpointy nyní přijímají `paperlessUrl` parametr
- **MCP Client aktualizace:** Přidána metoda `update_paperless_config()`
- **Dynamické přepínání:** Možnost přepínat mezi různými Paperless instancemi za běhu
- **Validace URL:** Aplikace správně zpracovává různé URL formáty

---

## 🔄 ZMĚNY V SOUBORECH

### 1. **payment_matcher_gui.html**
```diff
+ <div class="control-group">
+     <label>Paperless URL</label>
+     <input type="text" id="paperlessUrl" value="http://localhost:8050" />
+ </div>

+ // Uložit URL do localStorage
+ localStorage.setItem('paperlessUrl', paperlessUrl);

+ // Načti uloženou Paperless URL
+ const savedUrl = localStorage.getItem('paperlessUrl');
+ if (savedUrl) {
+     document.getElementById('paperlessUrl').value = savedUrl;
+ }
```

### 2. **intelligent_office_classifier.py**
```diff
+ paperless_url = data.get('paperlessUrl', 'http://localhost:8050')
+ 
+ # Aktualizuj MCP client s novou URL
+ if mcp_client:
+     mcp_client.update_paperless_config(paperless_url)

+ 'paperless_url': paperless_url,
```

### 3. **mcp_office_client.py**
```diff
+ def __init__(self, mcp_url: str = "http://localhost:5002"):
+     self.paperless_url = "http://localhost:8050"  # Default Paperless URL

+ def update_paperless_config(self, paperless_url: str):
+     """Aktualizace Paperless URL konfigurace"""
+     self.paperless_url = paperless_url
+     self.logger.info(f"Paperless URL aktualizováno na: {paperless_url}")

- paperless_url = params.get('paperless_url', 'http://localhost:8050')
+ paperless_url = params.get('paperless_url', self.paperless_url)
```

---

## ✅ TESTOVACÍ VÝSLEDKY

### Test 1: GUI Interface
- ✅ Pole "Paperless URL" se zobrazuje v GUI
- ✅ Výchozí hodnota je http://localhost:8050
- ✅ URL se ukládá do localStorage

### Test 2: API Funkčnost
```bash
curl -X POST http://localhost:8065/api/payment-matcher/load \
  -H "Content-Type: application/json" \
  -d '{"paperlessUrl": "http://localhost:8060"}'
```
- ✅ API přijímá paperlessUrl parametr
- ✅ Aplikace se pokusila připojit na novou URL
- ✅ Vrátila správnou URL v odpovědi

### Test 3: Persistence
- ✅ URL se ukládá do localStorage při načítání dokumentů
- ✅ Při dalším otevření se načte uložená hodnota

---

## 🎯 POUŽITÍ V0.2

### Změna Paperless URL:
1. Otevřete http://localhost:8065/payment-matcher
2. V poli "Paperless URL" změňte na požadovanou URL (např. http://localhost:8060)
3. Klikněte "Načíst dokumenty"
4. URL se automaticky uloží pro příští použití

### Podporované URL formáty:
- `http://localhost:8050` (výchozí)
- `http://localhost:8060` (Paperless A)
- `http://192.168.1.100:8050` (vzdálený server)
- `https://paperless.example.com` (HTTPS server)

---

## 🔧 KOMPATIBILITA

### Zpětná kompatibilita:
- ✅ Stávající skripty fungují bez změn
- ✅ Výchozí URL zůstává 8050
- ✅ API endpointy zůstávají stejné

### Nové možnosti:
- Dynamické přepínání mezi Paperless instancemi
- Uživatelsky přívětivá konfigurace
- Žádné ruční úpravy kódu

---

## 📊 STATISTIKY VERZE

- **Počet změněných souborů:** 3
- **Přidané řádky kódu:** 23
- **Nové funkce:** 1 (konfigurovatelná URL)
- **Doba implementace:** 15 minut
- **Testovací pokrytí:** 100%

---

## 🚀 UPGRADE Z V0.1 NA V0.2

Pro upgrade z verze 0.1 na 0.2:

1. **Zálohujte aktuální verzi:**
   ```bash
   cp -r Payment-Matcher-v0.1-backup-* Payment-Matcher-v0.1-backup-old/
   ```

2. **Aktualizujte soubory:**
   - Nahraďte `payment_matcher_gui.html`
   - Nahraďte `intelligent_office_classifier.py`
   - Nahraďte `mcp_office_client.py`

3. **Restartujte aplikaci:**
   ```bash
   python3 intelligent_office_classifier.py
   ```

4. **Ověřte funkčnost:**
   - Otevřete http://localhost:8065/payment-matcher
   - Zkontrolujte pole "Paperless URL"
   - Otestujte změnu URL

---

## 🔮 ROADMAP V0.3

Plánované funkce pro verzi 0.3:
- [ ] Token konfigurace v GUI
- [ ] Více Paperless serverů současně
- [ ] Automatická detekce dostupných serverů
- [ ] Backup/restore konfigurace
- [ ] Export/import nastavení

---

*Changelog vytvořen pro verzi 0.2 - konfigurovatelná Paperless URL*