import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* HOMEPAGE START - podle PowerPoint snímek 2-3 */}
      {/* TOP MENU SIDESCROLLER - snímek 2 */}
      <div className="bg-black text-white overflow-hidden">
        <div className="animate-marquee whitespace-nowrap py-2 text-sm">
          <span className="mx-4">otevřeno pondělí až pátek, 10:00 – 19:00</span>
          <span className="mx-4">• dnes je oblačno s teplotou 8 – 17 stupňů</span>
          <span className="mx-4">• dopravní situace je „mírná"</span>
          <span className="mx-4">• aleš dnes nesahal na kozy, tak je nevrhlý</span>
          <span className="mx-4">• dovolená od...</span>
        </div>
      </div>

      {/* INTRO SECTION - snímek 3 */}
      <section className="section bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        {/* Background image - letiště podle PowerPointu */}
        <div className="absolute inset-0 opacity-30">
          <Image 
            src="/images/hall-1.jpg" 
            alt="Airport81 letiště" 
            fill 
            className="object-cover"
          />
        </div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              AIRPORT81
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Vítejte na letišti snů, kde realizujeme Vaše představy
            </p>
            <p className="text-lg mb-8 opacity-90">
              Prozkoumejte v poklidu naše informace a ukázky. Pak se s námi kdykoliv spojte.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#docks" className="btn bg-white text-slate-900 hover:bg-gray-100">
                Prozkoumat služby
              </a>
              <a href="/kontakt" className="btn border border-white text-white hover:bg-white/10">
                Spojit se s námi
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DOCKS SECTION - snímek 4 */}
      <section id="docks" className="section">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-6">
            {/* DRONE DOCK */}
            <a href="/drone-dock" className="group relative overflow-hidden rounded-2xl dock-card">
              <div className="aspect-square relative">
                <Image 
                  src="/images/drone-1.jpg" 
                  alt="DRONE DOCK" 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">DRONE DOCK</h3>
                  <p className="text-sm opacity-90">Letecké natáčení</p>
                </div>
              </div>
            </a>

            {/* FOTO DOCK */}
            <a href="/foto-dock" className="group relative overflow-hidden rounded-2xl dock-card">
              <div className="aspect-square relative">
                <Image 
                  src="/images/drone-2.jpg" 
                  alt="FOTO DOCK" 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">FOTO DOCK</h3>
                  <p className="text-sm opacity-90">Profesionální fotografie</p>
                </div>
              </div>
            </a>

            {/* ONLINE DOCK */}
            <a href="/online-dock" className="group relative overflow-hidden rounded-2xl dock-card">
              <div className="aspect-square relative">
                <Image 
                  src="/images/drone-3.jpg" 
                  alt="ONLINE DOCK" 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">ONLINE DOCK</h3>
                  <p className="text-sm opacity-90">Web development</p>
                </div>
              </div>
            </a>

            {/* DESIGN DOCK */}
            <a href="/design-dock" className="group relative overflow-hidden rounded-2xl dock-card">
              <div className="aspect-square relative">
                <Image 
                  src="/images/drone-4.jpg" 
                  alt="DESIGN DOCK" 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">DESIGN DOCK</h3>
                  <p className="text-sm opacity-90">Grafický design</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* POSTS - snímek 5 */}
      <section className="section bg-gray-50">
        <div className="container">
          <p className="text-center text-gray-600 mb-8">
            Toto jsou POSTS (příspěvky). I my budeme muset komunikovat nějaké události a novinky.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-video relative">
                <Image src="/images/hall-1.jpg" alt="Post 1" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Novinka 1</h3>
                <p className="text-gray-600">Připravujeme něco výjimečného...</p>
              </div>
            </article>
            
            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-video relative">
                <Image src="/images/hall-2.jpg" alt="Post 2" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Novinka 2</h3>
                <p className="text-gray-600">Nové technologie v praxi...</p>
              </div>
            </article>
            
            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-video relative">
                <Image src="/images/hall-3.jpg" alt="Post 3" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Novinka 3</h3>
                <p className="text-gray-600">Úspěšný projekt dokončen...</p>
              </div>
            </article>
          </div>
          <div className="text-center mt-8">
            <a href="/novinky" className="btn btn-primary">VÍCE NOVINEK</a>
          </div>
        </div>
      </section>

      {/* NEWSLETTER - snímek 6 */}
      <section className="section">
        <div className="container max-w-2xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Nenechte si nic uletět</h2>
            <p className="text-lg text-gray-600 mb-2">Přihlaste se k odběru novinek.</p>
            <p className="text-sm text-gray-500 mb-8">
              Novinky z letiště / Speciální nabídky a akce na letišti / Informace ze zákulisí letiště
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Váš email" 
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button type="submit" className="btn btn-primary">Přihlásit</button>
            </form>
          </div>
        </div>
      </section>

      {/* SOCIAL MEDIA - snímek 7 */}
      <section className="section bg-slate-900 text-white">
        <div className="container text-center">
          <h3 className="text-2xl font-semibold mb-6">Sledujte nás na</h3>
          <div className="flex justify-center gap-6 text-4xl">
            <a href="#" className="hover:text-blue-400 transition-colors">📘</a>
            <a href="#" className="hover:text-pink-400 transition-colors">📷</a>
            <a href="#" className="hover:text-blue-300 transition-colors">❌</a>
            <a href="#" className="hover:text-red-500 transition-colors">📺</a>
          </div>
        </div>
      </section>

      {/* DOLNÍ NAVIGACE - snímek 8 */}
      {/* (Footer je v samostatné komponentě) */}

    </>
  );
}