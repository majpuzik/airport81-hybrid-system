# 📋 SOLAX Advanced Energy Manager - Kompletní dokumentace

## 🚀 Přehled systému
**Verze:** 2.0  
**Datum:** 10.8.2025  
**Autor:** SOLAX Advanced Monitor System

Komplexní systém pro správu bateriového úložiště SOLAX s AI optimalizací a integrací českých tarifů elektřiny.

---

## ⚡ Hlavní funkce

### 1. 🔋 Správa baterie (40 kWh SOLAX)
- **Kapacita:** 40 kWh
- **Monitoring v reálném čase** přes SOLAX Cloud API
- **Automatické řízení nabíjení/vybíjení**
- **Výpočet průměrné ceny energie v baterii**
- **Historie nabíjení s rozlišením zdroje** (síť vs PV)

### 2. 💰 Cenová optimalizace
- **Tarif D56d** (22 hodin NT, 2 hodiny VT)
- **Dodavatel:** bezDodavatele a.s.
- **Integrace OTE spot cen**
- **Výpočet celkové ceny** včetně distribuce a DPH
- **Predikce cenových trendů**

### 3. 🤖 AI rozhodování
- **Automatický režim** s inteligentním rozhodováním
- **Učení z historických dat**
- **Faktory rozhodování:**
  - Aktuální vs průměrná cena
  - SOC baterie
  - Predikce spotřeby
  - Cenové trendy
  - Výroba PV

### 4. 📊 Statistiky a monitoring
- **Denní úspory a náklady**
- **Graf historie SOC, PV, spotřeby**
- **Celková hodnota energie v baterii**
- **ROI kalkulace**

---

## ⚙️ Konfigurace

### SOLAX Cloud API
```python
SOLAX_TOKEN = "20250807021517756732674"
SOLAX_SN = "SNNTF49WK7"
SOLAX_API_URL = "https://www.solaxcloud.com/proxyApp/proxy/api/getRealtimeInfo.do"
```

### Tarif D56d - bezDodavatele
```python
TARIF_CONFIG = {
    'dodavatel': 'bezDodavatele a.s.',
    'tarif': 'D56d',
    'jistic': '3×50A',
    'silova_elektrina': 2.207,  # Kč/kWh bez DPH
    'distribuce_nt': 0.206,      # Kč/kWh bez DPH
    'distribuce_vt': 0.721,      # Kč/kWh bez DPH
    'ostatni_poplatky': 0.695,   # Kč/kWh
    'dph': 1.21,
    'vt_hours': [17, 18],        # 17:00-19:00
}
```

### Baterie
```python
BATTERY_COST = {
    'battery_capacity': 40.0,    # kWh
    'total_kwh': 0,
    'total_cost': 0,
    'average_price': 2.5,        # Default Kč/kWh
}
```

---

## 🎮 Ovládání

### Režimy baterie
1. **🤖 AUTO** - AI optimalizace (doporučeno)
2. **⚡ NABÍJET** - Manuální nabíjení ze sítě
3. **🔌 VYBÍJET** - Manuální vybíjení do sítě
4. **⛔ VYPNOUT** - Vypnutí baterie

### Webové rozhraní
- **URL:** http://localhost:8085
- **Automatická aktualizace:** každých 60 sekund
- **WebSocket:** real-time data

---

## 📈 Výpočty a algoritmy

### Průměrná cena energie v baterii
```
Při nabíjení:
- Z PV: 0 Kč/kWh
- Ze sítě: aktuální tarif

Nová průměrná cena = (stará_energie * stará_cena + nová_energie * nová_cena) / celková_energie
```

### Celková hodnota
```
Hodnota = aktuální_kWh * průměrná_cena_za_kWh

Příklad:
29% × 40 kWh = 11.6 kWh
11.6 kWh × 2.5 Kč/kWh = 29 Kč
```

### ROI kalkulace
```
Denní úspora = (spotřeba_VT * cena_VT) - (spotřeba_baterie * průměrná_cena_baterie)
ROI = investice / (roční_úspora)
```

---

## 🔍 API Endpointy

### GET /api/status
Vrací aktuální stav systému včetně:
- SOC baterie
- Průměrná cena
- Aktuální tarif
- OTE ceny
- Rozhodovací faktory

### POST /api/battery/mode
Nastavení režimu baterie:
- `mode`: 'auto' | 'charge' | 'discharge' | 'off'

### GET /api/ote/prices
Aktuální a predikované OTE ceny

### GET /api/ai/decision
Aktuální AI rozhodnutí a důvody

---

## 🛡️ Ochrana proti banu

Systém obsahuje ochranu proti API banu:
- Minimální interval: 60 sekund
- Detekce ban zpráv
- Automatické pozastavení na 1 hodinu
- Vizuální indikace stavu

---

## 📊 Zobrazované hodnoty

### Hlavní panel
- 🔋 Stav baterie (SOC %)
- ⚡ Výkon baterie (W)
- ☀️ PV výkon (W)
- 🏠 Spotřeba (W)
- 📊 Dnešní výroba (kWh)
- 💰 Dnešní úspory (Kč)

### Panel řízení
- Aktuální cena elektřiny
- Stav baterie v kWh
- Celková hodnota energie

### AI optimalizace
- Průměrná cena v baterii
- Energie v baterii
- Celková hodnota
- Rozhodovací faktory
- Důvody rozhodnutí

---

## 🔧 Požadavky

### Software
- Python 3.8+
- Flask
- Flask-SocketIO
- Requests

### Hardware
- SOLAX střídač s Cloud API
- Připojení k internetu
- 40 kWh baterie

---

## 📝 Poznámky

1. **VT hodiny** závisí na HDO signálu (typicky 17:00-19:00)
2. **OTE ceny** se aktualizují každou hodinu
3. **Průměrná cena** se počítá váženým průměrem
4. **AI učení** se ukládá do `solax_ai_data.pkl`
5. **Ban ochrana** automaticky pozastaví API volání

---

## 🚨 Řešení problémů

### API ban
- Počkejte 1 hodinu
- Zvyšte interval aktualizace

### Chybějící data
- Zkontrolujte SOLAX Cloud připojení
- Ověřte token a SN

### Nesprávné ceny
- Zkontrolujte tarif v konfiguraci
- Ověřte VT/NT hodiny

---

## 📞 Kontakt
Pro podporu kontaktujte správce systému.

---

*Dokumentace vytvořena: 10.8.2025*
*Systém SOLAX Advanced Energy Manager v2.0*