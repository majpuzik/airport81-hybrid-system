# ⚡ OTE INTEGRACE DO HOME ASSISTANT - KOMPLETNÍ PLÁN
=====================================================
Datum: 2025-08-05 večer  
Status: 📋 PŘIPRAVENO K IMPLEMENTACI

## 🏆 DOPORUČENÁ INTEGRACE: Czech Energy Spot Prices

### ✅ HLAVNÍ VÝHODY:
- **Real-time České spotové ceny** z OTE (elektřina + plyn)
- **Více měn** (EUR, CZK) a jednotek (kWh, MWh)
- **Konfigurovatelné šablony** pro reálné ceny (DPH + distribuce)
- **Predikce na zítřek** po 13:00
- **Aktivní vývoj** českou komunitou

## 📦 INSTALACE:

### Metoda 1: Custom Repository v HACS (doporučeno)
```
1. HACS → tři tečky (⋮) vpravo nahoře
2. Vybrat "Custom repositories"
3. Přidat repository:
   - URL: https://github.com/rnovacek/homeassistant_cz_energy_spot_prices
   - Kategorie: Integration
4. Kliknout "ADD"
5. Vyhledat "Czech Energy Spot Prices" a nainstalovat
6. Restart Home Assistant
7. Nastavení → Zařízení a služby → Přidat integraci
```

### Metoda 2: Ruční instalace
```bash
# Stáhnout z: https://github.com/rnovacek/homeassistant_cz_energy_spot_prices
# Zkopírovat složku: custom_components/cz_energy_spot_prices
# Vložit do: <config_dir>/custom_components/
# Restart HA
```

### Metoda 3: RESTful sensor (jednoduchá varianta)
```yaml
# configuration.yaml
sensor:
  - platform: rest
    name: "OTE Spot Price"
    resource: "https://www.spotovaelektrina.cz/api/v1/current"
    method: GET
    value_template: "{{ value_json.price }}"
    unit_of_measurement: "EUR/MWh"
    scan_interval: 3600
```

### ⚠️ POZOR - Alternativa OTE Rate (nedoporučeno):
```
# Starší integrace grinco/ote_rate
# Custom repository: https://github.com/grinco/ote_rate
# ⚠️ VAROVÁNÍ: Memory leak problémy, brutálně zatěžuje paměť!
```

## 📊 DOSTUPNÉ SENZORY:

### Základní senzory:
- `sensor.current_spot_electricity_price` - aktuální cena
- `sensor.spot_cheapest_electricity_today` - nejlevnější dnes  
- `sensor.spot_most_expensive_electricity_today` - nejdražší dnes
- `sensor.current_spot_electricity_hour_order` - pořadí aktuální hodiny

### Pokročilé senzory:
- Nejlevnější hodiny/bloky
- Predikce na zítřek
- Monitorování nejlevnějších intervalů

## 💰 KONFIGURACE REÁLNÝCH CEN:

### Šablona pro nákupní cenu (včetně DPH + distribuce):
```yaml
# Při konfiguraci integrace - Purchase Price Template:
{% set tax_kWh = 28.30 / 1000.0 %}
{% set system_services_kWh = 212.82 / 1000.0 %}
{% set oze_kWh = 495 / 1000.0 %}
{% set low_distrib_kWh = 450.43 / 1000.0 %}
{% set high_distrib_kWh = 644.30 / 1000.0 %}
{% set operator_cost_kWh = 350.0 / 1000.0 %}
{% set vat_percent = 21 %}
{% set distrib_kWh = low_distrib_kWh %}
{% if as_local(hour).hour in [9, 12, 16, 20] %}
{% set distrib_kWh = high_distrib_kWh %}
{% endif %}
{{ (value + distrib_kWh + tax_kWh + oze_kWh + system_services_kWh + operator_cost_kWh) * ( 100.0 + vat_percent ) / 100.0 }}
```

### Šablona pro prodejní cenu:
```yaml
# Sell Price Template:
{% set operator_cost_kWh = 0.25 %}
{{ value - operator_cost_kWh }}
```

