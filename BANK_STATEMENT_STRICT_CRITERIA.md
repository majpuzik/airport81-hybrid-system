# 🎯 PŘÍSNÁ KRITÉRIA PRO BANKOVNÍ VÝPISY (90%+ JISTOTA)

## ⚠️ PROBLÉM SOUČASNÉHO ALGORITMU
- Příliš benevolentní hodnocení
- Málo povinných kritérií
- Chybí striktní vyloučení ne-výpisů

## ✅ NEZBYTNÉ BODY - MUSÍ SPLŇOVAT VŠECHNY

### 1️⃣ IDENTIFIKACE BANKY (POVINNÉ)
**Výpis MUSÍ obsahovat jasný název nebo identifikátor banky:**

#### České banky - přesné vzory:
```
ČSOB:
- "ČSOB" nebo "Československá obchodní banka"
- "notification@csob.cz"
- "CEB Info"
- Kód banky: "/0300"

Raiffeisenbank:
- "Raiffeisenbank" nebo "Raiffeisen"
- "RB" nebo "RBCZ"
- "@rb.cz"
- Kód banky: "/5500"

Komerční banka:
- "Komerční banka" nebo "KB"
- "@kb.cz"
- "MojeBanka"
- Kód banky: "/0100"

Česká spořitelna:
- "Česká spořitelna"
- "@csas.cz" 
- "George"
- Kód banky: "/0800"
```

#### Digitální banky - přesné vzory:
```
Revolut:
- "Revolut Bank UAB" nebo "Revolut Ltd"
- "no-reply@revolut.com"
- Litevský IBAN: "LT" + 18 číslic
- NE "obchodní podmínky" nebo "terms"

N26:
- "N26 Bank GmbH"
- "@n26.com"
- Německý IBAN: "DE" + 20 číslic
- "Kontoauszug"
```

### 2️⃣ OBDOBÍ VÝPISU (POVINNÉ)
**Výpis MUSÍ obsahovat jasně definované období:**

```
Vzory:
- "Období: od DD.MM.YYYY do DD.MM.YYYY"
- "Za období: DD.MM.YYYY - DD.MM.YYYY"
- "Period: from DATE to DATE"
- "Statement period: DATE to DATE"
- "Zeitraum: von DATE bis DATE"

NEBO minimálně:
- "Měsíc: Leden 2025"
- "Month: January 2025"
- Datum výpisu + "měsíční výpis"
```

### 3️⃣ ZŮSTATKY (POVINNÉ)
**Výpis MUSÍ obsahovat alespoň jeden z:**

```
- "Počáteční zůstatek: XXX CZK"
- "Konečný zůstatek: XXX CZK"
- "Opening balance: XXX"
- "Closing balance: XXX"
- "Zůstatek k DD.MM.YYYY: XXX"
- "Balance as of DATE: XXX"
- "Anfangssaldo" / "Endsaldo" (N26)
```

### 4️⃣ ČÍSLO ÚČTU NEBO IBAN (POVINNÉ)
**Výpis MUSÍ obsahovat:**

```
- České číslo účtu: "XXXXXXXXX/XXXX" (9-10 číslic / 4 číslice kód banky)
- IBAN: "[A-Z]{2}[0-9]{2}[A-Z0-9]{16,30}"
- "Číslo účtu:", "Account number:", "Kontonummer:"
- "Číslo karty:" (pro kreditní karty)
```

### 5️⃣ TRANSAKCE NEBO POHYBY (POVINNÉ pro výpisy s pohyby)
**Pokud období > 0 dní, MUSÍ obsahovat:**

```
Sekce transakcí:
- "Pohyby na účtu"
- "Přehled transakcí"
- "Transaction history"
- "Kontobewegungen"

NEBO konkrétní transakce:
- Datum + popis + částka
- "DD.MM platba kartou -XXX"
- "DD.MM příchozí platba +XXX"
- Minimálně 1 transakce s částkou
```

## ❌ OKAMŽITÉ VYLOUČENÍ (NENÍ VÝPIS)

