# 📧 Thunderbird Complete Setup Guide

## 🎯 Cíl: Centralizovat všechny emaily pro analýzu

### 📋 **CHECKLIST - Co potřebujeme**
- [ ] ProtonMail účet přes ProtonBridge ✅ (běží)
- [ ] Gmail účet přes IMAP
- [ ] Outlook/Microsoft účet přes IMAP
- [ ] Apple iCloud Mail účet (pokud používáte)
- [ ] ImportExportTools NG addon pro export

---

## 🚀 **KROK 1: Spuštění Thunderbird**

```bash
# Spustit Thunderbird
open "/Applications/Thunderbird.app"
```

---

## ⚙️ **KROK 2: Nastavení účtů v Thunderbird**

### **A) ProtonMail přes ProtonBridge**

**Nastavení:**
- **Jméno:** Vaše jméno
- **Email:** váš@protonmail.com
- **Heslo:** Bridge heslo (NE protonmail heslo!)

**Ruční konfigurace:**
```
IMAP Server: 127.0.0.1
Port: 1143
Security: None (místní bridge)
Authentication: Normal password

SMTP Server: 127.0.0.1  
Port: 1025
Security: None
Authentication: Normal password
```

**💡 Jak získat Bridge heslo:**
1. Otevřít Proton Mail Bridge
2. Kliknout na váš účet
3. "Mailbox configuration" → "Generate new password"

---

### **B) Gmail přes IMAP**

**Předpoklady:**
- Zapnout 2FA na Google účtu
- Vytvořit App Password pro Thunderbird

**Nastavení:**
- **Email:** váš@gmail.com
- **Heslo:** App Password (16 znaků bez mezer)

**Automatická konfigurace:**
- Thunderbird by měl automaticky nastavit Gmail IMAP
- Server: imap.gmail.com (993, SSL/TLS)
- SMTP: smtp.gmail.com (587, STARTTLS)

---

### **C) Outlook/Microsoft**

**Nastavení:**
- **Email:** váš@outlook.com / @hotmail.com
- **Heslo:** Normální heslo nebo App Password

**Automatická konfigurace:**
- Server: outlook.office365.com (993, SSL/TLS)
- SMTP: smtp-mail.outlook.com (587, STARTTLS)

---

### **D) Apple iCloud Mail (volitelné)**

**Nastavení:**
- **Email:** váš@icloud.com
- **Heslo:** App-specific password

**Konfigurace:**
- IMAP: imap.mail.me.com (993, SSL/TLS)
- SMTP: smtp.mail.me.com (587, STARTTLS)

---

## 🔧 **KROK 3: Instalace ImportExportTools NG**

### **Instalace addonu:**
1. Thunderbird → Tools → Add-ons Manager
2. Hledat: "ImportExportTools NG"
3. Install → Restart Thunderbird

### **Alternativně - ruční instalace:**
```bash
# Stáhnout z: https://addons.thunderbird.net/addon/importexporttools-ng/
```

---

## 📤 **KROK 4: Export všech emailů**

### **Po úspěšném nastavení všech účtů:**

1. **Pravý klik na root složku** (nejvyšší úroveň)
2. **ImportExportTools NG** → **Export folder**
3. **Formát:** Mbox format (včetně podsložek)
4. **Umístění:** `/Users/m.a.j.puzik/complete_emails.mbox`

---

## 🔍 **KROK 5: Verifikace exportu**

### **Python script pro ověření:**
```python
import mailbox
import email
from collections import Counter

def analyze_export(mbox_path):
    mbox = mailbox.mbox(mbox_path)
    
    domains = Counter()
    total = 0
    
    for msg in mbox:
        total += 1
        sender = msg.get('From', '').lower()
        if '@' in sender:
            domain = sender.split('@')[-1].split('>')[0]
            domains[domain] += 1
    
    print(f"📧 Celkem emailů: {total:,}")
    print(f"🌐 Top 10 domén:")
    for domain, count in domains.most_common(10):
        print(f"  {domain}: {count}")

# Spustit analýzu
analyze_export('/Users/m.a.j.puzik/complete_emails.mbox')
```

---

## ⚠️ **Troubleshooting**

### **ProtonBridge problémy:**
```bash
# Restart ProtonBridge
killall bridge
open "/Applications/Proton Mail Bridge.app"
```

### **Gmail App Password:**
1. Google Account → Security → 2-Step Verification
2. App passwords → Select app: Mail
3. Generate → Use 16-character password

### **Outlook problémy:**
- Zkusit outlook.office365.com místo outlook.com
- Ověřit, že Modern Authentication je povolena

---

## 📈 **OČEKÁVANÉ VÝSLEDKY**

Po úspěšném nastavení byste měli mít:
- ✅ Všechny emaily v jednom Thunderbird
- ✅ Automatická synchronizace
- ✅ Možnost exportu jako .mbox
- ✅ Kompletní data pro analýzu

**Odhadovaná velikost:** 
- Gmail export: ~1GB
- ProtonMail: ~500MB  
- Outlook: ~200MB
- **Celkem: ~1.7GB** (závisí na množství dat)

---

## 🎯 **DALŠÍ KROKY**

Po úspěšném exportu:
1. Spustit náš upravený algoritmus na kompletních datech
2. Porovnat úspěšnost s původním Gmail exportem
3. Analyzovat dokumenty z různých poskytovatelů