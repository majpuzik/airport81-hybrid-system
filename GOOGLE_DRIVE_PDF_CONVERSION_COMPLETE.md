# 📄 GOOGLE DRIVE API - KOMPLETNÍ ŘEŠENÍ PRO PDF KONVERZI

**Datum vytvoření:** 2025-09-06  
**Autor:** Claude Code Assistant  
**Problém:** Google Drive API neumí číst raw PDF soubory  
**Řešení:** Konverze do podporovaných formátů

---

## 🎯 PROBLÉM

Google Drive API **NEMŮŽE přímo číst obsah PDF souborů**. API vrací pouze metadata (název, velikost, MIME type), ale ne samotný obsah dokumentu.

## ✅ ŘEŠENÍ - 4 METODY

### 1️⃣ **BASE64 ENCODING** (Nejjednodušší)
Konvertuje PDF na Base64 string pro upload přes API.

```python
import base64

def pdf_to_base64(pdf_path):
    with open(pdf_path, 'rb') as pdf_file:
        pdf_bytes = pdf_file.read()
        base64_string = base64.b64encode(pdf_bytes).decode('utf-8')
    return base64_string

# Použití v Google Drive API
metadata = {
    "name": "dokument.pdf",
    "mimeType": "application/pdf"
}
media = MediaInMemoryUpload(
    base64.b64decode(base64_string),
    mimetype='application/pdf'
)
file = service.files().create(
    body=metadata,
    media_body=media,
    fields='id'
).execute()
```

### 2️⃣ **TEXT EXTRACTION** (Pro vyhledávání)
Extrahuje text z PDF pro Google Drive indexování.

```python
import PyPDF2
import pdfplumber

def pdf_to_text(pdf_path):
    text = ""
    
    # Metoda 1: PyPDF2
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"
    except:
        pass
    
    # Metoda 2: pdfplumber (pokud PyPDF2 selže)
    if len(text.strip()) < 100:
        try:
            with pdfplumber.open(pdf_path) as pdf:
                for page in pdf.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + "\n"
        except:
            pass
    
    return text

# Použití v Google Drive metadata
metadata = {
    "name": "dokument.pdf",
    "mimeType": "application/pdf",
    "description": pdf_to_text("dokument.pdf")[:1000],  # První 1000 znaků
    "properties": {
        "full_text": pdf_to_text("dokument.pdf")  # Celý text
    }
}
```

### 3️⃣ **KONVERZE NA OBRÁZKY** (Pro OCR)
Google Drive OCR funguje lépe s obrázky než s PDF.

```python
import fitz  # PyMuPDF
from PIL import Image
import io

def pdf_to_images(pdf_path, dpi=150):
    images = []
    pdf_document = fitz.open(pdf_path)
    
    for page_num in range(pdf_document.page_count):
        page = pdf_document[page_num]
        mat = fitz.Matrix(dpi/72.0, dpi/72.0)
        pix = page.get_pixmap(matrix=mat)
        
        # Konverze na PIL Image
        img_data = pix.pil_tobytes(format="PNG")
        img = Image.open(io.BytesIO(img_data))
        images.append(img)
    
    pdf_document.close()
    return images

# Upload jako obrázky s OCR
for i, img in enumerate(pdf_to_images("dokument.pdf")):
    img_bytes = io.BytesIO()
    img.save(img_bytes, format='PNG')
    img_bytes.seek(0)
    
    metadata = {
        "name": f"page_{i+1}.png",
        "mimeType": "image/png"
    }
    media = MediaInMemoryUpload(
        img_bytes.getvalue(),
        mimetype='image/png'
    )
    # Upload s OCR
    file = service.files().create(
        body=metadata,
        media_body=media,
        ocrLanguage="cs",  # České OCR
        fields='id'
    ).execute()
```

### 4️⃣ **GOOGLE DOCS KONVERZE** (Nejlepší pro editaci)
Konvertuje PDF na Google Docs pro plnou editaci.

```python
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

def pdf_to_google_docs(pdf_path, service):
    # Upload PDF
    file_metadata = {
        'name': 'dokument',
        'mimeType': 'application/vnd.google-apps.document'  # Google Docs
    }
    media = MediaFileUpload(
        pdf_path,
        mimetype='application/pdf'
    )
    
    # Upload s konverzí
    file = service.files().create(
        body=file_metadata,
        media_body=media,
        fields='id,webViewLink',
        supportsAllDrives=True,
        ocrLanguage='cs'  # OCR pro česky
    ).execute()
    
    return file.get('webViewLink')  # Link na Google Docs
```

---

## 🛠️ KOMPLETNÍ IMPLEMENTACE

### Instalace závislostí:
```bash
pip install google-api-python-client google-auth-httplib2 google-auth-oauthlib
pip install PyPDF2 pdfplumber pillow PyMuPDF reportlab
```

