import Image from "next/image";

export default function Kontakt() {
  return (
    <>
      {/* Hero sekce s letuškou */}
      <section className="section bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white">
        <div className="container grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="bg-black/30 backdrop-blur-sm border border-blue-500/30 rounded-lg px-4 py-2 inline-block mb-4">
              <span className="text-blue-400 text-sm font-mono">INFO DESK • CUSTOMER SERVICE</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Kontaktujte nás
            </h1>
            <p className="lead text-blue-200 mt-4">
              Jsme tu pro vás. Ať už potřebujete konzultaci, cenovou nabídku nebo jen rychlou radu, 
              naše letuška vám ráda pomůže.
            </p>
            
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-3xl">📞</span>
                <div>
                  <div className="text-sm text-gray-300">Telefon</div>
                  <div className="text-xl font-semibold">+420 XXX XXX XXX</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-3xl">✉️</span>
                <div>
                  <div className="text-sm text-gray-300">Email</div>
                  <div className="text-xl font-semibold">info@airport81.eu</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-3xl">📍</span>
                <div>
                  <div className="text-sm text-gray-300">Adresa</div>
                  <div className="text-xl font-semibold">Praha, Česká republika</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-3xl">🕐</span>
                <div>
                  <div className="text-sm text-gray-300">Otevírací doba</div>
                  <div className="text-xl font-semibold">Po-Pá 10:00 - 19:00</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stewardka obrázek */}
          <div className="relative h-96 md:h-[600px]">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl"></div>
            <Image 
              src="/images/stewardess-hero.jpg" 
              alt="Airport81 Customer Service" 
              fill 
              className="object-cover rounded-2xl object-top" 
            />
          </div>
        </div>
      </section>

      {/* Kontaktní formulář */}
      <section className="section">
        <div className="container max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
            Rezervace letištních služeb
          </h2>
          
          <form className="bg-white rounded-xl shadow-lg p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jméno a příjmení
                </label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Jan Novák"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input 
                  type="email" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="jan.novak@firma.cz"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon
                </label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+420 XXX XXX XXX"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Služba
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Vyberte službu...</option>
                  <option>Drone Dock - Letecké natáčení</option>
                  <option>Foto Dock - Profesionální fotografie</option>
                  <option>Online Dock - Web development</option>
                  <option>Design Dock - Grafický design</option>
                  <option>Kompletní produkce</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zpráva
              </label>
              <textarea 
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Popište váš projekt..."
              ></textarea>
            </div>
            
            <div className="text-center">
              <button 
                type="submit"
                className="btn bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3"
              >
                Odeslat poptávku
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Mapa nebo další info */}
      <section className="section bg-slate-50">
        <div className="container">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Připraveni vzlétnout?
            </h2>
            <p className="lead mb-8 max-w-2xl mx-auto">
              Nenechte si uletět příležitost. Kontaktujte nás ještě dnes a společně 
              vytvoříme něco výjimečného.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a className="btn bg-white text-blue-600" href="tel:+420XXXXXXXXX">
                <span className="mr-2">📞</span>
                Zavolat hned
              </a>
              <a className="btn border border-white text-white hover:bg-white/10" href="mailto:info@airport81.eu">
                <span className="mr-2">✉️</span>
                Napsat email
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
