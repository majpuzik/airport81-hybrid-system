# 🚀 Airport81.eu - FTP Upload Guide

## ⚠️ BEZPEČNOSTNÍ UPOZORNĚNÍ
**NIKDY NESDÍLEJTE FTP PŘIHLAŠOVACÍ ÚDAJE VEŘEJNĚ!**
Doporučuji změnit heslo po dokončení uploadu.

## 📋 VAŠE FTP ÚDAJE
```
Server: airport81.eu (nebo ftp.airport81.eu)
Username: [jako domena]
Password: [změňte po uploadu]
Port: 21 (standardní FTP) nebo 22 (SFTP)
Protokol: FTP nebo SFTP
```

## 🛠️ FTP KLIENTI (DOPORUČENÉ)

### 1. FileZilla (ZDARMA)
```bash
# Download:
https://filezilla-project.org/download.php?type=client

# Nastavení:
Host: ftp.airport81.eu
Username: [váš username]
Password: [vaše heslo]
Port: 21
```

### 2. Cyberduck (Mac)
```bash
# Download z App Store nebo:
https://cyberduck.io/download/

# Připojení:
Protokol: FTP nebo SFTP
Server: airport81.eu
```

### 3. Transmit (Mac - placený)
```bash
# Nejlepší Mac FTP klient
# App Store nebo https://panic.com/transmit/
```

## 📂 POSTUP UPLOADU

### KROK 1: Zkontrolovat stávající web
```bash
1. Připojte se k FTP
2. Najděte složku: /public_html/ nebo /www/ nebo /htdocs/
3. Zkontrolujte obsah - měl by tam být WordPress
4. Pokud je tam wp-config.php, wp-content/ atd. = WordPress existuje
```

### KROK 2: Backup stávajícího webu
```bash
1. Stáhněte celou složku /public_html/ na disk
2. Uložte jako: airport81_backup_YYYYMMDD
3. Exportujte databázi přes phpMyAdmin nebo hosting panel
```

### KROK 3: Kontrola WordPress verze
```bash
1. Otevřete soubor: /wp-includes/version.php
2. Najděte řádek: $wp_version = 'X.X.X';
3. Aktuální verze je 6.6.1 (září 2024)
4. Pokud je starší, aktualizujte přes WP Admin
```

### KROK 4: Upload vašeho WordPress webu
```bash
Cesta k vašim souborům:
/Users/m.a.j.puzik/Downloads/app20250908202137uucidojeex_1757345129602/

Upload do:
/public_html/ (nebo hlavní webová složka)

Nahrajte:
- wp-content/themes/ - vaše témata
- wp-content/plugins/ - vaše pluginy  
- wp-content/uploads/ - media soubory
- wp-config.php - konfigurace databáze
```

## ⚙️ DATABÁZE SETUP

### Pokud máte SQL export:
```bash
1. Přihlaste se do cPanel nebo hosting panelu
2. Najděte phpMyAdmin
3. Vyberte databázi webu
4. Importujte .sql soubor
5. Aktualizujte URL v wp_options tabulce:
   - option_name = 'home' → 'https://airport81.eu'  
   - option_name = 'siteurl' → 'https://airport81.eu'
```

### Pokud nemáte SQL export:
```bash
1. Nainstalujte čistý WordPress na airport81.eu
2. Nahrajte pouze wp-content/themes/
3. Aktivujte správné téma
4. Ručně přidejte obsah přes WordPress admin
```

## 🔧 wp-config.php NASTAVENÍ

```php
// Databázové údaje - získejte od hostingu
define('DB_NAME', 'airport81_db');
define('DB_USER', 'airport81_user');
define('DB_PASSWORD', 'heslo_k_databazi');
define('DB_HOST', 'localhost');

// URL nastavení
define('WP_HOME','https://airport81.eu');
define('WP_SITEURL','https://airport81.eu');

// SSL
define('FORCE_SSL_ADMIN', true);
```

## 📱 ALTERNATIVNÍ METODY

### 1. Hosting File Manager
```bash
1. Přihlaste se do cPanel
2. Najděte "File Manager"  
3. Nahrajte ZIP soubor
4. Rozbalte přímo na serveru
```

### 2. WordPress Migrator Plugin
```bash
1. Nainstalujte "All-in-One WP Migration"
2. Exportujte lokální web
3. Importujte na airport81.eu
```

### 3. Softaculous (auto-installer)
```bash
1. V cPanel najděte Softaculous
2. Instalujte čistý WordPress
3. Nahrajte pouze témata a obsah
```

## 🔍 KONTROLA PO UPLOADU

### Test funkčnosti:
```bash
1. Otevřete: https://airport81.eu
2. Zkontrolujte: https://airport81.eu/wp-admin  
3. Otestujte všechny odkazy
4. Ověřte responzivní design
5. Zkontrolujte rychlost načítání
```

### Časté problémy:
```bash
- 500 Error = špatné oprávnění souborů (755/644)
- Database Error = špatné DB údaje v wp-config.php
- Broken links = nesprávné URL v databázi
- Missing images = cesta k uploads složce
```

## 🚀 FINALIZACE

### 1. SSL Certifikát
```bash
1. V hosting panelu aktivujte SSL
2. Přesměrujte HTTP → HTTPS  
3. Aktualizujte všechny URL na HTTPS
```

### 2. Cache a optimalizace
```bash
1. Nainstalujte W3 Total Cache
2. Optimalizujte obrázky
3. Minimalizujte CSS/JS
```

### 3. Zabezpečení
```bash
1. Změňte FTP heslo
2. Aktualizujte všechny pluginy
3. Nastavte security pluginy
4. Pravidelné zálohy
```

## 📞 POMOC

Pokud narazíte na problémy:
1. Kontaktujte podporu hostingu
2. Zkontrolujte error logy v cPanel  
3. Použijte WordPress migrator pluginy
4. Zvažte profesionální migraci

## ✅ CHECKLIST

- [ ] FTP klient nainstalován
- [ ] Připojení k FTP funguje  
- [ ] Backup stávajícího webu vytvořen
- [ ] WordPress verze zkontrolována
- [ ] Soubory nahrány
- [ ] Databáze nakonfigurována  
- [ ] URL aktualizovány
- [ ] Web funkční na airport81.eu
- [ ] SSL aktivní
- [ ] Hesla změněna

**Úspěšné spuštění!** 🎉