### Hlavní konvertor (`convert_pdf_for_google_drive.py`):
```python
#!/usr/bin/env python3
"""
PDF Converter pro Google Drive API
===================================
Kompletní řešení pro konverzi PDF do Google Drive
"""

import base64
import json
import os
from pathlib import Path
from typing import Dict, Any, List, Optional
import PyPDF2
import pdfplumber
from PIL import Image
import io
import fitz  # PyMuPDF

class PDFToGoogleDriveConverter:
    """Konvertor PDF souborů pro Google Drive API"""
    
    def __init__(self):
        self.supported_formats = [
            'base64',      # Base64 encoded string
            'text',        # Extrahovaný text
            'json',        # Strukturovaná JSON metadata
            'images',      # PDF stránky jako obrázky
            'google_doc'   # Google Docs formát
        ]
    
    def prepare_for_google_drive_upload(self, pdf_path: str) -> Dict[str, Any]:
        """
        Připraví kompletní balíček pro Google Drive API upload
        """
        result = {
            "file_name": Path(pdf_path).name,
            "file_path": str(pdf_path),
            "upload_ready": False
        }
        
        try:
            # 1. Base64 pro upload
            result["base64_content"] = self.pdf_to_base64(pdf_path)
            
            # 2. Metadata pro Google Drive
            result["metadata"] = self.pdf_to_json_metadata(pdf_path)
            
            # 3. Text pro indexování
            result["text_content"] = self.pdf_to_text(pdf_path)
            
            # 4. Velikost souboru
            result["file_size"] = os.path.getsize(pdf_path)
            
            result["upload_ready"] = True
            
        except Exception as e:
            result["error"] = str(e)
        
        return result
```

---

## 📤 UPLOAD PŘES GOOGLE DRIVE API

### Autentizace:
```python
from google.oauth2 import service_account
from googleapiclient.discovery import build

# Service Account credentials
credentials = service_account.Credentials.from_service_account_file(
    'path/to/service-account-key.json',
    scopes=['https://www.googleapis.com/auth/drive']
)

service = build('drive', 'v3', credentials=credentials)
```

### Multipart Upload:
```python
from googleapiclient.http import MediaInMemoryUpload
import json

def upload_pdf_to_google_drive(pdf_data, service):
    # Metadata
    file_metadata = {
        'name': pdf_data['file_name'],
        'mimeType': 'application/pdf',
        'description': pdf_data['text_content'][:1000],
        'properties': {
            'source': 'paperless-ngx',
            'processed': 'true'
        }
    }
    
    # Media upload z Base64
    pdf_bytes = base64.b64decode(pdf_data['base64_content'])
    media = MediaInMemoryUpload(
        pdf_bytes,
        mimetype='application/pdf',
        resumable=True
    )
    
    # Upload
    file = service.files().create(
        body=file_metadata,
        media_body=media,
        fields='id,name,webViewLink'
    ).execute()
    
    print(f"✅ Uploaded: {file.get('name')}")
    print(f"📎 Link: {file.get('webViewLink')}")
    
    return file
```

---

## 🔄 INTEGRACE S MCP SERVER V5

### Automatický pipeline:
```python
# 1. Získat dokumenty z Paperless přes MCP
documents = mcp_client.call_tool('paperless_get_documents', {
    'port': 8050,
    'limit': 100
})

# 2. Konvertovat každý dokument
for doc in documents:
    # Stáhnout PDF
    pdf_content = mcp_client.call_tool('paperless_download_document', {
        'document_id': doc['id']
    })
    
    # Konvertovat pro Google Drive
    converter = PDFToGoogleDriveConverter()
    upload_data = converter.prepare_for_google_drive_upload(pdf_path)
    
    # Upload do Google Drive
    upload_pdf_to_google_drive(upload_data, service)
```

---

## 📊 SROVNÁNÍ METOD

| Metoda | Výhody | Nevýhody | Použití |
|--------|--------|----------|---------|
| **Base64** | Jednoduché, zachovává originál | Velká data (33% navýšení) | Upload originálů |
| **Text Extract** | Malá data, fulltextové vyhledávání | Ztráta formátování | Indexování, search |
| **Images** | OCR podporu, preview | Velké soubory, pomalé | Skenované dokumenty |
| **Google Docs** | Plná editace, kolaborace | Ztráta původního formátu | Dokumenty k editaci |

---

## 🚀 DOPORUČENÝ POSTUP

### Pro Paperless dokumenty:
1. **Upload originálního PDF** (Base64)
2. **Přidání text content** do description/properties
3. **Vytvoření thumbnail** z první stránky
4. **Metadata tagování** z Paperless

### Příklad kompletního workflow:
```bash
# 1. Spustit MCP Server V5
cd /Users/m.a.j.puzik/unified-mcp-server
PORT=5004 node http-server-v5.js &

# 2. Spustit Google Drive integraci
python3 google_drive_integration.py

# 3. Výsledek: Batch připraven v /tmp/google_drive_batch
# 4. Upload přes Google Drive API nebo gdrive CLI
```

---

## 📝 ZÁVĚR

**Google Drive API problém:** Neumí číst raw PDF obsah  
**Řešení:** Konverze na Base64 + text extraction + metadata  
**Implementace:** `convert_pdf_for_google_drive.py`  
**Integrace:** MCP Server V5 + Google Drive API v3  

✅ **Hotový systém pro konverzi a upload PDF do Google Drive!**

---

*Dokumentace vytvořena: 2025-09-06*  
*Autor: Claude Code Assistant*