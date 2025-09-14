# 🚀 AIRPORT81 - HYBRIDNÍ ARCHITEKTURA
## Božské pravidlo č. 6: Next.js + WordPress/Elementor pro CSS

---

## 🎯 KONCEPT HYBRIDNÍHO ŘEŠENÍ

```
┌─────────────────────────────────────────────────────┐
│                    FRONTEND                          │
│                   Next.js App                        │
│              (React, TypeScript, Tailwind)          │
│                                                      │
│  - Rychlost statického webu                         │
│  - Moderní komponenty                               │
│  - SEO optimalizace                                 │
│  - Interaktivní prvky                               │
└──────────────────┬──────────────────────────────────┘
                   │
                   │ API Call pro CSS
                   │ (REST API / GraphQL)
                   ↓
┌─────────────────────────────────────────────────────┐
│                    BACKEND                           │
│              WordPress + Elementor                   │
│                  (Headless CMS)                      │
│                                                      │
│  - Správa CSS stylů                                 │
│  - Elementor visual editor                          │
│  - Custom CSS editor                                │
│  - Uživatelské rozhraní pro klienta                │
└──────────────────────────────────────────────────────┘
```

---

## 🔧 JAK TO FUNGUJE

### 1. **Next.js (Frontend)**
- Běží jako hlavní web na `airport81.eu`
- Načítá CSS z WordPress API při buildu nebo runtime
- Cachuje styly pro rychlost
- Zobrazuje obsah

### 2. **WordPress (Backend)**
- Běží na subdoméně `admin.airport81.eu`
- Slouží POUZE pro editaci CSS a správu obsahu
- Elementor pro vizuální editaci stylů
- Custom CSS editor pro pokročilé úpravy

### 3. **Propojení**
```javascript
// Next.js načítá CSS z WordPress
const styles = await fetch('https://admin.airport81.eu/wp-json/airport81/v1/styles');
```

---

## 📁 STRUKTURA PROJEKTU

```
airport81-starter/
├── /app/                    # Next.js stránky
├── /components/             # React komponenty
├── /styles/
│   ├── globals.css         # Základní styly
│   └── wordpress.css       # Dynamické styly z WP (generované)
├── /lib/
│   └── wordpress.ts        # WP API integrace
├── /api/
│   └── sync-styles/        # Endpoint pro sync stylů
└── /wordpress-plugin/       # WP plugin pro správu CSS
    └── airport81-css-manager/
```

---

## 🎨 VÝHODY TOHOTO ŘEŠENÍ

### ✅ Pro vývojáře:
- Moderní Next.js stack
- TypeScript, React Hooks
- Rychlý vývoj
- Git verzování

### ✅ Pro klienta:
- Jednoduchá editace CSS v Elementoru
- Vizuální editor
- Okamžité náhledy
- Žádné znalosti kódu

### ✅ Pro výkon:
- Staticky generované stránky
- CDN distribuce
- Rychlé načítání
- SEO optimalizace

---

## 🔄 WORKFLOW

### Vývojář:
1. Vytvoří komponenty v Next.js
2. Definuje CSS třídy
3. Napojí na WordPress API

### Klient:
1. Přihlásí se do WordPress
2. Otevře Elementor
3. Upraví styly vizuálně
4. Uloží → automaticky se projeví na webu

### Automatizace:
- Webhook při uložení v WP
- Next.js revaliduje cache
- Nové CSS se aplikují

---

## 🛠️ IMPLEMENTACE

### Krok 1: WordPress Plugin
```php
// Registruje API endpoint pro CSS
add_action('rest_api_init', function() {
    register_rest_route('airport81/v1', '/styles', [
        'methods' => 'GET',
        'callback' => 'get_custom_styles'
    ]);
});
```

### Krok 2: Next.js Integration
```typescript
// Načítání stylů z WordPress
export async function getStyles() {
    const res = await fetch(`${WP_API}/styles`, {
        next: { revalidate: 60 } // Cache na 1 minutu
    });
    return res.json();
}
```

### Krok 3: Elementor Custom Panel
```javascript
// Přidá panel pro Airport81 styly
elementor.modules.controls.Section.extend({
    name: 'airport81_styles',
    title: 'Airport81 CSS Manager'
});
```

---

## 🎯 USE CASES

### 1. Změna barev
**Klient:** "Chci změnit modrou na zelenou"
**Řešení:** Elementor → Global Colors → Uložit → Hotovo

### 2. Úprava fontů
**Klient:** "Větší písmo na mobilu"
**Řešení:** Elementor → Typography → Responsive → Uložit

### 3. Animace
**Klient:** "Přidat hover efekt"
**Řešení:** Custom CSS panel → Přidat CSS → Uložit

### 4. Layout změny
**Vývojář:** Musí upravit Next.js komponenty
**Klient:** Může jen upravit styly, ne strukturu

---

## 🔐 BEZPEČNOST

- WordPress běží na oddělené subdoméně
- API vyžaduje autentizaci
- CSS je sanitizováno před aplikací
- Žádné PHP/JS injection možnosti
- Verzování změn

---

## 📊 SROVNÁNÍ S JINÝMI PŘÍSTUPY

| Aspekt | Čistý Next.js | Čistý WordPress | Hybridní řešení |
|--------|---------------|-----------------|-----------------|
| Rychlost | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| Editace | ⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Flexibilita | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Údržba | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| Cena | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |

---

## 🚀 ZÁVĚR

Toto hybridní řešení kombinuje:
- **Rychlost a modernost Next.js**
- **Jednoduchost editace v Elementoru**
- **Flexibilitu custom CSS**
- **Škálovatelnost do budoucna**

Je to ideální řešení pro klienty, kteří chtějí:
- Moderní, rychlý web
- Možnost upravovat styly sami
- Profesionální správu
- Rozumnou cenu

**Božské pravidlo č. 6 = Next.js frontend + WordPress CSS backend!**