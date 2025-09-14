import Image from "next/image";

export default function FotoDock() {
  return (
    <>
      {/* FOTO DOCK - podle PowerPoint snímek 10 */}
      <section className="section bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 text-white relative overflow-hidden">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              FOTO DOCK
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Zachytíme vaše nejlepší okamžiky.
            </p>
            <p className="text-lg opacity-90">
              Profesionální fotografie pro každou příležitost
            </p>
          </div>
        </div>
      </section>

      {/* SLUŽBY - snímek 10 */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Naše fotografické služby</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Portréty */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 text-purple-600">Portréty</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Business fotografie</li>
                  <li>• Rodinné focení</li>
                  <li>• Modelingové portfolio</li>
                  <li>• Osobní branding</li>
                </ul>
              </div>

              {/* Produkty */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 text-green-600">Produkty</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• E-shop fotografie</li>
                  <li>• Katalogové snímky</li>
                  <li>• 360° zobrazení</li>
                  <li>• Lifestyle záběry</li>
                </ul>
              </div>

              {/* Akce */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 text-blue-600">Akce</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Firemní eventy</li>
                  <li>• Konference</li>
                  <li>• Svatby a oslavy</li>
                  <li>• Kulturní akce</li>
                </ul>
              </div>

              {/* Architektura */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 text-orange-600">Architektura</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Interiéry</li>
                  <li>• Exteriéry budov</li>
                  <li>• Realitní fotografie</li>
                  <li>• Hotelové prostory</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCES - snímek 11 */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Jak pracujeme</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Konzultace</h3>
                  <p className="text-gray-600">
                    Sejdeme se osobně nebo online a probereme vaše představy, cíle a rozpočet. 
                    Navrhneme optimální řešení přesně na míru vašim potřebám.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Příprava</h3>
                  <p className="text-gray-600">
                    Připravíme detailní plán focení, vybereme vhodnou lokaci a zajistíme 
                    veškeré potřebné vybavení včetně osvětlení a rekvizit.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Focení</h3>
                  <p className="text-gray-600">
                    Samotné focení probíhá v příjemné atmosféře. Během focení můžete 
                    průběžně sledovat výsledky a vyjádřit své připomínky.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Postprodukce</h3>
                  <p className="text-gray-600">
                    Vybrané fotografie profesionálně upravíme - korekce barev, retuše, 
                    odstranění nedostatků. Dbáme na přirozený vzhled.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  5
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Předání</h3>
                  <p className="text-gray-600">
                    Finální fotografie dostanete v plném rozlišení přes online galerii 
                    nebo na USB. Včetně licenčních práv pro vaše použití.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO GALERIE */}
      <section className="section">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Ukázky naší práce</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="aspect-square relative rounded-lg overflow-hidden group">
              <Image 
                src="/images/hall-1.jpg" 
                alt="Business portrét" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">Business portrét</p>
                </div>
              </div>
            </div>
            
            <div className="aspect-square relative rounded-lg overflow-hidden group">
              <Image 
                src="/images/hall-2.jpg" 
                alt="Produktová fotografie" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">Produktová fotografie</p>
                </div>
              </div>
            </div>
            
            <div className="aspect-square relative rounded-lg overflow-hidden group">
              <Image 
                src="/images/hall-3.jpg" 
                alt="Eventová fotografie" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">Firemní event</p>
                </div>
              </div>
            </div>
            
            <div className="aspect-square relative rounded-lg overflow-hidden group">
              <Image 
                src="/images/stewardess-hero.jpg" 
                alt="Portrétní fotografie" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">Modelingové portfolio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-slate-900 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Zarezervujte si svůj termín</h2>
          <p className="text-xl mb-8">Vytvoříme fotografie, které vyprávějí váš příběh</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/kontakt" className="btn bg-white text-slate-900 hover:bg-gray-100">
              Kontaktovat
            </a>
            <a href="/online-dock" className="btn border border-white text-white hover:bg-white/10">
              Další služby →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}