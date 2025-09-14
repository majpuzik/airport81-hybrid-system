# Přehled plateb - účetní přehled z Paperless-NGX

Script pro automatické párování elektronických faktur s bankovními platbami v Paperless-NGX.

## Funkce

- Načte elektronické faktury z Paperless-NGX
- Načte bankovní výpisy z Paperless-NGX
- Automaticky spáruje platby s fakturami podle variabilního symbolu
- Kontroluje shodu částek
- Generuje přehledný HTML report s barevným označením problémů

## Instalace

1. Nainstalujte závislosti:
```bash
pip install -r requirements_prehled_plateb.txt
```

2. Nastavte přístup k Paperless-NGX:
```bash
export PAPERLESS_URL="http://localhost:8000"
export PAPERLESS_TOKEN="váš-api-token"
```

API token získáte v Paperless-NGX: Settings → API → Create Token

## Použití

```bash
python3 Prehled_plateb.py
```

Script vytvoří HTML soubor `prehled_plateb_YYYYMMDD_HHMMSS.html` s přehledem.

## Co script dělá

1. **Načte dokumenty** - hledá dokumenty s tagy obsahujícími "faktura" nebo "výpis"
2. **Parsuje faktury** - extrahuje:
   - Číslo faktury
   - Částku k úhradě
   - Variabilní symbol
   - Datum vystavení a splatnosti
   
3. **Parsuje výpisy** - extrahuje jednotlivé transakce:
   - Datum
   - Částku
   - Variabilní symbol
   - Popis

4. **Páruje platby** - podle variabilního symbolu a kontroluje částky

5. **Generuje report** s třemi sekcemi:
   - **Spárované platby** - zelené OK nebo červené při neshodě částek
   - **Nezaplacené faktury** - červeně označené
   - **Platby bez faktury** - červeně označené

## Omezení

- Pro testování zpracovává max 50 faktur a 20 výpisů
- Parsování funguje nejlépe s českými fakturami
- Vyžaduje, aby PDF obsahovaly textovou vrstvu

## Troubleshooting

Pokud script nenajde dokumenty:
1. Zkontrolujte tagy v Paperless-NGX
2. Upravte vyhledávací query v kódu
3. Ověřte, že máte správné oprávnění API tokenu