## 🤖 AUTOMATIZACE S SOLAX X3-ULT:

### Základní automatizace podle hour_order:
```yaml
# automations.yaml
automation:
  - alias: "OTE - Levná elektřina (6 nejlevnějších hodin)"
    trigger:
      - platform: numeric_state
        entity_id: sensor.current_spot_electricity_hour_order
        below: 6  # 6 nejlevnějších hodin za den
    condition:
      - condition: numeric_state
        entity_id: sensor.solax_battery_soc
        below: 90  # Pouze pokud baterie není plná
    action:
      - service: select.select_option
        target:
          entity_id: select.solax_remotecontrol_power_control
        data:
          option: "Enabled Battery Control"
      - service: number.set_value
        target:
          entity_id: number.solax_remotecontrol_active_power
        data:
          value: 5000  # 5kW nabíjení
      - service: button.press
        target:
          entity_id: button.solax_remotecontrol_set

  - alias: "OTE - Drahá elektřina (6 nejdražších hodin)"
    trigger:
      - platform: numeric_state
        entity_id: sensor.current_spot_electricity_hour_order
        above: 18  # 6 nejdražších hodin za den
    condition:
      - condition: numeric_state
        entity_id: sensor.solax_battery_soc
        above: 20  # Pouze pokud baterie má rezervu
    action:
      - service: select.select_option
        target:
          entity_id: select.solax_remotecontrol_power_control
        data:
          option: "Enabled Battery Control"
      - service: number.set_value
        target:
          entity_id: number.solax_remotecontrol_active_power
        data:
          value: -3000  # 3kW vybíjení
      - service: button.press
        target:
          entity_id: button.solax_remotecontrol_set
```

### Pokročilá automatizace s intervalovými okny:
```yaml
# Template sensor pro nejlevnější hodiny v intervalech
template:
  - sensor:
      name: "OTE Cheapest Hours Intervals"
      state: >
        {# Definice intervalů (start_hour, end_hour) #}
        {% set intervals = [
          (0, 8),   # noc 00-08
          (8, 16),  # den 08-16  
          (16, 24), # večer 16-24
        ] %}
        {% set min = namespace(cheapest_hours=[]) %}
        {% for interval in intervals %}
          {% set min.price = None %}
          {% for i in range(interval[0], interval[1]) %}
            {% set hour_dt = now().replace(hour=i, minute=0, second=0, microsecond=0) %}
            {% set value = states.sensor.current_spot_electricity_hour_order.attributes.get(hour_dt.isoformat()) %}
            {% if value is defined %}
              {% set price = value[1] %}
              {% if min.price is none or price < min.price %}
                {% set min.price = price %}
                {% set min.dt = hour_dt %}
              {% endif %}
            {% endif %}
          {% endfor %}
          {% set min.cheapest_hours = min.cheapest_hours + [min.dt.hour] %}
        {% endfor %}
        {{ now().hour in min.cheapest_hours }}
```

## 📈 VIZUALIZACE - APEXCHARTS:

### Instalace ApexCharts:
```
HACS → Frontend → "ApexCharts Card"
```

### Graf OTE cen na 2 dny:
```yaml
# V dashboard
type: custom:apexcharts-card
header:
  show: true
  show_states: true
  colorize_states: true
  title: "OTE Spotové Ceny Elektřiny"
graph_span: 2d
span:
  start: day
now:
  show: true
  label: "Nyní"
series:
  - entity: sensor.current_spot_electricity_price
    name: "Spotová Cena"
    float_precision: 2
    type: column
    color: "#ff6b6b"
    show:
      in_header: raw
    data_generator: |
      return Object.entries(entity.attributes).map(([date, value], index) => {
        return [new Date(date).getTime(), value];
      });
  - entity: sensor.current_spot_electricity_hour_order
    name: "Pořadí Hodiny"
    type: line
    color: "#4ecdc4"
    yaxis_id: second
    data_generator: |
      return Object.entries(entity.attributes).map(([date, value], index) => {
        return [new Date(date).getTime(), value];
      });
yaxis:
  - id: first
    decimals: 2
    apex_config:
      title:
        text: "Cena [Kč/kWh]"
  - id: second
    opposite: true
    apex_config:
      title:
        text: "Pořadí [1-24]"
```

