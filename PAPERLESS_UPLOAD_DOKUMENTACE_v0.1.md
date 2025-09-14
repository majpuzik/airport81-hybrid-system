# 📚 PAPERLESS NGX UPLOAD SYSTEM - DOKUMENTACE v0.1

**Verze:** 0.1  
**Datum:** 2025-09-03  
**Autor:** M.A.J. Pužík + Claude Code Assistant  
**Port:** 8050 (DŮLEŽITÉ: Pouze tento port!)  
**Token:** f57a39ff79ba771200d4d877f2cb8f7482c4a767

---

## 📊 PŘEHLED SYSTÉMU

### Aktuální stav:
- **320 dokumentů** úspěšně nahráno do Paperless NGX
- **189 viditelných** + **52 v koši** + **79 nových**
- **164,462 PDF** nalezeno v OneDrive (většina jsou duplikáty)

### Hlavní komponenty:
1. **Paperless NGX** na portu 8050 (Docker kontejner)
2. **PostgreSQL databáze** (paperless-postgres-new)
3. **Python upload skripty** pro automatizaci
4. **REST API** s token autentizací

---

## 🎯 SPLNĚNÉ ÚLOHY

### ✅ 1. Upload MBW dokumentů (23 souborů)
- **Skript:** `/tmp/upload_mbw_no_diacritics.py`
- **Funkce:** Nahrává MBW faktury s odstraněnou diakritikou
- **Correspondenti:** Alza, Santé, NB Účetnictví, RFI shop, Potten & Pannen
- **Specialita:** Automatické odstranění české diakritiky z názvů

### ✅ 2. Konverze ČSOB XML na PDF (23 výpisů)
- **Skript:** `/tmp/fix_csob_proper.py`
- **Funkce:** Konvertuje XML bankovní výpisy na čitelné PDF
- **Výstup:** CSOB-bankovni-vypis-XXXXXXXX.pdf
- **Tagy:** mbw, bankovni-vypis, csob, 2024/2025

### ✅ 3. Upload naskenovaných dokumentů
- **Skript:** `/tmp/upload_scanned_docs.py`
- **Složka:** OneDrive/1Naskenované soubory
- **Detekce:** Automatická detekce typu (lékařské, úřední, faktury)
- **Počet:** 55+ dokumentů

### ✅ 4. Masivní upload z OneDrive
- **Skript:** `/tmp/upload_all_onedrive.py`
- **Rozsah:** 164,462 PDF nalezeno
- **Nahráno:** 131 nových dokumentů
- **Optimalizace:** Skip duplikátů, rate limiting

### ✅ 5. Oprava correspondentů a tagů
- **Skript:** `/tmp/fix_correspondents_tags.py`
- **Funkce:** Přiřazení správných correspondentů dokumentům
- **Opraveno:** ČSOB correspondent (ID 77) pro bankovní výpisy

---

## 📁 STRUKTURA SKRIPTŮ

### 🔧 Hlavní upload skripty:

#### 1. `upload_mbw_no_diacritics.py`
```python
# Odstranění diakritiky a upload MBW dokumentů
def remove_diacritics(text):
    nfd = unicodedata.normalize('NFD', text)
    # Mapování českých znaků: ů→u, ř→r, ě→e, atd.
```

#### 2. `fix_csob_proper.py`
```python
# Konverze XML na PDF s reportlab
def xml_to_readable_text(xml_path):
    # Extrakce dat z XML
def create_pdf_from_text(text_content, output_path):
    # Generování PDF
```

#### 3. `upload_all_onedrive.py`
```python
# Inteligentní masivní upload
def get_file_hash(filepath):
    # Detekce duplikátů pomocí MD5
def detect_folder_type(filepath):
    # Automatická kategorizace podle složky
```

### 📊 Pomocné skripty:

- `fix_correspondents_tags.py` - Oprava přiřazení
- `upload_onedrive_batch.py` - Dávkový upload  
- `upload_fast.sh` - Shell verze pro rychlost

---

## 🔑 API KONFIGURACE

### Autentizace:
```python
PAPERLESS_URL = "http://localhost:8050"
PAPERLESS_TOKEN = "f57a39ff79ba771200d4d877f2cb8f7482c4a767"
headers = {'Authorization': f'Token {PAPERLESS_TOKEN}'}
```

