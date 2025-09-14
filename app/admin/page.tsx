export default function AdminDashboard() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <span className="text-2xl">⚙️</span>
            Airport81 Admin Dashboard
          </h1>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* WordPress CSS Editor */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">✈️</span>
                <h2 className="text-xl font-semibold text-purple-800">WordPress CSS Editor</h2>
              </div>
              <p className="text-purple-700 mb-4">
                <strong>Pro klienty/designery</strong> - jednoduché změny barev, fontů a základních stylů přes WordPress admin.
              </p>
              <ul className="text-sm text-purple-600 mb-4 space-y-1">
                <li>✅ Okamžité změny (5s)</li>
                <li>✅ Bez restartu serveru</li>
                <li>✅ Bezpečné pro klienty</li>
                <li>✅ Příklady a nápověda</li>
              </ul>
              <a 
                href="http://localhost:8081/wp-admin/admin.php?page=airport81-hybrid"
                target="_blank"
                className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700"
              >
                Otevřít WordPress CSS
              </a>
            </div>

            {/* Custom CSS Editor */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🎨</span>
                <h2 className="text-xl font-semibold text-blue-800">Custom CSS Editor</h2>
              </div>
              <p className="text-blue-700 mb-4">
                <strong>Pro programátory/pokročilé designery</strong> - přímá editace custom.css s pokročilými možnostmi.
              </p>
              <ul className="text-sm text-blue-600 mb-4 space-y-1">
                <li>✅ Pokročilé CSS (3D, animace)</li>
                <li>✅ Direkt přístup k souboru</li>
                <li>✅ CSS snippets</li>
                <li>⚠️ Nutný restart po změně</li>
              </ul>
              <a 
                href="/admin/css-editor"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
              >
                Otevřít Custom CSS
              </a>
            </div>
          </div>

          {/* Status Panel */}
          <div className="mt-8 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>🔄</span>
              Status systému
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white p-4 rounded border">
                <div className="font-semibold text-green-600">✅ Next.js</div>
                <div className="text-gray-600">http://localhost:3000</div>
              </div>
              <div className="bg-white p-4 rounded border">
                <div className="font-semibold text-purple-600">✅ WordPress</div>
                <div className="text-gray-600">http://localhost:8081</div>
              </div>
              <div className="bg-white p-4 rounded border">
                <div className="font-semibold text-blue-600">✅ Hybridní API</div>
                <div className="text-gray-600">/wp-json/airport81/v1/styles</div>
              </div>
            </div>
          </div>

          {/* Documentation */}
          <div className="mt-8 bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h3 className="text-lg font-semibold mb-2 text-yellow-800 flex items-center gap-2">
              <span>📚</span>
              Návod k použití
            </h3>
            <div className="text-yellow-700 space-y-2 text-sm">
              <p><strong>Klient/Designer:</strong> Používá WordPress CSS editor pro jednoduché změny</p>
              <p><strong>Programátor:</strong> Používá Custom CSS editor pro pokročilé úpravy</p>
              <p><strong>Božské přikázání č.6:</strong> Editace CSS přes WordPress, jinak Next.js</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}