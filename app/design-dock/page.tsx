import Image from "next/image";

export default function DesignDock() {
  return (
    <>
      {/* DESIGN DOCK - podle PowerPoint snímek 13 */}
      <section className="section bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              DESIGN DOCK
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Kreativita, která zaujme.
            </p>
            <p className="text-lg opacity-90">
              Grafický design a vizuální identita
            </p>
          </div>
        </div>
      </section>

      {/* SLUŽBY - snímek 13 */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Designové služby</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Branding */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-semibold mb-3">Branding</h3>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Logo design</li>
                  <li>• Vizuální identita</li>
                  <li>• Brand manuál</li>
                  <li>• Firemní styl</li>
                </ul>
              </div>

              {/* Grafický design */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">📐</div>
                <h3 className="text-xl font-semibold mb-3">Grafický design</h3>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Letáky a plakáty</li>
                  <li>• Vizitky</li>
                  <li>• Katalogy</li>
                  <li>• Obaly produktů</li>
                </ul>
              </div>

              {/* Digitální design */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">💻</div>
                <h3 className="text-xl font-semibold mb-3">Digitální design</h3>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Social media grafika</li>
                  <li>• Web design</li>
                  <li>• Bannery</li>
                  <li>• Email šablony</li>
                </ul>
              </div>

              {/* Prezentace */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-semibold mb-3">Prezentace</h3>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• PowerPoint šablony</li>
                  <li>• Pitch decky</li>
                  <li>• Infografiky</li>
                  <li>• Výroční zprávy</li>
                </ul>
              </div>

              {/* Ilustrace */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">🖼️</div>
                <h3 className="text-xl font-semibold mb-3">Ilustrace</h3>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Custom ilustrace</li>
                  <li>• Ikony a piktogramy</li>
                  <li>• Maskoti</li>
                  <li>• Storyboardy</li>
                </ul>
              </div>

              {/* 3D design */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">🎮</div>
                <h3 className="text-xl font-semibold mb-3">3D design</h3>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• 3D vizualizace</li>
                  <li>• Produktové rendery</li>
                  <li>• Animace</li>
                  <li>• AR/VR design</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI SEKCE - snímek 14 */}
      <section className="section bg-gradient-to-br from-purple-100 to-pink-100">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              AI, náš turbo flight attendant
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Náš tichý parťák, kreativní kopilot a důvod, proč dokážeme proměnit nápady ve vizuály dřív, 
              než ostatní stihnou otevřít Photoshop.
            </p>

            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Co AI umí</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🚀</span>
                      <div>
                        <h4 className="font-semibold">Rychlé prototypy</h4>
                        <p className="text-gray-600 text-sm">Desítky variant během minut</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🎯</span>
                      <div>
                        <h4 className="font-semibold">Přesné targetování</h4>
                        <p className="text-gray-600 text-sm">Design podle dat a analýz</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">✨</span>
                      <div>
                        <h4 className="font-semibold">Kreativní inspirace</h4>
                        <p className="text-gray-600 text-sm">Nové nápady a koncepty</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">⚡</span>
                      <div>
                        <h4 className="font-semibold">Automatizace</h4>
                        <p className="text-gray-600 text-sm">Rutinu dělá AI, my tvoříme</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-8 text-white text-center">
                  <div className="text-6xl mb-4">🤖</div>
                  <h4 className="text-xl font-semibold mb-2">AI + Lidská kreativita</h4>
                  <p className="text-purple-100">
                    = Výjimečné výsledky
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="section">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Naše práce</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group relative overflow-hidden rounded-lg aspect-square">
              <Image 
                src="/images/hall-1.jpg" 
                alt="Logo design" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-semibold">Logo & Branding</h4>
                  <p className="text-sm opacity-90">Kompletní vizuální identita</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg aspect-square">
              <Image 
                src="/images/hall-2.jpg" 
                alt="Web design" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-semibold">Web Design</h4>
                  <p className="text-sm opacity-90">UI/UX návrhy</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg aspect-square">
              <Image 
                src="/images/hall-3.jpg" 
                alt="Print design" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-semibold">Tisková grafika</h4>
                  <p className="text-sm opacity-90">Katalogy a letáky</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-slate-900 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Dejte své značce křídla</h2>
          <p className="text-xl mb-8">Vytvoříme design, který vás vynese výš</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/kontakt" className="btn bg-white text-slate-900 hover:bg-gray-100">
              Kontaktovat
            </a>
            <a href="/terminal" className="btn border border-white text-white hover:bg-white/10">
              AI Terminal →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}