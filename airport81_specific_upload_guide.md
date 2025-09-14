# 🚁 Airport81.eu - Specifický Upload Guide pro DroneServices Téma

## 📂 ANALÝZA VAŠEHO PROJEKTU

Ze složky `/Users/m.a.j.puzik/Downloads/app20250908202137uucidojeex_1757345129602/` vidím:

✅ **WordPress Custom Theme**: "DroneServices" v1.0  
✅ **Futuristický design** s gradientními efekty  
✅ **Tailwind CSS** integration  
✅ **Next.js** komponenty (src/ složka)  
✅ **Profesionální struktura** pro letecké služby

## 🎯 TYP PROJEKTU: HYBRID WORDPRESS + NEXT.JS

Váš projekt vypadá jako **hybridní řešení** kombinující:
- WordPress backend/CMS
- Next.js frontend
- Custom PHP theme
- Tailwind CSS styling

## 🚀 UPLOAD STRATEGIE

### VARIANTA A: Upload jako WordPress Theme (DOPORUČENO)
```bash
1. Připojte se k FTP airport81.eu
2. Najděte složku: /public_html/wp-content/themes/
3. Vytvořte složku: /public_html/wp-content/themes/droneservices/
4. Nahrajte obsah vaší složky do této theme složky
5. Aktivujte téma v WP Admin
```

### VARIANTA B: Upload jako Next.js aplikace
```bash
1. Build produkční verzi: npm run build
2. Nahrajte na subdoménu: app.airport81.eu
3. WordPress zůstane na hlavní doméně pro CMS
```

## 📋 DETAILNÍ KROKY PRO WORDPRESS THEME

### KROK 1: Příprava souborů
```bash
cd /Users/m.a.j.puzik/Downloads/app20250908202137uucidojeex_1757345129602/

# Zkontrolujte WordPress theme soubory:
ls -la *.php
# Měli byste vidět:
- index.php ✅
- style.css ✅ 
- functions.php ✅
- header.php ✅
- footer.php ✅
```

### KROK 2: FTP Upload
```bash
# Připojte se přes FileZilla/Cyberduck:
Host: ftp.airport81.eu nebo airport81.eu
User: [váš FTP user]
Password: [změňte po uploadu!]

# Cílová cesta:
/public_html/wp-content/themes/droneservices/

# Nahrajte všechny soubory:
- *.php files
- style.css
- assets/ folder
- src/ folder (pro Next.js komponenty)
- package.json
- všechny ostatní soubory
```

### KROK 3: WordPress Admin aktivace
```bash
1. Přihlaste se: https://airport81.eu/wp-admin
2. Appearance → Themes
3. Najděte "DroneServices"
4. Klikněte "Activate"
```

## 🔧 MOŽNÉ KOMPLIKACE A ŘEŠENÍ

### Next.js komponenty v PHP
```php
// Ve vašem functions.php už máte integraci
// Pokud Next.js komponenty nefungují:

1. Zkontrolujte whether Node.js je na serveru
2. Spusťte: npm install
3. Build: npm run build  
4. Ujistěte se, že server podporuje Node.js
```

### Tailwind CSS
```css
/* Váš style.css už má Tailwind import */
@import url('https://cdn.jsdelivr.net/npm/tailwindcss@3.4.0/base.css');

/* Pokud nefunguje, použijte lokální build */
```

### Databáze nastavení
```php
// wp-config.php - aktualizujte pro airport81.eu:
define('DB_NAME', 'vaše_db_name');
define('DB_USER', 'vaše_db_user'); 
define('DB_PASSWORD', 'vaše_db_heslo');
define('DB_HOST', 'localhost');

define('WP_HOME','https://airport81.eu');
define('WP_SITEURL','https://airport81.eu');
```

## 🎨 CUSTOMIZACE PRO AIRPORT81

### Aktualizace theme info
```php
// V style.css změňte:
/*
Theme Name: Airport81 DroneServices
Description: Profesionální téma pro Airport81 - letecké služby a dronové natáčení
Version: 1.0
Author: Airport81 Team
Text Domain: airport81-droneservices
*/
```

### Barevné schema úpravy
```css
/* V style.css aktualizujte na Airport81 barvy: */
:root {
  --primary-color: #1E3A8A;    /* Airport81 modrá */
  --secondary-color: #F59E0B;  /* Airport81 oranžová */
  --accent-color: #60A5FA;     /* Airport81 světle modrá */
  --text-color: #1F2937;
  --bg-color: #FFFFFF;
}
```

### Logo a obsah
```php
// V header.php nahraďte logo:
<div class="logo">✈️ airport81</div>

// V functions.php přidejte Airport81 menu:
function airport81_menus() {
    register_nav_menus(array(
        'primary' => 'Primary Menu',
        'docks' => 'Docks Menu'
    ));
}
add_action('init', 'airport81_menus');
```

## 📱 TESTOVÁNÍ PO UPLOADU

### Základní funkcionalita:
```bash
1. https://airport81.eu - hlavní stránka
2. https://airport81.eu/wp-admin - admin přístup
3. Responsive design test (mobile/tablet)
4. rychlost načítání
5. všechny linky funkční
```

### Performance optimalizace:
```bash
1. Minifikace CSS/JS
2. Optimalizace obrázků
3. Browser caching
4. CDN pro Tailwind (už máte)
```

## 🔐 BEZPEČNOST

### Po uploadu změňte:
```bash
1. FTP heslo ⚠️ DŮLEŽITÉ!
2. WordPress admin hesla
3. Database hesla
4. API klíče (pokud používáte)
```

### Doporučené security pluginy:
```bash
- Wordfence Security
- Updraft Plus (zálohy)
- SSL certifikát aktivace
```

## ⚡ RYCHLÝ START CHECKLIST

- [ ] FTP klient připraven
- [ ] Backup současného webu
- [ ] WordPress soubory nahrány do /themes/droneservices/
- [ ] Téma aktivováno v WP Admin
- [ ] Databáze URL aktualizovány
- [ ] SSL certifikát aktivní
- [ ] Airport81 obsah a logo aktualizovány
- [ ] Responsive test dokončen
- [ ] FTP heslo změněno
- [ ] Performance optimalizace

## 🎯 VÝSLEDEK

Po dokončení budete mít:
✅ Profesionální Airport81 web na airport81.eu  
✅ Custom DroneServices téma aktivní  
✅ Futuristický design s Airport81 brandem  
✅ Responsive layout pro všechna zařízení  
✅ WordPress CMS pro snadnou správu obsahu

**Připraveno k vzlétnutí!** 🚀✈️