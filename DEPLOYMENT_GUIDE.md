# 🚀 NÁVOD NA ZPŘÍSTUPNĚNÍ WEBU ZÁKAZNÍKŮM

## MOŽNOST 1: Vercel (ZDARMA, NEJRYCHLEJŠÍ) ⭐ DOPORUČENO

### Kroky:
1. **Jděte na:** https://vercel.com
2. **Přihlaste se přes GitHub**
3. **Klikněte "Import Project"**
4. **Vyberte:** `airport81-hybrid-system`
5. **Nastavení:**
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. **Environment Variables - přidejte:**
   ```
   NEXT_PUBLIC_WORDPRESS_URL=https://vase-wordpress-url.com
   NEXT_PUBLIC_SITE_URL=https://airport81.vercel.app
   ```
7. **Deploy!**

**Výsledná URL:** `https://airport81.vercel.app` (nebo vlastní doména)

---

## MOŽNOST 2: Netlify (ZDARMA)

### Kroky:
1. **Jděte na:** https://netlify.com
2. **Přihlaste se přes GitHub**
3. **New site from Git**
4. **Vyberte:** `airport81-hybrid-system`
5. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`
6. **Deploy site**

**Výsledná URL:** `https://airport81.netlify.app`

---

## MOŽNOST 3: GitHub Pages (ZDARMA, ale jen statické)

### ⚠️ POZOR: GitHub Pages nepodporuje Next.js server funkce!

Musíme exportovat jako statický web:

1. **Upravte `package.json`:**
```json
"scripts": {
  "build": "next build",
  "export": "next export",
  "deploy": "npm run build && npm run export"
}
```

2. **Upravte `next.config.mjs`:**
```javascript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  }
}
```

3. **V terminálu:**
```bash
npm run deploy
git add .
git commit -m "Add static export for GitHub Pages"
git push
```

4. **Na GitHubu:**
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: /out

**Výsledná URL:** `https://majpuzik.github.io/airport81-hybrid-system`

---

## MOŽNOST 4: Vlastní hosting

### Pro WordPress + Next.js:

**Potřebujete:**
- VPS nebo cloud hosting (DigitalOcean, AWS, Linode)
- Node.js 18+ 
- MySQL databáze
- PHP 8.0+

### Jednoduchý hosting (jen Next.js):

**Railway.app** (7$ měsíčně):
1. https://railway.app
2. Connect GitHub
3. Deploy airport81-hybrid-system
4. Automaticky se nastartuje

**Render.com** (zdarma s limity):
1. https://render.com
2. New → Web Service
3. Connect GitHub repo
4. Deploy

---

## 🏆 DOPORUČENÝ POSTUP PRO RYCHLÉ SPUŠTĚNÍ:

### 1. VERCEL (5 minut):
```bash
# Nainstalujte Vercel CLI
npm i -g vercel

# V projektu spusťte:
cd /Users/m.a.j.puzik/airport81-starter
vercel

# Následujte instrukce v terminálu
```

### 2. Vlastní doména (pokud máte):
- V Vercel dashboard → Settings → Domains
- Add domain: `airport81.cz` nebo `www.airport81.cz`
- Nastavte DNS záznamy podle instrukcí

---

## 📱 WORDPRESS HOSTING

Pro plnou funkcionalitu potřebujete také WordPress:

### Doporučené hostingy:
1. **Wedos** (99 Kč/měsíc) - český, jednoduchý
2. **Hostinger** (89 Kč/měsíc) - rychlý, moderní
3. **SiteGround** (4€/měsíc) - profesionální

### WordPress instalace:
1. Nahrajte WordPress soubory přes FTP
2. Importujte databázi
3. Nastavte wp-config.php
4. Použijte Duplicator plugin pro migraci

---

## 🔗 PROPOJENÍ NEXT.JS + WORDPRESS

V `.env.production` nastavte:
```
NEXT_PUBLIC_WORDPRESS_URL=https://wordpress.airport81.cz
NEXT_PUBLIC_WORDPRESS_API=https://wordpress.airport81.cz/wp-json
```

---

## ⚡ RYCHLÝ START - VERCEL:

1. **Klikněte sem:** https://vercel.com/new/clone?repository-url=https://github.com/majpuzik/airport81-hybrid-system

2. **Vyplňte:**
   - Project Name: airport81
   - Framework: Next.js
   
3. **Deploy** → Hotovo za 2 minuty!

---

## 📞 POTŘEBUJETE POMOC?

- Vercel dokumentace: https://vercel.com/docs
- Next.js deployment: https://nextjs.org/docs/deployment
- Discord komunita: https://discord.gg/nextjs

---

*Vytvořeno: 14.9.2025*
*Projekt: Airport81 Hybrid System*