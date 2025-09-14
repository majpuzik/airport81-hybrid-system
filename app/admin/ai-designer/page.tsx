'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AIResponse {
  css: string;
  preview: string;
  explanation: string;
  changes: string[];
}

export default function AIDesignerPage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const [currentCSS, setCurrentCSS] = useState('');
  const [previewCSS, setPreviewCSS] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResponse, setAIResponse] = useState<AIResponse | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const previewFrame = useRef<HTMLIFrameElement>(null);

  // Načtení aktuálního CSS
  useEffect(() => {
    fetch('/api/ai-designer')
      .then(res => res.json())
      .then(data => {
        setCurrentCSS(data.css || '');
      });
  }, []);

  // AI generátor CSS
  const generateAICSS = async (userPrompt: string) => {
    // Simulace AI generování CSS na základě promptu
    const cssChanges: { [key: string]: string } = {
      'červené pozadí': `
        body {
          background: linear-gradient(135deg, #ff0000, #cc0000);
        }
      `,
      'modré pozadí': `
        body {
          background: linear-gradient(135deg, #0066cc, #003366);
        }
      `,
      'větší text': `
        body {
          font-size: 1.2em;
        }
        h1 { font-size: 3em; }
        h2 { font-size: 2.5em; }
      `,
      'kulaté rohy': `
        .dock-card {
          border-radius: 25px;
        }
        button {
          border-radius: 50px;
        }
      `,
      'tmavý režim': `
        :root {
          --airport-primary: #1a1a1a;
          --airport-secondary: #2d2d2d;
          --airport-accent: #00ff88;
          --airport-dark: #000000;
          --airport-light: #ffffff;
        }
        body {
          background: #0a0a0a;
          color: #ffffff;
        }
        .dock-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
        }
      `,
      'neonové efekty': `
        .dock-card {
          box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
          border: 2px solid #00ffff;
        }
        h1, h2 {
          text-shadow: 0 0 20px rgba(255, 0, 255, 0.8);
        }
        button:hover {
          box-shadow: 0 0 40px rgba(255, 255, 0, 0.8);
        }
      `,
      '3d efekty': `
        .dock-card {
          transform-style: preserve-3d;
          transform: perspective(1000px) rotateY(10deg);
          transition: all 0.5s ease;
        }
        .dock-card:hover {
          transform: perspective(1000px) rotateY(0deg) scale(1.1);
        }
      `,
      'animované pozadí': `
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        body {
          background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }
      `,
      'zlatý luxusní styl': `
        :root {
          --airport-primary: #FFD700;
          --airport-secondary: #B8860B;
          --airport-accent: #FFA500;
        }
        body {
          background: linear-gradient(135deg, #1a1a1a, #2c2c2c);
        }
        h1, h2 {
          background: linear-gradient(90deg, #FFD700, #FFA500, #FFD700);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s infinite;
        }
        @keyframes shimmer {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
      `
    };

    // Hledání klíčových slov v promptu
    let generatedCSS = '';
    let changes: string[] = [];
    
    const promptLower = userPrompt.toLowerCase();
    
    for (const [keyword, css] of Object.entries(cssChanges)) {
      if (promptLower.includes(keyword)) {
        generatedCSS += css;
        changes.push(`✓ Přidán ${keyword}`);
      }
    }

    // Pokud nic nenajdeme, použijeme obecný přístup
    if (!generatedCSS) {
      if (promptLower.includes('modern')) {
        generatedCSS = cssChanges['neonové efekty'] + cssChanges['3d efekty'];
        changes.push('✓ Aplikován moderní styl s neonovými a 3D efekty');
      } else if (promptLower.includes('elegantní') || promptLower.includes('luxus')) {
        generatedCSS = cssChanges['zlatý luxusní styl'];
        changes.push('✓ Aplikován elegantní luxusní styl');
      } else if (promptLower.includes('barevn')) {
        generatedCSS = cssChanges['animované pozadí'];
        changes.push('✓ Přidáno barevné animované pozadí');
      } else {
        generatedCSS = `
          /* AI vygenerované CSS na základě: "${userPrompt}" */
          body {
            transition: all 0.3s ease;
          }
        `;
        changes.push('✓ Základní CSS přidáno');
      }
    }

    return {
      css: generatedCSS,
      preview: currentCSS + '\n\n/* AI ZMĚNY */\n' + generatedCSS,
      explanation: `Na základě vašeho požadavku "${userPrompt}" jsem připravil tyto změny.`,
      changes
    };
  };

  // Zpracování AI požadavku
  const handleAIRequest = async () => {
    if (!prompt.trim()) return;
    
    setIsProcessing(true);
    setHistory([...history, prompt]);

    try {
      // Volání skutečného AI API
      const response = await fetch('/api/ai-designer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      const data = await response.json();
      
      if (data.success) {
        setAIResponse({
          css: data.css,
          preview: currentCSS + '\n\n/* AI ZMĚNY */\n' + data.css,
          explanation: data.explanation,
          changes: data.changes
        });
        setPreviewCSS(currentCSS + '\n\n/* AI ZMĚNY */\n' + data.css);
        setShowPreview(true);
      } else {
        alert('Chyba při generování CSS');
      }
    } catch (error) {
      alert('Chyba při komunikaci s AI API');
    }
    
    setIsProcessing(false);
  };

  // Aplikace změn
  const applyChanges = async () => {
    if (!aiResponse) return;

    try {
      const response = await fetch('/api/ai-designer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'apply',
          css: aiResponse.css 
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setCurrentCSS(currentCSS + '\n\n' + aiResponse.css);
        alert('✅ CSS změny byly úspěšně aplikovány!');
        setAIResponse(null);
        setPrompt('');
        setShowPreview(false);
      } else {
        alert('Chyba při ukládání CSS');
      }
    } catch (error) {
      alert('Chyba při aplikaci změn');
    }
  };

  // Odmítnutí změn
  const rejectChanges = () => {
    setAIResponse(null);
    setShowPreview(false);
    setPreviewCSS('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => router.push('/admin')}
          className="mb-6 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg"
        >
          ← Zpět na Admin
        </button>

        <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          🤖 AI CSS Designer
        </h1>
        <p className="text-gray-400 mb-8">
          Řekněte mi, jak chcete změnit design, a já to udělám za vás!
        </p>

        {/* AI Prompt Input */}
        <div className="bg-gray-800 rounded-xl p-6 mb-6">
          <label className="block text-sm font-medium mb-2">
            Co chcete změnit na designu?
          </label>
          <div className="flex gap-4">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAIRequest()}
              placeholder="Např: Udělej pozadí tmavě modré s neonovými efekty..."
              className="flex-1 px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={isProcessing}
            />
            <button
              onClick={handleAIRequest}
              disabled={isProcessing || !prompt.trim()}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? '🔄 Zpracovávám...' : '✨ Vygenerovat'}
            </button>
          </div>

          {/* Rychlé návrhy */}
          <div className="mt-4">
            <p className="text-sm text-gray-400 mb-2">Rychlé návrhy:</p>
            <div className="flex flex-wrap gap-2">
              {[
                'tmavý režim',
                'neonové efekty',
                '3D efekty',
                'zlatý luxusní styl',
                'animované pozadí',
                'větší text',
                'kulaté rohy',
                'moderní design'
              ].map(suggestion => (
                <button
                  key={suggestion}
                  onClick={() => setPrompt(suggestion)}
                  className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-full text-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* AI Response */}
        {aiResponse && (
          <div className="bg-gray-800 rounded-xl p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4 text-green-400">
              ✨ AI Návrh připraven!
            </h2>
            <p className="mb-4">{aiResponse.explanation}</p>
            
            <div className="bg-gray-900 rounded-lg p-4 mb-4">
              <h3 className="font-semibold mb-2">Provedené změny:</h3>
              <ul className="space-y-1">
                {aiResponse.changes.map((change, i) => (
                  <li key={i} className="text-green-400">{change}</li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4">
              <button
                onClick={applyChanges}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold"
              >
                ✅ Aplikovat změny
              </button>
              <button
                onClick={rejectChanges}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold"
              >
                ❌ Zrušit
              </button>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
              >
                👁️ {showPreview ? 'Skrýt' : 'Zobrazit'} náhled
              </button>
            </div>
          </div>
        )}

        {/* Preview */}
        {showPreview && previewCSS && (
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">📝 Vygenerované CSS</h3>
              <pre className="bg-gray-900 p-4 rounded-lg overflow-auto max-h-96 text-sm">
                <code className="text-green-400">{aiResponse?.css}</code>
              </pre>
            </div>
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">🖼️ Živý náhled</h3>
              <div className="bg-white rounded-lg p-4 h-96">
                <iframe
                  ref={previewFrame}
                  src="/"
                  className="w-full h-full rounded"
                  style={{ transform: 'scale(0.5)', transformOrigin: 'top left', width: '200%', height: '200%' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Historie */}
        {history.length > 0 && (
          <div className="bg-gray-800 rounded-xl p-6 mt-6">
            <h3 className="text-xl font-bold mb-4">📜 Historie požadavků</h3>
            <ul className="space-y-2">
              {history.slice(-5).reverse().map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-400">
                  <span className="text-gray-500">#{history.length - i}</span>
                  <span>{item}</span>
                  <button
                    onClick={() => setPrompt(item)}
                    className="ml-auto text-sm px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded"
                  >
                    Použít znovu
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}