# ✅ Grafana + Tempo - Instalace dokončena!

## 📊 **OpenTelemetry Observability Stack**

### 🌐 **Běžící služby:**

| Služba | URL | Status |
|--------|-----|--------|
| **Grafana** | http://localhost:3001 | ✅ Running |
| **Tempo** | localhost:4317 (gRPC), :4318 (HTTP) | ✅ Running |
| **Prometheus** | http://localhost:9090 | ✅ Running |
| **Loki** | http://localhost:3100 | ✅ Running |

### 🔑 **Přihlášení do Grafany:**
- **URL:** http://localhost:3001
- **Username:** admin
- **Password:** admin123

### 🔧 **Konfigurace Tempo datasource v Grafaně:**

1. **Přihlaste se** do Grafany
2. **Configuration** → **Data Sources** → **Add data source**
3. Vyberte **Tempo**
4. Nastavte:
   - **URL:** `http://tempo:3200`
   - **Skip TLS Verify:** zapnout
5. **Save & Test**

### 📡 **Konfigurace OpenTelemetry aplikace:**

Upravte proměnné prostředí pro OTLP export:

```bash
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4318"
export OTEL_TRACES_EXPORTER="otlp"
export OTEL_METRICS_EXPORTER="otlp"
export OTEL_SERVICE_NAME="your-service-name"
```

### 🚀 **Restart Node.js aplikace s Tempo:**

```bash
chmod +x restart_otel_with_tempo.sh
./restart_otel_with_tempo.sh
```

### 📈 **Vizualizace traces v Grafaně:**

1. **Explore** → vyberte **Tempo** datasource
2. **Query type:** Search
3. **Service Name:** `litellm-test-service`
4. **Run Query** → uvidíte traces
5. Klikněte na trace pro detaily

### 🎯 **Co můžete vidět:**

- **Distributed traces** - kompletní flow requestů
- **Service dependencies** - jak spolu služby komunikují
- **Latency breakdown** - kde trvá zpracování nejdéle
- **Error tracking** - kde vznikají chyby
- **Span details** - detaily každé operace

### 📊 **Další dashboardy:**

**Prometheus metrics:**
1. Add datasource → Prometheus
2. URL: `http://prometheus:9090`

**Loki logs:**
1. Add datasource → Loki
2. URL: `http://loki:3100`

### 🐳 **Docker příkazy:**

```bash
# Zobrazit všechny kontejnery
docker ps | grep -E "grafana|tempo|prometheus|loki"

# Logy
docker logs tempo --tail 50
docker logs grafana-simple --tail 50

# Restart
docker restart grafana-simple tempo

# Zastavení
docker stop grafana-simple tempo prometheus loki
```

### 📝 **Poznámky:**

- Tempo ukládá traces do `/var/tempo` volume
- Grafana používá SQLite databázi
- Prometheus scrape interval: 15s
- Tempo retention: 1 hodina (lze změnit v `tempo-config.yaml`)

### 🔍 **Troubleshooting:**

| Problém | Řešení |
|---------|--------|
| Grafana nefunguje | `docker restart grafana-simple` |
| Tempo nepřijímá traces | Zkontrolujte port 4318 |
| Žádné traces v Grafaně | Zkontrolujte OTEL_EXPORTER settings |

---
**Instalováno:** 20.8.2025
**Stack:** Grafana + Tempo + Prometheus + Loki
**OpenTelemetry:** OTLP protocol