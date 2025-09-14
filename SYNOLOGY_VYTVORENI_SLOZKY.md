# Vytvoření složky na Synology NAS

## 1. Vytvořte složku v File Station:

1. **Otevřete File Station**
2. **Najděte správný volume:**
   - Klikněte na levý panel
   - Hledejte: `volume1` nebo `volume2` nebo `volume3` (podle vašeho NAS)
   - Pokud nevidíte volumes, zkuste:
     - Shared folders (např. `docker` nebo `web`)
     - Nebo vytvořte v jiné složce

3. **Vytvořte strukturu složek:**
   - Pokud složka `docker` neexistuje:
     - Pravé tlačítko → Create → Create Folder → název: `docker`
   - Vstupte do složky `docker`
   - Pravé tlačítko → Create → Create Folder → název: `loxone-stats`

## 2. Alternativní umístění:

Můžete použít jakoukoliv existující složku, například:
- `/volume1/web/loxone-stats/`
- `/volume1/shared/loxone-stats/`
- `/volume1/homes/admin/loxone-stats/`

## 3. Nahrajte soubory:

1. Vstupte do vytvořené složky `loxone-stats`
2. Klikněte na **Upload** → **Upload - Overwrite**
3. Vyberte soubor `loxone-stats.tar.gz`
4. Po nahrání:
   - Pravé tlačítko na archiv
   - Extract → Extract Here

## 4. Container Manager:

Při vytváření projektu v Container Manager:
- Použijte cestu, kterou jste vytvořili
- Například: `/volume1/web/loxone-stats/`