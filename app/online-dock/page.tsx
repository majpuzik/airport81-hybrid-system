import Image from "next/image";

export default function OnlineDock() {
  return (
    <>
      {/* ONLINE DOCK - podle PowerPoint snímek 12 */}
      <section className="section bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              ONLINE DOCK
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Digitální přítomnost vaší značky.
            </p>
            <p className="text-lg opacity-90">
              Weby, e-shopy a digitální marketing
            </p>
          </div>
        </div>
      </section>

      {/* SLUŽBY - snímek 12 */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Co pro vás vytvoříme</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Weby a e-shopy */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-xl">
                <div className="text-4xl mb-4">🌐</div>
                <h3 className="text-2xl font-semibold mb-4">Weby a e-shopy</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Firemní prezentace</li>
                  <li>✓ E-commerce řešení</li>
                  <li>✓ WordPress/Shopify</li>
                  <li>✓ Custom aplikace</li>
                  <li>✓ Responzivní design</li>
                </ul>
              </div>

              {/* SEO optimalizace */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-2xl font-semibold mb-4">SEO optimalizace</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Analýza klíčových slov</li>
                  <li>✓ On-page optimalizace</li>
                  <li>✓ Linkbuilding</li>
                  <li>✓ Technické SEO</li>
                  <li>✓ Lokální SEO</li>
                </ul>
              </div>

              {/* Obsahová strategie */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl">
                <div className="text-4xl mb-4">✏️</div>
                <h3 className="text-2xl font-semibold mb-4">Obsahová strategie</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Blog články</li>
                  <li>✓ Copywriting</li>
                  <li>✓ Social media obsah</li>
                  <li>✓ Email marketing</li>
                  <li>✓ Content plán</li>
                </ul>
              </div>

              {/* Landing pages */}
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-8 rounded-xl">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-2xl font-semibold mb-4">Landing pages</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Konverzní optimalizace</li>
                  <li>✓ A/B testování</li>
                  <li>✓ Lead generation</li>
                  <li>✓ PPC kampaně</li>
                  <li>✓ Analytics tracking</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCES */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Náš proces</h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="font-semibold mb-2">Analýza</h3>
                <p className="text-sm text-gray-600">Zmapujeme vaše potřeby a cíle</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="font-semibold mb-2">Návrh</h3>
                <p className="text-sm text-gray-600">Vytvoříme design a strukturu</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="font-semibold mb-2">Vývoj</h3>
                <p className="text-sm text-gray-600">Naprogramujeme řešení</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="font-semibold mb-2">Spuštění</h3>
                <p className="text-sm text-gray-600">Uvedeme do provozu</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="section">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Realizované projekty</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="aspect-video relative">
                <Image 
                  src="/images/hall-1.jpg" 
                  alt="E-shop projekt" 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-semibold mb-2">E-shop módní značky</h3>
                <p className="text-gray-600 text-sm">Shopify, SEO optimalizace, 200% nárůst konverzí</p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="aspect-video relative">
                <Image 
                  src="/images/hall-2.jpg" 
                  alt="Firemní web" 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-semibold mb-2">Firemní prezentace</h3>
                <p className="text-gray-600 text-sm">WordPress, multilanguage, rezervační systém</p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="aspect-video relative">
                <Image 
                  src="/images/hall-3.jpg" 
                  alt="Landing page" 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-semibold mb-2">Landing page kampaň</h3>
                <p className="text-gray-600 text-sm">Next.js, A/B testy, 45% konverze</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-slate-900 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Postavme váš online úspěch společně</h2>
          <p className="text-xl mb-8">Od návrhu po realizaci a dlouhodobou podporu</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/kontakt" className="btn bg-white text-slate-900 hover:bg-gray-100">
              Kontaktovat
            </a>
            <a href="/design-dock" className="btn border border-white text-white hover:bg-white/10">
              Další služby →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}