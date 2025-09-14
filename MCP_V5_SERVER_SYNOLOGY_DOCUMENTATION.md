# MCP V5 Server - Synology NAS Complete Documentation

## 🏠 Server Overview

**Location:** Synology NAS (192.168.10.35:8081)  
**Status:** Production Ready, Claude CLI Protected  
**Architecture:** Unified MCP Server with 17+ API Integrations  
**Version:** 5.1.0 Enterprise  

## 🔗 Base Access

```
Base URL: http://192.168.10.35:8081
Health Check: http://192.168.10.35:8081/health
Management: https://192.168.10.35:9443 (Portainer)
```

## 📊 Available API Integrations

### Core System APIs
- **Health & Status** - System monitoring and diagnostics
- **Configuration** - Dynamic config management
- **Security** - Authentication and authorization

### Home Automation
- **Loxone** - Smart home control and monitoring
- **Home Assistant** - IoT device management
- **MQTT** - Messaging and sensor data

### Energy Management  
- **Solax** - Photovoltaic system monitoring
- **OTE** - Electricity pricing and grid data

### Communication
- **Gmail** - Email processing and automation
- **Outlook** - Microsoft email integration
- **IMAP** - Universal email access

### Cloud Storage
- **Google Drive** - File management and search
- **Dropbox** - Cloud storage operations
- **OneDrive** - Microsoft cloud integration

### AI & Language Models
- **OpenAI** - GPT models and completions
- **Anthropic** - Claude API integration  
- **Ollama** - Local LLM server (192.168.10.83:11434)
- **LM Studio** - Local model hosting

### Document Processing
- **Paperless-NGX** - Document management system
- **PDF.co** - PDF processing and extraction
- **AnyParser** - Universal document parsing
- **Google Cloud Vision** - OCR and image analysis

### Development & Utilities
- **Webhook Handlers** - Event processing
- **File Operations** - Local file management
- **Database** - SQLite configuration storage

## 🛠️ API Endpoint Reference

### System Health & Status

```bash
# Health Check
GET /health
Response: {
  "status": "healthy",
  "server": "MCP V5 Server",
  "location": "Synology NAS", 
  "port": "8080",
  "timestamp": "2025-09-09T18:36:56.848Z"
}

# Server Status
GET /status
Response: {
  "message": "MCP V5 Server na Synology NAS",
  "status": "online",
  "access": "http://192.168.10.35:8081",
  "integrations": {...}
}

# System Information
GET /api/system
Response: {
  "version": "5.1.0",
  "uptime": "...",
  "memory": {...},
  "apis_available": 17
}
```

### Loxone Integration

```bash
# Get Loxone Status
POST /api/loxone/status
Headers: Content-Type: application/json
Body: {
  "username": "your_username",
  "password": "your_password"
}

# Control Loxone Device
POST /api/loxone/control
Body: {
  "device_id": "device_uuid",
  "command": "on|off|value",
  "value": "optional_value"
}

# Get All Loxone Data
POST /api/loxone/all-data
```

### Solax Energy System

```bash
# Get Current Energy Data
GET /api/solax/current
Response: {
  "power_generation": "...",
  "grid_consumption": "...",
  "battery_status": "...",
  "timestamp": "..."
}

# Get Historical Data
GET /api/solax/history?days=7
Response: {
  "daily_generation": [...],
  "consumption_data": [...],
  "efficiency_stats": {...}
}
```

### OTE Energy Pricing

```bash
# Get Current Electricity Prices
GET /api/ote/current-prices
Response: {
  "spot_price": "...",
  "currency": "CZK/MWh",
  "valid_from": "...",
  "next_update": "..."
}

# Get Price Forecast
GET /api/ote/forecast?hours=24
```

### Gmail Integration

```bash
# Search Emails
POST /api/gmail/search
Body: {
  "query": "from:sender@example.com",
  "maxResults": 10,
  "labels": ["INBOX"]
}

# Send Email
POST /api/gmail/send
Body: {
  "to": "recipient@example.com",
  "subject": "Subject",
  "body": "Email content",
  "html": true
}

# Get Unread Count
GET /api/gmail/unread-count
```

### Google Drive Operations

