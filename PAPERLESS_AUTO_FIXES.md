# Paperless-ngx Automatické opravy

Tento dokument obsahuje záznamy všech automatických oprav.

## Známé chyby a jejich řešení

### Ghostscript rasterizing failed
- **Popis**: Malé PNG obrázky způsobují Ghostscript chybu
- **Pattern**: `Ghostscript rasterizing failed.*?(\d+\.\w+)`
- **Oprava**: fix_ghostscript_error

### Error while converting document to PDF: Server error '500
- **Popis**: Gotenberg 500 chyba při konverzi emailů
- **Pattern**: `Error while converting document to PDF.*500.*?([^\s]+\.eml)`
- **Oprava**: fix_gotenberg_error

### cannot identify image file
- **Popis**: Poškozený obrázkový soubor
- **Pattern**: `cannot identify image file.*?([^\s]+\.(png|jpg|jpeg|gif))`
- **Oprava**: fix_corrupt_image

### rangecheck in setscreenOperand
- **Popis**: PNG s nízkým DPI (obvykle 1)
- **Pattern**: `rangecheck in setscreenOperand.*?consuming.*?([^\s]+\.png)`
- **Oprava**: fix_small_png_dpi

### Page size must be between 3 and 14400
- **Popis**: Extrémně malý obrázek
- **Pattern**: `Page size must be between.*?([^\s]+\.(png|jpg|jpeg))`
- **Oprava**: fix_tiny_image


## Automatické opravy - 2025-07-27 02:07

- **Ghostscript rasterizing failed**: 3.12
  - Popis: Malé PNG obrázky způsobují Ghostscript chybu
  - Status: ✗ Selhalo

- **Ghostscript rasterizing failed**: 3.12
  - Popis: Malé PNG obrázky způsobují Ghostscript chybu
  - Status: ✗ Selhalo

- **Ghostscript rasterizing failed**: 3.12
  - Popis: Malé PNG obrázky způsobují Ghostscript chybu
  - Status: ✗ Selhalo

- **Ghostscript rasterizing failed**: 122011424.pdf
  - Popis: Malé PNG obrázky způsobují Ghostscript chybu
  - Status: ✗ Selhalo

- **Ghostscript rasterizing failed**: 3.12
  - Popis: Malé PNG obrázky způsobují Ghostscript chybu
  - Status: ✗ Selhalo

- **Ghostscript rasterizing failed**: 0.9101131499992334s
  - Popis: Malé PNG obrázky způsobují Ghostscript chybu
  - Status: ✗ Selhalo


## Automatické opravy - 2025-07-27 06:28

- **Ghostscript rasterizing failed**: 3.12
  - Popis: Malé PNG obrázky způsobují Ghostscript chybu
  - Status: ✗ Selhalo

- **Ghostscript rasterizing failed**: 3.12
  - Popis: Malé PNG obrázky způsobují Ghostscript chybu
  - Status: ✗ Selhalo

- **Ghostscript rasterizing failed**: 3.12
  - Popis: Malé PNG obrázky způsobují Ghostscript chybu
  - Status: ✗ Selhalo

- **Ghostscript rasterizing failed**: 122011424.pdf
  - Popis: Malé PNG obrázky způsobují Ghostscript chybu
  - Status: ✗ Selhalo

- **Ghostscript rasterizing failed**: 3.12
  - Popis: Malé PNG obrázky způsobují Ghostscript chybu
  - Status: ✗ Selhalo

- **Ghostscript rasterizing failed**: 0.9101131499992334s
  - Popis: Malé PNG obrázky způsobují Ghostscript chybu
  - Status: ✗ Selhalo

- **Page size must be between 3 and 14400**: image003.jpg
  - Popis: Extrémně malý obrázek
  - Status: ✗ Selhalo

- **Page size must be between 3 and 14400**: image003.jpg
  - Popis: Extrémně malý obrázek
  - Status: ✗ Selhalo

- **Page size must be between 3 and 14400**: ConsumerError('~WRD338.jpg
  - Popis: Extrémně malý obrázek
  - Status: ✗ Selhalo

- **Page size must be between 3 and 14400**: image003.jpg
  - Popis: Extrémně malý obrázek
  - Status: ✗ Selhalo

- **Page size must be between 3 and 14400**: ~WRD338.jpg
  - Popis: Extrémně malý obrázek
  - Status: ✗ Selhalo

- **Page size must be between 3 and 14400**: image003.jpg
  - Popis: Extrémně malý obrázek
  - Status: ✗ Selhalo

- **Page size must be between 3 and 14400**: 20210312_163328.jpg
  - Popis: Extrémně malý obrázek
  - Status: ✗ Selhalo


## Automatické opravy - 2025-07-27 09:06

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno


## Automatické opravy - 2025-07-27 09:13

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

- **MailRule matching query does not exist**: N/A
  - Popis: Chybějící MailRule po smazání pravidla
  - Status: ✓ Opraveno

