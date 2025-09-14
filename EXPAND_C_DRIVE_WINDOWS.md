# Rozšíření C: disku ve Windows 11 na 350GB

Po spuštění skriptu a rozšíření virtuálního disku na 512GB, musíte ještě rozšířit C: oddíl uvnitř Windows.

## Kroky ve Windows 11:

### 1. Otevřete Správu disků
- Stiskněte **Win + X**
- Vyberte **Správa disků** (Disk Management)
- Nebo: Win + R → `diskmgmt.msc` → Enter

### 2. Zkontrolujte volné místo
- Měli byste vidět:
  - C: disk (asi 64GB)
  - Nepřidělené místo (asi 448GB)

### 3. Rozšiřte C: disk
1. Klikněte pravým na **C:** disk
2. Vyberte **Rozšířit svazek...** (Extend Volume)
3. V průvodci:
   - Klikněte Další
   - Nastavte velikost na **358400 MB** (350GB)
   - Klikněte Další → Dokončit

### 4. Vytvořte D: disk (volitelné)
Ze zbylého místa (asi 162GB) můžete vytvořit nový disk:
1. Klikněte pravým na zbylé nepřidělené místo
2. Vyberte **Nový jednoduchý svazek**
3. Postupujte podle průvodce

## Výsledek:
- **C: disk:** 350GB (pro systém a programy)
- **D: disk:** 162GB (pro data) - volitelné

## Ověření:
- Otevřete Průzkumník souborů
- Zkontrolujte velikost C: disku
- Měl by zobrazovat asi 350GB celkem