```bash
# Search Files
POST /api/drive/search
Body: {
  "query": "name contains 'document'",
  "mimeType": "application/pdf"
}

# Upload File
POST /api/drive/upload
Content-Type: multipart/form-data
Body: file data + metadata

# Download File
GET /api/drive/download/:fileId
```

### Paperless Document Management

```bash
# Search Documents
POST /api/paperless/search
Body: {
  "query": "invoice",
  "correspondent": "company_name",
  "document_type": "invoice"
}

# Upload Document
POST /api/paperless/upload
Content-Type: multipart/form-data
Body: document file + metadata

# Get Document Content
GET /api/paperless/document/:id/content

# Classify Document
POST /api/paperless/classify
Body: {
  "document_id": 123,
  "tags": ["business", "expense"],
  "correspondent": "supplier_name"
}
```

### AI & Language Models

```bash
# OpenAI Completion
POST /api/openai/completion
Body: {
  "model": "gpt-4",
  "messages": [...],
  "max_tokens": 1000
}

# Anthropic Claude
POST /api/anthropic/completion
Body: {
  "model": "claude-3-sonnet",
  "messages": [...],
  "max_tokens": 1000
}

# Local Ollama (via proxy)
POST /api/ollama/completion
Body: {
  "model": "llama2",
  "prompt": "Your prompt here",
  "stream": false
}
```

### Home Assistant Integration

```bash
# Get Device States
GET /api/homeassistant/states

# Control Device
POST /api/homeassistant/control
Body: {
  "entity_id": "light.living_room",
  "service": "turn_on",
  "data": {"brightness": 255}
}

# Get Sensor Data
GET /api/homeassistant/sensor/:sensor_id
```

## 🔐 Configuration & API Keys

### Environment Variables Location
```
/volume1/docker/mcp-v5-server/app/.env
```

### Required API Keys
```bash
# Core Settings
NODE_ENV=production
MCP_PORT=8080
SYNOLOGY_IP=192.168.10.35

# AI Services
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GEMINI_API_KEY=...

# Google Services  
GOOGLE_CREDENTIALS_PATH=/app/keys/google-credentials.json
GOOGLE_DRIVE_FOLDER_ID=...

# Email Services
GMAIL_CLIENT_ID=...
GMAIL_CLIENT_SECRET=...
OUTLOOK_CLIENT_ID=...

# Home Automation
LOXONE_HOST=http://192.168.10.68:8080
LOXONE_USERNAME=...
LOXONE_PASSWORD=...
HOMEASSISTANT_URL=http://homeassistant:8123
HOMEASSISTANT_TOKEN=...

# Energy Systems
SOLAX_API_TOKEN=...
OTE_API_KEY=...

# Document Processing
PAPERLESS_API_URL=http://paperless-ngx:8000
PAPERLESS_API_TOKEN=...
PDFCO_API_KEY=...
ANYPARSER_API_KEY=...

# External LLM Server
LLM_SERVER_IP=192.168.10.83
OLLAMA_URL=http://192.168.10.83:11434
LM_STUDIO_URL=http://192.168.10.83:1234
```

## 🔧 Management & Operations

### Docker Container Management

```bash
# SSH to NAS
ssh -p 4438 admin@192.168.10.35
sudo -i
cd /volume1/docker/mcp-v5-server

# View Container Status
docker ps | grep mcp-v5-server

# View Logs
docker logs mcp-v5-server

# Restart Container
docker-compose restart

# Stop/Start Container
docker-compose down
docker-compose up -d

# Update Application Files
# Upload new files via File Station to /volume1/docker/mcp-v5-server/app/
docker-compose restart
```

### Portainer Web Management
```
URL: https://192.168.10.35:9443
Login: admin credentials
Environment: local → Containers → mcp-v5-server
```

### Monitoring Commands

```bash
# Test Server Health
curl http://192.168.10.35:8081/health

# Test Specific API
curl -X POST http://192.168.10.35:8081/api/loxone/status \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test"}'

# Monitor Resource Usage
docker stats mcp-v5-server

# View Application Logs
docker logs -f mcp-v5-server
```

## 📱 Client Integration Examples

### JavaScript/Node.js Client