### Hlavní endpointy:
- `POST /api/documents/post_document/` - Upload dokumentu
- `GET /api/documents/` - Seznam dokumentů
- `GET /api/correspondents/` - Seznam correspondentů
- `GET /api/tags/` - Seznam tagů

---

## 🐛 ŘEŠENÉ PROBLÉMY

### 1. Invalid Token chyby
**Problém:** Token expiroval nebo byl neplatný  
**Řešení:** Regenerace přes Django shell
```bash
docker exec paperless-ngx python manage.py shell
```

### 2. Duplikátní ID dokumentů
**Problém:** Všechny dokumenty měly stejné ID  
**Řešení:** Unikátní timestamp v názvech

### 3. České diakritiky
**Problém:** Paperless měl problémy s ě, š, č, ř, ž  
**Řešení:** `remove_diacritics()` funkce

### 4. XML není PDF
**Problém:** ČSOB výpisy byly XML, ne PDF  
**Řešení:** Konverze přes reportlab

### 5. Port switching incident
**Problém:** Pokus o změnu na port 8060  
**Řešení:** Striktně pouze port 8050!

---

## 📈 STATISTIKY

### Dokumenty podle typu:
- **Naskenované:** 166 (tag: 2025)
- **Import 2025:** 133 dokumentů
- **Bankovní výpisy:** 7 (ČSOB)
- **Faktury:** 9 (Alza + další)
- **Lékařské zprávy:** 7
- **Účtenky:** 9

### Correspondenti (TOP):
1. Neznámý: 22 dokumentů
2. ČSOB: 7 dokumentů  
3. Alza: 7 dokumentů
4. Zdravotnické zařízení: 5
5. Lékařské zařízení: 3

---

## 🚀 POUŽITÍ SKRIPTŮ

### Upload MBW dokumentů:
```bash
python3 /tmp/upload_mbw_no_diacritics.py
```

### Konverze ČSOB XML:
```bash
python3 /tmp/fix_csob_proper.py
```

### Masivní upload z OneDrive:
```bash
python3 /tmp/upload_all_onedrive.py
```

### Rychlý shell upload:
```bash
chmod +x /tmp/upload_fast.sh
/tmp/upload_fast.sh
```

---

## ⚠️ DŮLEŽITÁ UPOZORNĚNÍ

1. **NIKDY neměnit port z 8050!**
2. **Vždy kontrolovat platnost tokenu**
3. **Odstranit diakritiku z názvů souborů**
4. **Rate limiting - max 10 dokumentů/sekundu**
5. **Kontrolovat duplikáty před uploadem**

---

## 📂 SLOŽKY V ONEDRIVE

### Prioritní (zpracované):
- ✅ `1Naskenované soubory` - 55 PDF
- ✅ `MBW` - 65 PDF  
- ✅ `Email attachments from Power Automate` - 611 PDF
- ✅ `Email attachments from Flow` - 567 PDF

### Velké archivy (nezpracované):
- ⏸️ `1allpdf` - 45,385 PDF (duplikáty)
- ⏸️ `1allpdfx (kopie)` - 45,346 PDF
- ⏸️ `Dropbox-backup` - 8,298 PDF

---

## 🔄 BUDOUCÍ VYLEPŠENÍ (v0.2)

1. **Deduplikace** - Automatické odstranění duplikátů
2. **OCR integrace** - Pro skenované dokumenty
3. **ML klasifikace** - Automatická detekce typu
4. **Batch processing** - Paralelní upload
5. **Progress tracking** - Real-time monitoring

---

## 📝 CHANGELOG

### v0.1 (2025-09-03)
- První funkční verze systému
- Upload 320 dokumentů
- MBW a ČSOB integrace
- Základní detekce typů
- Odstranění diakritiky

---

## 📞 KONTAKT

**Autor:** M.A.J. Pužík  
**Asistent:** Claude Code Assistant  
**Email:** majpuzik@gmail.com  
**Projekt:** Paperless NGX Upload System

---

*Dokumentace vygenerována: 2025-09-03*  
*Verze: 0.1*  
*Port: 8050*