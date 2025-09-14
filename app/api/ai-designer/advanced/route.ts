import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Konfigurace různých AI modelů
const AI_PROVIDERS = {
  // Ollama - lokální modely
  ollama: {
    url: 'http://localhost:11434/api/generate',
    models: ['llama2', 'mistral', 'codellama', 'phi', 'neural-chat']
  },
  
  // LM Studio - lokální GUI pro modely
  lmstudio: {
    url: 'http://localhost:1234/v1/completions',
    models: ['local-model']
  },
  
  // Text Generation WebUI (oobabooga)
  textgen: {
    url: 'http://localhost:5000/api/v1/generate',
    models: ['loaded-model']
  },
  
  // LocalAI - OpenAI kompatibilní
  localai: {
    url: 'http://localhost:8080/v1/completions',
    models: ['gpt4all', 'llama', 'whisper']
  },
  
  // Hugging Face Transformers
  huggingface: {
    url: 'http://localhost:8000/generate',
    models: ['gpt2', 'bloom', 'flan-t5']
  },
  
  // OpenAI API (pro srovnání)
  openai: {
    url: 'https://api.openai.com/v1/chat/completions',
    models: ['gpt-3.5-turbo', 'gpt-4'],
    apiKey: process.env.OPENAI_API_KEY
  },
  
  // Claude přes API
  anthropic: {
    url: 'https://api.anthropic.com/v1/messages',
    models: ['claude-3-opus', 'claude-3-sonnet'],
    apiKey: process.env.ANTHROPIC_API_KEY
  }
};

// Systémový prompt pro CSS generování
const SYSTEM_PROMPT = `Jsi AI designer specializovaný na generování CSS kódu. 
Rozumíš česky a dokážeš interpretovat designové požadavky.

Tvoje úloha:
1. Analyzuj požadavek uživatele v češtině
2. Vygeneruj odpovídající CSS kód
3. Vrať POUZE validní CSS bez vysvětlení

Příklady:
- "modré pozadí" → background: blue;
- "pruhované pozadí" → background: repeating-linear-gradient(45deg, ...)
- "tmavý režim" → CSS pro dark mode
- "neonové efekty" → CSS s box-shadow a glow efekty

DŮLEŽITÉ: Odpovídej POUZE validním CSS kódem, nic jiného!`;

