# 📚 PŘEHLED SKRIPTŮ A NÁSTROJŮ - INVENTÁŘ
**Datum vytvoření:** 2025-08-27  
**Autor:** Claude Code Assistant  
**Umístění:** /Users/m.a.j.puzik

---

## 📊 SOUHRN
Kompletní inventář nalezených skriptů, nástrojů a automatizací v systému m.a.j.puzik včetně záloh na Google Drive.

### 🏆 TOP VÝKONNOSTNÍ NÁSTROJE:
- **Ultimate Document Detector** - 94% přesnost, 172,894 dokumentů v databázi
- **AI Monitor Unified** - 102KB, kompletní monitoring všech AI systémů
- **Commands Logic** - 235KB, komplexní NLP pro Loxone
- **Quick Start Energy** - 74KB, kompletní energy management
- **Mass Document Processor** - 72KB, hromadné zpracování
- **AI Monitor Modular** - 67KB, modulární monitoring systém

### 📈 STATISTIKY SYSTÉMU:
- **Celkem skriptů:** 1,930+ (.sh a .py soubory)
- **Testovacích skriptů:** 197+ test_*.py souborů
- **Záložních složek:** 20+ backup adresářů
- **Google Drive zálohy:** 15+ kategorií záloh

---

## 🔋 1. SOLAX FVE MANAGEMENT

### 🎯 Battery & Power Management
**Hlavní skripty:**
- `battery_manager_live.py` - Živé řízení baterie SOLAX
  - **Funkce:** Real-time monitoring a řízení nabíjení/vybíjení
  - **Metody:** API komunikace, prediktivní algoritmy
  - **Umístění:** `/Users/m.a.j.puzik/battery_manager_live.py`
  
- `solax_advanced_monitor.py` - Pokročilý monitoring
  - **Funkce:** Komplexní monitoring všech parametrů FVE
  - **Metody:** Cloud API, lokální Modbus, vizualizace
  - **Umístění:** `/Users/m.a.j.puzik/solax_advanced_monitor.py`

- `solax_ha_auto_control.py` - Automatické řízení přes HA
  - **Funkce:** Integrace s Home Assistant pro automatizace
  - **Metody:** HA API, MQTT, automatické scénáře
  - **Umístění:** `/Users/m.a.j.puzik/solax_ha_auto_control.py`

**Zálohy na Google Drive:**
- `/Můj disk/SOLAX Monitor Backups/SOLAX-Monitor-Final-20250814-071835.zip`
- `/Můj disk/Solax Dual Access Backups/`
- `/Můj disk/SOLAX Backups/`

### 📈 OTE Price Integration
- `fetch_ote_prices.py` - Stahování aktuálních cen elektřiny
- `fve_ote_control_demo.py` - Demo řízení podle cen OTE
- `ote_monitor.py` - Kontinuální monitoring cen

---

## 🏠 2. LOXONE SMART HOME

### 🎛️ Core Control Systems
**Hlavní adresář:** `/Users/m.a.j.puzik/loxone-ai/`

- `loxone_direct_api.py` - Přímé API pro Loxone Miniserver
  - **Funkce:** Kompletní ovládání všech zařízení
  - **Metody:** WebSocket, REST API, UDP discovery
  - **Verze:** 70KB - nejkomplexnější implementace

- `loxone_realtime_data.py` - Real-time data streaming
  - **Funkce:** Živá data ze všech senzorů
  - **Metody:** WebSocket streaming, event handling

- `commands_logic.py` - Hlavní příkazová logika (235KB!)
  - **Funkce:** Zpracování hlasových a textových příkazů
  - **Metody:** NLP, fuzzy matching, kontextové vyhodnocení

### 🎙️ Voice Control & AI
- `ha_loxone_app.py` - Webová aplikace pro hlasové ovládání
- `audio_enhancement.js` - Vylepšení zvuku pro rozpoznávání
- `test_ollama_interface.py` - Integrace s Ollama AI

**Zálohy na Google Drive:**
- `/Můj disk/Loxone AI Backups/Loxone-AI-COMPLETE-backup-20250808-090712.zip`
- `/Můj disk/Loxone AI Backups/PORT-8080-PROBLEM-DOCUMENTATION.md`
- `/Můj disk/Loxone AI Backups/SYSTEM-COMPLETE-DOCUMENTATION.md`

