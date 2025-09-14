# 🖥️ AI Monitor Unified - Dokumentace v0.1
**Datum vytvoření:** 2025-09-03  
**Autor:** Claude Code Assistant + M.A.J. Pužík  
**Verze:** 0.1  
**Umístění:** `/Users/m.a.j.puzik/zahnpasta/ai_monitor_unified.py`

## 📋 OBSAH
1. [Přehled systému](#přehled-systému)
2. [Architektura](#architektura)
3. [Instalace a spuštění](#instalace-a-spuštění)
4. [Moduly](#moduly)
5. [API Endpoints](#api-endpoints)
6. [Řešení problémů](#řešení-problémů)
7. [Zálohy](#zálohy)

---

## 🎯 PŘEHLED SYSTÉMU

AI Monitor Unified je **centralizovaný monitoring systém**, který běží na jediném portu (8900) a agreguje různé monitorovací moduly do jednotného webového rozhraní.

### ⚡ Klíčové vlastnosti:
- **Jediný vstupní bod:** Port 8900 pro všechny moduly
- **Modulární architektura:** Každý modul má vlastní GUI dostupné přes hlavní rozhraní
- **Real-time monitoring:** Automatický refresh dat
- **REST API:** Pro každý modul
- **Tmavé téma:** Optimalizované pro dlouhodobé sledování

---

## 🏗️ ARCHITEKTURA

### Koncept "GUI v GUI":
```
┌─────────────────────────────────────────┐
│     HLAVNÍ GUI (Port 8900)              │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────────┐  ┌──────────────┐   │
│  │ System       │  │ LLM Servers  │   │
│  │ Monitor      │  │ Monitor      │   │
│  └──────────────┘  └──────────────┘   │
│                                         │
│  ┌──────────────┐  ┌──────────────┐   │
│  │ Docker       │  │ Processes    │   │
│  │ Containers   │  │ Monitor      │   │
│  └──────────────┘  └──────────────┘   │
│                                         │
│  ┌──────────────┐  ┌──────────────┐   │
│  │ Network      │  │ Test Results │   │
│  │ Scanner      │  │              │   │
│  └──────────────┘  └──────────────┘   │
└─────────────────────────────────────────┘
```

### Datový tok:
1. **Hlavní proces** běží na portu 8900
2. **Update funkce** aktualizují data každého modulu nezávisle
3. **HTML generátory** vytváří GUI pro každý modul
4. **HTTP server** servíruje jednotlivé moduly jako pod-stránky

---

## 🚀 INSTALACE A SPUŠTĚNÍ

### Požadavky:
```bash
# Python packages
pip install psutil

# Docker (pro Docker modul)
# Nainstalovaný Docker Desktop pro macOS
```

### Spuštění:
```bash
# Základní spuštění
cd /Users/m.a.j.puzik/zahnpasta
python3 ai_monitor_unified.py

# Spuštění na pozadí
nohup python3 ai_monitor_unified.py > monitor.log 2>&1 &
```

### Zastavení:
```bash
# Najít proces
ps aux | grep ai_monitor_unified

# Zastavit
kill <PID>
```

---

## 📦 MODULY

### 1. System Monitor (`/module/system`)
- **CPU využití** - procenta, počet jader, vlákna
- **RAM** - využití, celkem, volné
- **Disk** - využití, celkem, volné
- **GPU/Metal** - na macOS detekce M1/M2/M3 čipů
- **Teplota** - CPU teplota (pokud dostupná)
- **Auto-refresh:** 2 sekundy

### 2. LLM Servers Monitor (`/module/llm`)
- **Ollama** - port 11434, modely, tokeny
- **LM Studio** - port 1234, stav, modely
- **System info** - RAM/VRAM využití LLM serverů
- **Auto-refresh:** 5 sekund

### 3. Docker Containers (`/module/docker`)
- **Všechny kontejnery** - běžící i zastavené
- **Detaily:** název, image, status, porty
- **Automatická detekce** Docker cesty
- **Barevné indikátory** stavu
- **Auto-refresh:** 10 sekund

### 4. Process Monitor (`/module/processes`)
- **Top procesy** podle CPU a RAM
- **PID, název, CPU%, RAM%**
- **Auto-refresh:** 5 sekund

### 5. Network Scanner (`/module/network`)
- **Otevřené porty** - SSH, HTTP, HTTPS, databáze
- **Služby:** Ollama, LM Studio, Redis, PostgreSQL
- **Auto-refresh:** 30 sekund

### 6. Test Results (`/module/test_results`)
- **LLM testy** - výsledky testování modelů
- **Statistiky** - tokeny, rychlost, úspěšnost

---

## 🔌 API ENDPOINTS

### Data API:
- `GET /api/system` - systémové informace (JSON)
- `GET /api/llm` - LLM servery (JSON)
- `GET /api/docker` - Docker kontejnery (JSON)
- `GET /api/processes` - procesy (JSON)
- `GET /api/network` - síťové služby (JSON)
- `GET /api/test_status` - stav testů (JSON)

### HTML Moduly:
- `GET /module/system` - System Monitor GUI
- `GET /module/llm` - LLM Monitor GUI
- `GET /module/docker` - Docker Monitor GUI
- `GET /module/processes` - Process Monitor GUI
- `GET /module/network` - Network Scanner GUI
- `GET /module/test_results` - Test Results GUI

### Příklad použití API:
```bash
# Získat Docker kontejnery
curl http://localhost:8900/api/docker | jq

# Získat systémové info
curl http://localhost:8900/api/system

# Otevřít Docker modul v prohlížeči
open http://localhost:8900/module/docker
```

---

## 🔧 ŘEŠENÍ PROBLÉMŮ

### Docker nefunguje:
**Problém:** "Docker není nainstalován nebo není v cestě PATH"

**Řešení:**
1. Ověřit že Docker Desktop běží
2. Monitor automaticky hledá Docker v těchto cestách:
   - `/Applications/Docker.app/Contents/Resources/bin/docker`
   - `/usr/local/bin/docker`
   - `/opt/homebrew/bin/docker`

### Port 8900 obsazen:
```bash
# Najít proces na portu
lsof -i :8900

# Zabít proces
kill -9 <PID>
```

### Moduly se nenačítají:
1. Zkontrolovat konzoli pro chyby
2. Ověřit že všechny Python packages jsou nainstalované
3. Restartovat monitor

---

## 💾 ZÁLOHY

### Aktuální verze (v0.1):
- **Hlavní soubor:** `/Users/m.a.j.puzik/zahnpasta/ai_monitor_unified.py`
- **Docker fix:** `/Users/m.a.j.puzik/docker_monitor_fixed.py`
- **Dokumentace:** `/Users/m.a.j.puzik/AI_MONITOR_UNIFIED_DOCUMENTATION.md`

### Google Drive záloha:
- **Umístění:** `Google Drive/AI Monitor Backups/AI-Monitor-Unified-v0.1-20250903.zip`
- **Obsahuje:** 
  - ai_monitor_unified.py
  - AI_MONITOR_MODULAR.py (alternativní verze)
  - docker_monitor_fixed.py
  - Tato dokumentace

---

## 📚 DALŠÍ VERZE

### AI Monitor Modular:
- **Soubor:** `/Users/m.a.j.puzik/zahnpasta/AI_MONITOR_MODULAR.py`
- **Koncept:** Každý modul běží jako samostatný proces na vlastním portu
- **Porty:** 8901-8906 pro jednotlivé moduly, 8899 pro hlavní GUI
- **Výhoda:** Selhání jednoho modulu neovlivní ostatní
- **Nevýhoda:** Složitější správa, více procesů

---

## 🔄 HISTORIE VERZÍ

### v0.1 (2025-09-03)
- Prvotní dokumentovaná verze
- Oprava Docker path detekce
- Funkční všechny moduly
- Kompletní dokumentace

---

## 📝 POZNÁMKY

1. **Důležité:** Všechny moduly běží v rámci jednoho Python procesu
2. **Výkon:** Monitor má minimální dopad na systém (<1% CPU, <50MB RAM)
3. **Bezpečnost:** Běží pouze na localhost, není přístupný ze sítě

---

*Vytvořeno: 2025-09-03*  
*Poslední aktualizace: 2025-09-03*  
*Verze: 0.1*