# 🚀 Airport81 Import do Elementor - Kompletní návod

## ⚡ RYCHLÝ START

### 1. Kontrola lokálního WordPressu
Ověřte že máte:
- ✅ WordPress běží lokálně 
- ✅ Elementor Pro aktivní
- ✅ Admin přístup

### 2. Import metody (3 způsoby)

## 🎯 METODA 1: Elementor AI Builder (NEJRYCHLEJŠÍ)

```bash
# 1. Jděte do WordPress Admin → Pages → Add New
# 2. Klikněte "Edit with Elementor" 
# 3. Klikněte na AI ikonu nebo "Build with AI"
# 4. Zadejte prompt:
```

**AI Prompt pro Elementor:**
```
Create an airport-themed business website for Airport81 with:
- Header with navigation menu and logo "✈️ airport81"
- Hero section with "LETIŠTĚ AIRPORT81 - Vítejte na letišti snů" 
- 4 services sections: Drone Dock, Foto Dock, Online Dock, Design Dock
- Newsletter signup "Nenechte si nic uletět"
- Footer with contact info +420 739 922 666
- Blue and orange color scheme
- Czech language content
- Airport terminal design theme
```

## 🛠️ METODA 2: Ruční stavba (DETAILNÍ KONTROLA)

### Krok 1: Vytvoření stránky
```bash
WordPress Admin → Pages → Add New → Edit with Elementor
```

### Krok 2: Header sekce
1. **Container** - full width
2. **Heading** - "✈️ airport81" (logo)
3. **Nav Menu** - horizontální menu

### Krok 3: Hero sekce  
1. **Section** - min-height: 100vh
2. **Background** - gradient blue (#1E3A8A → #60A5FA)
3. **Heading** - "LETIŠTĚ AIRPORT81" (h1, 4rem)
4. **Text** - "Vítejte na letišti snů, kde realizujeme Vaše představy"
5. **Button** - "Vzlétnout 🚀" (oranžové, rounded)

### Krok 4: Docks sekce
1. **Section** - light gray background
2. **Heading** - "Naše doky"
3. **Grid** - 4 columns, equal height
4. **Pro každý dock:**
   - **Icon Box** widget
   - **Image** - AI generated (použijte naše prompty)
   - **Heading** - název docku
   - **Text** - popis služby
   - **Button** - "Více informací"

### Krok 5: Posts sekce
1. **Section** - white background  
2. **Posts** widget nebo **Testimonials** widget
3. **3 columns** layout

### Krok 6: Newsletter
1. **Section** - blue gradient background
2. **Heading** - "Nenechte si nic uletět"
3. **Form** widget - email input + button

### Krok 7: Footer
1. **Footer** template
2. **4 columns** - info, kontakt, právní, provozovatel
3. **Contact info** - telefon, email, adresa

## 📋 METODA 3: JSON Import (POKROČILÁ)

### Krok 1: Vytvoření JSON šablony
```json
{
  "version": "0.4",
  "title": "Airport81 Landing Page",
  "type": "page",
  "content": [
    {
      "id": "hero-section",
      "elType": "section", 
      "settings": {
        "background_background": "gradient",
        "background_color": "#1E3A8A",
        "background_color_stop": 0,
        "background_color_b": "#60A5FA",
        "min_height": {"unit": "vh", "size": 100}
      },
      "elements": [
        {
          "id": "hero-heading",
          "elType": "widget",
          "widgetType": "heading",
          "settings": {
            "title": "LETIŠTĚ AIRPORT81",
            "size": "xxl",
            "color": "#ffffff"
          }
        }
      ]
    }
  ]
}
```

## 🎨 AI OBRÁZKY PRO ELEMENTOR

### Generování obrázků:
1. **DALL-E 3** (v ChatGPT Plus):
```
Modern airport terminal interior with blue lighting, people silhouettes walking, drones flying overhead, 16:9 aspect ratio
```

2. **Midjourney** (Discord):
```
/imagine Professional DJI drone hovering over modern Czech villa with pool, aerial photography --ar 16:9 --v 6
```

3. **Adobe Firefly** (v Photoshopu):
- Použijte naše připravené prompty
- Generujte v rozlišení 1920x1080

### Upload do WordPress:
```bash
WordPress Admin → Media → Add New → Upload files
```

## ⚙️ ELEMENTOR NASTAVENÍ

### Globální barvy:
```css
Primary: #1E3A8A (tmavě modrá)
Secondary: #F59E0B (oranžová)  
Accent: #60A5FA (světle modrá)
Text: #1F2937 (tmavá)
```

### Globální fonty:
```css
Primary: Arial, sans-serif
Headings: Bold, letter-spacing: 2px
Body: Regular, line-height: 1.6
```

### Responsive breakpoints:
```css
Desktop: 1024px+
Tablet: 768px - 1023px  
Mobile: 0px - 767px
```

## 🚀 RYCHLÉ PŘÍKAZY

### Spuštění lokálního WordPressu:
```bash
# Pokud používáte Local by Flywheel:
open /Applications/Local.app

# Pokud používáte MAMP:
open /Applications/MAMP/MAMP.app

# Pokud používáte XAMPP:
sudo /Applications/XAMPP/xamppfiles/xampp start
```

### WordPress Admin přístup:
```bash
# Typicky:
http://localhost:8080/wp-admin
# nebo
http://airport81.local/wp-admin
```

## 📞 KONTAKT INFORMACE PRO WEB

```
Telefon: +420 739 922 666
Email: info@airport81.cz
Adresa: Praha, Czech Republic
Otevírací doba: Po-Pá: 10:00-12:00 / 13:30-19:00
```

## ✅ CHECKLIST IMPORTU

- [ ] WordPress běží lokálně
- [ ] Elementor Pro aktivní  
- [ ] Nová stránka vytvořena
- [ ] AI Builder použit NEBO ruční stavba dokončena
- [ ] AI obrázky vygenerovány a nahrány
- [ ] Responsive design otestován
- [ ] Kontaktní informace přidány
- [ ] Czech language pack aktivní
- [ ] SEO optimalizace dokončena

## 🎯 VÝSLEDEK

Po dokončení budete mít:
- ✅ Plně funkční Airport81 web
- ✅ Responsive design
- ✅ AI generované obrázky
- ✅ Profesionální vzhled
- ✅ Czech language content
- ✅ Kontaktní formuláře
- ✅ SEO optimalizace