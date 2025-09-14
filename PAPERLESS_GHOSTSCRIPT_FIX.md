# Oprava Ghostscript chyb v Paperless-ngx

## Problém
Ghostscript selhává při zpracování malých PNG obrázků s chybou:
```
Unrecoverable error: rangecheck in setscreenOperand stack
Ghostscript rasterizing failed
```

Konkrétní příklad: `13291432298_6.png` - malý obrázek z emailu který má DPI = 1

## Řešení

### 1. Pre-consume script
Přidat do docker-compose.yml:
```yaml
environment:
  PAPERLESS_PRE_CONSUME_SCRIPT: /usr/src/paperless/scripts/fix_small_images.sh
```

### 2. Vytvořit fix script
```bash
#!/bin/bash
# /usr/src/paperless/scripts/fix_small_images.sh

FILE="$1"

# Kontrola PNG souborů
if [[ "$FILE" =~ \.png$ ]]; then
    # Získat rozměry
    SIZE=$(identify -format "%wx%h" "$FILE" 2>/dev/null)
    WIDTH=$(echo $SIZE | cut -d'x' -f1)
    HEIGHT=$(echo $SIZE | cut -d'x' -f2)
    
    # Pokud je příliš malý (méně než 50px)
    if [ "$WIDTH" -lt 50 ] || [ "$HEIGHT" -lt 50 ]; then
        echo "Zvětšuji malý obrázek: $FILE ($SIZE)"
        
        # Zvětšit na minimálně 300px zachováním poměru
        convert "$FILE" -resize "300x300>" "$FILE"
        
        # Nastavit správné DPI
        convert "$FILE" -density 72 "$FILE"
    fi
fi
```

### 3. Oprava již nahraných dokumentů
Pro dokumenty které již selhaly:
1. Najít v logách pomocí: `grep "Ghostscript rasterizing failed"`
2. Smazat dokument v Paperless UI
3. Nahrát opravenou verzi

### 4. Prevence
- Nastavit minimální velikost obrázků před nahráním
- Kontrolovat DPI (musí být alespoň 72)
- Pro emailové přílohy používat preprocessing

## Testováno
- Gotenberg 7.8 ✅
- Ghostscript 10.03.1 ✅
- OCRmyPDF s malými PNG ✅