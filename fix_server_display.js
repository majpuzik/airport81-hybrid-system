// Skript pro opravu zobrazení serverů v GUI
// Spusťte v konzoli browseru na http://localhost:8890

console.log('🔧 Opravuji zobrazení serverů...');

// Funkce pro aktualizaci zobrazení
function forceUpdateServers() {
    fetch('/server-status')
        .then(res => res.json())
        .then(data => {
            console.log('📊 Status serverů:', data);
            
            // Ollama
            const ollamaEl = document.getElementById('ollama-status');
            if (ollamaEl) {
                ollamaEl.querySelector('.status-indicator').innerHTML = data.ollama ? '✅' : '❌';
                ollamaEl.style.background = data.ollama ? '#d4edda' : '#f8d7da';
            }
            
            // LM Studio
            const lmstudioEl = document.getElementById('lmstudio-status');
            if (lmstudioEl) {
                lmstudioEl.querySelector('.status-indicator').innerHTML = data.lmstudio ? '✅' : '❌';
                lmstudioEl.style.background = data.lmstudio ? '#d4edda' : '#f8d7da';
            }
            
            // MCP
            const mcpEl = document.getElementById('mcp-status');
            if (mcpEl) {
                mcpEl.querySelector('.status-indicator').innerHTML = data.mcp ? '✅' : '❌';
                mcpEl.style.background = data.mcp ? '#d4edda' : '#f8d7da';
            }
            
            // Paperless
            const paperlessEl = document.getElementById('paperless-status');
            if (paperlessEl) {
                paperlessEl.querySelector('.status-indicator').innerHTML = data.paperless ? '✅' : '❌';
                paperlessEl.style.background = data.paperless ? '#d4edda' : '#f8d7da';
            }
            
            // Models
            if (data.models && data.models.length > 0) {
                const modelsList = document.getElementById('models-list');
                if (modelsList) {
                    modelsList.style.display = 'block';
                    const modelsText = document.getElementById('models-text');
                    if (modelsText) {
                        modelsText.textContent = data.models.join(', ');
                    }
                }
            }
            
            console.log('✅ Servery aktualizovány!');
        })
        .catch(error => {
            console.error('❌ Chyba:', error);
        });
}

// Spustit okamžitě
forceUpdateServers();

// A pak každých 5 sekund
setInterval(forceUpdateServers, 5000);

console.log('✅ Automatická aktualizace nastavena (každých 5 sekund)');
console.log('📝 Pro ruční aktualizaci zavolejte: forceUpdateServers()');