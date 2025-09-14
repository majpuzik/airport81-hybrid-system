# 🐧 Linux Server Migration Plan
## Home Assistant + Docker Stack Migration z macOS

### 📋 Aktuální situace
- **macOS Docker Desktop**: Nestabilní, časté pády, high CPU overhead
- **Externý SSD**: ACASIS 4TB s VM připraveným k testování
- **Cíl**: Stabilní produkční prostředí na dedikovaném Linux serveru

---

## 🎯 Tři-fázový plán

### Phase 1: VMware Testing (CURRENT)
✅ **Dokončeno:**
- Migrační balík vytvořen: `/Volumes/ACASIS/VMware/HomeAssistant-Migration-20250809-171914.zip`
- Linux setup script připraven
- Performance test script připraven
- Dokumentace vytvořena

🔄 **Aktuální úkoly:**
- [ ] Spustit Windows 11 VM z externího SSD
- [ ] Vytvořit Ubuntu 22.04 VM v VMware
- [ ] Nainstalovat Docker stack
- [ ] Otestovat stabilitu a performance

### Phase 2: Performance Comparison
**Metriky k měření:**
```bash
# CPU usage
top -p $(pgrep -f "docker\|homeassistant")

# Memory usage  
docker stats --no-stream

# API response times
curl -w "@curl-format.txt" http://localhost:8123/api/

# Container restart frequency
journalctl -u docker --since "24 hours ago" | grep restart
```

**Očekávané výsledky:**
| Metrika | macOS Desktop | VMware Linux | Fyzický Linux |
|---------|---------------|--------------|---------------|
| CPU overhead | 15-20% | 3-5% | 1-2% |
| RAM overhead | ~2GB | ~500MB | ~200MB |
| Stabilita | ⚠️ Pády | ✅ Stabilní | ✅ Nejvyšší |
| API latence | 50-200ms | 20-50ms | 10-20ms |

### Phase 3: Production Linux Server
**Hardware požadavky:**
- **Minimum:** 4 core CPU, 8GB RAM, 100GB SSD
- **Doporučeno:** 6+ core CPU, 16GB RAM, 250GB NVMe
- **Network:** Gigabit LAN, statická IP

**Software stack:**
- Ubuntu Server 22.04 LTS
- Docker CE + Docker Compose
- Portainer pro management
- Fail2ban pro security
- Automatické zálohy

---

## 🚀 Okamžité kroky (VMware testing)

### 1. Spustit VM z externího SSD
```bash
# Zkontrolovat že VM je na externím disku
ls -la "/Volumes/ACASIS/VMware VMs/"

# Spustit VMware a otevřít VM z ACASIS
# Vytvořit novou Ubuntu 22.04 VM
```

### 2. Setup Linux VM
```bash
# V nové Ubuntu VM:
cd ~/Downloads/
unzip HomeAssistant-Migration-20250809-171914.zip
cd HomeAssistant-Migration-*/scripts/
./linux_docker_setup.sh

# Po relogu:
cd ../ && cp -r config/* ~/homeassistant/
docker-compose -f docker/docker-compose.ha-loxone.yml up -d
```

### 3. Performance test
```bash
# Spustit performance test
./scripts/performance_test.sh > performance_results.txt

# Porovnat s macOS baseline
```

---

## 📊 Expected Migration Benefits

### Stabilita
- **macOS**: Docker Desktop pády každé 2-6 hodin
- **Linux**: Běží měsíce bez restartu

### Performance  
- **macOS**: Virtualizace + překladová vrstva ARM→x86
- **Linux**: Nativní běh, přímo na kernelu

### Maintenance
- **macOS**: Závislý na Docker Desktop updates
- **Linux**: Plná kontrola nad stackem

### Cost
- **macOS**: Licence + hardware lock-in
- **Linux**: Open source + commodity hardware

---

## 🔧 Troubleshooting Checklist

### VMware VM problémy
```bash
# Síťování
ping 8.8.8.8
ip addr show

# Storage
df -h
lsblk

# Docker
systemctl status docker
docker version
```

### Performance problémy  
```bash
# CPU throttling
cat /proc/cpuinfo | grep MHz

# Memory pressure
free -h
cat /proc/meminfo

# Disk I/O
iotop -ao
```

### Home Assistant specifické
```bash
# Logs
docker logs homeassistant
journalctl -f

# Database
docker exec homeassistant sqlite3 /config/home-assistant_v2.db "VACUUM;"

# Custom components
ls ~/homeassistant/custom_components/
```

---

## 🎯 Success Metrics

**VMware phase úspěch:**
- [ ] HA běží stabilně 24+ hodin
- [ ] API response < 100ms
- [ ] Zero container crashes
- [ ] SOLAX data fungují
- [ ] Loxone integrace bez chyb

**Production readiness:**
- [ ] Automatické zálohy
- [ ] Monitoring setup
- [ ] Security hardening
- [ ] Documentation complete
- [ ] Rollback plan ready

---

*Generated: 2025-08-09 17:20*  
*Migration package: HomeAssistant-Migration-20250809-171914.zip*