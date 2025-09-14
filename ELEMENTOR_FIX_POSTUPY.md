# 🔧 ELEMENTOR OPRAVY - POSTUPY PRO PŘÍŠTĚ

## ⚠️ CHYBA: "Oblast s obsahem nebyla na vaší stránce nalezena"

### 🎯 HLAVNÍ PŘÍČINY:
1. **`the_content()` funkce chybí** v template souborech
2. **PHP template nekompatibilní** s Elementor builderem  
3. **Permalink konflikty** 
4. **WordPress není v češtině**

---

## ✅ POSTUP OPRAVY KROK ZA KROKEM

### KROK 1: Diagnostika problému
```bash
# Zkontroluj, která stránka má problém
docker exec [container] wp post list --post_type=page --fields=ID,post_title,post_name --allow-root

# Zkontroluj Elementor edit mode
docker exec [container] wp post meta get [PAGE_ID] _elementor_edit_mode --allow-root
```

### KROK 2: Kontrola template souboru
```bash
# Najdi odpovídající template (front-page.php, page.php, index.php)
docker exec [container] ls -la /var/www/html/wp-content/themes/[theme]/

# Zkontroluj, zda obsahuje the_content()
docker exec [container] grep -n "the_content" /path/to/template.php
```

### KROK 3: Oprava template souboru
**VZOR PRO FRONT-PAGE.PHP:**
```php
<?php
get_header();
?>
<main id="primary" class="site-main">
    <?php if (have_posts()) : ?>
        <?php while (have_posts()) : the_post(); ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <div class="entry-content">
                    <?php
                    // KRITICKÉ: the_content() pro Elementor kompatibilitu
                    the_content();
                    ?>
                </div>
            </article>
        <?php endwhile; ?>
    <?php endif; ?>
</main>
<?php
get_footer();
?>
```

### KROK 4: Nastavení Elementor metadata
```bash
# Přidej základní Elementor data
docker exec [container] wp post meta update [PAGE_ID] _elementor_data '[]' --allow-root

# Nastav Elementor version
docker exec [container] wp post meta update [PAGE_ID] _elementor_version '[VERSION]' --allow-root
```

### KROK 5: Český jazyk pro WordPress
```bash
# Instaluj češtinu
docker exec [container] wp core language install cs_CZ --allow-root

# Aktivuj češtinu  
docker exec [container] wp core language activate cs_CZ --allow-root

# Restart container
docker restart [container]
```

### KROK 6: Oprava permalinků (pokud potřeba)
```bash
# Nastav na obyčejný typ
docker exec [container] wp option update permalink_structure "" --allow-root

# Flush rewrite rules
docker exec [container] wp rewrite flush --allow-root
```

---

## 📝 KONTROLNÍ SEZNAM

### ✅ Before Fix Checklist:
- [ ] Identifikovat problematickou stránku
- [ ] Zkontrolovat Elementor edit mode
- [ ] Najít odpovídající template soubor
- [ ] Ověřit přítomnost `the_content()` funkce

### ✅ After Fix Checklist:
- [ ] Template obsahuje `the_content()`
- [ ] Elementor metadata nastavena
- [ ] Český jazyk aktivní
- [ ] Permalinky fungují
- [ ] Testovat editaci bez nouzového režimu

---

## 🚨 DŮLEŽITÁ UPOZORNĚNÍ

1. **VŽDY backup před změnami**
2. **`the_content()` je POVINNÁ funkce** pro Elementor
3. **Archivní stránky vyžadují Elementor Theme Builder**
4. **Český jazyk nastavit PŘED opravami**
5. **Testovat v normálním režimu, ne nouzovém**

---

## 📂 SOUBORY K OPRAVĚ:
- `front-page.php` - hlavní stránka
- `page.php` - běžné stránky  
- `single.php` - jednotlivé příspěvky
- `index.php` - fallback template
- `archive.php` - archivní stránky
- `home.php` - blog stránka

**Všechny MUSÍ obsahovat `<?php the_content(); ?>`**

---

*Vytvořeno: 14.9.2025*  
*Projekt: Airport81 Hybrid System*  
*Status: ✅ OVĚŘENO FUNKČNÍ*