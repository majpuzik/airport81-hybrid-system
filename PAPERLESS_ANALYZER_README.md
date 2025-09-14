# Paperless Document Analyzer - NÁVOD

## 🚀 Rychlý start

```bash
# Spustit GUI aplikaci
./run_analyzer_gui.sh

# Nebo přímo
python3 paperless_analyzer_fixed.py
```

## 📋 Jak používat aplikaci

### 1. Výběr dokumentů

**Možnost A: Vybrat celou složku**
- Klikněte na tlačítko `📁 Vybrat složku`
- Vyberte složku s dokumenty
- Aplikace automaticky najde všechny podporované soubory

**Možnost B: Přidat jednotlivé soubory**
- Klikněte na tlačítko `📄 Přidat soubory`
- Vyberte jeden nebo více souborů (Ctrl/Cmd + klik)
- Soubory se přidají do seznamu k analýze

### 2. Spuštění analýzy

- Klikněte na tlačítko `🔍 Analyzovat`
- Sledujte progress bar
- Počkejte na dokončení

### 3. Kontrola výsledků

Aplikace má 5 záložek:

- **📄 Dokumenty** - Seznam všech analyzovaných dokumentů s jejich tagy
- **🏷️ Tagy** - Všechny nalezené tagy s počtem dokumentů
- **📋 Typy dokumentů** - Typy dokumentů (Faktura, Objednávka, atd.)
- **👥 Korespondenti** - Seznam korespondentů (firmy, osoby)
- **📁 Soubory k analýze** - Seznam souborů před analýzou

### 4. Export dat

- **💾 Uložit metadata** - Uloží všechna metadata do JSON souboru
- **📤 Import do Paperless** - Připraví data pro import do Paperless-ngx

## 🐛 Řešení problémů

### Problém: "Složka je šedivá a nejde vybrat"

**Řešení:**
1. Použijte tlačítko `📄 Přidat soubory` místo výběru složky
2. Nebo zkuste jinou složku (např. Downloads)
3. Zkontrolujte oprávnění ke složce

### Problém: "Analýza proběhla příliš rychle"

**Řešení:**
1. Klikněte na `🐛 Debug okno` pro zobrazení detailů
2. Zkontrolujte, zda byly soubory skutečně načteny
3. Podívejte se do záložky `📁 Soubory k analýze`

### Problém: "Nic se nenačte"

**Řešení:**
1. Zkuste `🗑️ Vyčistit vše` a začít znovu
2. Použijte tlačítko `📄 Přidat soubory` a vyberte jen pár souborů
3. Zkontrolujte debug okno pro chybové hlášky

## 📁 Podporované formáty

- PDF dokumenty (`.pdf`)
- Textové soubory (`.txt`)
- Word dokumenty (`.doc`, `.docx`)
- Obrázky (`.jpg`, `.png`)
- E-maily (`.eml`, `.msg`)

## 🏷️ Automatická detekce

Aplikace automaticky detekuje:

### Tagy
- `faktura` - faktury a účty
- `objednávka` - objednávky a potvrzení
- `platba` - platby a úhrady
- `upomínka` - upomínky a urgence
- `smlouva` - smlouvy a dohody
- `e-shop` - nákupy z e-shopů
- `banka` - bankovní dokumenty
- `rok_YYYY` - rok z názvu souboru
- `neidentifikováno` - když nejsou nalezeny žádné tagy

### Korespondenti
- E-shopy: Alza, CZC, Mall, Datart, Amazon, Lidl, Kaufland, Tesco, Albert
- Banky: ČSOB, Česká spořitelna, KB, Raiffeisen, N26, Revolut, Fio, Moneta
- Extrakce z e-mailových názvů souborů

### Typy dokumentů
- Faktura
- Objednávka
- Smlouva
- PDF
- Obrázek
- E-mail
- Dokument (výchozí)

## 💡 Tipy

1. **Pro rychlý test:** Vyberte jen složku s několika soubory
2. **Debug okno:** Vždy otevřete debug okno pro sledování průběhu
3. **Velké složky:** Pro složky s tisíci souborů může analýza trvat několik minut
4. **Uložení výsledků:** Vždy uložte metadata před zavřením aplikace

## 🔧 Technické požadavky

- Python 3.6+
- tkinter (součást Pythonu)
- Přístup ke složkám s dokumenty

## 📊 Výstupní formát

Metadata jsou uložena v JSON formátu:

```json
{
  "timestamp": "2025-08-09T11:45:00",
  "documents_count": 150,
  "tags": {
    "faktura": 45,
    "objednávka": 23,
    "neidentifikováno": 82
  },
  "document_types": {
    "Faktura": 45,
    "PDF": 105
  },
  "correspondents": {
    "Alza": 12,
    "ČSOB": 8
  },
  "documents": [...]
}
```

## 🚨 Důležité

- Dokumenty bez tagů automaticky dostanou tag `neidentifikováno`
- Metadata musí být importována do Paperless PŘED importem dokumentů
- Aplikace pouze analyzuje, nemodifikuje původní soubory

## 📞 Podpora

Při problémech:
1. Zkontrolujte debug okno
2. Podívejte se do konzole/terminálu
3. Zkuste jednoduchý test: `python3 test_analyzer_simple.py`