---

## 📄 3. PAPERLESS-NGX DOCUMENT MANAGEMENT

### 🎯 ULTIMATE DOCUMENT DETECTOR - NEJVÝKONNĚJŠÍ NÁSTROJ
- `ultimate_document_detector.py` - **94% PŘESNOST!** (791 řádků)
  - **Funkce:** Maximální přesnost rozpoznávání dokumentů
  - **Výkon:** 47/50 souborů správně, 4.3 minuty na 50 souborů
  - **Databáze:** 172,894 souborů, 11 kategorií + 22 podtypů
  - **Metody:** EasyOCR, Tesseract, Transformers ML modely
  - **Použití:** `python3 /Users/m.a.j.puzik/ultimate_document_detector.py`
  - **Verze:** 
    - v2: `/Users/m.a.j.puzik/ultimate_document_detector_v2.py` (899 řádků)
    - Záloha: `/AI-Document-Classification-COMPLETE-backup-20250824-200531/`

### 📥 Import & Processing
**Hlavní adresář:** `/Users/m.a.j.puzik/paperless-docker-services/`

- `gmail_paperless_final.py` - Gmail to Paperless import (34KB)
  - **Funkce:** Import emailů a příloh do Paperless
  - **Metody:** IMAP, OAuth2, automatické tagování
  
- `gmail_to_majconvert_adobe.py` - Adobe PDF konverze
  - **Funkce:** Konverze emailů na PDF pomocí Adobe
  - **Metody:** AppleScript, Adobe Acrobat automation

### 🏷️ Classification & Tagging
- `COMPLETE_AI_DOCUMENT_PROCESSOR.py` - AI klasifikace dokumentů
  - **Funkce:** Automatické rozpoznávání typů dokumentů
  - **Metody:** ML modely, pattern matching, OCR

- `comprehensive_document_detector.py` - Komplexní detektor
- `bank_statement_detector.py` - Detekce bankovních výpisů
- `bank_statement_detector_v2.py` - Vylepšená verze (522 řádků)
- `invoice_detector_enhanced.py` - Rozpoznávání faktur
- `receipt_detector_strict.py` - Detekce účtenek (636 řádků)
- `official_document_detector.py` - Detekce úředních dokumentů

**Zálohy na Google Drive:**
- `/Můj disk/Paperless Backups/paperless-backup-20250808-195633-gmail-token-ok.zip`
- `/Můj disk/AI Document Classification Backups/`

### 📊 Specializované Detektory
**Další důležité detektory s vysokou přesností:**

- `subscription_detector.py` - Detekce předplatného (510 řádků)
- `car_advertisement_detector.py` - Auto inzeráty (12KB)
- `newsletter_alert_detector.py` - Newsletter detekce
- `luxury_brand_detector.py` - Luxusní značky
- `medical_appointment_detector.py` - Lékařské termíny
- `nas_backup_detector.py` - NAS zálohy
- `product_update_detector.py` - Produktové updaty
- `austrian_invoice_detector.py` - Rakouské faktury
- `german_invoice_detector.py` - Německé faktury
- `chinese_invoice_detector.py` - Čínské faktury
- `czech_invoice_detector.py` - České faktury

### 🔧 Maintenance Scripts
**Umístění:** `/Users/m.a.j.puzik/paperless-docker-services/scripts/`

- `combined_preprocessor.sh` - Preprocessing dokumentů (4KB)
- `post_consume_full.sh` - Post-processing po nahrání (5.6KB)
- `setup_paperless_ml.sh` - Nastavení ML modelů (11KB)
- `setup_accounting_detection.sh` - Nastavení účetní detekce (7.4KB)
- `setup_ad_detection.sh` - Detekce reklam (2.4KB)

---

## 🤖 4. N8N WORKFLOW AUTOMATION

### 📊 Document Workflows
- `n8n_document_processor.py` - Zpracování dokumentů
- `n8n_advanced_document_classifier.json` - Pokročilá klasifikace
- `mass_document_processor.py` - Hromadné zpracování (72KB!)

**Docker compose:**
- `docker-compose.n8n-test.yml` - N8N testovací prostředí

---

## 🎫 5. TICKET & SUPPORT SYSTEMS

