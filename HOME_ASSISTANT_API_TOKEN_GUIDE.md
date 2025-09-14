# Jak vytvořit API Token v Home Assistant

## Kroky pro vytvoření tokenu:

1. **Přihlaste se do Home Assistant**
   - Otevřete: http://localhost:8123/
   - Uživatel: admin
   - Heslo: Dasa_beda2208h

2. **Jděte do profilu**
   - Klikněte na své jméno v levém dolním rohu
   - Nebo jděte přímo na: http://localhost:8123/profile

3. **Vytvořte Long-Lived Access Token**
   - Scrollujte dolů k sekci "Long-Lived Access Tokens"
   - Klikněte na "CREATE TOKEN"
   - Zadejte název tokenu (např. "Paperless Integration" nebo "API Access")
   - Klikněte "OK"

4. **Zkopírujte token**
   - ⚠️ **DŮLEŽITÉ**: Token se zobrazí pouze jednou!
   - Zkopírujte celý token
   - Uložte ho na bezpečné místo

## Použití tokenu

Token pak můžete použít v API volání takto:

```bash
# Příklad API volání
curl -X GET \
  http://localhost:8123/api/states \
  -H "Authorization: Bearer VÁŠ_DLOUHÝ_TOKEN_ZDE"
```

## Správa tokenů

- Tokeny můžete vidět v sekci "Long-Lived Access Tokens"
- Můžete je smazat kdykoliv
- Doporučuji pojmenovat tokeny podle účelu použití

## Bezpečnost

- Nikdy nesdílejte token veřejně
- Token má stejná práva jako váš účet
- Pravidelně kontrolujte a mažte nepoužívané tokeny

---

Po vytvoření tokenu mi ho můžete sdělit, pokud ho potřebujete někde nastavit.