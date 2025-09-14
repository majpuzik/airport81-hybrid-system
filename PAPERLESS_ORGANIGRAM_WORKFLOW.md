# 📊 PAPERLESS NGX - ORGANIGRAM & WORKFLOW
**Verze:** 3.0  
**Datum:** 2025-09-02  
**Port:** 8060 (VŽDY!)  
**Token:** 0cdab8a7c375f3f8bf7770369b129a5f98f32467

---

## 🏗️ SYSTÉMOVÁ ARCHITEKTURA - ORGANIGRAM

```
┌─────────────────────────────────────────────────────────────┐
│                     PAPERLESS NGX SYSTÉM                     │
│                      [PORT 8060 ONLY!]                       │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   DOCKER     │     │   DATABASE   │     │     API      │
│  CONTAINERS  │     │  PostgreSQL  │     │   REST API   │
├──────────────┤     ├──────────────┤     ├──────────────┤
│paperless-ngx │◄───►│paperless DB  │◄───►│ Port: 8060   │
│   -8060      │     │              │     │Token:0cdab.. │
├──────────────┤     ├──────────────┤     ├──────────────┤
│ paperless-   │     │ documents_   │     │ /api/docs    │
│ postgres-new │     │ document     │     │ /api/corr    │
├──────────────┤     │ documents_   │     │ /api/tags    │
│ paperless-   │     │ correspondent│     │ /api/upload  │
│ redis-new    │     │ documents_tag│     └──────────────┘
└──────────────┘     └──────────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              ▼
                   ┌──────────────────┐
                   │  CONSUME FOLDER  │
                   │/usr/src/paperless│
                   │    /consume/     │
                   └──────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   DETECTORS  │     │  PROCESSORS  │     │   TAGGERS    │
├──────────────┤     ├──────────────┤     ├──────────────┤
│ V7 FIXED     │     │Extract Text  │     │ Auto Tags    │
│ - Content    │     │ - pdftotext  │     │ - Časové     │
│ - IČO DB     │     │ - OCR        │     │ - Kategorie  │
│ - Date       │     ├──────────────┤     │ - Metadata   │
├──────────────┤     │Detect Type   │     ├──────────────┤
│ Bank Stmt    │     │ - Invoice    │     │ Tag Colors   │
│ Invoice      │     │ - Proforma   │     │ - Zelená     │
│ Police Docs  │     │ - Statement  │     │ - Oranžová   │
│ Receipts     │     │ - Contract   │     │ - Modrá      │
└──────────────┘     └──────────────┘     └──────────────┘
```

---

## 🔄 WORKFLOW ZPRACOVÁNÍ DOKUMENTŮ

```mermaid
graph TD
    Start([📁 VSTUP: PDF/Email/Scan]) --> Extract[📖 Extrakce textu<br/>pdftotext -l 10]
    
    Extract --> HasText{Text > 0?}
    HasText -->|ANO| ContentAnalysis[🔍 Analýza obsahu]
    HasText -->|NE| FilenameAnalysis[📄 Analýza názvu]
    
    ContentAnalysis --> ICOCheck[🏢 Kontrola IČO<br/>databáze 20+ firem]
    ICOCheck --> FoundICO{IČO nalezeno?}
    FoundICO -->|ANO| SetCorrespondent[✅ Korespondent z IČO]
    FoundICO -->|NE| TextPatterns[🔎 Hledání vzorů<br/>v textu]
    
    TextPatterns --> DetectType[📋 Detekce typu]
    FilenameAnalysis --> DetectType
    SetCorrespondent --> DetectType
    
    DetectType --> ProformaCheck{Je to PROFORMA?}
    ProformaCheck -->|ANO| TagProforma[🏷️ TAG: Proforma<br/>🟠 Oranžová]
    ProformaCheck -->|NE| InvoiceCheck{Má náležitosti<br/>faktury?}
    
    InvoiceCheck -->|ANO 7/7| TagInvoice[🏷️ TAG: Faktura<br/>🟢 Zelená]
    InvoiceCheck -->|NE <5/7| TagUnknown[🏷️ TAG: Nejasné<br/>⚫ Šedá]
    
    TagProforma --> ExtractDate[📅 Extrakce data]
    TagInvoice --> ExtractDate
    TagUnknown --> ExtractDate
    
    ExtractDate --> Upload[📤 Upload do Paperless<br/>Port 8060]
    Upload --> Consume[📦 Consume folder<br/>Docker cp]
    
    Consume --> Process[⚙️ Paperless zpracování]
    Process --> AssignMeta[🔗 Přiřazení metadat]
    
    AssignMeta --> CreateTags[🏷️ Vytvoření tagů<br/>- Rok/Měsíc/Kvartál<br/>- Kategorie<br/>- Typ dokumentu]
    
    CreateTags --> Done([✅ HOTOVO<br/>Dokument v DB])
```

---

## 📋 VERZE DETEKTORŮ - EVOLUCE

| Verze | Název | Klíčové funkce | Úspěšnost | Status |
|-------|-------|---------------|-----------|---------|
| **V1** | Basic | Základní detekce z názvu | 40% | ❌ Zastaralý |
| **V2** | Enhanced | + Regex patterns | 55% | ❌ Zastaralý |
| **V3** | API | + API upload | 60% | ❌ Problém s API |
| **V4** | Fixed | + Ověření zpracování | 70% | ⚠️ Funkční |
| **V5** | Final | + Consume folder | 80% | ✅ Dobrý |
| **V6** | Enhanced | + AI (Ollama), Config | 85% | ✅ Vylepšený |
| **V7** | FIXED | + Content detection, IČO DB | **89%** | ✅ **PRODUKČNÍ** |

