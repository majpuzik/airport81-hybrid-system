# 🎫 TICKET CHAT ENHANCED v2.0 - KOMPLETNÍ DOKUMENTACE
================================================================================

**Datum vytvoření:** 18. srpna 2025  
**Verze systému:** 2.0  
**Autor:** Enhanced AI Assistant System  

## 📋 OBSAH

1. [Přehled systému](#přehled-systému)
2. [Hlavní funkce](#hlavní-funkce)
3. [Instalace a spuštění](#instalace-a-spuštění)
4. [Komponenty systému](#komponenty-systému)
5. [Režim učení](#režim-učení)
6. [API Integrace](#api-integrace)
7. [Databáze](#databáze)
8. [Řešení problémů](#řešení-problémů)
9. [Kontakt a podpora](#kontakt-a-podpora)

---

## 🎯 PŘEHLED SYSTÉMU

**Ticket Chat Enhanced** je inteligentní AI asistent pro technickou podporu, který kombinuje:
- 📚 **Databázi manuálů** (10+ výrobců)
- 💡 **Knowledge base** vyřešených problémů
- 🤖 **AI asistenta** (Ollama/ChatGPT fallback)
- 🏠 **Loxone AI integraci** pro real-time data
- 📚 **Režim učení** pro rozšiřování znalostí

### Hlavní výhody:
✅ **Okamžité odpovědi** z manuálů a KB  
✅ **Učí se z interakcí** - ukládá úspěšná řešení  
✅ **Real-time data** z domácnosti (Loxone)  
✅ **Žluté tlačítko učení** - jednoduché přidávání znalostí  

---

## 🚀 HLAVNÍ FUNKCE

### 1. Inteligentní vyhledávání
- **Hierarchie zdrojů:** Knowledge Base → Manuály → AI
- **Detekce zařízení** z textu dotazu
- **Kontextové odpovědi** s vysokou přesností

### 2. Podporovaná zařízení
- **Miele** (pračky, myčky, sušičky)
- **Bosch** (pračky, myčky, lednice)
- **Siemens** (pračky, myčky, trouby)
- **HP** (tiskárny, scannery)
- **Canon** (tiskárny, fotoaparáty)
- **Samsung** (TV, mobily, lednice)
- **LG** (TV, pračky, klimatizace)
- **Parkside** (sekačky, nářadí)
- **SolaX** (střídače, baterie)
- **Loxone** (Smart Home systém)

### 3. Režim učení (NOVÉ!)
- **Žluté tlačítko** v hlavičce
- **Formát:** Otázka? Odpověď
- **Okamžité uložení** do knowledge base
- **Automatické použití** při dalších dotazech

### 4. Loxone AI integrace
- **Spotřeba energie** v reálném čase
- **Teploty místností** a přítomnost
- **Stav zavlažování** a jímky
- **Ovládání zařízení** přes API

---

## 💻 INSTALACE A SPUŠTĚNÍ

### Požadavky:
- Python 3.8+
- SQLite3
- Flask

### Instalace:
```bash
# 1. Instalace závislostí
pip3 install flask requests

# 2. Spuštění hlavní aplikace
python3 /Users/m.a.j.puzik/maj_ticket_chat_enhanced.py

# 3. Otevřít v prohlížeči
open http://localhost:8092
```

### Alternativní porty:
- **8092** - Hlavní Enhanced verze
- **8093** - Konverzační verze

---

## 🔧 KOMPONENTY SYSTÉMU

### 1. maj_ticket_chat_enhanced.py
**Hlavní aplikace** (Port 8092)
- Flask web server
- API endpointy (/api/process, /api/learn, /api/stats)
- HTML UI s žlutým tlačítkem učení
- Integrace všech komponent

### 2. knowledge_base.db
**SQLite databáze** obsahující:
- `device_manuals` - Kompletní manuály zařízení
- `knowledge_base` - Q&A páry a řešení
- `query_logs` - Historie dotazů

### 3. loxone_ai_integration.py
**API klient pro Loxone AI**
- get_energy_data() - Spotřeba a výroba
- get_room_data() - Teploty a stavy místností
- get_irrigation_status() - Stav zavlažování
- control_device() - Ovládání zařízení

### 4. ticket_chat_conversational.py
**Konverzační verze** (Port 8093)
- Postupné řešení problémů
- Potvrzování řešení
- Ukládání úspěšných řešení

---

## 📚 REŽIM UČENÍ - NÁVOD

### Aktivace režimu učení:

1. **Klikněte na žluté tlačítko "📚 Učení"**
   - Tlačítko v pravém horním rohu
   - Pole pro zadávání zežloutne

2. **Zadejte otázku a odpověď:**
   ```
   Formát: Otázka? Odpověď
   
   Příklady:
   - Jak resetuji router? Držte reset tlačítko 10 sekund.
   - Co znamená chyba E15 u myčky? Ucpaný filtr, vyčistěte ho.
   - Jak zapnu noční režim? V menu Settings → Night Mode → ON.
   ```

3. **Odešlete zprávu**
   - Systém potvrdí uložení
   - Znalost je okamžitě k dispozici

### Tipy pro efektivní učení:
- ✅ Buďte **konkrétní** v otázkách
- ✅ Poskytněte **krok za krokem** návody
- ✅ Uveďte **čísla chyb** pokud existují
- ✅ Přidejte **bezpečnostní upozornění** kde je to potřeba

---

## 🔌 API INTEGRACE

### Loxone AI API
```python
from loxone_ai_integration import LoxoneAIAPI

api = LoxoneAIAPI()

# Získat energetická data
energy = api.get_energy_data()
print(f"Spotřeba: {energy['current_consumption']}W")

# Získat teplotu místnosti
rooms = api.get_room_data()
for room in rooms['rooms']:
    print(f"{room['name']}: {room['temperature']}°C")

# Stav zavlažování
irrigation = api.get_irrigation_status()
print(f"Jímka: {irrigation['tank_level']}%")
```

### REST API Endpointy

#### POST /api/process
Zpracování dotazu
```json
Request:
{
  "message": "Miele pračka zobrazuje F53"
}

Response:
{
  "ticket_id": "TCK-2025-0001",
  "ai_response": "Chyba F53 znamená...",
  "ai_source": "manual",
  "ai_confidence": 0.95,
  "detected_device": "Miele Pračka"
}
```

#### POST /api/learn
Naučení nové znalosti
```json
Request:
{
  "question": "Jak vyměnit baterii?",
  "answer": "Otevřete kryt, vyjměte starou, vložte novou.",
  "source": "user_taught"
}

Response:
{
  "success": true,
  "message": "Znalost přidána",
  "device_detected": "Generic Device"
}
```

---

## 💾 DATABÁZE

### Struktura tabulek:

#### device_manuals
```sql
CREATE TABLE device_manuals (
    id INTEGER PRIMARY KEY,
    manufacturer TEXT,
    model TEXT,
    device_type TEXT,
    name TEXT,
    keywords TEXT,
    content TEXT,      -- Kompletní manuál
    error_codes TEXT,  -- JSON s chybovými kódy
    url TEXT,
    created_at TIMESTAMP
);
```

#### knowledge_base
```sql
CREATE TABLE knowledge_base (
    id INTEGER PRIMARY KEY,
    question TEXT,
    answer TEXT,
    source TEXT,       -- manual/kb/user_taught
    usage_count INTEGER,
    created_at TIMESTAMP
);
```

### Příklady dotazů:
```sql
-- Najít všechny Miele chyby
SELECT * FROM device_manuals 
WHERE manufacturer = 'Miele' 
AND error_codes LIKE '%F53%';

-- Nejčastější dotazy
SELECT question, usage_count 
FROM knowledge_base 
ORDER BY usage_count DESC 
LIMIT 10;
```

---

## 🔧 ŘEŠENÍ PROBLÉMŮ

### Aplikace se nespustí
```bash
# Zkontrolovat port
lsof -i :8092

# Zabít blokující proces
lsof -i :8092 -t | xargs kill -9

# Spustit znovu
python3 maj_ticket_chat_enhanced.py
```

### Databáze nenalezena
```bash
# Vytvořit databázi
python3 download_manuals_simple.py

# Zkontrolovat
sqlite3 knowledge_base.db ".tables"
```

### Loxone API nefunguje
```python
# Test připojení
from loxone_ai_integration import LoxoneAIAPI
api = LoxoneAIAPI()
print(api.get_energy_data())  # Mělo by vrátit fallback data
```

---

## 📊 STATISTIKY A MONITORING

### Zobrazení statistik:
```bash
curl http://localhost:8092/api/stats | jq
```

### Sledování logů:
```bash
# Hlavní aplikace
tail -f /tmp/ticket_chat.log

# Konverzační verze
tail -f /tmp/ticket_chat_conv_new.log
```

### Kontrola databáze:
```bash
sqlite3 knowledge_base.db "SELECT COUNT(*) FROM knowledge_base;"
sqlite3 knowledge_base.db "SELECT COUNT(*) FROM device_manuals;"
```

---

## 🚨 BEZPEČNOSTNÍ POZNÁMKY

⚠️ **DŮLEŽITÉ:**
- Systém je určen pro **lokální použití** (localhost)
- Neobsahuje autentizaci - nespouštějte veřejně
- API tokeny uchovávejte bezpečně
- Pravidelně zálohujte databázi

---

## 📞 KONTAKT A PODPORA

### Technická podpora:
- **Email:** support@enhanced-ai.local
- **Web:** http://localhost:8092
- **Dokumentace:** Tento soubor

### Vývojový tým:
- Enhanced AI Assistant
- Loxone AI Integration Team
- Knowledge Base Curators

---

## 📈 BUDOUCÍ VYLEPŠENÍ

### Plánované funkce:
- [ ] Hlasové ovládání
- [ ] Export/Import znalostí
- [ ] Statistiky úspěšnosti
- [ ] Multi-language podpora
- [ ] Cloud synchronizace
- [ ] Mobilní aplikace

---

## 📝 CHANGELOG

### v2.0 (18.8.2025)
- ✅ Přidáno žluté tlačítko učení
- ✅ Implementována Loxone AI integrace
- ✅ Rozšířena databáze manuálů
- ✅ Vylepšena extrakce odpovědí

### v1.0 (17.8.2025)
- Základní ticket systém
- Databáze manuálů
- AI fallback

---

## 📄 LICENCE

MIT License - Volně k použití a modifikaci

---

**Konec dokumentace**

Vytvořeno: 18. srpna 2025, 18:10  
Poslední aktualizace: 18. srpna 2025, 18:10