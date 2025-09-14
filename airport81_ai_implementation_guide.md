# 🚀 Airport81 - Implementační průvodce pro AI Website Buildery

## 📋 RYCHLÝ PŘEHLED
Vytvořil jsem kompletní HTML web podle vašeho PDF designu. Nyní můžete:
1. Použít přímo HTML soubor
2. Implementovat přes AI website builder
3. Generovat obrázky pomocí AI

---

## 🎯 OPTION 1: PŘÍMÉ POUŽITÍ HTML

### Soubor připraven k použití:
```
/Users/m.a.j.puzik/airport81_final.html
```

### Rychlé spuštění:
1. Otevřete soubor v prohlížeči
2. Nebo nahrajte na Netlify: https://app.netlify.com/drop
3. Získáte okamžitě funkční web

---

## 🤖 OPTION 2: IMPLEMENTACE PŘES AI WEBSITE BUILDERY

### 1. **Framer AI** (DOPORUČENO) 
URL: https://framer.com

#### Postup:
1. Vytvořte účet na Framer
2. Klikněte "Start with AI"
3. Použijte tento prompt:

```
Create a modern aviation-themed website for Airport81, a Czech drone filming and digital services company.

Structure based on airport theme:
- Hero section with video background, headline "LETIŠTĚ AIRPORT81"
- Intro section "Vítejte na letišti snů"
- 4 service docks: Drone Dock, Foto Dock, Online Dock, Design Dock
- Posts/news section
- Newsletter signup "Nenechte si nic uletět"
- Contact section "Info Desk"

Color scheme:
- Primary: Deep blue (#1E3A8A) 
- Accent: Orange (#F59E0B)
- Support: Green (#10B981)

Style: Modern, clean, aviation-inspired with airplane icons and airport metaphors throughout.

Include Czech language content.
```

### 2. **10Web AI** 
URL: https://10web.io

#### Výhody:
- Automaticky generuje WordPress web
- AI asistent pro úpravy
- Hosting included

#### Postup:
1. Nahrajte screenshot PDF designu
2. AI automaticky vytvoří strukturu
3. Upravte texty na české

### 3. **Durable AI**
URL: https://durable.co

#### Výhody:
- Vytvoří web za 30 sekund
- Automatické SEO
- Integrované formuláře

---

## 🎨 OPTION 3: GENEROVÁNÍ OBRÁZKŮ POMOCÍ AI

### Použijte tyto prompty v Midjourney/DALL-E/Stable Diffusion:

#### Hero sekce - Hlavní vizuál:
```
Modern airport terminal interior with blue lighting, people silhouettes walking, 
drones flying overhead, futuristic design, cinematic lighting, wide angle, 
photorealistic, professional photography --ar 16:9
```

#### Drone Dock:
```
Professional DJI drone hovering over modern Czech villa with pool, golden hour 
lighting, aerial photography perspective, crystal clear, commercial real estate 
photography style --ar 16:9
```

#### Foto Dock:
```
Professional photographer in modern Prague office taking business portrait, 
soft studio lighting, blurred background, corporate environment, 
high-end camera equipment visible --ar 16:9
```

#### Online Dock:
```
Modern responsive website mockup on multiple devices (MacBook, iPad, iPhone), 
clean minimalist design with blue and orange accents, floating in space, 
3D render, tech startup aesthetic --ar 16:9
```

#### Design Dock:
```
Creative workspace with design tools, color swatches, brand guidelines spread out, 
modern Prague office, minimalist aesthetic, natural lighting, 
overhead shot --ar 16:9
```

#### Terminal sekce:
```
Futuristic airport terminal with flying drones, holographic displays, 
people silhouettes, blue and orange lighting, cyberpunk aesthetic, 
wide panoramic view --ar 21:9
```

---

## 💻 OPTION 4: HOSTOVÁNÍ ZDARMA

### **Netlify** (nejjednodušší)
1. Jděte na https://app.netlify.com/drop
2. Přetáhněte airport81_final.html
3. Získáte URL typu: https://amazing-site-123.netlify.app

### **Vercel**
1. Nahrajte na GitHub
2. Spojte s Vercel
3. Automatický deploy

### **GitHub Pages**
1. Vytvořte repo na GitHubu
2. Nahrajte HTML
3. Aktivujte Pages v Settings

---

## 🔧 TECHNICKÉ DETAILY

### Struktura webu (podle PDF):
```
HOMEPAGE
├── Sidescroller (informační pás)
├── Top Menu (navigace)
├── Hero Section (video pozadí)
├── Intro Section  
├── 4 Docks (služby)
├── Posts (novinky)
├── Newsletter
├── Social Media
└── Footer

SUBPAGES
├── Drone Dock (5 služeb)
├── Foto Dock (4 služby)
├── Online Dock (3 služby)
├── Design Dock (4 služby)
├── Terminal (O nás)
└── Info Desk (Kontakt)
```

### Barevná paleta:
- **Primární modrá:** #1E3A8A
- **Světle modrá:** #3B82F6
- **Nebeská modrá:** #60A5FA
- **Oranžová:** #F59E0B
- **Zelená:** #10B981

### Fonty:
- **Nadpisy:** Montserrat nebo Inter Bold
- **Tělo:** Inter Regular
- **Akcenty:** Poppins Medium

---

## ✅ CHECKLIST PRO SPUŠTĚNÍ

- [ ] HTML soubor vytvořen a otestován
- [ ] Vybrat hosting platform
- [ ] Generovat AI obrázky (optional)
- [ ] Nahrát na hosting
- [ ] Otestovat na mobilu
- [ ] Přidat Google Analytics
- [ ] Nastavit kontaktní formulář
- [ ] SEO optimalizace
- [ ] Přidat favicon

---

## 📞 RYCHLÁ POMOC

### Web běží lokálně:
```bash
# Otevřít v prohlížeči
open /Users/m.a.j.puzik/airport81_final.html
```

### Rychlý test:
```bash
# Python server
cd /Users/m.a.j.puzik
python3 -m http.server 8000
# Pak otevřít: http://localhost:8000/airport81_final.html
```

---

## 🎉 HOTOVO!

Web je připraven k použití. Obsahuje:
- ✅ Kompletní strukturu podle PDF
- ✅ České texty
- ✅ Letištní/aviation téma
- ✅ Moderní responzivní design
- ✅ Animace a interaktivní prvky
- ✅ Připraveno pro AI obrázky

**Vytvořeno:** 2025-09-07
**Design podle:** Airport81 - Struktura_v2.pdf