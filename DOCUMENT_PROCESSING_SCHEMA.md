# 📊 BLOKOVÉ SCHÉMA ZPRACOVÁNÍ DOKUMENTŮ
## Kompletní workflow podle CLAUDE.md pravidel

```mermaid
graph TD
    Start([🚀 START: PDF Dokument]) --> FileCheck{Existuje soubor?}
    
    FileCheck -->|NE| Error1[❌ Chyba: Soubor neexistuje]
    FileCheck -->|ANO| Stage1[📁 STAGE 1: FILENAME ANALYSIS]
    
    %% STAGE 1: Filename Analysis
    Stage1 --> FilenameParse[Parsování názvu souboru]
    FilenameParse --> FilenameScore[Bodování podle klíčových slov]
    
    FilenameScore --> FilenameChecks{Kontrola názvů}
    FilenameChecks --> FakturaCheck[/'faktura'/ +30 bodů]
    FilenameChecks --> VypisCheck[/'vypis'/ +30 bodů]  
    FilenameChecks --> SmlouvaCheck[/'smlouva'/ +30 bodů]
    FilenameChecks --> CompanyCheck[Detekce společnosti z názvu]
    
    CompanyCheck --> Stage2[📄 STAGE 2: TEXT EXTRACTION]
    
    %% STAGE 2: Text Extraction
    Stage2 --> MCPCheck{MCP Server dostupný?}
    
    MCPCheck -->|ANO| MCPPath[🔧 MCP Server Path]
    MCPCheck -->|NE| LocalPath[🖥️ Local Path]
    
    %% MCP Path
    MCPPath --> AnyParser[AnyParser API]
    AnyParser -->|Úspěch| AnyParserExtract[Strukturovaná data<br/>invoice_number<br/>vendor<br/>amount<br/>vat]
    AnyParser -->|Selhání| PDFco[PDF.co API]
    
    PDFco -->|Úspěch| PDFcoExtract[Text prvních 5 stránek]
    PDFco -->|Selhání| LocalFallback[pdftotext lokálně]
    
    %% Local Path
    LocalPath --> LocalFallback
    LocalFallback --> TextCheck{Text > 50 znaků?}
    
    TextCheck -->|NE| OCRDecision{Text < 500 znaků?}
    TextCheck -->|ANO| Stage3[🔍 STAGE 3: PATTERN MATCHING]
    
    OCRDecision -->|ANO| OCRProcess[OCR Processing<br/>Tesseract]
    OCRDecision -->|NE| Error2[❌ Nedostatek textu]
    
    OCRProcess --> Stage3
    
    %% STAGE 3: Pattern Matching
    Stage3 --> CzechInvoice[🇨🇿 Detekce české faktury]
    
    CzechInvoice --> InvoiceReq[12 povinných náležitostí]
    InvoiceReq --> Req1[1. 'Faktura' +30b]
    InvoiceReq --> Req2[2. IČO 8 číslic +25b]
    InvoiceReq --> Req3[3. DIČ CZ+8-10 +25b]
    InvoiceReq --> Req4[4. Datum vystavení +15b]
    InvoiceReq --> Req5[5. DUZP +15b]
    InvoiceReq --> Req6[6. Číslo faktury +20b]
    InvoiceReq --> Req7[7. Dodavatel +15b]
    InvoiceReq --> Req8[10. DPH +20b]
    InvoiceReq --> Req9[12. Celková částka +15b]
    
    Req9 --> ScoreCalc[Výpočet skóre]
    ScoreCalc --> InvoiceDecision{Skóre >= 80?}
    
    InvoiceDecision -->|ANO| SetInvoice[type: czech_invoice<br/>category: invoices]
    InvoiceDecision -->|NE| OtherPatterns[Další vzory]
    
    %% Other Patterns
    OtherPatterns --> BankPattern[Bankovní výpis]
    BankPattern --> BankScore[výpis/statement +25b<br/>IBAN +20b<br/>zůstatek +25b]
    BankScore --> BankDecision{Skóre >= 50?}
    BankDecision -->|ANO| SetBank[type: bank_statement<br/>category: banking]
    BankDecision -->|NE| ContractPattern[Smlouva]
    
    ContractPattern --> ContractScore[smlouva/contract +30b<br/>smluvní strany +25b]
    ContractScore --> ContractDecision{Skóre >= 50?}
    ContractDecision -->|ANO| SetContract[type: contract<br/>category: contracts]
    ContractDecision -->|NE| MLClassification{Confidence < 70?}
    
    %% ML Classification
    MLClassification -->|ANO| Stage4ML[🤖 STAGE 4: ML CLASSIFICATION]
    MLClassification -->|NE| Stage5[🏢 STAGE 5: CORRESPONDENT]
    
    Stage4ML --> BARTModel[BART Model]
    BARTModel --> MLScore[ML Confidence Score]
    MLScore --> MLBoost[+50 × confidence bodů]
    MLBoost --> Stage5
    
    SetInvoice --> Stage5
    SetBank --> Stage5
    SetContract --> Stage5
    
    %% STAGE 5: Correspondent Detection
    Stage5 --> CorrespondentDetect[Detekce korespondenta]
    
    CorrespondentDetect --> EmailExtract[Extrakce z emailu]
    EmailExtract --> DomainMap[Mapování domén]
    
    DomainMap --> DomainList[80+ domén → correspondent]
    DomainList --> CSB[csob.cz → ČSOB]
    DomainList --> MBW[mbw.cz → Media Bohemia World]
    DomainList --> ALZ[alza.cz → Alza]
    
    ALZ --> ICOExtract[Extrakce IČO]
    ICOExtract --> ICODatabase[IČO databáze]
    ICODatabase --> ICO1[26178370 → MBW]
    ICODatabase --> ICO2[27082440 → Alza]
    ICODatabase --> ICO3[00001350 → ČSOB]
    
    ICO3 --> Stage6[🏷️ STAGE 6: TAG GENERATION]
    
    %% STAGE 6: Tag Generation
    Stage6 --> TagGen[Generování tagů]
    
    TagGen --> Cat1[1. Kategorie tag<br/>16 kategorií]
    Cat1 --> CatMap[paperless-ngx-faktury<br/>paperless-ngx-bankovnictvi<br/>atd.]
    
    CatMap --> Corr2[2. Correspondent tag]
    Corr2 --> CorrTag[correspondent:ČSOB<br/>correspondent:MBW]
    
    CorrTag --> Type3[3. Typ dokumentu]
    Type3 --> TypeTag[type:invoice<br/>subtype:czech_invoice]
    
    TypeTag --> Meta4[4. Metadata]
    Meta4 --> ICOTag[ico:12345678]
    Meta4 --> DICTag[dic:CZ12345678]
    Meta4 --> VSTag[vs:987654321]
    Meta4 --> AmountTag[velka-faktura / mala-faktura]
    
    AmountTag --> Time5[5. Časové tagy]
    Time5 --> YearTag[2025, 2024]
    Time5 --> MonthTag[leden, unor, brezen]
    
    MonthTag --> Conf6[6. Confidence]
    Conf6 --> ConfTag[konfidence-95<br/>konfidence-80]
    
    ConfTag --> Source7[7. Zdroj]
    Source7 --> SourceTag[import-mbw-batch<br/>mcp-v4-processor]
    
    SourceTag --> Score8[8. Skóre]
    Score8 --> ScoreTag[score-125]
    
    ScoreTag --> Stage7[📤 STAGE 7: PAPERLESS UPLOAD]
    
    %% STAGE 7: Paperless Upload
    Stage7 --> CreateTags[Vytvoření tagů v Paperless]
    CreateTags --> TagColor[Přiřazení barev]
    
    TagColor --> ColorMap[Modrá: kategorie<br/>Zelená: correspondent<br/>Oranžová: typy<br/>Fialová: IČO/DIČ]
    
    ColorMap --> DocTitle[Vytvoření názvu dokumentu]
    DocTitle --> TitleGen[{Correspondent} - {Type} - {Original}]
    
    TitleGen --> APICall[Paperless API Call]
    APICall --> PostDoc[POST /api/documents/post_document/]
    
    PostDoc --> Headers[Headers: Token Auth]
    Headers --> Body[Body: PDF + Tags + Title]
    
    Body --> Response{HTTP 200/201?}
    Response -->|ANO| Success[✅ ÚSPĚCH]
    Response -->|NE| Failed[❌ SELHÁNÍ]
    
    Success --> Stats[Aktualizace statistik]
    Failed --> ErrorLog[Logování chyby]
    
    Stats --> End([🏁 KONEC])
    ErrorLog --> End
    Error1 --> End
    Error2 --> End

    %% Styling
    classDef stageStyle fill:#667eea,stroke:#333,stroke-width:3px,color:#fff
    classDef successStyle fill:#10b981,stroke:#333,stroke-width:2px,color:#fff
    classDef errorStyle fill:#ef4444,stroke:#333,stroke-width:2px,color:#fff
    classDef processStyle fill:#3b82f6,stroke:#333,stroke-width:2px,color:#fff
    classDef decisionStyle fill:#f59e0b,stroke:#333,stroke-width:2px,color:#fff
    
    class Stage1,Stage2,Stage3,Stage4ML,Stage5,Stage6,Stage7 stageStyle
    class Success,SetInvoice,SetBank,SetContract successStyle
    class Error1,Error2,Failed errorStyle
    class FilenameParse,AnyParser,PDFco,LocalFallback,OCRProcess,CzechInvoice,BARTModel,CorrespondentDetect,TagGen,CreateTags,APICall processStyle
    class FileCheck,MCPCheck,TextCheck,OCRDecision,InvoiceDecision,BankDecision,ContractDecision,MLClassification,Response decisionStyle
```

