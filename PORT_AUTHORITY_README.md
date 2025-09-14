# 🚀 Port Authority - Centralizovaný správce portů

## ✅ **INSTALACE DOKONČENA!**

Port Authority je centralizovaný daemon pro správu portů s RESTful API a web GUI.

---

## 🌐 **Běžící služby:**

| Služba | URL | Status |
|--------|-----|--------|
| **Port Authority API** | http://127.0.0.1:5858 | ✅ Running |
| **Web GUI** | http://127.0.0.1:5858/ui?key=silne-tajne | ✅ Running |
| **Swagger API Docs** | http://127.0.0.1:5858/docs | ✅ Running |

---

## 🔑 **Přístup:**

- **API Key:** `silne-tajne` (nastaven v `PORT_AUTH_KEY`)
- **GUI URL:** [http://127.0.0.1:5858/ui?key=silne-tajne](http://127.0.0.1:5858/ui?key=silne-tajne)
- **Database:** `~/.port_authority.db` (SQLite)

---

## 🚀 **Spuštění:**

```bash
# Rychlé spuštění
./start_port_authority.sh

# Manuální spuštění
export PORT_AUTH_KEY="silne-tajne"
source pa-venv/bin/activate
python port_authority.py
```

---

## 📡 **API Endpointy:**

### **1. Alokace portu**
```bash
curl -X POST "http://127.0.0.1:5858/allocate" \
  -H "Content-Type: application/json" \
  -d '{
    "owner": "my-app",
    "ttl_seconds": 3600,
    "note": "My application",
    "api_key": "silne-tajne"
  }'
```

**Response:**
```json
{
  "port": 5001,
  "lease_id": "f1a42f5f0aba1236ae4cf3a1",
  "expires_at": "2025-08-20T20:23:29.333939"
}
```

### **2. Claim portu (přiřazení PID)**
```bash
curl -X POST "http://127.0.0.1:5858/claim" \
  -H "Content-Type: application/json" \
  -d '{
    "port": 5001,
    "pid": 12345,
    "api_key": "silne-tajne"
  }'
```

### **3. Prodloužení lease**
```bash
curl -X POST "http://127.0.0.1:5858/renew" \
  -H "Content-Type: application/json" \
  -d '{
    "port": 5001,
    "lease_id": "f1a42f5f0aba1236ae4cf3a1",
    "ttl_seconds": 3600,
    "api_key": "silne-tajne"
  }'
```

### **4. Uvolnění portu**
```bash
curl -X POST "http://127.0.0.1:5858/release" \
  -H "Content-Type: application/json" \
  -d '{
    "port": 5001,
    "lease_id": "f1a42f5f0aba1236ae4cf3a1",
    "api_key": "silne-tajne"
  }'
```

### **5. Zobrazení všech leases**
```bash
curl "http://127.0.0.1:5858/leases?api_key=silne-tajne"
```

### **6. Zabití procesu na portu**
```bash
curl -X POST "http://127.0.0.1:5858/kill" \
  -H "Content-Type: application/json" \
  -d '{
    "port": 5001,
    "api_key": "silne-tajne"
  }'
```

---

## 🎯 **Funkce:**

### **✅ Implementováno:**
- **REST API** pro správu portů
- **SQLite databáze** pro persistence lease
- **Web GUI** pro administraci
- **Skupinové rozsahy portů** (5000-5009, 5010-5019, ...)
- **TTL/lease systém** s automatickou expirací
- **Process monitoring** a enforcement
- **Kill unauthorized processes**
- **macOS compatibility** (používá `lsof` místo `psutil`)

### **🔧 Konfigurace skupin:**
- **Base start:** 5000
- **Block size:** 10 portů na skupinu
- **Num groups:** 25 skupin
- **Total ports:** 250 portů (5000-5249)

---

## 🌐 **Web GUI funkce:**

1. **Nastavení:**
   - Zapnutí/vypnutí kill enforcement
   - Regenerace skupin portů
   - Konfigurace rozsahů

2. **Skupiny portů:**
   - Zobrazení všech skupin
   - Zapnutí/vypnutí jednotlivých skupin
   - Úprava rozsahů

3. **Leases:**
   - Zobrazení aktivních lease
   - Owner, PID, expiration time
   - Poznámky

4. **LISTEN sockety:**
   - Real-time zobrazení all listening portů
   - PID a IP adresy procesů

---

## 🔍 **Monitoring a Enforcement:**

Port Authority daemon automaticky:

1. **Scanuje každých 5 sekund** všechny LISTEN sockety
2. **Zabíjí neoprávněné procesy** na spravovaných portech
3. **Vypršení lease** → automatické uvolnění + kill procesu
4. **Vetřelci na lease portech** → kill vetřelce, zachování původního procesu

---

## 💾 **Database Schema:**

### **leases:**
- `port` - číslo portu
- `owner` - název aplikace/vlastníka
- `lease_id` - unique identifier lease
- `pid` - PID procesu (NULL dokud není claimed)
- `expires_at` - ISO timestamp expiration
- `note` - volitelná poznámka

### **groups:**
- `id` - skupina ID
- `start_port` - začátek rozsahu
- `end_port` - konec rozsahu  
- `enabled` - zda je skupina aktivní

---

## 🐳 **Integrace s Docker/Kontejnery:**

```python
import requests

# Alokuj port pro kontejner
response = requests.post('http://127.0.0.1:5858/allocate', json={
    'owner': 'my-docker-app',
    'ttl_seconds': 7200,
    'note': 'Web server container',
    'api_key': 'silne-tajne'
})

port_info = response.json()
allocated_port = port_info['port']
lease_id = port_info['lease_id']

# Spusť kontejner s alokovaným portem
# docker run -p {allocated_port}:80 my-app

# Po startu kontejneru: claim port
container_pid = get_container_pid()
requests.post('http://127.0.0.1:5858/claim', json={
    'port': allocated_port,
    'pid': container_pid,
    'api_key': 'silne-tajne'
})
```

---

## 🛡️ **Bezpečnost:**

- **API Key** autentizace pro všechny endpointy
- **SQLite injection protection** pomocí parametrizovaných queries
- **Process ownership verification** před kill operations
- **Grace period** (3 sekundy) SIGTERM před SIGKILL

---

## 🔧 **Troubleshooting:**

| Problém | Řešení |
|---------|--------|
| Port Authority neběží | `./start_port_authority.sh` |
| Permission denied na macOS | Používá `lsof` místo `psutil` |
| Database locked | Restartovat daemon |
| API returns 401 | Zkontrolovat `api_key` |

---

## 📝 **Logování:**

```bash
# Zobrazit aktuální leases
curl "http://127.0.0.1:5858/leases?api_key=silne-tajne" | jq

# Zkontrolovat LISTEN sockety
curl "http://127.0.0.1:5858/_listens?api_key=silne-tajne" | jq

# Nastavení daemon
curl "http://127.0.0.1:5858/settings?api_key=silne-tajne" | jq
```

---

**🎉 Port Authority je plně funkční a připraven k použití!**

**Instalováno:** 20.8.2025  
**Verze:** 1.0  
**Platform:** macOS (kompatibilní s Linux)  
**Dependencies:** FastAPI, Uvicorn, psutil, SQLite