### 💬 Chat Systems
**Hlavní adresář:** `/Users/m.a.j.puzik/ticket_chat_android/`

- `main.py` - Hlavní aplikace (25KB)
- `build_android.sh` - Build pro Android
- `test_app_features.py` - Testování funkcí

**Zálohy na Google Drive:**
- `/Můj disk/Ticket Chat Enhanced Backups/`

---

## 🔍 6. MONITORING & DIAGNOSTICS

### 🤖 AI MONITOR MODULAR - Komplexní monitoring systém
**Hlavní adresář:** `/Users/m.a.j.puzik/zahnpasta/`

- `AI_MONITOR_MODULAR.py` - **HLAVNÍ MODUL (67KB!)**
  - **Funkce:** Kompletní monitoring všech AI systémů
  - **Metody:** Multiprocessing, real-time dashboards
  - **Komponenty:** LLM Scanner, Docker Monitor, Network Scanner
  
- `ai_monitor_unified.py` - Unifikovaná verze (102KB)
- `ai_monitor_intelligent.py` - Inteligentní monitoring
- `AI_MONITOR_KOMPLETNI.py` - Kompletní verze (33KB)

### 📈 System Monitoring
- `ultra_monitor.py` - Ultra výkonný monitor
- `continuous_paperless_monitor.py` - Nepřetržitý Paperless monitor
- `smart_paperless_monitor.py` - Chytrý monitor dokumentů
- `docker_stability_fix.sh` - Stabilizace Docker kontejnerů
- `orbstack_crash_analysis.sh` - Analýza pádů OrbStack
- `memory_monitor.sh` - Monitoring paměti

### 🔧 Troubleshooting & Fixes
- `fix_paperless_preprocessor.sh` - Opravy Paperless (5KB)
- `fix_tika_gotenberg_complete.sh` - Oprava OCR služeb (5KB)
- `KILL_MDNS_AND_MONITOR.sh` - Řešení síťových problémů (4KB)
- `apply_all_fixes.sh` - Aplikace všech oprav
- `final_celery_solution.sh` - Finální řešení Celery
- `emergency_restart.sh` - Nouzový restart

---

## 🔄 7. BACKUP & MIGRATION

### 💾 Backup Scripts
- `kompletni-zaloha-nas.sh` - Kompletní záloha na NAS
- `kopiruj-vse-na-nas.sh` - Kopírování na Synology

### 🚀 Migration Tools
**Synology migration:** `/Users/m.a.j.puzik/synology-migration-20250810/`
- `migrate_to_synology.sh` - Hlavní migrační skript
- `synology_ssh_fixed.sh` - SSH připojení k Synology
- `copy_ha_config.sh` - Kopírování HA konfigurace

---

## 🏪 8. HOME ASSISTANT INTEGRATIONS

### 🏠 Core Configs
**Hlavní adresář:** `/Users/m.a.j.puzik/homeassistant/`

- `setup_pyloxone_integration.sh` - Integrace Loxone
- `install_czech_energy_prices.sh` - České ceny energie
- `create_loxone_dashboard.sh` - Dashboard pro Loxone

**Zálohy na Google Drive:**
- `/Můj disk/Home Assistant Backups/HA-Loxone-FINAL-backup-20250804-234336.zip`
- `/Můj disk/Home Assistant Backups/HA-OTE-Integration-backup-20250806-195910.zip`

---

## 📱 9. SPECIAL APPLICATIONS

### 🏦 Financial Tools
- `Prehled_plateb.py` - Přehled plateb a párování
- `payment_matcher.py` - Párování plateb s fakturami
- `bank_statement_matcher.py` - Párování bankovních výpisů

### 🚗 Special Detectors
- `car_advertisement_detector.py` - Detekce auto inzerátů (12KB)
- `newsletter_alert_detector.py` - Detekce newsletterů
- `luxury_brand_detector.py` - Detekce luxusních značek

---

## 🧠 10. AI & ML TOOLS

### 🤖 LLM & Model Management
- `start_litellm_production.sh` - Produkční LiteLLM server (3KB)
- `start_litellm_final.sh` - Finální konfigurace LiteLLM (4KB)
- `test_n8n_ollama.sh` - Testování Ollama integrace
- `test_n8n_mistral.sh` - Mistral model testing
- `diagnose_ollama.sh` - Diagnostika Ollama
- `monitor_qwen.sh` - Monitoring Qwen modelu
- `run_whisper_server.sh` - Whisper STT server

