# 📄 PAYMENT MATCHER V0.1 - KOMPLETNÍ DOKUMENTACE
**Datum vytvoření:** 2025-09-02  
**Verze:** 0.1  
**Autor:** M.A.J. Pužík + Claude Code Assistant

---

## 🎯 PŘEHLED SYSTÉMU

Payment Matcher je inteligentní systém pro správu dokumentů v Paperless NGX, který automaticky:
- **Načítá VŠECHNY dokumenty** z Paperless podle typu (faktury, bankovní výpisy, účtenky, předplatné)
- **Páruje platby** z bankovních výpisů s fakturami podle VS nebo částky
- **Sleduje splatnosti** faktur a upozorňuje na nezaplacené
- **Maže dokumenty** podle různých kritérií (všechny, podle typu, podle data)
- **Poskytuje webové GUI** pro snadnou správu

### ⚠️ DŮLEŽITÉ
Systém pracuje s **Paperless B** na portu **8050** (testovací instance).

---

## 📁 SEZNAM SOUBORŮ A UMÍSTĚNÍ

### 🔧 HLAVNÍ SKRIPTY

#### 1. **intelligent_office_classifier.py**
```bash
/Users/m.a.j.puzik/intelligent_office_classifier.py
```
- **Popis:** Hlavní aplikace s Flask web serverem
- **Port:** 8065
- **Funkce:** GUI interface, API endpointy, payment matching
- **Spuštění:** `python3 intelligent_office_classifier.py`

#### 2. **mcp_office_client.py**
```bash
/Users/m.a.j.puzik/mcp_office_client.py
```
- **Popis:** MCP client pro komunikaci s Paperless API
- **Funkce:** 
  - `search_paperless_documents()` - načítání VŠECH dokumentů s pagination
  - `delete_paperless_documents()` - mazání dokumentů podle kritérií
  - Tag ID mapování pro správné filtrování

#### 3. **payment_matcher_core.py**
```bash
/Users/m.a.j.puzik/payment_matcher_core.py
```
- **Popis:** Jádro pro párování plateb
- **Funkce:**
  - `load_invoices()` - načte VŠECHNY faktury
  - `load_payments()` - načte VŠECHNY bankovní výpisy
  - `load_receipts()` - načte VŠECHNY účtenky
  - `load_subscriptions()` - načte VŠECHNA předplatná
  - `match_payments()` - spáruje platby s fakturami

#### 4. **csob_statement_parser.py**
```bash
/Users/m.a.j.puzik/csob_statement_parser.py
```
- **Popis:** Parser pro ČSOB bankovní výpisy
- **Funkce:** Extrakce jednotlivých transakcí z výpisu

### 🧪 TESTOVACÍ SKRIPTY

#### 5. **test_payment_matcher_all.py**
```bash
/Users/m.a.j.puzik/test_payment_matcher_all.py
```
- **Popis:** Test načítání VŠECH dokumentů
- **Funkce:** Ověření správného načítání a filtrování

#### 6. **test_delete_documents.py**
```bash
/Users/m.a.j.puzik/test_delete_documents.py
```
- **Popis:** Interaktivní test mazání dokumentů
- **Funkce:** Menu pro mazání podle různých kritérií

#### 7. **assign_tags_to_mbw.py**
```bash
/Users/m.a.j.puzik/assign_tags_to_mbw.py
```
- **Popis:** Přiřazení tagů k MBW dokumentům
- **Funkce:** Automatická detekce typu dokumentu a přiřazení tagů

---

## 🚀 INSTALACE A SPUŠTĚNÍ

### Požadavky
```bash
pip3 install flask requests
```

### Spuštění aplikace
```bash
# 1. Spustit hlavní aplikaci
python3 /Users/m.a.j.puzik/intelligent_office_classifier.py

# 2. Otevřít v browseru
open http://localhost:8065
```

### Zastavení aplikace
```bash
# Najít PID
ps aux | grep intelligent_office_classifier

# Zastavit
kill <PID>
```

---

## 🔌 API ENDPOINTY

### 1. **GET /api/status**
Získání stavu aplikace
```bash
curl http://localhost:8065/api/status
```

### 2. **POST /api/payment-matcher/load**
Načtení všech dokumentů a spárování plateb
```bash
curl -X POST http://localhost:8065/api/payment-matcher/load \
  -H "Content-Type: application/json" \
  -d '{"date_from": "2024-01-01", "date_to": "2025-12-31"}'
```