## 📋 DETAILNÍ POPIS KAŽDÉHO KROKU

### 🔹 **STAGE 1: FILENAME ANALYSIS** (+30 bodů max)
```python
# Rychlá analýza názvu souboru
filename_lower = filename.lower()
score = 0

# Klíčová slova v názvu
if 'faktura' in filename_lower or 'invoice' in filename_lower:
    score += 30
    predicted_type = 'invoice'
elif 'vypis' in filename_lower or 'statement' in filename_lower:
    score += 30
    predicted_type = 'bank_statement'
elif 'smlouva' in filename_lower or 'contract' in filename_lower:
    score += 30
    predicted_type = 'contract'

# Detekce společnosti
if 'mbw' in filename_lower:
    company = 'Media Bohemia World'
elif 'csob' in filename_lower:
    company = 'ČSOB'
elif 'alza' in filename_lower:
    company = 'Alza'
```

### 🔹 **STAGE 2: TEXT EXTRACTION**
```python
# Priorita extrakce
1. MCP Server → AnyParser API (strukturovaná data)
2. MCP Server → PDF.co API (text extraction)
3. Lokální pdftotext (fallback)
4. OCR pokud text < 500 znaků

# AnyParser vrací:
{
    'invoice_number': 'FAK2025001',
    'vendor': 'Media Bohemia World s.r.o.',
    'amount': 15000.00,
    'vat': 3150.00,
    'date': '2025-01-15',
    'items': [...]
}
```

