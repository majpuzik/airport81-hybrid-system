# 📧 KOMPLETNÍ EMAIL IMPORT - VŠECHNY ZDROJE

## 🎯 **CÍL: Získat 100% všech emailů do Thunderbird**

---

## 📋 **KONTROLNÍ SEZNAM**

### **A) ÚČTY K PŘIDÁNÍ:**
- [ ] **ProtonMail** (přes Bridge)
- [ ] **Gmail** - hlavní účet (All Mail!)
- [ ] **Gmail** - další účty (pokud existují)
- [ ] **Outlook/Hotmail** - všechny účty
- [ ] **Apple iCloud** (me.com, icloud.com, mac.com)
- [ ] **Firemní emaily** (Exchange, Office 365)
- [ ] **Ostatní poskytovatelé** (Seznam.cz, atd.)

---

## 🚀 **THUNDERBIRD SETUP - KROK ZA KROKEM**

### **1️⃣ PROTONMAIL (přes Bridge)**

**Příprava:**
1. Otevřít Proton Mail Bridge (menu bar ikona)
2. Vybrat účet → "Mailbox configuration"
3. "Generate new password" → zkopírovat

**V Thunderbird:**
```
File → New → Existing Mail Account

Email Address: váš@protonmail.com
Password: [Bridge heslo - NE normální heslo!]

Manual Config:
IMAP Server: 127.0.0.1
Port: 1143
Security: None
Authentication: Normal password

SMTP Server: 127.0.0.1
Port: 1025  
Security: None
Authentication: Normal password
```

---

### **2️⃣ GMAIL - KOMPLETNÍ HISTORIE**

**Příprava:**
1. Google Account → Security → 2-Step Verification
2. App passwords → Select app: Mail → Generate
3. Zkopírovat 16-znakový kód

**V Thunderbird:**
```
Email Address: váš@gmail.com
Password: [16-znakový App Password]

Automatic Configuration měla by fungovat:
IMAP: imap.gmail.com (993, SSL/TLS)
SMTP: smtp.gmail.com (587, STARTTLS)
```

**⚠️ KRITICKÉ - Subscribe k All Mail:**
1. Po přidání účtu → pravý klik na Gmail účet
2. "Subscribe..." 
3. ✅ Zaškrtnout "[Gmail]/All Mail"
4. ✅ Zaškrtnout "[Gmail]/Sent Mail" 
5. ✅ Zaškrtnout "[Gmail]/Drafts"
6. Subscribe → to bude synchronizovat VŠECHNY emaily!

---

### **3️⃣ OUTLOOK/HOTMAIL**

**V Thunderbird:**
```
Email Address: váš@outlook.com / @hotmail.com / @live.com
Password: [normální heslo nebo App Password]

Automatic Configuration:
IMAP: outlook.office365.com (993, SSL/TLS)
SMTP: smtp-mail.outlook.com (587, STARTTLS)
```

---

### **4️⃣ APPLE iCLOUD MAIL**

**Příprava:**
1. Apple ID → Sign-In and Security → App-Specific Passwords
2. Generate password for "Mail app"

**V Thunderbird:**
```
Email Address: váš@icloud.com / @me.com / @mac.com
Password: [App-specific password]

Manual Config:
IMAP: imap.mail.me.com (993, SSL/TLS)
SMTP: smtp.mail.me.com (587, STARTTLS)
```

---

## 📥 **MAXIMÁLNÍ SYNCHRONIZACE**

### **Pro každý účet - nastavit:**

1. **Account Settings → Synchronization & Storage**
   - ✅ "Keep messages for this account on this computer"
   - ✅ "Synchronize all messages locally regardless of age"
   - Message body: "Download full messages"

2. **Server Settings → Advanced**
   - IMAP server directory: (leave empty)
   - ✅ "Show only subscribed folders"
   - ✅ "Allow server to override namespace"

3. **Junk Settings**
   - ❌ Uncheck all junk filtering (nechceme filtrovat)

---

## 🔧 **IMPORTEXPORTTOOLS NG**

### **Instalace:**
1. Tools → Add-ons Manager
2. Search: "ImportExportTools NG"  
3. Install → Restart Thunderbird

### **Nebo manuální:**
- Stáhnout: https://addons.thunderbird.net/addon/importexporttools-ng/
- Drag & drop .xpi soubor do Thunderbird

---

## 📤 **KOMPLETNÍ EXPORT**

### **Po synchronizaci všech účtů:**

1. **Počkat na kompletní sync** (může trvat hodiny!)
2. **Pravý klik na "Local Folders"** (nebo root)
3. **ImportExportTools NG → Export folder**
4. **Nastavení:**
   ```
   Format: Mbox format (.mbox)
   Include subfolders: ✅ YES
   Location: /Users/m.a.j.puzik/ALL_EMAILS_COMPLETE.mbox
   ```

---

## 📊 **OVĚŘENÍ KOMPLETNOSTI**

### **Kontrolní script:**
```python
import mailbox
from collections import Counter

def verify_complete_export():
    mbox = mailbox.mbox('/Users/m.a.j.puzik/ALL_EMAILS_COMPLETE.mbox')
    
    total = len(mbox)
    domains = Counter()
    years = Counter()
    
    for msg in mbox:
        # Domény
        sender = msg.get('From', '').lower()
        if '@' in sender:
            domain = sender.split('@')[-1].split('>')[0]
            domains[domain] += 1
        
        # Roky
        date = msg.get('Date', '')
        import re
        year_match = re.search(r'20\d{2}', date)
        if year_match:
            years[year_match.group()] += 1
    
    print(f"📧 CELKEM: {total:,} emailů")
    print(f"🌐 Domény: {len(domains)} různých")
    print(f"📅 Roky: {sorted(years.keys())}")
    
    # Očekávané minimum
    if total > 30000:
        print("✅ VÝBORNĚ! Máme více než 30K emailů")
    elif total > 15000:  
        print("👍 DOBŘE! Máme více než 15K emailů")
    else:
        print("⚠️ Možná chybí data - jen {total} emailů")
```

---

## 🎯 **OČEKÁVANÉ VÝSLEDKY**

**Po kompletním importu očekáváme:**
- **30,000 - 100,000+ emailů** (závisí na historii)
- **Roky:** 2015-2025 (nebo podle věku účtů)
- **Domény:** gmail.com, protonmail.com, outlook.com, icloud.com
- **Velikost:** 2-10 GB .mbox soubor

**Porovnání:**
- **Současný Gmail export:** 11,100 emailů (jen 2025)
- **Očekávaný kompletní export:** 30,000+ emailů (10 let)

---

## ⏱️ **ČASOVÝ PLÁN**

1. **Setup účtů:** 30 minut
2. **Synchronizace:** 2-8 hodin (závisí na množství dat)
3. **Export:** 30 minut
4. **Analýza:** 1 hodina

**Celkem:** 4-10 hodin (většinou čekání na sync)