# ❓ POTŘEBUJI TYTO INFORMACE PRO PŘESNOU DIAGNÓZU

## 📊 SOUČASNÁ DATA UKAZUJÍ PROBLÉM:

Z analýzy v poledne (12:49) jsem zjistil:
- **MPPT1:** 2,216 W 
- **MPPT2:** 4,247 W (nejvyšší - pravděpodobně JIH)
- **MPPT3:** 4,486 W (ale má 2x více panelů!)

**MPPT3 má jasně problém** - má podobný výkon jako MPPT1/2, ale měl by mít 2x vyšší!

## ❓ OTÁZKY, KTERÉ POTŘEBUJI ZODPOVĚDĚT:

### 1. POČET PANELŮ
**Kolik máte PŘESNĚ panelů celkem?**
- [ ] 40 panelů
- [ ] 48 panelů  
- [ ] 56 panelů
- [ ] 60 panelů
- [ ] 64 panelů
- [ ] Jiný počet: _____

### 2. VÝKON PANELŮ
**Jaký je výkon jednoho panelu?**
- [ ] 375 Wp
- [ ] 400 Wp
- [ ] 410 Wp
- [ ] 420 Wp
- [ ] 450 Wp
- [ ] Jiný: _____

### 3. PŮVODNÍ ZAPOJENÍ NA SOFAR
**Jak byly panely rozděleny na 2 střídačích Sofar?**

**Sofar 1:**
- MPPT1: _____ panelů (orientace: _____)
- MPPT2: _____ panelů (orientace: _____)

**Sofar 2:**
- MPPT1: _____ panelů (orientace: _____)
- MPPT2: _____ panelů (orientace: _____)

### 4. SOUČASNÉ ZAPOJENÍ NA SOLAX
**Jak jsou panely zapojeny na Solax X3-ULT?**

- **MPPT1:** _____ panelů (původní string z _____)
- **MPPT2:** _____ panelů (původní string z _____)
- **MPPT3:** _____ panelů (původní stringy _____ + _____)

### 5. ZPŮSOB SPOJENÍ NA MPPT3
**Jak jsou spojeny 2 stringy na MPPT3?**
- [ ] PARALELNĚ (Y-konektor nebo svorkovnice)
- [ ] SÉRIOVĚ (za sebou)
- [ ] Nevím

### 6. TIGO KONFIGURACE
**TIGO optimizéry:**
- Model: [ ] TS4-A-O [ ] TS4-R-O [ ] Jiný: _____
- Na všech panelech: [ ] ANO [ ] NE
- Máte TAP jednotku: [ ] ANO [ ] NE
- Přístup do TIGO Cloud: [ ] ANO [ ] NE

## 🔍 POKUD MÁTE PŘÍSTUP DO TIGO CLOUD:

Prosím zkontrolujte:
1. **Module View** - jsou všechny moduly online?
2. **Heat Map** - který string má nejnižší výkon?
3. **Alerts** - jsou nějaká varování?
4. **String Configuration** - jak jsou stringy nakonfigurovány?

## 📸 UŽITEČNÉ FOTKY:

Pokud můžete, pošlete:
- Foto DC rozvaděče (jak jsou stringy zapojeny)
- Screenshot z TIGO Cloud
- Štítek Solax střídače s parametry
- Schéma zapojení (pokud máte)

## ⚡ PŘEDBĚŽNÁ DIAGNÓZA:

Na základě dat co mám, problém je pravděpodobně:

### Pokud jsou stringy na MPPT3 PARALELNĚ:
- **Proudové přetížení** - MPPT3 limit 26A, ale 2 stringy mohou dát 40A
- **Řešení:** Rozpojit stringy, nechat jen jeden na MPPT3

### Pokud jsou stringy na MPPT3 SÉRIOVĚ:
- **Napěťové přetížení** - překročení max. napětí MPPT (600V)
- **Řešení:** Přepojit na paralelní a pak řešit proud

### Pokud máte různý počet panelů na stringách:
- **Nevyvážené stringy** - různé napětí/proud
- **Řešení:** Vyrovnat počty panelů

---

**Odpovězte prosím na otázky výše, abych mohl dát přesné řešení!**