### Pokud obsahuje JAKÉKOLIV z:
```
1. "Obchodní podmínky" / "Terms and conditions"
2. "Aktualizace podmínek" / "Update of terms"
3. "Newsletter"
4. "Unsubscribe" / "Odhlásit odběr"
5. "Faktura - daňový doklad"
6. "Invoice"
7. "Marketing" / "Nabídka" / "Sleva"
8. "Změna sazebníku"
9. "Informace o produktu"
10. Pouze upozornění bez přiloženého výpisu
```

## 📊 NOVÝ SKÓROVACÍ ALGORITMUS

```python
def calculate_confidence(text, filename):
    """
    Striktní algoritmus pro 90%+ jistotu
    """
    
    # KROK 1: Kontrola vyloučení (okamžitý return)
    if contains_exclusion_terms(text):
        return 0  # Není výpis
    
    # KROK 2: Povinná kritéria (všechna musí být splněna)
    mandatory_checks = {
        'bank_identified': detect_bank(text),          # Min. 1 banka
        'period_found': find_statement_period(text),   # Období
        'balance_found': find_balance(text),           # Zůstatek
        'account_found': find_account_number(text)     # Číslo účtu
    }
    
    # Pokud chybí jakékoliv povinné kritérium
    if not all(mandatory_checks.values()):
        return max(30, count_met_criteria(mandatory_checks) * 20)
    
    # KROK 3: Výpočet jistoty (90-100%)
    confidence = 90  # Základní skóre pro splnění všech kritérií
    
    # Bonusy za dodatečné prvky
    if has_transactions(text):
        confidence += 5
    
    if has_bank_logo_or_header(text):
        confidence += 3
    
    if filename_matches_pattern(filename):
        confidence += 2
    
    return min(100, confidence)
```

## 🔍 PŘÍKLADY SPRÁVNÉ KLASIFIKACE

### ✅ ČSOB výpis (95% jistota)
```
✓ Banka: "CEB Info" + "notification@csob.cz"
✓ Období: "za období 1.4.2025 až 30.4.2025"
✓ Účet: "269290450/0300"
✓ Typ: "měsíční výpis"
= VÝPIS
```

### ✅ Revolut výpis (92% jistota)
```
✓ Banka: "Revolut Bank UAB"
✓ Období: "Period: 01.03.2025 - 31.03.2025"
✓ Zůstatek: "Opening balance: €500"
✓ IBAN: "LT12 3250 0100 0000 0123"
✓ Transakce: "Top up +€200"
= VÝPIS
```

### ❌ Revolut podmínky (0% jistota)
```
✓ Banka: "Revolut"
✗ Obsahuje: "Obchodní podmínky"
= OKAMŽITÉ VYLOUČENÍ - NENÍ VÝPIS
```

### ❌ Pouhé upozornění (20% jistota)
```
✓ Banka: "American Express"
✗ Chybí: období, zůstatek, číslo účtu
✗ Pouze: "statement is now available"
= NENÍ VÝPIS (jen notifikace)
```

## 📋 KONTROLNÍ SEZNAM PRO 90%+ JISTOTU

| # | Kritérium | Povinné | Váha |
|---|-----------|---------|------|
| 1 | Název banky jasně identifikován | ✅ ANO | 30% |
| 2 | Období výpisu specifikováno | ✅ ANO | 25% |
| 3 | Zůstatek (počáteční/konečný) | ✅ ANO | 20% |
| 4 | Číslo účtu nebo IBAN | ✅ ANO | 15% |
| 5 | Transakce (pokud období > 0) | ✅ ANO | 10% |
| | **Minimální skóre pro výpis** | | **90%** |

## 🚫 BLACKLIST SLOV (automatické odmítnutí)

```python
BLACKLIST = [
    'obchodní podmínky',
    'terms and conditions',
    'aktualizace podmínek',
    'newsletter',
    'unsubscribe',
    'faktura',
    'invoice',
    'daňový doklad',
    'marketing',
    'nabídka produktu',
    'změna sazebníku',
    'informujeme vás'
]
```

## ✅ WHITELIST SLOV (potvrzení výpisu)

```python
WHITELIST = [
    'výpis z účtu',
    'bank statement',
    'kontoauszug',
    'měsíční výpis',
    'account statement',
    'transaction history',
    'zůstatek k',
    'balance as of',
    'pohyby na účtu'
]
```

---

**S těmito přísnými kritérii dosáhneme 90%+ přesnost detekce bankovních výpisů.**