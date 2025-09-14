# 📤 NÁVOD PRO NAHRÁNÍ NA GITHUB

## 🚀 RYCHLÝ POSTUP

### 1. Přihlášení do GitHub CLI
```bash
gh auth login
```
Vyberte:
- GitHub.com
- HTTPS
- Login with web browser

### 2. Vytvoření repository
```bash
gh repo create airport81-hybrid-system --public \
  --description "Airport81 - Hybrid WordPress + Next.js website system with Elementor support and dual CSS management" \
  --source=. \
  --remote=origin \
  --push
```

### 3. NEBO manuálně přes GitHub web:

1. Jděte na https://github.com/new
2. Repository name: `airport81-hybrid-system`
3. Description: `Airport81 - Hybrid WordPress + Next.js website system with Elementor support and dual CSS management`
4. Public repository
5. Create repository

### 4. Pak v terminálu:
```bash
cd /Users/m.a.j.puzik/airport81-starter

# Přidání remote
git remote add origin https://github.com/[VÁŠ_USERNAME]/airport81-hybrid-system.git

# Push na GitHub
git branch -M main
git push -u origin main
```

---

## 📋 CO JE V REPOSITORY

### Hlavní soubory:
- **Next.js aplikace** - moderní frontend
- **WordPress pluginy** - pro hybridní CSS systém
- **Elementor templates** - opravené s `the_content()`
- **Admin rozhraní** - dual CSS editory
- **Dokumentace** - kompletní návody a postupy

### Klíčové features:
- ✅ Elementor kompatibilita (opraveno)
- ✅ Český jazyk pro WordPress
- ✅ Hybridní CSS systém
- ✅ Admin dashboard
- ✅ Docker compose setup

---

## 🔑 DŮLEŽITÉ SOUBORY

### Dokumentace:
- `ELEMENTOR_FIX_POSTUPY.md` - Návod na opravu Elementor chyb
- `AIRPORT81_ELEMENTOR_FIX_DOCUMENTATION.md` - Kompletní dokumentace projektu
- `HYBRID-ARCHITECTURE.md` - Architektura hybridního systému

### Konfigurace:
- `.env.example` - Příklad environment variables
- `docker-compose.yml` - Docker setup
- `package.json` - Node.js dependencies

---

## 🌐 DEPLOYMENT

### Local development:
```bash
# Next.js
npm install
npm run dev

# WordPress (Docker)
docker-compose up -d
```

### Production:
- Next.js: Deploy na Vercel/Netlify
- WordPress: Hosting s PHP 8.0+ a MySQL

---

## 📞 KONTAKT

Projekt vytvořen: 14.9.2025
Autor: M.A.J.Pužík + Claude Code Assistant
Status: Production Ready