```javascript
const MCP_BASE_URL = 'http://192.168.10.35:8081';

// Helper function for API calls
async function callMCP(endpoint, method = 'GET', data = null) {
  const options = {
    method,
    headers: {'Content-Type': 'application/json'}
  };
  
  if (data) {
    options.body = JSON.stringify(data);
  }
  
  const response = await fetch(`${MCP_BASE_URL}${endpoint}`, options);
  return response.json();
}

// Usage examples
const healthStatus = await callMCP('/health');
const loxoneStatus = await callMCP('/api/loxone/status', 'POST', {
  username: 'your_username',
  password: 'your_password'
});
```

### Python Client

```python
import requests
import json

MCP_BASE_URL = 'http://192.168.10.35:8081'

class MCPClient:
    def __init__(self, base_url=MCP_BASE_URL):
        self.base_url = base_url
    
    def call_api(self, endpoint, method='GET', data=None):
        url = f"{self.base_url}{endpoint}"
        headers = {'Content-Type': 'application/json'}
        
        if method.upper() == 'GET':
            response = requests.get(url, headers=headers)
        elif method.upper() == 'POST':
            response = requests.post(url, headers=headers, json=data)
        
        return response.json()
    
    def health_check(self):
        return self.call_api('/health')
    
    def search_paperless(self, query):
        return self.call_api('/api/paperless/search', 'POST', {'query': query})

# Usage
client = MCPClient()
health = client.health_check()
documents = client.search_paperless('invoice')
```

### cURL Examples

```bash
# Health Check
curl http://192.168.10.35:8081/health

# Loxone Status  
curl -X POST http://192.168.10.35:8081/api/loxone/status \
  -H "Content-Type: application/json" \
  -d '{"username":"user","password":"pass"}'

# Paperless Search
curl -X POST http://192.168.10.35:8081/api/paperless/search \
  -H "Content-Type: application/json" \
  -d '{"query":"invoice","limit":10}'

# Energy Data
curl http://192.168.10.35:8081/api/solax/current

# OpenAI Completion
curl -X POST http://192.168.10.35:8081/api/openai/completion \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4",
    "messages": [{"role":"user","content":"Hello"}],
    "max_tokens": 100
  }'
```

## 🚨 Troubleshooting

### Common Issues

**Server Not Responding:**
```bash
# Check container status
docker ps | grep mcp-v5-server

# Check logs for errors
docker logs mcp-v5-server

# Restart if needed
docker-compose restart
```

**API Key Errors:**
```bash
# Verify .env file
cat /volume1/docker/mcp-v5-server/app/.env

# Update keys and restart
nano /volume1/docker/mcp-v5-server/app/.env
docker-compose restart
```

**Network Connectivity:**
```bash
# Test from NAS
curl http://localhost:8081/health

# Test from local network
curl http://192.168.10.35:8081/health

# Check port mapping
docker port mcp-v5-server
```

### Performance Optimization

**Memory Usage:**
- Monitor with `docker stats mcp-v5-server`
- Current allocation: 16GB RAM available
- Typical usage: 200-500MB per active session

**Response Times:**
- Local network latency: 1-3ms
- API processing: 50-200ms (depending on complexity)
- AI completions: 1-10 seconds (external APIs)

### Security Considerations

- Server runs on internal network (192.168.10.x)
- No external internet exposure
- Claude CLI cannot access network-attached storage
- API keys stored in encrypted .env file
- Container isolation via Docker

## 📋 Quick Reference

### Server Locations
```
Production: http://192.168.10.35:8081
Files: /volume1/docker/mcp-v5-server/app/
Logs: docker logs mcp-v5-server
Config: /volume1/docker/mcp-v5-server/app/.env
Management: https://192.168.10.35:9443
```

### Key Management Commands
```bash
# Restart server: docker-compose restart
# View logs: docker logs -f mcp-v5-server  
# Update files: Upload via File Station + restart
# Health check: curl http://192.168.10.35:8081/health
# SSH access: ssh -p 4438 admin@192.168.10.35
```

### Integration Status
- ✅ 17+ API integrations active
- ✅ Claude CLI protection enabled
- ✅ 24/7 availability on NAS
- ✅ Automatic restart on reboot
- ✅ Centralized logging and monitoring
- ✅ Production-ready configuration

---

**Version:** 5.1.0 Enterprise  
**Location:** Synology NAS Production Environment  
**Last Updated:** September 2025  
**Status:** Fully Operational & Claude CLI Protected