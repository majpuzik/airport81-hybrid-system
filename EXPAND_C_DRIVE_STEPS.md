# Rozšíření C: disku na 350GB - Krok za krokem

## 🚀 PŘED ZAČÁTKEM:
1. **Spusťte Windows 11** ve VMware Fusion
2. **Přihlaste se** do Windows

## 📋 KROKY V WINDOWS 11:

### Krok 1: Otevřete Správu disků
```
Win + X → Správa disků (Disk Management)
```
**NEBO**
```
Win + R → diskmgmt.msc → Enter
```

### Krok 2: Najděte C: disk
- Uvidíte C: disk (asi 64GB)
- Vedle něj **velký blok "Nepřiděleno"** (asi 448GB)

### Krok 3: Rozšiřte C: disk
1. **Klikněte PRAVÝM** na C: disk
2. Vyberte **"Rozšířit svazek..."** (Extend Volume)
3. V průvodci:
   - Klikněte **Další**
   - **DŮLEŽITÉ:** Změňte velikost na **358400 MB** (= 350GB)
   - Klikněte **Další** → **Dokončit**

### Krok 4: Ověření
- C: disk by měl nyní zobrazovat **~350GB**
- Zbyde asi **162GB nepřiděleného místa**

### Krok 5: Vytvořte D: disk (volitelné)
Z zbylého místa:
1. Klikněte pravým na **nepřidělené místo**
2. **"Nový jednoduchý svazek"**
3. Postupujte podle průvodce
4. Přiřaďte písmeno **D:**

## ✅ VÝSLEDEK:
- **C: disk:** 350GB (systém + programy)
- **D: disk:** 162GB (data) - volitelné

## 🔍 KONTROLA:
Otevřete Průzkumník → Tento počítač
- C: by měl zobrazovat ~350GB celkem