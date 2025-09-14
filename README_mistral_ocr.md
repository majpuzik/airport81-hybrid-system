# Mistral OCR Test pro bankovní dokumenty

## Instalace

1. **Nainstalujte závislosti:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Upravte konfiguraci:**
   - Při prvním spuštění se vytvoří soubor `mistral_config.ini`
   - Otevřete ho a nahraďte `YOUR_MISTRAL_API_KEY_HERE` vaším Mistral API klíčem

## Použití

1. **Spusťte skript:**
   ```bash
   python mistral_ocr_test.py
   ```

2. **Vyberte PDF soubor:**
   - Objeví se dialog pro výběr PDF
   - Vyberte bankovní výpis

3. **Počkejte na zpracování:**
   - Skript pošle dokument do Mistral OCR
   - Zpracování trvá obvykle 5-15 sekund

4. **Editujte tagy:**
   - V levé části vidíte rozpoznaná data
   - V pravé části můžete upravit automaticky navržené tagy
   - Přidávejte vlastní tagy pomocí textového pole
   - Odebírejte tagy výběrem a tlačítkem "Odebrat tag"

5. **Export výsledků:**
   - **Exportovat JSON** - uloží kompletní data včetně tagů
   - **Kopírovat tagy** - zkopíruje tagy do schránky (pro ruční vložení do Paperless)
   - **Zpracovat další** - otevře dialog pro další dokument

## Struktura výstupního JSON

```json
{
  "source_file": "/path/to/file.pdf",
  "processed_at": "2024-01-29T15:30:00",
  "ocr_result": {
    "success": true,
    "data": {
      "metadata": {
        "banka": "ČSOB",
        "cislo_uctu": "123456789/0300",
        "obdobi": "01/2024",
        "mena": "CZK"
      },
      "zustatky": {
        "pocatecni": 50000.00,
        "konecny": 45000.00
      },
      "souhrn": {
        "pocet_transakci": 25,
        "prijmy_celkem": 80000.00,
        "vydaje_celkem": 85000.00
      },
      "transakce": [...]
    }
  },
  "tags": ["banka:csob", "období:01_2024", "rok:2024", "měna:czk", "bankovní_výpis", "finance"],
  "paperless_metadata": {
    "title": "Výpis 01/2024 - ČSOB",
    "correspondent": "ČSOB",
    "tags": [...],
    "custom_fields": {
      "account_number": "123456789/0300",
      "period": "01/2024",
      "balance_start": 50000.00,
      "balance_end": 45000.00
    }
  }
}
```

## Tipy pro použití

### Automatické tagy
Skript automaticky vytváří tagy na základě:
- Názvu banky: `banka:nazev_banky`
- Období: `období:MM_YYYY`
- Roku: `rok:YYYY`
- Měny: `měna:czk`
- Nízkého zůstatku: `pozor:nízký_zůstatek` (pod 10 000 Kč)

### Vlastní tagy
Doporučené formáty vlastních tagů:
- `kategorie:hodnota` - např. `účel:spoření`
- `projekt:nazev` - např. `projekt:renovace`
- `důležitost:vysoká`

### Integrace s Paperless-ngx
1. Zkopírujte tagy pomocí tlačítka "Kopírovat tagy"
2. V Paperless při nahrávání dokumentu vložte tagy
3. Nebo použijte exportovaný JSON pro automatizaci (vyžaduje další skript)

## Řešení problémů

**"API Error"**
- Zkontrolujte API klíč v `mistral_config.ini`
- Ověřte připojení k internetu
- Zkontrolujte kredit na Mistral účtu

**"JSON Parse Error"**
- Mistral někdy vrací nečekané formátování
- Zkuste dokument znovu
- Případně snižte kvalitu skanu (menší soubor)

**Špatně rozpoznané údaje**
- Ujistěte se, že PDF je čitelné (ne rozmazané)
- Zkuste vyšší kvalitu skenu
- Bankovní výpisy s nestandartním formátováním mohou být problematické

## Cenová kalkulace

- 1 stránka = $0.001 (0.025 Kč)
- 100 stránek = $0.10 (2.50 Kč)
- 1000 stránek = $1.00 (25 Kč)

Při batch zpracování je cena poloviční!

## Konfigurace

Soubor `mistral_config.ini` obsahuje:

```ini
[MISTRAL]
api_key = YOUR_MISTRAL_API_KEY_HERE
model = pixtral-12b-2409

[TAGGING]
auto_tag_bank = true
auto_tag_period = true
auto_tag_year = true
low_balance_threshold = 10000
```

- `api_key` - Váš Mistral API klíč
- `model` - Model pro OCR (pixtral-12b-2409 je doporučený)
- `auto_tag_*` - Zapnutí/vypnutí automatických tagů
- `low_balance_threshold` - Práh pro tag nízkého zůstatku