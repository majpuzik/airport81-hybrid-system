# 🎤 Hlasové ovládání Loxone AI Controller

## Jak používat hlasový vstup:

### 1. Otevři webové rozhraní
http://localhost:5001

### 2. Klikni na modré tlačítko s mikrofonem 🎤
- Tlačítko se rozsvítí červeně = nahrává
- Objeví se animace zvukových vln

### 3. Řekni příkaz v češtině
Například:
- "Zapni světlo v jídelně"
- "Vypni světlo v kuchyni" 
- "Rozsviť v obýváku"
- "Zhasni všechna světla"

### 4. Systém automaticky:
- Rozpozná tvůj hlas
- Převede řeč na text
- Zobrazí rozpoznaný text
- Provede příkaz
- Ukáže výsledek

## Podporované příkazy:

### Světla - Zapnutí:
- "zapni světlo v [místnosti]"
- "rozsviť v [místnosti]"
- "rozsvítit [místnost]"

### Světla - Vypnutí:
- "vypni světlo v [místnosti]"
- "zhasni v [místnosti]"
- "zhasnout [místnost]"

### Místnosti:
- **Jídelna** - jídelně, jídelnu, jídelna
- **Kuchyně** - kuchyni, kuchyň
- **Obývací pokoj** - obýváku, obývák, obývacím pokoji

## Funkce:

✅ **Podpora češtiny** - rozpoznává českou řeč včetně diakritiky
✅ **Vizuální zpětná vazba** - vidíš co systém slyší
✅ **Automatické provedení** - po rozpoznání se příkaz ihned provede
✅ **Chybové hlášky** - pokud něco nefunguje, dozvíš se proč

## Požadavky:

- Moderní prohlížeč (Chrome, Edge, Safari)
- Povolený přístup k mikrofonu
- HTTPS nebo localhost (z bezpečnostních důvodů)

## Řešení problémů:

### "Přístup k mikrofonu byl zamítnut"
- Povol přístup k mikrofonu v nastavení prohlížeče
- Zkontroluj, že stránka běží na localhost nebo HTTPS

### "Nebyla detekována řeč"
- Mluv hlasitěji a zřetelně
- Zkontroluj, že mikrofon funguje
- Počkej až se objeví animace, pak mluv

### Tlačítko mikrofonu se nezobrazuje
- Tvůj prohlížeč nepodporuje Web Speech API
- Použij Chrome, Edge nebo Safari