### 🔋 Battery & Energy Optimizer
**Hlavní adresář:** `/Users/m.a.j.puzik/battery-optimizer/`

- `battery_optimizer_live.py` - Živá optimalizace baterie (19KB)
- `battery_price_optimizer.py` - Optimalizace podle cen
- `ote_spot_prices.py` - Aktuální spot ceny OTE
- `analyze_electricity_invoice.py` - Analýza faktur

**Energy Manager App:** `/Users/m.a.j.puzik/energy-manager-app/`
- `quick_start_enhanced.py` - Vylepšený quick start (53KB)
- `quick_start.py` - Hlavní aplikace (74KB!)

---

## 📦 11. UTILITIES & HELPERS

### 🔨 Conversion Tools
- `convert_to_pdf.py` - Univerzální PDF konverze
- `pdf_converter_adobe.js` - Adobe PDF konverze (16KB)
- `eml_to_pdf_converter.py` - Konverze emailů
- `gmail2pdf.py` - Gmail to PDF konvertor

### 🔧 System Tools
- `auto_scan_ocr.sh` - Automatické OCR skenování
- `scan_now.sh` - Okamžité skenování
- `quick_mic_test.sh` - Test mikrofonu
- `get_ha_token.py` - Získání HA tokenu

### 🧪 Testing Tools (197 testovacích skriptů!)
- `test_*.py` - Více než 197 různých test skriptů
- `test_classifier_server.py` - Test klasifikačního serveru
- `test_improved_classifier.py` - Test vylepšeného klasifikátoru

---

## 💡 DŮLEŽITÉ POZNÁMKY

### 🔐 Přístupové údaje
- Většina skriptů používá `.env` soubory pro credentials
- Token pro Paperless: Uložen v `/data/auth_token.txt`
- HA token: V `.env` souborech jednotlivých projektů

### 🐳 Docker Dependencies
- Paperless-NGX běží v Docker kontejnerech
- N8N workflow engine v separátním compose
- Home Assistant v Docker s vlastní konfigurací

### 📊 Největší projekty
1. **commands_logic.py** - 235KB (Loxone AI logika)
2. **ai_monitor_unified.py** - 102KB (Unifikovaný AI monitor)
3. **quick_start.py** - 74KB (Energy Manager aplikace)
4. **mass_document_processor.py** - 72KB (N8N processor)
5. **loxone_direct_api.py** - 70KB (Loxone API)
6. **AI_MONITOR_MODULAR.py** - 67KB (Modulární monitor)

### 🔄 Nejčastěji aktualizované
- Battery management skripty (denní úpravy)
- Paperless import skripty (týdenní vylepšení)
- Loxone AI voice control (průběžný vývoj)

---

## 📍 RYCHLÉ ODKAZY

### Lokální umístění:
- **Hlavní adresář:** `/Users/m.a.j.puzik/`
- **Loxone AI:** `/Users/m.a.j.puzik/loxone-ai/`
- **Paperless:** `/Users/m.a.j.puzik/paperless-docker-services/`
- **Home Assistant:** `/Users/m.a.j.puzik/homeassistant/`

### Google Drive zálohy:
- **Cesta:** `/Library/CloudStorage/GoogleDrive-majpuzik@gmail.com/Můj disk/`
- **Hlavní složky:** 
  - `Loxone AI Backups/`
  - `Paperless Backups/`
  - `Home Assistant Backups/`
  - `SOLAX Monitor Backups/`

---

## 🚀 QUICK START PŘÍKAZY

```bash
# Spuštění Loxone AI
cd /Users/m.a.j.puzik/loxone-ai && python3 ha_loxone_app.py

# Monitoring SOLAX
python3 /Users/m.a.j.puzik/solax_advanced_monitor.py

# Import Gmail do Paperless
python3 /Users/m.a.j.puzik/gmail_paperless_final.py

# Backup na NAS
/Users/m.a.j.puzik/kompletni-zaloha-nas.sh
```

---

**Dokument vytvořen automaticky na základě analýzy systému**  
*Poslední aktualizace: 2025-08-27*