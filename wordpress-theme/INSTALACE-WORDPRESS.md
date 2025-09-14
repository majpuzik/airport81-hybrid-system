# 🚀 Airport81 - Instalace WordPress tématu s Elementorem

## 📋 Božské pravidlo č. 6: Hybridní WordPress řešení

Tento návod ti ukáže, jak nainstalovat a nastavit **Airport81 WordPress téma** s plnou podporou **Elementoru** pro snadnou editaci.

---

## 1️⃣ POŽADAVKY

- **WordPress** 5.8 nebo novější
- **PHP** 7.4 nebo novější
- **Elementor FREE** (Pro verze pro pokročilé funkce)
- **MySQL** 5.6+ nebo MariaDB 10.1+

---

## 2️⃣ INSTALACE WORDPRESS

### Možnost A: Lokální instalace (MAMP/XAMPP)
```bash
# 1. Stáhni MAMP (Mac) nebo XAMPP (Windows)
# 2. Spusť Apache a MySQL
# 3. Vytvoř databázi: airport81_db
# 4. Stáhni WordPress z wordpress.org
# 5. Rozbal do /htdocs/airport81/
```

### Možnost B: Na hostingu
```bash
# 1. Přihlaš se do cPanel
# 2. Použij Softaculous nebo WP installer
# 3. Nastav:
   - Doména: airport81.eu
   - Databáze: nová
   - Admin: tvůj email
```

---

## 3️⃣ INSTALACE AIRPORT81 TÉMATU

### Krok 1: Nahraj téma
```bash
# Zkopíruj složku wordpress-theme/airport81 do:
/wp-content/themes/airport81/
```

### Krok 2: Aktivuj téma
1. WordPress Admin → **Vzhled** → **Motivy**
2. Najdi **Airport81**
3. Klikni **Aktivovat**

---

## 4️⃣ INSTALACE ELEMENTORU

### Z WordPress admin:
1. **Pluginy** → **Přidat nový**
2. Vyhledej: **"Elementor"**
3. **Nainstalovat** → **Aktivovat**

### Doporučené Elementor addony:
```
- Essential Addons for Elementor
- Elementor Custom Skin
- Dynamic Content for Elementor
```

---

## 5️⃣ IMPORT DEMO OBSAHU

### Automatický import:
```php
// V WordPress admin → Nástroje → Import
// Nahraj soubor: airport81-demo-content.xml
```

### Ruční vytvoření stránek:

#### 1. Homepage
- **Název:** Úvod
- **Šablona:** Elementor Canvas
- **URL:** /

#### 2. Drone Dock
- **Název:** Drone Dock
- **Šablona:** Elementor Full Width
- **URL:** /drone-dock

#### 3. Foto Dock
- **Název:** Foto Dock
- **Šablona:** Elementor Full Width
- **URL:** /foto-dock

#### 4. Online Dock
- **Název:** Online Dock
- **Šablona:** Elementor Full Width
- **URL:** /online-dock

#### 5. Design Dock
- **Název:** Design Dock
- **Šablona:** Elementor Full Width
- **URL:** /design-dock

#### 6. Kontakt
- **Název:** Kontakt
- **Šablona:** Default
- **URL:** /kontakt

---

## 6️⃣ NASTAVENÍ ELEMENTORU

### Základní nastavení:
```
Elementor → Nastavení:
✓ Post Types: Stránky, Příspěvky, Drone projekty, Foto galerie
✓ Disable Default Colors
✓ Disable Default Fonts
✓ Globální barvy: Použij Airport81 paletu
```

### Vlastní CSS v Elementoru:
```css
/* Přidej do Elementor → Custom CSS */

/* Airport81 brand barvy */
:root {
  --airport-blue: #3b82f6;
  --airport-purple: #a855f7;
  --airport-green: #10b981;
  --airport-pink: #ec4899;
}

/* Departure board efekt */
.departure-board {
  background: #000;
  color: #fbbf24;
  font-family: monospace;
  padding: 30px;
  border-radius: 10px;
}
```

---

## 7️⃣ VYTVOŘENÍ MENU

### Hlavní navigace:
```
Vzhled → Menu → Vytvořit nové menu:

✈️ AIRPORT81 (logo/home)
├── 🚁 Drone Dock
├── 📸 Foto Dock
├── 🌐 Online Dock
├── 🎨 Design Dock
├── ✈️ Terminál
└── 📞 Kontakt
```

