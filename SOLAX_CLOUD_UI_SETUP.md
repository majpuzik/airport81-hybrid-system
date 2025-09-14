# ☀️ SPRÁVNÉ NASTAVENÍ SOLAX CLOUD PŘES UI

## ✅ YAML KONFIGURACE ODSTRANĚNA!

Chybná konfigurace byla úspěšně odstraněna z configuration.yaml.

## 🚀 JAK PŘIDAT SOLAX CLOUD SPRÁVNĚ:

### Krok 1: Počkejte na restart
- HA se právě restartuje
- Počkejte 3-5 minut
- Otevřete: http://192.168.10.35:8123

### Krok 2: Přidejte SOLAX Cloud přes UI

1. **Nastavení** (Settings)
2. **Zařízení a služby** (Devices & Services)
3. **+ PŘIDAT INTEGRACI** (modrý button vpravo dole)
4. Do vyhledávání napište: **solax**
5. Vyberte **"Solax Cloud"**

### Krok 3: Zadejte přihlašovací údaje

Budete potřebovat tyto údaje:

```
Username: majpuzik@gmail.com
Password: Max007
```

Pokud integrace požaduje další údaje:
```
Token ID: 20250807021517756732674
Serial Number (SN): SNNTF49WK7
```

### Krok 4: Dokončení

1. Klikněte **ODESLAT** nebo **SUBMIT**
2. Integrace se připojí k SOLAX Cloud
3. Automaticky se vytvoří entity pro:
   - Výkon FV
   - Produkce energie
   - Stav baterie
   - Spotřeba
   - Grid power
   - A další...

## 🔍 OVĚŘENÍ:

Po úspěšném přidání zkontrolujte entity:

```bash
# V terminálu na Mac:
curl -s "http://192.168.10.35:8123/api/states" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIzNzg0Njg1NWRkM2E0NGZhODlmNjM4OTZiY2Y1MTg5MCIsImlhdCI6MTc1NTQyNzU3MSwiZXhwIjoyMDcwNzg3NTcxfQ.7lfjLbfrgyuBDNTvooSO6ibH6okz8BnsF8E-qFwWMxA" \
  | jq '[.[] | select(.entity_id | contains("solax"))] | length'
```

Měli byste vidět 20+ entit.

## 📊 CO ZÍSKÁTE:

- **sensor.solax_pv_power** - Aktuální výkon FV
- **sensor.solax_battery_soc** - Stav nabití baterie
- **sensor.solax_grid_power** - Odběr/dodávka do sítě
- **sensor.solax_house_load** - Spotřeba domu
- **sensor.solax_today_yield** - Dnešní výroba
- **sensor.solax_total_yield** - Celková výroba
- A mnoho dalších...

## ❌ PROBLÉMY?

### "Integrace nenalezena"
→ Zkontrolujte, že máte nainstalovanou custom_components/solax_cloud

### "Invalid credentials"
→ Zkontrolujte username a password na https://www.solaxcloud.com

### "No data"
→ SOLAX API může mít zpoždění, počkejte 5-10 minut

## 📝 POZNÁMKY:

- SOLAX Cloud **NEPODPORUJE** konfiguraci přes YAML
- Vždy používejte UI pro přidání této integrace
- Data se aktualizují každých 60 sekund
- V noci může být většina hodnot 0 (normální)

---
**Vytvořeno:** 2025-08-17 13:00
**Platné pro:** Home Assistant na Synology NAS