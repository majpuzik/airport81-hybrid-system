# HESK 3.6.3 - Instalace dokončena ✅

## 🌐 Přístupové údaje

### Webová aplikace
- **URL**: http://localhost:8085
- **Instalační průvodce**: http://localhost:8085/install

### Databáze MySQL
- **Host**: hesk-mysql (pro interní použití v HESK)
- **Port**: 3307 (externí přístup)
- **Databáze**: hesk_db
- **Uživatel**: hesk_user
- **Heslo**: hesk_pass_2025
- **Root heslo**: hesk_root_2025

## 📋 Instalační kroky

1. Otevřete http://localhost:8085/install v prohlížeči
2. Postupujte podle instalačního průvodce:
   - Zvolte jazyk instalace
   - Vyplňte databázové údaje (viz výše)
   - Nastavte administrátorský účet
   - Dokončete konfiguraci

3. **DŮLEŽITÉ**: Po dokončení instalace smažte složku `install`:
   ```bash
   rm -rf "/Users/m.a.j.puzik/Downloads/hesk363 2/install"
   ```

## 🐳 Docker kontejnery

Běžící kontejnery:
- `hesk-mysql` - MySQL 8.0 databáze na portu 3307
- `hesk-app` - PHP 8.1 s Apache na portu 8085

### Správa kontejnerů

Zastavení:
```bash
docker stop hesk-app hesk-mysql
```

Spuštění:
```bash
docker start hesk-mysql hesk-app
```

Restart:
```bash
docker restart hesk-app hesk-mysql
```

Zobrazení logů:
```bash
docker logs hesk-app
docker logs hesk-mysql
```

## 🔧 Konfigurace

Konfigurační soubor HESK:
```
/Users/m.a.j.puzik/Downloads/hesk363 2/hesk_settings.inc.php
```

## 📂 Důležité složky

- **Přílohy**: `/Users/m.a.j.puzik/Downloads/hesk363 2/attachments`
- **Cache**: `/Users/m.a.j.puzik/Downloads/hesk363 2/cache`

## 🚀 Funkce HESK

HESK je kompletní help desk systém s:
- Ticketing systémem
- Knowledge base
- Správou uživatelů a rolí
- Automatickými odpověďmi
- Reporty a statistiky
- Multi-jazykovou podporou
- Email integrací

## ⚠️ Bezpečnostní doporučení

1. Změňte výchozí hesla po instalaci
2. Smažte instalační složku
3. Nastavte HTTPS pro produkční použití
4. Pravidelně zálohujte databázi