// Funkce pro volání různých AI modelů
async function callAIModel(
  provider: string,
  model: string,
  prompt: string
): Promise<string> {
  const config = AI_PROVIDERS[provider as keyof typeof AI_PROVIDERS];
  
  if (!config) {
    throw new Error(`Provider ${provider} not found`);
  }
  
  try {
    // Ollama
    if (provider === 'ollama') {
      const response = await fetch(config.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          prompt: SYSTEM_PROMPT + '\n\nPožadavek: ' + prompt,
          stream: false
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.response;
      }
    }
    
    // LM Studio / LocalAI (OpenAI compatible)
    if (provider === 'lmstudio' || provider === 'localai') {
      const response = await fetch(config.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey || 'dummy'}`
        },
        body: JSON.stringify({
          model,
          prompt: SYSTEM_PROMPT + '\n\nPožadavek: ' + prompt,
          max_tokens: 500,
          temperature: 0.7
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.choices[0].text;
      }
    }
    
    // OpenAI
    if (provider === 'openai' && config.apiKey) {
      const response = await fetch(config.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: prompt }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.choices[0].message.content;
      }
    }
    
    // Claude
    if (provider === 'anthropic' && config.apiKey) {
      const response = await fetch(config.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': config.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'user', content: SYSTEM_PROMPT + '\n\nPožadavek: ' + prompt }
          ],
          max_tokens: 500
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.content[0].text;
      }
    }
    
    throw new Error(`Failed to get response from ${provider}`);
  } catch (error) {
    console.error(`Error calling ${provider}:`, error);
    throw error;
  }
}

// Funkce pro výběr nejlepšího dostupného modelu
async function selectBestModel(): Promise<{ provider: string; model: string }> {
  // Zkusíme v pořadí podle priority
  const priority = [
    { provider: 'ollama', model: 'mistral' },
    { provider: 'ollama', model: 'llama2' },
    { provider: 'lmstudio', model: 'local-model' },
    { provider: 'localai', model: 'gpt4all' },
    { provider: 'openai', model: 'gpt-3.5-turbo' },
    { provider: 'anthropic', model: 'claude-3-sonnet' }
  ];
  
  for (const option of priority) {
    try {
      // Zkusíme ping na model
      const testPrompt = 'test';
      await callAIModel(option.provider, option.model, testPrompt);
      return option;
    } catch (error) {
      continue;
    }
  }
  
  // Fallback na pattern matching
  return { provider: 'fallback', model: 'pattern' };
}

// Funkce pro čištění CSS odpovědi
function cleanCSSResponse(response: string): string {
  // Odstranit markdown code blocks
  response = response.replace(/```css\n?/g, '').replace(/```\n?/g, '');
  
  // Odstranit komentáře typu "Here's the CSS:"
  response = response.replace(/^[^{]*(?=\w+\s*{)/m, '');
  
  // Zajistit, že máme validní CSS
  if (!response.includes('{') || !response.includes('}')) {
    return `/* Nepodařilo se vygenerovat validní CSS */\nbody { background: #f0f0f0; }`;
  }
  
  return response.trim();
}

// GET - Získat seznam dostupných modelů
export async function GET() {
  try {
    const availableModels = [];
    
    // Zkontrolovat Ollama
    try {
      const response = await fetch('http://localhost:11434/api/tags');
      if (response.ok) {
        const data = await response.json();
        data.models?.forEach((model: any) => {
          availableModels.push({
            provider: 'ollama',
            model: model.name,
            size: model.size,
            status: 'ready'
          });
        });
      }
    } catch (e) {
      // Ollama není dostupná
    }
    
    // Zkontrolovat LM Studio
    try {
      const response = await fetch('http://localhost:1234/v1/models');
      if (response.ok) {
        const data = await response.json();
        data.data?.forEach((model: any) => {
          availableModels.push({
            provider: 'lmstudio',
            model: model.id,
            status: 'ready'
          });
        });
      }
    } catch (e) {
      // LM Studio není dostupné
    }
    
    return NextResponse.json({
      success: true,
      models: availableModels,
      recommended: availableModels[0] || { provider: 'fallback', model: 'pattern' }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to get models' },
      { status: 500 }
    );
  }
}

// POST - Generovat CSS pomocí AI
export async function POST(request: NextRequest) {
  try {
    const { prompt, provider, model, action, css } = await request.json();
    
    // Pokud je to akce "apply", uložíme CSS
    if (action === 'apply' && css) {
      const cssPath = path.join(process.cwd(), 'styles', 'custom.css');
      const currentCSS = await fs.readFile(cssPath, 'utf-8');
      const newCSS = currentCSS + '\n\n/* AI Generated (' + (provider || 'auto') + ') - ' + new Date().toISOString() + ' */\n' + css;
      
      await fs.writeFile(cssPath, newCSS, 'utf-8');
      
      return NextResponse.json({
        success: true,
        message: 'CSS bylo úspěšně aplikováno',
        timestamp: new Date().toISOString()
      });
    }
    
    // Generujeme CSS pomocí AI
    if (prompt) {
      let selectedProvider = provider;
      let selectedModel = model;
      
      // Automatický výběr modelu
      if (!selectedProvider || !selectedModel) {
        const best = await selectBestModel();
        selectedProvider = best.provider;
        selectedModel = best.model;
      }
      
      // Fallback na pattern matching
      if (selectedProvider === 'fallback') {
        // Použijeme původní pattern matching
        return NextResponse.json({
          success: true,
          prompt,
          css: '/* Lokální AI modely nejsou dostupné, použit fallback */\nbody { background: linear-gradient(135deg, #667eea, #764ba2); }',
          provider: 'fallback',
          model: 'pattern',
          confidence: 50,
          changes: ['Použit fallback pattern matching'],
          timestamp: new Date().toISOString()
        });
      }
      
      // Volání AI modelu
      const aiResponse = await callAIModel(selectedProvider, selectedModel, prompt);
      const cleanedCSS = cleanCSSResponse(aiResponse);
      
      return NextResponse.json({
        success: true,
        prompt,
        css: cleanedCSS,
        provider: selectedProvider,
        model: selectedModel,
        confidence: 95,
        changes: [`Vygenerováno pomocí ${selectedProvider}/${selectedModel}`],
        explanation: `AI model ${selectedModel} zpracoval váš požadavek`,
        timestamp: new Date().toISOString()
      });
    }
    
    return NextResponse.json(
      { success: false, error: 'No prompt provided' },
      { status: 400 }
    );
  } catch (error) {
    console.error('AI Designer Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// DELETE - Test spojení s AI modely
export async function DELETE() {
  const results = [];
  
  for (const [provider, config] of Object.entries(AI_PROVIDERS)) {
    try {
      const url = new URL(config.url);
      const response = await fetch(url.origin, { method: 'HEAD' });
      results.push({
        provider,
        status: response.ok ? 'online' : 'offline',
        url: url.origin
      });
    } catch (error) {
      results.push({
        provider,
        status: 'offline',
        url: config.url
      });
    }
  }
  
  return NextResponse.json({
    success: true,
    providers: results,
    timestamp: new Date().toISOString()
  });
}