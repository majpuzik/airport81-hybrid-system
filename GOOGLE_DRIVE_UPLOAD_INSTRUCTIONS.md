# 📤 INSTRUKCE PRO UPLOAD DO GOOGLE DRIVE

**Připraveno:** 1,544 souborů z TEST složky  
**Umístění:** `/tmp/googledrive_api_batch_20250906_151302/`

---

## 🔐 KROK 1: ZÍSKÁNÍ ACCESS TOKENU

### Metoda A: OAuth Playground (Nejjednodušší)

1. **Otevřete OAuth Playground:**
   ```
   https://developers.google.com/oauthplayground
   ```

2. **V Step 1 - Select & authorize APIs:**
   - Najděte: **Google Drive API v3**
   - Zaškrtněte: `https://www.googleapis.com/auth/drive.file`
   - Klikněte: **Authorize APIs**

3. **Přihlaste se Google účtem**
   - Vyberte účet majpuzik@gmail.com
   - Povolte přístup

4. **V Step 2 - Exchange authorization code:**
   - Klikněte: **Exchange authorization code for tokens**
   - Zkopírujte: **Access token** (začíná ya29...)

5. **Uložte token do terminálu:**
   ```bash
   export GOOGLE_DRIVE_ACCESS_TOKEN="ya29.váš-token-zde"
   ```

---

## 📤 KROK 2: SPUŠTĚNÍ UPLOADU

### Test s 1 souborem:
```bash
# Nastavit token
export GOOGLE_DRIVE_ACCESS_TOKEN="ya29.váš-token-zde"

# Spustit test
python3 /Users/m.a.j.puzik/simple_gdrive_upload.py
```

### Upload všech souborů:
```bash
# S nastaveným tokenem
python3 /Users/m.a.j.puzik/google_drive_uploader.py
```

---

## 🛠️ KROK 3: ALTERNATIVNÍ METODY

### Metoda B: Přímý cURL upload

```bash
# Nastavit proměnné
TOKEN="ya29.váš-token-zde"
BATCH_DIR="/tmp/googledrive_api_batch_20250906_151302"

# Upload prvního souboru
FILE_ID="file_0000"
CONTENT=$(cat $BATCH_DIR/${FILE_ID}_content.b64 | base64 -d)

curl -X POST \
  "https://www.googleapis.com/upload/drive/v3/files?uploadType=media" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: image/jpeg" \
  --data-binary "@-" <<< "$CONTENT"
```

### Metoda C: Google Drive API Python Client

```python
# Instalace
pip install google-api-python-client google-auth-httplib2

# Upload script
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
import base64
import json

# Token z OAuth Playground
creds = Credentials(token='ya29.váš-token-zde')
service = build('drive', 'v3', credentials=creds)

# Načíst manifest
with open('/tmp/googledrive_api_batch_20250906_151302/manifest.json') as f:
    manifest = json.load(f)

# Upload každého souboru
for file_info in manifest['files'][:10]:  # První 4 soubory
    # Načíst base64
    with open(f'/tmp/googledrive_api_batch_20250906_151302/{file_info["files"]["content"]}') as f:
        content = base64.b64decode(f.read())
    
    # Upload
    file_metadata = {'name': file_info['original_name']}
    media = MediaInMemoryUpload(content, mimetype=file_info['mime_type'])
    
    file = service.files().create(
        body=file_metadata,
        media_body=media,
        fields='id'
    ).execute()
    
    print(f'Uploaded: {file_info["original_name"]} -> {file.get("id")}')
```

---

## 📊 PŘIPRAVENÉ SOUBORY

### Manifest:
```json
{
  "created": "2025-09-06T15:13:02",
  "source_folder": "/GoogleDrive/TEST",
  "statistics": {
    "total_files": 1544,
    "processed": 1544,
    "errors": 0
  },
  "files": [...]
}
```

### Struktura souborů:
- **1,544** originálních souborů
- **1,544** `.b64` souborů (base64 content)
- **1,544** `.json` souborů (metadata)
- **~500** `.txt` souborů (extrahovaný text)

---

## 🚀 RYCHLÝ START

```bash
# 1. Získat token z OAuth Playground
open https://developers.google.com/oauthplayground

# 2. Nastavit token
export GOOGLE_DRIVE_ACCESS_TOKEN="ya29.a0AeDClZBZ..."

# 3. Test upload 1 souboru
python3 << 'EOF'
import os, json, base64, requests

token = os.environ['GOOGLE_DRIVE_ACCESS_TOKEN']
batch_dir = '/tmp/googledrive_api_batch_20250906_151302'

# První soubor z manifestu
with open(f'{batch_dir}/manifest.json') as f:
    file_info = json.load(f)['files'][0]

# Načíst content
with open(f'{batch_dir}/{file_info["files"]["content"]}') as f:
    content = base64.b64decode(f.read())

# Upload
response = requests.post(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=media',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': file_info['mime_type']
    },
    data=content
)

if response.status_code == 200:
    result = response.json()
    print(f"✅ Uploaded: {file_info['original_name']}")
    print(f"   ID: {result['id']}")
    print(f"   View: https://drive.google.com/file/d/{result['id']}/view")
else:
    print(f"❌ Error: {response.status_code} - {response.text}")
EOF

# 4. Pokud funguje, spustit batch upload
python3 /Users/m.a.j.puzik/google_drive_uploader.py
```

---

## ⚠️ DŮLEŽITÉ POZNÁMKY

1. **Token vyprší za 1 hodinu** - pro dlouhé uploady použijte refresh token
2. **Rate limits:** Max 1000 requests/100 seconds
3. **Quota:** 10 GB upload/day zdarma
4. **Velikost souborů:** Max 5 TB per file

---

## 📞 PODPORA

Pokud upload nefunguje:
1. Zkontrolujte token (nesmí obsahovat mezery)
2. Ověřte quota v Google Cloud Console
3. Zkuste menší batch (10 souborů)
4. Použijte resumable upload pro velké soubory

---

*Dokumentace vytvořena: 2025-09-06*  
*Soubory připraveny k uploadu v: `/tmp/googledrive_api_batch_20250906_151302/`*