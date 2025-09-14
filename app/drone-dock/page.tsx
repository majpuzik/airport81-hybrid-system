import Image from "next/image";

export default function DroneDock() {
  return (
    <>
      {/* DRONE DOCK - podle PowerPoint snímek 9 */}
      <section className="section bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              DRONE DOCK
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Vaše značka z výšky.
            </p>
            <p className="text-lg opacity-90">
              Jsme tým kreativních pilotů s kamerou
            </p>
          </div>
        </div>
      </section>

      {/* SLUŽBY - snímek 9 */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Co nabízíme</h2>
            
            <div className="space-y-8">
              {/* Komerční natáčení */}
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-2xl font-semibold mb-3">Komerční natáčení</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Reklamní spoty</li>
                  <li>• Produktové prezentace</li>
                  <li>• Firemní videa</li>
                  <li>• Dokumentace staveb</li>
                </ul>
              </div>

              {/* Nemovitosti */}
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-2xl font-semibold mb-3">Nemovitosti</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Virtuální prohlídky</li>
                  <li>• Letecké fotografie</li>
                  <li>• 360° panorama</li>
                  <li>• Interiérové průlety</li>
                </ul>
              </div>

              {/* Eventy */}
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-2xl font-semibold mb-3">Eventy</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Svatby</li>
                  <li>• Koncerty</li>
                  <li>• Sportovní akce</li>
                  <li>• Firemní události</li>
                </ul>
              </div>

              {/* Inspekce */}
              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-2xl font-semibold mb-3">Inspekce</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Kontrola střech</li>
                  <li>• Inspekce mostů</li>
                  <li>• Solární panely</li>
                  <li>• Větrné turbíny</li>
                </ul>
              </div>

              {/* Specifické služby */}
              <div className="border-l-4 border-yellow-500 pl-6">
                <h3 className="text-2xl font-semibold mb-3">Specifické služby</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Termovizní snímání</li>
                  <li>• 3D mapování</li>
                  <li>• Ortofotomapy</li>
                  <li>• Časosběrné snímky</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALERIE */}
      <section className="section bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Ukázky naší práce</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="aspect-video relative rounded-lg overflow-hidden group">
              <Image 
                src="/images/drone-1.jpg" 
                alt="Letecký záběr města" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="aspect-video relative rounded-lg overflow-hidden group">
              <Image 
                src="/images/drone-2.jpg" 
                alt="Inspekce budovy" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="aspect-video relative rounded-lg overflow-hidden group">
              <Image 
                src="/images/drone-3.jpg" 
                alt="Svatební záběr" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="aspect-video relative rounded-lg overflow-hidden group">
              <Image 
                src="/images/drone-4.jpg" 
                alt="Firemní prezentace" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="aspect-video relative rounded-lg overflow-hidden group">
              <Image 
                src="/images/hall-1.jpg" 
                alt="Interiérový průlet" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="aspect-video relative rounded-lg overflow-hidden group">
              <Image 
                src="/images/hall-2.jpg" 
                alt="Dokumentace stavby" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-slate-900 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Připraveni vzlétnout s vámi!</h2>
          <p className="text-xl mb-8">Kontaktujte nás pro nezávaznou konzultaci vašeho projektu</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/kontakt" className="btn bg-white text-slate-900 hover:bg-gray-100">
              Kontaktovat
            </a>
            <a href="/foto-dock" className="btn border border-white text-white hover:bg-white/10">
              Další služby →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}