### 🔹 **STAGE 3: PATTERN MATCHING** (bodovací systém)
```python
# České faktury - 12 povinných náležitostí
requirements = {
    'faktura_label': (+30, r'faktura|daňový\s+doklad'),
    'ico': (+25, r'IČO?\s*:\s*(\d{8})'),
    'dic': (+25, r'DIČ\s*:\s*(CZ\d{8,10})'),
    'issue_date': (+15, r'datum\s+vystavení'),
    'duzp': (+15, r'DUZP|datum\s+uskutečnění'),
    'invoice_number': (+20, r'číslo\s+faktury'),
    'supplier': (+15, r'dodavatel|supplier'),
    'vat': (+20, r'DPH|VAT'),
    'total_amount': (+15, r'celkem:\s*([\d\s]+)')
}

# Minimum pro českou fakturu: 80 bodů
if total_score >= 80:
    document_type = 'czech_invoice'
```

### 🔹 **STAGE 4: ML CLASSIFICATION** (pokud confidence < 70%)
```python
# BART model classification
if confidence < 70:
    ml_result = bart_model.classify(text)
    ml_confidence = ml_result['confidence']
    
    # Boost skóre podle ML
    score += 50 * ml_confidence
    
    if score >= 50:
        document_type = ml_result['type']
```

