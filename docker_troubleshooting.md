# 🐳 DOCKER PULL PROBLÉM - ŘEŠENÍ

## 🔍 DIAGNOSTIKA

Docker pull portainer/portainer-ce:linux-arm64 se nespustil/zamrzl.

### Zjištěné problémy:
- ✅ Docker daemon běží
- ✅ Registry je dostupná (401 odpověď = normální)
- ❌ Pull procesy se spouští ale "zamrzají"
- ❌ Žádný obraz se nestáhl

## 🛠️ MOŽNÁ ŘEŠENÍ

### 1. **Zkusit menší image**
```bash
# Místo Portainer zkusit menší aplikaci
docker pull hello-world
docker pull alpine:latest
```

### 2. **Restartovat Docker**
```bash
# Restartovat Docker Desktop
osascript -e 'quit app "Docker"'
sleep 5
open -a Docker
```

### 3. **Vyčistit Docker cache**
```bash
docker system prune -a
```

### 4. **Změnit DNS**
```bash
# V Docker Desktop Settings → Resources → Advanced
# Nastavit DNS na: 8.8.8.8, 1.1.1.1
```

### 5. **Použít starší verzi**
```bash
# Místo :linux-arm64 zkusit :latest nebo konkrétní verzi
docker pull portainer/portainer-ce:2.19.4
```

### 6. **Alternativní management nástroje**

#### Dozzle (lehčí log viewer):
```bash
docker run -d --name dozzle -v /var/run/docker.sock:/var/run/docker.sock -p 8080:8080 amir20/dozzle:latest
```

#### Či jednoduché CLI nástroje:
```bash
# Zobrazit kontejnery
docker ps -a --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Logy kontejneru
docker logs CONTAINER_NAME --tail 50

# Stats
docker stats --no-stream
```

## ⚡ RYCHLÉ ŘEŠENÍ

Pokud potřebujete rychle spravovat kontejnery:

```bash
# Vytvořit alias pro časté příkazy
alias dps='docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"'
alias dlogs='docker logs'
alias dstats='docker stats --no-stream'

# Použití:
dps
dlogs paperless-ngx
dstats
```

## 📋 DOPORUČENÍ

1. **Nechte pull běžet déle** - Portainer je ~200MB image
2. **Zkontrolujte síť** - možný problém s připojením
3. **Použijte CLI** - pro základní správu Docker CLI stačí
4. **Později zkuste znovu** - registry problém může být dočasný

---
*Status: Docker pull má problémy*
*Alternativy: CLI nástroje nebo restart Docker*