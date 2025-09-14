# ISDOC Generator GUI

## 🚀 Spuštění

```bash
./start_isdoc_gui.sh
```

Nebo přímo:
```bash
python3 isdoc_generator_gui.py
```

## 📋 Funkce

### 1. **Zdroje dat** (první záložka)
- **Gmail**: 
  - Zadejte přihlašovací údaje
  - Vyberte vyhledávací dotaz (např. `SUBJECT "faktura"`)
  - Nastavte limit emailů
  - Klikněte "Načíst z Gmail"

- **Lokální soubory**:
  - "Přidat soubory" - vyberte PDF, EML nebo XML soubory
  - "Přidat složku" - přidá všechny podporované soubory ze složky
  - Podporované formáty: PDF, EML, XML, ISDOC

### 2. **Nastavení výstupu** (druhá záložka)
- **Výstupní složka**: Kam se budou ukládat zpracované soubory
- **Šablona názvu**: Jak se budou jmenovat výstupní soubory

Dostupné proměnné pro šablonu:
- `{timestamp}` - Časové razítko (YYYYMMDD_HHMMSS)
- `{date}` - Datum (YYYYMMDD)
- `{type}` - Typ dokumentu (ISDOC, Faktura, atd.)
- `{from}` - Odesílatel (pouze Gmail)
- `{subject}` - Předmět (pouze Gmail)
- `{filename}` - Původní název souboru
- `{invoice_number}` - Číslo faktury
- `{supplier}` - Dodavatel

Příklady šablon:
- `{timestamp}_{type}_{from}_{subject}`
- `{date}_ISDOC_{invoice_number}_{supplier}`
- `Faktury/{date}/{type}_{filename}`

### 3. **Zpracování** (třetí záložka)
- Klikněte "▶️ Spustit zpracování"
- Sledujte průběh a log
- Můžete pozastavit nebo zastavit zpracování

### 4. **Výsledky** (čtvrtá záložka)
- Zobrazí zpracované soubory
- Statistiky zpracování
- Export výsledků do CSV
- Otevření výstupní složky

## 🔧 Nastavení

### Další možnosti:
- ✅ **Přepsat existující soubory** - přepíše soubory se stejným názvem
- ✅ **Vytvořit podsložky podle typu** - vytvoří složky Faktura/, Dobropis/, atd.
- ✅ **Vložit ISDOC jako přílohu** - pokusí se vložit ISDOC XML do PDF
- ✅ **Generovat ISDOC** - automaticky generuje ISDOC pro rozpoznané faktury

## 📊 Co aplikace dělá

1. **Načte soubory** z Gmail nebo lokálního disku
2. **Rozpozná typ dokumentu** (faktura, dobropis, smlouva, atd.)
3. **Pro faktury**:
   - Extrahuje data (číslo faktury, dodavatel, částka)
   - Vygeneruje ISDOC XML
   - Přidá ISDOC do PDF
4. **Uloží zpracované soubory** podle nastavené šablony

## 🎯 Příklady použití

### Gmail faktury:
1. Vyberte záložku "Zdroje dat"
2. Zadejte Gmail údaje
3. Nastavte vyhledávání: `SUBJECT "faktura"`
4. Klikněte "Načíst z Gmail"
5. Přejděte na "Zpracování" a klikněte "Spustit"

### Lokální PDF faktury:
1. Vyberte záložku "Zdroje dat"
2. Klikněte "Přidat složku"
3. Vyberte složku s PDF fakturami
4. Přejděte na "Zpracování" a klikněte "Spustit"

### Hromadné zpracování:
1. Přidejte soubory z Gmail i lokálního disku
2. Nastavte výstupní složku a šablonu názvu
3. Zaškrtněte "Vytvořit podsložky podle typu"
4. Spusťte zpracování

## ❗ Řešení problémů

### GUI se nespustí:
```bash
# Zkontrolujte Python
python3 --version

# Nainstalujte závislosti
python3 -m pip install --user PyPDF2 reportlab requests
```

### Nepřipojí se k Gmail:
- Zkontrolujte heslo pro aplikace
- Povolte IMAP v nastavení Gmail
- Použijte tlačítko "Test připojení"

### ISDOC se negeneruje:
- Zkontrolujte, že je zaškrtnuto "Generovat ISDOC"
- ISDOC se generuje pouze pro rozpoznané faktury
- Zkontrolujte log pro detaily

## 📝 Konfigurace se ukládá

Nastavení se automaticky ukládá do `isdoc_gui_config.json`