---

## 🚀 HLAVNÍ SKRIPTY

### 1. **ultimate_document_detector_v7_FIXED.py** [HLAVNÍ]
```python
# Detekce z OBSAHU dokumentů
# IČO databáze (20+ firem)
# Port 8060 ONLY!
# Token: 0cdab8a7c375f3f8bf7770369b129a5f98f32467
```

### 2. **assign_correspondents_8060.py**
```python
# Přiřazení korespondentů
# 9 firem rozpoznáno
# ČSOB, Alza, Havas, atd.
```

### 3. **assign_tags_8060.py**
```python
# Automatické tagování
# Barevné kódování
# Časové tagy (rok/měsíc/kvartál)
```

### 4. **paperless_config.py**
```python
# Centrální konfigurace
# Port 8060
# Docker paths
# IČO databáze
```

---

## 📊 WORKFLOW PROCESŮ

### 🔵 HLAVNÍ PROCES
```
1. SKENOVÁNÍ SLOŽKY
   └─> Najít všechny PDF
   
2. EXTRAKCE TEXTU
   └─> pdftotext -l 10 (10 stran max)
   
3. ANALÝZA OBSAHU
   ├─> IČO databáze (priorita 1)
   ├─> Text patterns (priorita 2)
   └─> Filename fallback (priorita 3)
   
4. DETEKCE TYPU
   ├─> Proforma check (NEJVYŠŠÍ PRIORITA!)
   ├─> Invoice requirements (7 kritérií)
   └─> Document patterns
   
5. UPLOAD
   └─> Docker cp do consume folder
   
6. ZPRACOVÁNÍ
   └─> Paperless consumer
   
7. METADATA
   ├─> Korespondenti
   ├─> Tagy
   └─> Datum
```

### 🟢 ÚSPĚŠNOST DETEKCE
```
MBW Složka (65 dokumentů):
├─> 58/65 korespondentů (89%)
├─> 50/65 datumů (77%)
└─> 65/65 typů (100%)

Korespondenti:
├─> ČSOB: 25 dokumentů
├─> Alza: 19 dokumentů
├─> MBW: 8 dokumentů
└─> Ostatní: 6 dokumentů
```

---

## 🎯 PŘÍKAZY PRO POUŽITÍ

### Základní operace:
```bash
# Analýza složky (bez uploadu)
python3 ultimate_document_detector_v7_FIXED.py

# Analýza + Upload
python3 ultimate_document_detector_v7_FIXED.py --upload

# Přiřazení korespondentů
python3 assign_correspondents_8060.py

# Přiřazení tagů
python3 assign_tags_8060.py
```

### Docker operace:
```bash
# Kontrola kontejnerů
docker ps | grep paperless

# Restart Paperless
docker restart paperless-ngx-8060

# Kontrola consume složky
docker exec paperless-ngx-8060 ls /usr/src/paperless/consume/

# Databázové dotazy
docker exec paperless-postgres-new psql -U paperless -d paperless -c "SELECT COUNT(*) FROM documents_document;"
```

### API operace:
```bash
# Získat dokumenty
curl -H "Authorization: Token 0cdab8a7c375f3f8bf7770369b129a5f98f32467" \
  http://localhost:8060/api/documents/

# Získat korespondenty
curl -H "Authorization: Token 0cdab8a7c375f3f8bf7770369b129a5f98f32467" \
  http://localhost:8060/api/correspondents/

# Získat tagy
curl -H "Authorization: Token 0cdab8a7c375f3f8bf7770369b129a5f98f32467" \
  http://localhost:8060/api/tags/
```

---

## 🔐 PŘÍSTUPOVÉ ÚDAJE

| Parametr | Hodnota |
|----------|---------|
| **URL** | http://localhost:8060 |
| **API Token** | 0cdab8a7c375f3f8bf7770369b129a5f98f32467 |
| **Uživatel** | admin |
| **Heslo** | admin123 |
| **Container** | paperless-ngx-8060 |
| **Database** | paperless-postgres-new |

---

## 📈 METRIKY SYSTÉMU

- **Dokumenty v DB:** 35+ (rostoucí)
- **Korespondenti:** 9 firem
- **Tagy:** 183+ tagů
- **Úspěšnost detekce:** 89%
- **Rychlost zpracování:** ~1 dok/2 min
- **Consume queue:** 41 čekajících

---

## 🚨 DŮLEŽITÉ POZNÁMKY

1. **VŽDY POUŽÍVAT PORT 8060** - nikdy jiný!
2. **Proforma NENÍ faktura** - vždy kontrolovat první
3. **IČO databáze** má prioritu před text patterns
4. **Consume folder** je spolehlivější než API upload
5. **Token se může měnit** - vždy ověřit aktuální

---

## 📚 DOKUMENTACE

- [CLAUDE.md](./CLAUDE.md) - Hlavní paměť systému
- [paperless_config.py](./paperless_config.py) - Konfigurace
- [V7 FIXED](./ultimate_document_detector_v7_FIXED.py) - Produkční detektor

---

*Vytvořeno: 2025-09-02 | Autor: Claude Code Assistant*