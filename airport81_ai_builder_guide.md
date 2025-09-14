# 🚀 Airport81 - Průvodce vytvoření webu pomocí AI nástrojů

## 📋 PŘEHLED AI WEBSITE BUILDERŮ

### 1. **Framer AI** (DOPORUČENO)
- **URL:** https://framer.com
- **Cena:** Free tier dostupný
- **Výhody:** 
  - Nejlepší pro moderní, animovaný design
  - AI generuje celý web z promptu
  - Skvělé pro portfolio a prezentační weby

### 2. **Uizard**
- **URL:** https://uizard.io
- **Výhody:**
  - Rychlé prototypování
  - Import z PDF designu
  - Kolaborace v týmu

### 3. **TeleportHQ**
- **URL:** https://teleporthq.io
- **Výhody:**
  - Export do čistého HTML/CSS/React
  - Vision API - převod náčrtku na web
  - Headless CMS integrace

---

## 🎯 POSTUP VYTVOŘENÍ WEBU VE FRAMER AI

### Krok 1: Registrace a setup
1. Jděte na https://framer.com
2. Vytvořte účet (free tier stačí)
3. Klikněte na "Start with AI"

### Krok 2: AI Prompt pro Airport81
Zkopírujte tento prompt do Framer AI:

```
Create a modern website for Airport81, a drone filming and digital services company based in Prague.

Structure:
- Homepage with hero video background, 4 service cards (Drone Dock, Foto Dock, Online Dock, Design Dock)
- Drone services page with aerial real estate, event coverage, wedding filming, building inspections
- Photography services page with business portraits, event photography, product shoots
- Digital services page with web development, SEO, landing pages
- Design services page with branding, visual communication, AI tools
- About page with company story and process
- Contact page with form and info

Style:
- Modern, professional, aviation-themed
- Colors: Dark blue (#1E3A8A), Orange (#F59E0B), Green (#10B981)
- Minimalist with smooth animations
- Mobile responsive

Include Czech language text and Prague location references.
```

### Krok 3: Přizpůsobení designu
1. **Nahrání vlastních obrázků:**
   - Logo Airport81
   - Dronové záběry
   - Portfolio fotky

2. **Úprava textů:**
   - Přeložit do češtiny
   - Přidat konkrétní reference
   - Upravit kontaktní údaje

3. **Animace a efekty:**
   - Parallax scrolling pro hero sekci
   - Hover efekty na kartách služeb
   - Smooth scroll mezi sekcemi

---

## 🖼️ AI PROMPTY PRO GENEROVÁNÍ OBRÁZKŮ

### Hero sekce - Hlavní vizuál:
```
Professional drone flying over Prague skyline at golden hour, cinematic lighting, aerial photography style, high detail, 4K quality, modern technology aesthetic
```

### Drone Dock vizuál:
```
DJI drone capturing aerial footage of modern villa with pool, professional real estate photography, sunny day, Czech countryside, ultra realistic, commercial photography
```

### Foto Dock vizuál:
```
Professional photographer with camera in modern Prague office, business portrait session, soft studio lighting, bokeh background, corporate photography style
```

### Online Dock vizuál:
```
Modern responsive website design on multiple devices (laptop, tablet, phone), clean UI, blue and orange color scheme, minimalist design, tech startup aesthetic
```

### Design Dock vizuál:
```
Creative workspace with design tools, brand guidelines, color swatches, modern office in Prague, minimalist aesthetic, professional branding materials
```

---

## 💻 ALTERNATIVA: POUŽITÍ HTML ŠABLONY

### Krok 1: Základní HTML
Již vytvořený soubor: `/Users/m.a.j.puzik/airport81_website.html`

### Krok 2: Hostování zdarma
1. **Netlify** (nejjednodušší):
   - Přetáhněte HTML soubor na https://app.netlify.com/drop
   - Získáte instant URL

2. **GitHub Pages**:
   - Nahrajte na GitHub
   - Aktivujte Pages v nastavení

3. **Vercel**:
   - Import z GitHubu
   - Automatický deploy

---

## 🔧 TECHNICKÉ POŽADAVKY

### Doména:
- Doporučená: `airport81.cz` nebo `airport81.eu`
- Registrace: WEDOS, Forpsi, nebo Namecheap

### Hosting (pokud nepoužíváte Framer):
- **Malý web:** Netlify/Vercel (zdarma)
- **E-commerce:** Shopify
- **Custom řešení:** DigitalOcean

### SEO optimalizace:
```html
<meta name="description" content="Airport81 - Profesionální dronové natáčení, fotografie a digitální služby v Praze">
<meta name="keywords" content="dronové natáčení Praha, aerial filming, wedding drone, real estate photography">
<meta property="og:title" content="Airport81 - Váš letový plán k digitálnímu úspěchu">
<meta property="og:image" content="path/to/social-image.jpg">
```

---

## 📱 KONTAKTNÍ FORMULÁŘ - INTEGRACE

### EmailJS (zdarma):
```javascript
// Přidat do HTML
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
emailjs.init("YOUR_PUBLIC_KEY");

function sendEmail(e) {
    e.preventDefault();
    emailjs.sendForm('service_id', 'template_id', this)
        .then(() => alert('Zpráva odeslána!'));
}
</script>
```

### Netlify Forms (automaticky):
```html
<form name="contact" method="POST" data-netlify="true">
    <!-- form fields -->
</form>
```

---

## 🚀 SPUŠTĚNÍ A PROPAGACE

### 1. Launch checklist:
- [ ] Všechny texty v češtině
- [ ] Kontaktní údaje správné
- [ ] Formulář funkční
- [ ] Mobile responsive
- [ ] Rychlost načítání < 3s

### 2. Marketing:
- Google My Business profil
- Facebook/Instagram stránky
- LinkedIn company page
- Seznam.cz Firmy

### 3. Analytics:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

---

## 📞 PODPORA

Pokud potřebujete pomoc:
1. Framer AI support: https://framer.com/support
2. Komunita: https://discord.gg/framer
3. Tutoriály: YouTube "Framer AI tutorial"

---

**Vytvořeno pro Airport81**
*Datum: 2025-09-07*