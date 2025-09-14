# 📊 NASTAVENÍ SOLAX DASHBOARD S GRAFY

## ⚠️ NEJDŘÍV PŘIDEJTE SOLAX CLOUD INTEGRACI!

Pokud ještě nemáte SOLAX Cloud integraci:
1. **Nastavení** → **Zařízení a služby**
2. **+ PŘIDAT INTEGRACI**
3. Hledejte **"Solax Cloud"**
4. Zadejte:
   - Username: majpuzik@gmail.com
   - Password: Max007

## 🎨 VYTVOŘENÍ DASHBOARDU:

### Metoda 1: RUČNÍ VYTVOŘENÍ

1. **Nastavení** → **Dashboardy**
2. **+ PŘIDAT DASHBOARD**
3. Zadejte:
   - **Název:** SOLAX
   - **Ikona:** mdi:solar-power
   - **URL:** solax
   - **Zobrazit v postranním panelu:** ✅
4. **VYTVOŘIT**

### Metoda 2: PŘES SSH (AUTOMATICKY)

```bash
# Zkopírovat dashboard konfiguraci
./synology_ssh_connect.sh "echo 'Dasa_beda2208s' | sudo -S /usr/local/bin/docker cp - homeassistant:/config/dashboards/solax.yaml" < /Users/m.a.j.puzik/solax_dashboard_config.yaml

# Přidat do configuration.yaml
./synology_ssh_connect.sh "echo 'Dasa_beda2208s' | sudo -S /usr/local/bin/docker exec homeassistant bash -c 'echo \"\" >> /config/configuration.yaml && cat >> /config/configuration.yaml << EOF

lovelace:
  mode: storage
  dashboards:
    solax-dashboard:
      mode: yaml
      title: SOLAX
      icon: mdi:solar-power
      show_in_sidebar: true
      filename: dashboards/solax.yaml
EOF'"

# Restartovat HA
./synology_ssh_connect.sh "echo 'Dasa_beda2208s' | sudo -S /usr/local/bin/docker restart homeassistant"
```

## 📈 CO DASHBOARD ZOBRAZUJE:

### 1. **OKAMŽITÝ VÝKON (Gauge)**
- Velký kruhový ukazatel
- Zobrazuje aktuální FV výkon v kW
- Barevné zóny (červená/žlutá/zelená)

### 2. **AKTUÁLNÍ HODNOTY**
- **Baterie** - stav nabití v %
- **Spotřeba** - aktuální spotřeba domu v kW
- **Síť** - odběr/dodávka do sítě v kW

### 3. **GRAF DNES (24 hodin)**
- Historie výkonu FV za posledních 24 hodin
- Automatická aktualizace každou minutu

### 4. **GRAF TÝDEN (7 dní)**
- Historie výkonu za posledních 7 dní
- Vidíte trendy a vzory

### 5. **STATISTIKY**
- Dnešní výroba celkem
- Průměr a maximum
- Týdenní součet

## 🔧 ÚPRAVA GRAFŮ:

### Změna časového rozsahu:
```yaml
hours_to_show: 24  # Změňte na 12, 48, 168 (týden)
```

### Změna barvy:
```yaml
color: orange  # Možnosti: blue, green, red, yellow, purple
```

### Změna typu grafu:
```yaml
type: line  # Možnosti: line, area, column
```

## 🎯 INSTALACE CUSTOM KARET (VOLITELNÉ):

Pro pokročilé grafy nainstalujte přes HACS:

1. **HACS** → **Frontend**
2. **+ PROZKOUMAT**
3. Hledejte a nainstalujte:
   - **mini-graph-card** - Kompaktní grafy
   - **apexcharts-card** - Pokročilé grafy
   - **power-distribution-card** - Tok energie

## 📱 MOBILNÍ ZOBRAZENÍ:

Dashboard je responzivní a funguje i na mobilu!

## 🔍 ŘEŠENÍ PROBLÉMŮ:

### "Entity not found"
→ SOLAX Cloud integrace ještě není přidána nebo nemá data

### Grafy jsou prázdné
→ Počkejte 5-10 minut na načtení historických dat

### Hodnoty jsou 0
→ V noci je to normální, FV nevyrábí

## 💡 TIPY:

1. **Přidejte do oblíbených** - Klikněte na hvězdičku u dashboardu
2. **Automatická aktualizace** - Grafy se aktualizují automaticky
3. **Fullscreen** - F11 pro zobrazení na celou obrazovku

---
**Vytvořeno:** 2025-08-17 13:30
**Dashboard config:** `/Users/m.a.j.puzik/solax_dashboard_config.yaml`