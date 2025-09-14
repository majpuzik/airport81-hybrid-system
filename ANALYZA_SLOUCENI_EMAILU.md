# 📧 ANALÝZA SLOUČENÍ EMAILŮ S PŘÍLOHAMI

## 📊 AKTUÁLNÍ STAV

### ✅ Co funguje:
1. **Sloučení podle VS (variabilní symbol)**
   - Příklad: `VS_7917007602` - 2 soubory úspěšně sloučeny
   - Faktury a jejich dodatky/vyúčtování

2. **Sloučení podle čísla faktury**
   - Příklad: `invoice_830100440881` - upomínky ke stejné faktuře

3. **Technická implementace**
   - Vytváření titulních stran s metadaty
   - OCR detekce a aplikace
   - Upload do Paperless

### ⚠️ PROBLÉM: Detekce emailů s přílohami

**Struktura souborů v majconvert-gmail-all:**
```
20250731_094424_xTool_Missed the XCS V20 Beta.pdf
20250731_094424_xTool_Missed the XCS V20 Beta.json
```

**Současná logika nenachází páry email+příloha protože:**
- Nemáme jasné označení co je tělo emailu a co příloha
- Všechny PDF mají podobný formát názvu
- Chybí metadata o vztahu mezi soubory

## 📈 STATISTIKY SLOUČENÍ

Z 500 zpracovaných souborů:
- **357 skupin** vytvořeno
- **21 skupin sloučeno** (obsahovaly více souborů)
- **13 skutečně sloučeno** do merged složky

### Typy sloučených dokumentů:
1. **Faktury s dodatky** (VS skupiny) - 3 skupiny
2. **Upomínky** (stejné číslo faktury) - 2 skupiny  
3. **Ostatní** (podle data/prefixu) - 8 skupin

## 🔧 DOPORUČENÉ VYLEPŠENÍ

### Lepší detekce emailů s přílohami:

```python
def detect_email_attachment_pairs(files):
    """
    Vylepšená detekce emailů s přílohami
    """
    pairs = defaultdict(list)
    
    for f in files:
        # 1. Hledej JSON metadata
        if f.endswith('.pdf'):
            json_file = f.replace('.pdf', '.json')
            if os.path.exists(json_file):
                # Načti JSON a zjisti, zda má přílohy
                with open(json_file) as jf:
                    data = json.load(jf)
                    if 'attachments' in data:
                        # Toto je email s přílohami
                        pairs[f].extend(data['attachments'])
        
        # 2. Hledej podle časové blízkosti
        # Soubory do 1 minuty od sebe = pravděpodobně email+příloha
        timestamp = extract_timestamp(f)
        for other in files:
            if other != f:
                other_time = extract_timestamp(other)
                if abs(timestamp - other_time) < 60:  # 60 sekund
                    pairs[timestamp].append(f)
        
        # 3. Hledej klíčová slova
        if any(word in f.lower() for word in ['attachment', 'příloha', 'priloha']):
            # Najdi odpovídající email
            base_time = f[:13]  # datum_čas
            for other in files:
                if other.startswith(base_time) and 'email' not in other:
                    pairs[base_time].append(f)
    
    return pairs
```

## 🎯 ZÁVĚR

**Sloučení funguje správně pro:**
- ✅ Faktury se stejným VS
- ✅ Upomínky ke stejné faktuře  
- ✅ Dokumenty se stejným identifikátorem

**Potřeba vylepšit:**
- ⚠️ Detekci skutečných emailů s přílohami
- ⚠️ Využití JSON metadat
- ⚠️ Časovou korelaci souborů

## 📝 SKUTEČNÝ POČET SLOUČENÝCH

Z analýzy vyplývá:
- **21 skupin** bylo identifikováno pro sloučení
- **13 unikátních** sloučených PDF vytvořeno
- Některé skupiny byly zpracovány 2x (duplikace kvůli opakovanému běhu)

**Správná odpověď:** ANO, soubory které patří k sobě (faktury s dodatky, upomínky) byly správně sloučeny. Ale klasické emaily s přílohami nebyly detekovány kvůli struktuře dat.

---
*Analýza vytvořena: 26.8.2025*