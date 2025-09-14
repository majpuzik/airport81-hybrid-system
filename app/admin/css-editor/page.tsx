'use client';

import { useState, useEffect } from 'react';

export default function CSSEditor() {
  const [customCSS, setCustomCSS] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Načtení current custom.css
  useEffect(() => {
    fetch('/api/css/custom')
      .then(res => res.json())
      .then(data => {
        setCustomCSS(data.css || '');
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setMessage('Chyba při načítání CSS');
      });
  }, []);

  const saveCSS = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/css/custom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ css: customCSS }),
      });

      if (response.ok) {
        setMessage('✅ CSS uloženo! Restart dev serveru pro aplikování změn.');
      } else {
        setMessage('❌ Chyba při ukládání CSS');
      }
    } catch (error) {
      setMessage('❌ Chyba při ukládání CSS');
    }
    setSaving(false);
  };

  const insertSnippet = (snippet: string) => {
    setCustomCSS(prev => prev + '\n\n' + snippet);
  };

  if (loading) {
    return <div className="p-8">Načítání CSS editoru...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <span className="text-2xl">🎨</span>
              Custom CSS Editor - Pro designery
            </h1>
            <p className="text-gray-600 mt-2">
              Editace /styles/custom.css - pokročilé CSS úpravy pro Next.js
            </p>
            <div className="flex gap-4 mt-4">
              <a 
                href="http://localhost:3000" 
                target="_blank" 
                className="btn bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                🚀 Zobrazit web
              </a>
              <a 
                href="http://localhost:8081/wp-admin/admin.php?page=airport81-hybrid" 
                target="_blank"
                className="btn bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                ✈️ WordPress CSS Editor
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
            {/* CSS Editor */}
            <div className="lg:col-span-3">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom CSS Content:
                </label>
                <textarea
                  value={customCSS}
                  onChange={(e) => setCustomCSS(e.target.value)}
                  className="w-full h-96 p-4 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="/* Tvoje custom CSS zde... */"
                  spellCheck="false"
                />
              </div>

              <div className="flex gap-4 items-center">
                <button
                  onClick={saveCSS}
                  disabled={saving}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
                >
                  {saving ? '💾 Ukládám...' : '💾 Uložit CSS'}
                </button>
                
                {message && (
                  <div className={`p-3 rounded-lg ${message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {message}
                  </div>
                )}
              </div>
            </div>

            {/* Snippets Sidebar */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4">🧩 CSS Snippets</h3>
              
              <div className="space-y-2">
                <button
                  onClick={() => insertSnippet(`/* 3D Card Effect */
.dock-card {
  transform-style: preserve-3d;
  transition: transform 0.3s ease;
}

.dock-card:hover {
  transform: rotateY(10deg) translateZ(20px);
}`)}
                  className="w-full text-left p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 text-sm"
                >
                  3D Card Effect
                </button>

                <button
                  onClick={() => insertSnippet(`/* Floating Animation */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.floating {
  animation: float 3s ease-in-out infinite;
}`)}
                  className="w-full text-left p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 text-sm"
                >
                  Floating Animation
                </button>

                <button
                  onClick={() => insertSnippet(`/* Gradient Background */
.gradient-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}`)}
                  className="w-full text-left p-3 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 text-sm"
                >
                  Gradient Background
                </button>

                <button
                  onClick={() => insertSnippet(`/* Glass Morphism */
.glass {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 15px;
}`)}
                  className="w-full text-left p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 text-sm"
                >
                  Glass Morphism
                </button>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Upozornění</h4>
                <p className="text-sm text-yellow-700">
                  Po uložení je nutný restart dev serveru pro aplikování změn do custom.css souboru.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}