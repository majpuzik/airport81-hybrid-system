# Nastavení InfluxDB v Home Assistant

## 1. V Home Assistant configuration.yaml přidejte:

```yaml
influxdb:
  api_version: 2
  ssl: false
  host: 192.168.10.35
  port: 8087
  token: homeassistant-token-12345
  organization: homeassistant
  bucket: homeassistant
  tags:
    source: HomeAssistant
  tags_attributes:
    - friendly_name
  default_measurement: units
  include:
    domains:
      - sensor
      - binary_sensor
      - climate
      - switch
      - light
    entity_globs:
      - sensor.loxone_*
      - binary_sensor.loxone_*
      - climate.loxone_*
      - switch.loxone_*
      - light.loxone_*
```

## 2. Restartujte Home Assistant

## 3. Data se začnou automaticky ukládat do InfluxDB

## 4. V Grafaně:
- Přidejte Data Source → InfluxDB
- Query Language: Flux
- URL: http://192.168.10.35:8087
- Organization: homeassistant
- Token: homeassistant-token-12345
- Default Bucket: homeassistant

## 5. Vytvářejte grafy z Loxone dat!