### 3. **POST /api/documents/delete**
Mazání dokumentů podle kritérií

#### Smazat všechny dokumenty:
```bash
curl -X POST http://localhost:8065/api/documents/delete \
  -H "Content-Type: application/json" \
  -d '{"delete_mode": "all"}'
```

#### Smazat podle typu:
```bash
curl -X POST http://localhost:8065/api/documents/delete \
  -H "Content-Type: application/json" \
  -d '{"delete_mode": "by_type", "document_type": "invoice"}'
```

#### Smazat podle data:
```bash
curl -X POST http://localhost:8065/api/documents/delete \
  -H "Content-Type: application/json" \
  -d '{"delete_mode": "by_date", "date_from": "2024-01-01", "date_to": "2024-12-31"}'
```

---

## 📊 KONFIGURACE

### Paperless B (Port 8050)
```python
PAPERLESS_URL = "http://localhost:8050"
PAPERLESS_TOKEN = "31f148e50bcc71c9f153bb0f8772e63fdca32d82"
```

### MCP Server
```python
MCP_URL = "http://localhost:5002"
```

### Tag Mapování
```python
tag_mappings = {
    'invoice': ['faktura', 'invoice', 'paperless-ngx-faktury', 'typ:faktura', 'proforma'],
    'bank_statement': ['bank', 'bankovní výpis', 'výpis', 'paperless-ngx-bankovnictvi'],
    'receipt': ['účtenka', 'receipt', 'pokladní doklad', 'paperless-ngx-uctenky'],
    'subscription': ['subscription', 'předplatné', 'paperless-ngx-predplatna']
}
```

---

## 🔄 KLÍČOVÉ FUNKCE

### 1. Načítání VŠECH dokumentů
Systém používá **pagination** a **lokální filtrování** pro zajištění načtení VŠECH dokumentů:
1. Načte seznam všech tagů a vytvoří mapování ID → název
2. Načte VŠECHNY dokumenty po stránkách (100 na stránku)
3. Lokálně vyfiltruje podle typu pomocí tag mapování

### 2. Párování plateb
- Primárně podle **variabilního symbolu**
- Sekundárně podle **částky a data** (tolerance 30 dní)
- Automatická detekce zaplacených/nezaplacených faktur

### 3. Mazání dokumentů
- **Bezpečné mazání** s počítáním úspěšných/neúspěšných operací
- **Podporuje 3 módy:** all, by_type, by_date
- **Validace parametrů** před smazáním

---

## 📈 STATISTIKY A MONITORING

### Co systém sleduje:
- Počet načtených dokumentů podle typu
- Počet spárovaných plateb
- Počet faktur po splatnosti
- Celková nezaplacená částka
- Měsíční náklady na předplatné

### Získání statistik:
```python
stats = payment_matcher.get_statistics()
```

---

## 🐛 ZNÁMÉ PROBLÉMY A ŘEŠENÍ

### Problem 1: Tagy jako ID místo názvů
**Řešení:** Implementováno mapování tag ID → název v `search_paperless_documents()`

### Problem 2: HTTP 400 při filtrování
**Řešení:** Změna strategie - načtení všech dokumentů a lokální filtrování

### Problem 3: Parsování obsahu dokumentů
**Status:** Částečně vyřešeno, obsah se získává ale parsování částek/VS potřebuje vylepšení

---

## 📅 CHANGELOG

### Verze 0.1 (2025-09-02)
- ✅ Implementace načítání VŠECH dokumentů s pagination
- ✅ Oprava tag mapování (ID → názvy)
- ✅ Přidání funkcí pro mazání dokumentů
- ✅ Vytvoření testovacích skriptů
- ✅ GUI interface na portu 8065
- ✅ API endpointy pro všechny operace

---

## 📞 PODPORA

**Autor:** M.A.J. Pužík  
**Asistent:** Claude Code Assistant  
**Verze:** 0.1  
**Licence:** Interní použití

---

## 🔮 PLÁNOVANÉ FUNKCE (v0.2)

- [ ] Vylepšené parsování obsahu dokumentů
- [ ] Automatické párování plateb při uploadu
- [ ] Export statistik do CSV/Excel
- [ ] Email notifikace pro faktury po splatnosti
- [ ] Podpora více bank (kromě ČSOB)
- [ ] Dark mode pro GUI

---

*Konec dokumentace Payment Matcher v0.1*