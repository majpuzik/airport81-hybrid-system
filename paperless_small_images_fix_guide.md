# Oprava chyby "Page size must be between 3 and 14400 PDF units" v Paperless-ngx

## Problém
Paperless-ngx nemůže zpracovat velmi malé obrázky (ikony, loga, atd.) kvůli omezení PDF formátu.

## Řešení

### Možnost 1: Jednorázová oprava existujících souborů

```bash
# Spusťte Python skript pro opravu
chmod +x fix_paperless_small_images.py
python3 fix_paperless_small_images.py /cesta/k/paperless/consume
```

### Možnost 2: Automatická oprava v Paperless-ngx

1. **Zkopírujte preprocess skript do Paperless složky:**
```bash
chmod +x paperless_preprocess.sh
cp paperless_preprocess.sh /opt/paperless/scripts/
```

2. **Upravte docker-compose.yml:**
```yaml
services:
  paperless-ngx:
    environment:
      PAPERLESS_PRE_CONSUME_SCRIPT: /usr/src/paperless/scripts/preprocess.sh
    volumes:
      - ./scripts/paperless_preprocess.sh:/usr/src/paperless/scripts/preprocess.sh:ro
```

3. **Restartujte Paperless:**
```bash
docker-compose down
docker-compose up -d
```

### Možnost 3: Ruční oprava jednotlivých souborů

```bash
# Pro jeden soubor
python3 -c "
from PIL import Image
img = Image.open('test_small_icon.png')
if min(img.size) < 50:
    scale = 300 / min(img.size)
    new_size = tuple(int(dim * scale) for dim in img.size)
    img.resize(new_size, Image.Resampling.LANCZOS).save('test_small_icon_fixed.png')
"
```

## Prevence

### Nastavení minimální velikosti při skenování
- Nastavte skener na minimální rozlišení 150 DPI
- Pro ikony a loga použijte alespoň 300 DPI

### Batch konverze před importem
```bash
# Zkontrolovat všechny obrázky ve složce
for img in *.png *.jpg; do
    identify -format "%f: %wx%h\n" "$img"
done | grep -E ":[[:space:]]*[0-9]{1,2}x"
```

## Testování

Po aplikaci opravy:
1. Přesuňte opraveý soubor do consume složky
2. Zkontrolujte logy: `docker-compose logs -f paperless-ngx`
3. Ověřte úspěšné zpracování v webovém rozhraní

## Známé problémy

- Velmi malé obrázky (<10px) mohou být po zvětšení rozmazané
- GIF animace se konvertují na statické obrázky
- Některé speciální formáty (HEIC, WebP) vyžadují dodatečné knihovny