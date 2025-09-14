# Paperless-AI Docker Container Management

## Quick Start Guide

### 1. Check if paperless-ai is running:
```bash
docker ps --filter "name=paperless-ai"
```

### 2. Check all paperless-ai containers (including stopped):
```bash
docker ps -a --filter "name=paperless-ai"
```

### 3. Start the container if it's stopped:

#### Option A: If container exists but is stopped
```bash
docker start paperless-ai
```

#### Option B: Using docker-compose from the main configuration
```bash
cd /Users/m.a.j.puzik/paperless-docker-services
docker compose up -d paperless-ai
```

#### Option C: Using the dedicated paperless-ai compose file
```bash
cd /Users/m.a.j.puzik/paperless-docker-services
docker compose -f docker-compose-paperless-ai.yml up -d
```

### 4. View container logs:
```bash
docker logs -f paperless-ai
```

### 5. Stop the container:
```bash
docker stop paperless-ai
```

### 6. Restart the container:
```bash
docker restart paperless-ai
```

## Service URLs

- **Paperless-AI**: http://localhost:8080
- **Paperless-ngx**: http://localhost:8000
- **N8N**: http://localhost:5678
- **Portainer**: http://localhost:9000

## Configuration Files

The paperless-ai service is defined in multiple locations:

1. **Main docker-compose.yml**: `/Users/m.a.j.puzik/paperless-docker-services/docker-compose.yml`
   - Contains the complete stack including paperless-ai
   - Port: 8080

2. **Dedicated compose file**: `/Users/m.a.j.puzik/paperless-docker-services/docker-compose-paperless-ai.yml`
   - Standalone configuration for paperless-ai
   - Port: 8080

## Environment Variables

The service uses these key environment variables:
- `PAPERLESS_API_URL`: http://paperless-ngx:8000 (or http://host.docker.internal:8000)
- `PAPERLESS_API_TOKEN`: 62adfda0a22d35d5c0822cac98fe80ab441f94ee
- `AI_PROVIDER`: ollama
- `OLLAMA_API_URL`: http://192.168.10.83:11434
- `OLLAMA_MODEL`: mistral-nemo:latest (or llama3.2:latest)

## Troubleshooting

### Container won't start:
1. Check if port 8080 is already in use:
   ```bash
   lsof -i :8080
   ```

2. Check Docker logs for errors:
   ```bash
   docker logs paperless-ai
   ```

3. Ensure all dependent services are running:
   ```bash
   docker ps | grep -E "paperless-ngx|paperless-redis|paperless-postgres"
   ```

### Container is unhealthy:
1. Check health status:
   ```bash
   docker inspect paperless-ai --format='{{.State.Health.Status}}'
   ```

2. Restart the container:
   ```bash
   docker restart paperless-ai
   ```

## Scripts Available

I've created several helper scripts in your home directory:

1. **manage_paperless_ai.sh** - Interactive script to check status and start the container
2. **check_docker_status.py** - Python script to check Docker and container status
3. **check_paperless_ai.sh** - Bash script to check paperless-ai status
4. **start_paperless_ai.sh** - Bash script to start paperless-ai using multiple methods

To use any of these scripts, first make them executable:
```bash
chmod +x ~/manage_paperless_ai.sh
chmod +x ~/check_docker_status.py
chmod +x ~/check_paperless_ai.sh
chmod +x ~/start_paperless_ai.sh
```

Then run:
```bash
~/manage_paperless_ai.sh
```