# Gmail IMAP integrace - Návod

## Nastavení

Aplikace nyní používá stejné přihlašovací údaje jako Paperless-NGX:
- Email: majpuzik@gmail.com
- App Password: cbdnqoylymmgepzq (již nastaveno)

## Použití

1. **Spusťte aplikaci**: `python3 mistral_ocr_test.py`

2. **Klikněte na tlačítko "Gmail"**
   - Automaticky se připojí k vašemu Gmail účtu
   - Načte posledních 10 emailů podle filtru

3. **Filtrování emailů**:
   - `ALL` nebo prázdné - zobrazí všechny emaily
   - `from:csob OR from:sporitelna` - emaily od bank
   - `from:@csob.cz` - emaily z domény csob.cz

4. **Konverze na PDF**:
   - Vyberte email ze seznamu
   - Klikněte "Konvertovat vybraný email"
   - Email se automaticky uloží včetně všech příloh jako jedno PDF

## Výhody IMAP přístupu

- Nepotřebuje složité OAuth2 nastavení
- Používá stejné údaje jako Paperless-NGX
- Rychlejší a jednodušší
- Funguje okamžitě

## Řešení problémů

**Chyba přihlášení**: 
- Zkontrolujte, že máte povolené "méně bezpečné aplikace" nebo používáte App Password
- Ověřte, že heslo je správné

**České znaky**: 
- Aplikace automaticky dekóduje české znaky v předmětech a jménech
- Pro vyhledávání používejte jednoduché termíny bez diakritiky

**Přílohy**:
- Všechny přílohy se automaticky spojí s emailem do jednoho PDF
- Podporované přílohy: PDF, obrázky (PNG, JPG, atd.)