---

## 8️⃣ POUŽITÍ SHORTCODES

### Departure Board:
```
[airport_departure_board gates="4"]
```

### Dock Card:
```
[airport_dock_card 
  dock="drone" 
  title="Letecké natáčení" 
  description="4K/8K video z dronu"
  image="/images/drone-1.jpg"]
```

---

## 9️⃣ CUSTOM WIDGETY V ELEMENTORU

Po aktivaci tématu najdeš v Elementoru:

### Airport81 Widgety:
- **Departure Board** - Odletová tabule
- **Dock Card** - Karta služby
- **AI Terminal** - Interaktivní terminál
- **Runway Lights** - Animované světla

### Jak používat:
1. Edituj stránku v Elementoru
2. V levém panelu najdi **"Airport81 Widgety"**
3. Přetáhni widget na stránku
4. Nastav vlastnosti v pravém panelu

---

## 🔟 OPTIMALIZACE

### Cache plugin:
```
Doporučené: WP Rocket nebo W3 Total Cache
```

### Obrázky:
```bash
# Optimalizuj všechny obrázky:
- Plugin: Smush nebo ShortPixel
- Formát: WebP
- Lazy loading: Automaticky v tématu
```

### Rychlost:
```
- Minifikace CSS/JS: Autoptimize
- CDN: Cloudflare (zdarma)
- Hosting: Doporučujeme SSD hosting
```

---

## 🎨 EDITACE V ELEMENTORU

### Globální styly:
```
Elementor → Nastavení webu → Globální styly:
- Barvy: Nastav Airport81 paletu
- Typografie: Hlavní + Accent font
- Tlačítka: Gradient styly
```

### Responsivní úpravy:
```
V Elementoru klikni na ikonu:
📱 Mobil | 📱 Tablet | 💻 Desktop
```

### Custom CSS pro widget:
```css
/* Příklad pro konkrétní widget */
selector .departure-board {
  animation: glow 2s ease-in-out infinite;
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
  50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8); }
}
```

---

## 📁 STRUKTURA SOUBORŮ

```
/wp-content/themes/airport81/
├── style.css              # Hlavní styly + Elementor custom CSS
├── functions.php          # PHP funkce, hooks, custom post types
├── index.php             # Hlavní šablona
├── header.php            # Hlavička webu
├── footer.php            # Patička webu
├── /assets/
│   ├── /css/            # Dodatečné styly
│   ├── /js/             # JavaScript
│   └── /images/         # Obrázky tématu
├── /elementor-widgets/   # Custom Elementor widgety
├── /page-templates/      # Šablony stránek
└── /blocks/             # Gutenberg bloky (optional)
```

---

## ⚡ RYCHLÝ START

```bash
# 1. Nainstaluj WordPress
# 2. Nahraj téma airport81
# 3. Aktivuj téma
# 4. Nainstaluj Elementor
# 5. Importuj demo obsah
# 6. Nastav menu
# 7. Začni editovat v Elementoru!
```

---

## 🛠️ TROUBLESHOOTING

### Elementor se nenačítá:
```
- Zvyš PHP memory limit na 256M
- Deaktivuj ostatní pluginy
- Přepni na výchozí téma a zpět
```

### Chybí styly:
```
- Elementor → Nástroje → Regenerate CSS
- Vymaž cache
```

### 404 na stránkách:
```
- Nastavení → Trvalé odkazy → Uložit (refresh)
```

---

## 📞 PODPORA

- **Dokumentace:** [airport81.eu/docs](https://airport81.eu/docs)
- **Email:** support@airport81.eu
- **Elementor docs:** [elementor.com/help](https://elementor.com/help)

---

## ✅ HOTOVO!

Tvůj **Airport81 hybridní web** je připraven! 

Můžeš:
- ✏️ Editovat obsah drag-and-drop v Elementoru
- 🎨 Upravovat CSS přímo v Elementor → Custom CSS
- 🚀 Kombinovat statický a dynamický obsah
- 📱 Vše je plně responzivní
- ⚡ Optimalizováno pro rychlost

**Božské pravidlo č. 6 splněno!** 🎉