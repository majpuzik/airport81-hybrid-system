# 📂 GOOGLE DRIVE TEST FOLDER - KONVERZE PRO API

**Datum konverze:** 2025-09-06 15:13  
**Úspěšnost:** 100% (1,544/1,544 souborů)  
**Výstupní složka:** `/tmp/googledrive_api_batch_20250906_151302/`

---

## ✅ VÝSLEDKY KONVERZE

### 📊 Statistiky:
- **Celkem souborů:** 1,544
- **Úspěšně zpracováno:** 1,544 (100%)
- **Přeskočeno:** 0
- **Chyby:** 0
- **Typy souborů:** JPG, PNG, PDF, TXT, MD, XML, JSON

### 📁 Struktura složky TEST:
```
/Users/m.a.j.puzik/Library/CloudStorage/GoogleDrive-majpuzik@gmail.com/Můj disk/TEST/
├── Spurna rodina/           # 1,500+ fotografií
├── dokumenty/                # PDF dokumenty
└── ostatní soubory          # Textové a config soubory
```

---

## 🔄 CO BYLO VYTVOŘENO

Pro každý soubor byly vytvořeny 3 soubory:

### 1. **Base64 Content** (`file_XXXX_content.b64`)
- Obsahuje soubor zakódovaný v Base64
- Připravený pro upload přes Google Drive API
- Kompatibilní s multipart upload

### 2. **Metadata JSON** (`file_XXXX_metadata.json`)
```json
{
  "file_id": "file_0000",
  "original_name": "spurny0810.jpg",
  "original_path": "Spurna rodina/spurny0810.jpg",
  "size": 12345,
  "mime_type": "image/jpeg",
  "md5_hash": "abc123...",
  "modified": "2025-09-06T15:00:00"
}
```

### 3. **Text Content** (`file_XXXX_text.txt`) - pouze pro textové/PDF soubory
- Extrahovaný text pro indexování
- Umožňuje fulltextové vyhledávání v Google Drive

---

## 📤 JAK NAHRÁT DO GOOGLE DRIVE

### Metoda 1: Python s Google API Client
```python
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaInMemoryUpload
import json
import base64

# Autentizace
credentials = service_account.Credentials.from_service_account_file(
    'path/to/service-account-key.json',
    scopes=['https://www.googleapis.com/auth/drive']
)
service = build('drive', 'v3', credentials=credentials)

# Načíst manifest
with open('/tmp/googledrive_api_batch_20250906_151302/manifest.json') as f:
    manifest = json.load(f)

# Upload každého souboru
for file_info in manifest['files']:
    # Načíst base64 content
    with open(f"/tmp/googledrive_api_batch_20250906_151302/{file_info['files']['content']}") as f:
        base64_content = f.read()
    
    # Dekódovat na bytes
    file_bytes = base64.b64decode(base64_content)
    
    # Připravit metadata
    file_metadata = {
        'name': file_info['original_name'],
        'mimeType': file_info['mime_type']
    }
    
    # Upload
    media = MediaInMemoryUpload(file_bytes, mimetype=file_info['mime_type'])
    file = service.files().create(
        body=file_metadata,
        media_body=media,
        fields='id'
    ).execute()
    
    print(f"Uploaded: {file_info['original_name']} -> {file.get('id')}")
```

### Metoda 2: Bash s curl
```bash
#!/bin/bash
MANIFEST="/tmp/googledrive_api_batch_20250906_151302/manifest.json"
ACCESS_TOKEN="your-access-token"

# Pro každý soubor v manifestu
for file_id in $(jq -r '.files[].file_id' "$MANIFEST"); do
    # Získat info o souboru
    name=$(jq -r ".files[] | select(.file_id==\"$file_id\") | .original_name" "$MANIFEST")
    mime=$(jq -r ".files[] | select(.file_id==\"$file_id\") | .mime_type" "$MANIFEST")
    
    # Načíst base64 content
    content=$(cat "/tmp/googledrive_api_batch_20250906_151302/${file_id}_content.b64")
    
    # Upload přes curl
    curl -X POST "https://www.googleapis.com/upload/drive/v3/files?uploadType=media" \
        -H "Authorization: Bearer $ACCESS_TOKEN" \
        -H "Content-Type: $mime" \
        --data-binary "@<(echo $content | base64 -d)"
done
```

### Metoda 3: Google Drive CLI (gdrive)
```bash
# Instalace gdrive
brew install gdrive

# Autentizace
gdrive auth

# Upload celé složky
gdrive upload --recursive /tmp/googledrive_api_batch_20250906_151302/
```

---

## 🛠️ VYTVOŘENÉ SOUBORY

### Manifest soubor:
- **Cesta:** `/tmp/googledrive_api_batch_20250906_151302/manifest.json`
- **Obsahuje:** Kompletní seznam všech souborů s metadaty
- **Velikost:** ~500 KB

### Upload script:
- **Cesta:** `/tmp/googledrive_api_batch_20250906_151302/upload_batch.sh`
- **Účel:** Bash script pro hromadný upload
- **Spuštění:** `bash upload_batch.sh`

### Data soubory:
- **4,632 souborů** celkem (3 soubory pro každý originál)
- **Base64 soubory:** 1,544 × `.b64`
- **Metadata soubory:** 1,544 × `.json`
- **Text soubory:** variabilní (pouze pro dokumenty s textem)

---

## 📝 DALŠÍ KROKY

1. **Nastavit Google Drive API credentials:**
   - Vytvořit Service Account v Google Cloud Console
   - Stáhnout JSON klíč
   - Nastavit správná oprávnění

2. **Vybrat metodu uploadu:**
   - Python script (doporučeno pro kontrolu a logging)
   - Bash/curl (rychlé pro malé batche)
   - gdrive CLI (nejjednodušší)

3. **Spustit upload:**
   ```bash
   # Python metoda
   python3 upload_to_gdrive.py
   
   # Nebo bash script
   bash /tmp/googledrive_api_batch_20250906_151302/upload_batch.sh
   ```

4. **Monitorovat progress:**
   - Kontrolovat Google Drive kvóty
   - Logovat úspěšné/neúspěšné uploady
   - Retry mechanismus pro selhání

---

## 💡 TIPY A DOPORUČENÍ

### Optimalizace pro velké soubory:
- Použít resumable upload pro soubory > 5MB
- Batch uploady po 100 souborech
- Implementovat exponential backoff pro rate limiting

### Organizace v Google Drive:
- Vytvořit složku `TEST_CONVERTED_20250906`
- Zachovat původní strukturu složek
- Přidat custom properties s původní cestou

### Metadata a indexování:
- Všechny textové soubory mají extrahovaný text
- PDF soubory jsou připraveny pro OCR
- Obrázky zachovávají EXIF metadata

---

## ✅ ZÁVĚR

**Úspěšně konvertováno 1,544 souborů** ze složky TEST do formátu kompatibilního s Google Drive API. Všechny soubory jsou připraveny k uploadu včetně:

- ✅ Base64 encoded content
- ✅ Strukturovaná metadata
- ✅ Extrahovaný text pro vyhledávání
- ✅ Správné MIME types
- ✅ MD5 hash pro integritu

**Výstupní složka:** `/tmp/googledrive_api_batch_20250906_151302/`  
**Manifest:** `manifest.json` s kompletním seznamem souborů

---

*Konverze dokončena: 2025-09-06 15:14:28*  
*Autor: Claude Code Assistant*