### 🔹 **STAGE 5: CORRESPONDENT DETECTION**
```python
# Hierarchie detekce
1. Email domain → correspondent mapping (80+ domén)
2. Text obsahuje název firmy
3. IČO → databáze firem
4. Filename obsahuje zkratku

domain_map = {
    'csob.cz': 'ČSOB',
    'kb.cz': 'Komerční banka',
    'mbw.cz': 'Media Bohemia World',
    'alza.cz': 'Alza',
    # ... 80+ mapování
}

ico_database = {
    '26178370': 'Media Bohemia World',
    '27082440': 'Alza.cz',
    '00001350': 'ČSOB'
}
```

### 🔹 **STAGE 6: TAG GENERATION**
```python
tags = []

# 1. Kategorie (povinná) - 16 možností
tags.append(CATEGORIES[document_category])  # paperless-ngx-faktury

# 2. Correspondent
if correspondent:
    tags.append(f'correspondent:{correspondent}')

# 3. Typ dokumentu
tags.append(f'type:{document_type}')
if subtype:
    tags.append(f'subtype:{subtype}')

# 4. Metadata z obsahu
if ico: tags.append(f'ico:{ico}')
if dic: tags.append(f'dic:{dic}')
if vs: tags.append(f'vs:{vs}')
if amount > 10000:
    tags.append('velka-faktura')
else:
    tags.append('mala-faktura')

# 5. Časové tagy
tags.append(str(year))  # 2025
tags.append(month_name)  # leden

# 6. Confidence
tags.append(f'konfidence-{confidence}')

# 7. Zdroj
tags.append('import-mbw-batch')
tags.append('mcp-v4-processor')

# 8. Skóre
tags.append(f'score-{total_score}')
```

### 🔹 **STAGE 7: PAPERLESS UPLOAD**
```python
# API volání
POST http://localhost:8050/api/documents/post_document/

Headers:
  Authorization: Token 24a855c09689e061afe7bd363dc5e02983fcba1b

Body:
  document: PDF file (binary)
  title: "ČSOB - Bankovní výpis - 2025_01_vypis"
  tags: [1, 5, 12, 23, 45, 67, 89]  # Tag IDs

# Response
{
    "id": "doc_12345",
    "title": "ČSOB - Bankovní výpis - 2025_01_vypis",
    "tags": [1, 5, 12, 23, 45, 67, 89],
    "created": "2025-01-20T10:30:00Z"
}
```

## 📊 BODOVACÍ SYSTÉM - SOUHRN

| Zdroj | Max bodů | Popis |
|-------|----------|-------|
| **Filename** | 30 | Klíčová slova v názvu |
| **Text patterns** | 180 | České faktury (9 položek) |
| **Regex matches** | 25-30 | IČO, DIČ, částky |
| **Institucions** | 35 | Známé firmy/banky |
| **OCR** | 20 | OCR match |
| **ML model** | 50 | 50 × confidence |
| **MINIMUM** | **50** | Pro rozpoznání |
| **České faktury** | **80** | Speciální minimum |

## 🎯 VÝSLEDNÉ KATEGORIE

1. ✅ **Rozpoznáno** (>50 bodů) → zpracování + upload
2. ⚠️ **Nejasné** (<50 bodů) → kategorie "unclear"
3. ❌ **Selhání** (žádný text) → přeskočit

## 🔄 FALLBACK STRATEGIE

```
1. MCP Server (AnyParser) → strukturovaná data
   ↓ selhání
2. MCP Server (PDF.co) → text extraction
   ↓ selhání  
3. Lokální pdftotext → základní text
   ↓ < 500 znaků
4. OCR (Tesseract) → poslední možnost
   ↓ < 50 znaků
5. ❌ Přeskočit dokument
```

---
*Schéma podle CLAUDE.md pravidel v1.0*
*Autor: Claude Code Assistant*