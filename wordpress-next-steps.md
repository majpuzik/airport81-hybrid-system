# Další kroky pro váš Zahnpasta web

## 1. Instalace potřebných pluginů
V administraci jděte na **Pluginy → Přidat nový** a nainstalujte:
- **Elementor** (pro úpravu stránek)
- **WooCommerce** (pro e-shop funkcionalitu)

## 2. Import demo produktů
Spusťte v prohlížeči:
```
http://localhost:8000/auto-install.php
```

## 3. Přizpůsobení
- **Vzhled → Přizpůsobit** - změna barev, loga
- **Stránky → Všechny stránky** - úprava obsahu
- **Produkty** - přidání vlastních zubních past

## 4. Pro nahrání na Synology NAS
Použijte vytvořené skripty:
- `simple-upload.sh` - nahraje na NAS
- `deploy-via-dsm.sh` - návod pro DSM

## 5. Pro odeslání kolegovi
Balíčky jsou připraveny:
- `zahnpasta-ftp-package.zip`
- `zahnpasta-ftp-complete.zip`

## Přihlašovací údaje
- Admin URL: http://localhost:8000/wp-admin
- Uživatel: admin
- Heslo: (vaše zvolené při instalaci)