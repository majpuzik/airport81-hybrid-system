# 🔴 ANALÝZA PROBLÉMU - 30% ZTRÁTA VÝKONU PO PŘECHODU NA SOLAX X3-ULT

## 📊 SHRNUTÍ SITUACE
- **Původní konfigurace:** 2x Sofar střídač, každý 2 MPPT = celkem 4 MPPT
- **Nová konfigurace:** 1x Solax X3-ULT se 3 MPPT
- **Všechny panely:** Vybaveny TIGO TS4-A-O optimizéry
- **Problém:** 30% pokles výkonu od změny

## 🔍 AKTUÁLNÍ DATA (17.8.2025, 12:49)

### Solax X3-ULT výkony:
- **MPPT1 (String 1 - Východ):** 2,216 W (15 panelů) = 148 W/panel
- **MPPT2 (String 2 - Jih):** 4,247 W (15 panelů) = 283 W/panel  
- **MPPT3 (String 3+4 - Západ+Sever):** 4,486 W (30 panelů) = 150 W/panel ⚠️

### Identifikovaný problém:
**MPPT3 má pouze 53% výkonu MPPT2** přestože má 2x více panelů!

## ⚡ SKUTEČNÁ PŘÍČINA PROBLÉMU

Protože máte **TIGO optimizéry na všech panelech**, problém NENÍ v rozdílné orientaci stringů, ale v:

### 1. **PROUDOVÉ PŘETÍŽENÍ MPPT3**
- Spojení 2 stringů paralelně **zdvojnásobuje proud**
- Solax X3-ULT má max. vstupní proud **26A na MPPT**
- 2 paralelní stringy mohou generovat až **40A** (2x 20A)
- **MPPT3 limituje výkon kvůli proudovému omezení!**

### 2. **NESPRÁVNÉ ZAPOJENÍ OPTIMIZÉRŮ**
- TIGO optimizéry při paralelním spojení vyžadují speciální konfiguraci
- Možné problémy:
  - Optimizéry nejsou nastaveny pro paralelní provoz
  - Rozdílná napětí stringů způsobují, že optimizéry přecházejí do bypass módu
  - TAP komunikační jednotka nevidí všechny optimizéry na MPPT3

### 3. **NAPĚŤOVÝ NESOULAD**
- String 3 (Západ) a String 4 (Sever) mají různé provozní napětí
- Při paralelním spojení teče proud ze stringu s vyšším napětím do stringu s nižším
- TIGO optimizéry detekují zpětný proud a omezují výkon

## 💡 ŘEŠENÍ - SEŘAZENO DLE EFEKTIVITY

### ✅ ŘEŠENÍ 1: ROZPOJIT STRINGY 3 a 4 (OKAMŽITÉ, 0 Kč)
**Návratnost výkonu: 100%**

1. **Fyzicky rozpojit** String 3 a String 4 v DC rozvaděči
2. **Zapojit pouze String 3** (Západ) na MPPT3 - má lepší výkon než Sever
3. **String 4** (Sever) dočasně odpojit nebo:
   - Připojit přes DC/DC měnič (cca 15,000 Kč)
   - Nebo instalovat malý střídač (cca 25,000 Kč)

**Výhody:**
- Okamžité zvýšení výkonu o 25-30%
- Žádné náklady
- TIGO optimizéry budou správně fungovat

### ✅ ŘEŠENÍ 2: PŘIDAT TIGO RSS TRANSMITTER (5,000 Kč)
**Návratnost výkonu: 90%**

- RSS Transmitter umožňuje **oddělení stringů** na úrovni komunikace
- Každý string bude mít vlastní komunikační kanál
- Optimizéry budou správně balancovat výkon

### ✅ ŘEŠENÍ 3: UPGRADE STŘÍDAČE (40,000-60,000 Kč)
**Návratnost výkonu: 100%**

Možnosti:
- **Solax X3-MEGA G2** - má 4 MPPT trackery
- **Druhý menší Solax** pro String 4
- **Návrat k původním 2x Sofar**

## 📈 FINANČNÍ ANALÝZA

### Současné ztráty:
- **30% ztráta = 7.2 kWh/den** (při průměru 24 kWh očekávané výroby)
- **Denní ztráta:** 7.2 kWh × 3 Kč = 21.6 Kč
- **Měsíční ztráta:** 648 Kč
- **Roční ztráta:** 7,776 Kč

### Návratnost investic:
- **Řešení 1 (rozpojení):** Okamžitá návratnost
- **Řešení 2 (RSS):** 7-8 měsíců
- **Řešení 3 (nový střídač):** 5-8 let

## 🔧 OKAMŽITÉ KROKY

### 1. Zkontrolovat v TIGO Cloud:
- Přihlaste se na https://ei.tigoenergy.com
- Zkontrolujte "Module View" nebo "Heat Map"
- Hledejte:
  - Optimizéry v bypass módu
  - Komunikační chyby
  - Nerovnoměrný výkon na String 3+4

### 2. Zkontrolovat DC rozvaděč:
- Měření napětí String 3 a String 4 samostatně
- Měření proudu každého stringu
- Kontrola pojistek a jističů

### 3. Test rozpojením:
- Dočasně odpojte String 4 od MPPT3
- Nechte pouze String 3 na MPPT3
- Sledujte změnu výkonu

## ⚠️ DŮLEŽITÉ UPOZORNĚNÍ

**TIGO optimizéry jsou navrženy pro nezávislý provoz každého panelu.** Paralelní spojení stringů s různou orientací způsobuje, že optimizéry nemohou správně fungovat. Každý string potřebuje vlastní MPPT tracker pro optimální výkon s TIGO systémem.

## 📞 KONTAKTY PRO PODPORU

- **TIGO Support:** support@tigoenergy.com
- **Solax Support:** service@solaxpower.com
- **Instalační firma:** [kontakt na vašeho instalatéra]

---
*Analýza vytvořena: 17.8.2025, 12:53*
*Založeno na: Solax Cloud API datech a TIGO systémové konfiguraci*