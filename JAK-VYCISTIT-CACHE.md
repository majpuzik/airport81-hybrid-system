# 🚨 JAK VYČISTIT CACHE A VIDĚT ZMĚNY

## RYCHLÉ ŘEŠENÍ:

### 1. Otevřete tuto stránku:
```
http://localhost:8089/clear_cache.html
```

### 2. Nebo ručně vyčistěte cache:
- **Windows/Linux:** `Ctrl + F5`
- **Mac:** `Cmd + Shift + R`
- **Chrome:** F12 → pravé tlačítko na Reload → Empty Cache and Hard Reload

## ✅ CO BY MĚLO FUNGOVAT:

1. **Žádné modré čáry/pruhy** - úplně odstraněny
2. **Blikání aktuální hodiny** - pomalu bliká (1.5s interval)
3. **Barevné ohraničení:**
   - 🔴 **ČERVENÉ** = baterie se NABÍJÍ (power > 0)
   - 🟢 **ZELENÉ** = baterie se VYBÍJÍ (power < 0)

## 📊 AKTUÁLNÍ STAV:
- Monitor běží na: http://localhost:8089
- PID: 25117
- Baterie: NABÍJÍ SE (+2.5 kW) → červené ohraničení

## 🔧 POKUD STÁLE NEFUNGUJE:

1. **Zavřete všechny záložky** s monitorem
2. **Otevřete inkognito/private okno**
3. Jděte na http://localhost:8089

---
**TIP:** Stránka `/clear_cache.html` se automaticky refreshuje každých 10 sekund s novým timestamp!