## 🔄 INTEGRACE S ENERGY DASHBOARD:

### Přidání do Energy Dashboard:
```
1. Nastavení → Energy Dashboard
2. Electricity Grid → Add Consumption
3. Zvolit: sensor.current_spot_electricity_price
4. Nastavit: "Use an entity tracking the total costs"
```

## ⚡ OPTIMALIZAČNÍ STRATEGIE:

### Doporučené časové okna:
- **Ráno (6-10h)**: Sledovat nejlevnější hodiny pro nabíjení
- **Odpoledne (14-18h)**: Využít PV + případně levnou elektřinu  
- **Večer (18-22h)**: Vybíjení při vysokých cenách
- **Noc (22-6h)**: Nabíjení při nejlevnějších cenách

### Kombinace s SolaX funkcemi:
1. **Remote Control** - časté změny bez EEPROM omezení
2. **Battery Control** - přímé řízení nabíjení/vybíjení  
3. **PV optimalizace** - kombínát se spotovými cenami

## 🚨 DŮLEŽITÉ POZNÁMKY:

### OTE časové indexování:
- **Hodina 1** = 00:00-01:00 (ne 01:00-02:00!)
- **Data aktualizace**: každý den po 13:00 pro další den
- **Predikce**: dostupná den dopředu

### Bezpečnostní podmínky:
```yaml
# Vždy používat podmínky pro SOC baterie
condition:
  - condition: numeric_state
    entity_id: sensor.solax_battery_soc
    above: 20  # Minimální rezerva
    below: 90  # Maximální nabití
```

## 📋 IMPLEMENTAČNÍ POSTUP (ZÍTRA):

### 🔴 VYSOKÁ PRIORITA:
1. ✅ Instalace Czech Energy Spot Prices
2. ✅ Konfigurace OTE senzorů
3. ✅ Šablony pro reálné ceny

### 🟡 STŘEDNÍ PRIORITA:  
4. ✅ Základní automatizace podle hour_order
5. ✅ Testování nabíjení/vybíjení

### 🟢 NÍZKÁ PRIORITA:
6. ✅ ApexCharts vizualizace
7. ✅ Pokročilé intervalové automatizace

## 🎯 OČEKÁVANÝ VÝSLEDEK:
**Kompletní automatizovaný systém optimalizace SolaX X3-ULT podle real-time OTE spotových cen s možností úspory až 30-50% na nákladech za elektřinu!**

## 💡 PRAKTICKÉ TIPY:

### Optimální strategie:
- **Nabíjení**: V 6-8 nejlevnějších hodinách za den
- **Vybíjení**: V 6-8 nejdražších hodinách za den  
- **Self-use**: Ve zbytku času s preferencí PV

### Template pro cenové rozhodování:
```yaml
template:
  - sensor:
      name: "Battery Action"
      state: >
        {% set order = states('sensor.current_spot_electricity_hour_order') | int %}
        {% if order <= 6 %}
          charge
        {% elif order >= 19 %}
          discharge
        {% else %}
          self_use
        {% endif %}
```

### Dostupné senzory po instalaci:
- `sensor.current_spot_electricity_price` - aktuální cena
- `sensor.current_spot_electricity_hour_order` - pořadí aktuální hodiny (1-24)
- `sensor.spot_cheapest_electricity_today` - nejlevnější cena dnes
- `binary_sensor.spot_cheapest_hour_today` - je aktuální hodina nejlevnější?

---
**Status:** 📋 PŘIPRAVENO K IMPLEMENTACI  
**Český systém:** ✅ Plně lokalizovaný pro ČR  
**OTE kompatibilita:** ✅ Oficiální data z burzy  
**Smart Grid ready:** ✅ Pokročilá optimalizace
**Custom Repository:** ✅ https://github.com/rnovacek/homeassistant_cz_energy_spot_prices