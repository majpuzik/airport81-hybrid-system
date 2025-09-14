# 🔧 Oprava zobrazení serverů v GUI

## Problém
GUI ukazuje všechny servery jako nedostupné (⏳), i když ve skutečnosti běží.

## Rychlá oprava

### Metoda 1: Použijte tlačítko v GUI
1. Otevřete http://localhost:8890
2. Klikněte na tlačítko **"🔄 Zkontrolovat servery"**
3. Servery by se měly aktualizovat

### Metoda 2: Konzole browseru
1. Otevřete http://localhost:8890
2. Otevřete konzoli (F12 → Console)
3. Vložte tento kód:

```javascript
fetch('/server-status').then(r=>r.json()).then(d=>{
    ['ollama','lmstudio','mcp','paperless'].forEach(s=>{
        const e=document.getElementById(s+'-status');
        if(e){
            e.querySelector('.status-indicator').innerHTML=d[s]?'✅':'❌';
            e.style.background=d[s]?'#d4edda':'#f8d7da';
        }
    });
    if(d.models){
        document.getElementById('models-list').style.display='block';
        document.getElementById('models-text').textContent=d.models.join(', ');
    }
});
```

4. Stiskněte Enter

### Metoda 3: Automatická oprava
Spusťte v terminálu:
```bash
open http://localhost:8890
```

Pak v konzoli browseru:
```javascript
setInterval(()=>fetch('/server-status').then(r=>r.json()).then(d=>updateServerStatus(d)),5000)
```

## Ověření
API vrací správné hodnoty:
```bash
curl -s http://localhost:8890/server-status | python3 -m json.tool
```

Výstup:
```json
{
    "ollama": true,
    "mcp": true,
    "paperless": true,
    "lmstudio": false,
    "models": ["qwen2.5:32b", "czech-finance:latest", ...]
}
```

## Status serverů
- ✅ **Ollama** - běží na portu 11434
- ✅ **MCP Server** - běží na portu 3001
- ✅ **Paperless-ngx** - běží v Dockeru
- ❌ **LM Studio** - neběží (volitelné)

## Trvalá oprava
Restartujte aplikaci:
```bash
pkill -f mass_document_processor.py
python3 /Users/m.a.j.puzik/mass_document_processor.py &
```