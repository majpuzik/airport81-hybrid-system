# 📋 INSTRUKCE: Jak přidat OTE kartu do Home Assistant

## 🎯 KROK 1: Otevřete Home Assistant
1. Jděte na: http://localhost:8123
2. Přihlaste se (admin/slunecna)

## 🎯 KROK 2: Upravte dashboard
1. Klikněte na **3 tečky** vpravo nahoře
2. Vyberte **"Upravit řídicí panel"** (Edit Dashboard)
3. Zapněte **"Zobrazit editor kódu"** (Show Code Editor) - přepínač vpravo nahoře

## 🎯 KROK 3: Přidejte kartu
V YAML editoru:
1. Najděte sekci `cards:` (seznam všech karet)
2. Na **konec seznamu** přidejte tento kód:

```yaml
  - type: vertical-stack
    cards:
      - type: entities
        title: "⚡ OTE Spotové ceny"
        entities:
          - entity: sensor.current_spot_electricity_price
            name: "Aktuální cena"
          - entity: sensor.current_spot_electricity_hour_order
            name: "Pořadí hodiny (1=nejlevnější)"
      - type: conditional
        conditions:
          - condition: numeric_state
            entity: sensor.current_spot_electricity_price
            below: 0
        card:
          type: markdown
          content: |
            ## 💰 ZÁPORNÁ CENA!
            **Dostáváte {{ states('sensor.current_spot_electricity_price') }} Kč/kWh**
            za spotřebu elektřiny! 🎉
```

## 🎯 KROK 4: Uložte změny
1. Klikněte na **"ULOŽIT"** (Save)
2. Dashboard se automaticky aktualizuje

## 📝 POZNÁMKY:
- Ujistěte se, že máte správné **odsazení** (2 mezery)
- Karta se zobrazí pouze pokud máte **nainstalovanou OTE integraci**
- Podmíněná karta se zobrazí jen při **záporných cenách**

## 🚨 POKUD NEFUNGUJE:
1. Zkontrolujte, že máte entity:
   - `sensor.current_spot_electricity_price`
   - `sensor.current_spot_electricity_hour_order`
2. V Developer Tools → States ověřte, že entity existují
3. Zkontrolujte správné odsazení v YAML

---
**Soubor s kódem:** `/Users/m.a.j.puzik/ote_price_card.yaml`