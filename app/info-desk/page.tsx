export default function InfoDesk() {
  const teamMembers = [
    {
      name: "Kapitán Martin",
      role: "Hlavní pilot & Creative Director",
      specialization: "Dronové natáčení, řízení projektů",
      experience: "8+ let v letectví, 5+ let v kreativní branži",
      image: "👨‍✈️",
      description: "Zkušený pilot s certifikací pro komerční létání. Specializuje se na komplexní projekty vyžadující precizní letovou koordinaci."
    },
    {
      name: "Anna Steward",
      role: "Flight Attendant & Project Manager",
      specialization: "Zákaznická péče, koordinace projektů",
      experience: "6+ let v projektovém managementu",
      image: "👩‍✈️",
      description: "Stará se o perfektní průběh každého letu. Od prvního kontaktu až po závěrečné předání zajišťuje, aby vše proběhlo hladce."
    },
    {
      name: "Tech Mike",
      role: "Palubní inženýr & Post-production Specialist",
      specialization: "Střih, zvuk, efekty, technické řešení",
      experience: "10+ let v post-produkci",
      image: "👨‍💻",
      description: "Guru technologií, který z natočených záběrů vytváří kinematografické zážitky. Specializuje se na pokročilé efekty a zvukový design."
    }
  ];

  const certifications = [
    {
      title: "Certifikát pro komerční létání",
      description: "Oprávnění k provozování dronů pro komerční účely",
      icon: "🏆"
    },
    {
      title: "BVLOS Povolení",
      description: "Létání mimo vizuální kontakt až do 5 km",
      icon: "🎯"
    },
    {
      title: "Pojištění 5M Kč",
      description: "Kompletní krytí profesionální odpovědnosti",
      icon: "🛡️"
    },
    {
      title: "Adobe Certified Expert",
      description: "Certifikace v oblasti post-produkce",
      icon: "🎨"
    }
  ];

  const equipment = [
    {
      category: "Drony",
      items: [
        "DJI Mavic 3 Pro Cine",
        "DJI Air 2S",
        "DJI Mini 3 Pro",
        "FPV Racing Drone"
      ]
    },
    {
      category: "Kamery",
      items: [
        "Sony FX3 Cinema Camera",
        "Canon EOS R6 Mark II",
        "GoPro Hero 11 Black",
        "Stabilizátory DJI"
      ]
    },
    {
      category: "Audio",
      items: [
        "Rode PodMic",
        "Audio-Technica AT4040",
        "Zoom H6 rekordér",
        "Profesionální monitoring"
      ]
    },
    {
      category: "Software",
      items: [
        "Adobe Creative Suite",
        "Final Cut Pro X",
        "Logic Pro X",
        "Cinema 4D"
      ]
    }
  ];

  return (
    <>
      {/* Hero sekce */}
      <section className="section bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white">
        <div className="container">
          <div className="text-center mb-12">
            <div className="text-6xl mb-6">ℹ️</div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              INFO DESK
            </h1>
            <p className="lead text-blue-100 max-w-3xl mx-auto">
              Poznejte naši flight crew a technické vybavení našeho virtuálního letiště. 
              Jsme tým profesionálů s passion pro dokonalost.
            </p>
          </div>
        </div>
      </section>

      {/* Flight Crew sekce */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ✈️ Naše Flight Crew
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Zkušený tým pilotů a specialistů, kteří vaše vize převedou do reality
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-lg font-medium text-blue-600 mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    {member.experience}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Specializace:</h4>
                    <p className="text-gray-600 text-sm">{member.specialization}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">O pilotovi:</h4>
                    <p className="text-gray-600 text-sm">{member.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifikace sekce */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🏅 Certifikace & Povolení
            </h2>
            <p className="text-xl text-gray-600">
              Všechna potřebná povolení pro bezpečný a legální provoz
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center">
                <div className="text-4xl mb-4">{cert.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {cert.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technické vybavení */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ⚙️ Technické vybavení
            </h2>
            <p className="text-xl text-gray-600">
              Profesionální vybavení pro dosažení maximální kvality
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {equipment.map((category, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  {category.category}
                </h3>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-gray-700">
                      <span className="text-blue-500 mr-2">✓</span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistiky */}
      <section className="section bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              📊 Naše čísla mluví za nás
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">200+</div>
              <p className="text-blue-100">Úspěšných projektů</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50+</div>
              <p className="text-blue-100">Spokojených klientů</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">1000+</div>
              <p className="text-blue-100">Nalétaných hodin</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">99%</div>
              <p className="text-blue-100">Spokojenost klientů</p>
            </div>
          </div>
        </div>
      </section>

      {/* Kontakt CTA */}
      <section className="section bg-gray-900 text-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Připraveni k vzletu?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Naše flight crew je připravena proměnit vaše vize ve skutečnost. 
              Kontaktujte nás a začněme plánovat váš projekt!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/kontakt" 
                className="btn bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 text-lg font-medium"
              >
                📞 Kontaktovat tým
              </a>
              <a 
                href="/terminal" 
                className="btn border-2 border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white px-8 py-3 text-lg font-medium"
              >
                ✈️ Vytvořit letový plán
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}