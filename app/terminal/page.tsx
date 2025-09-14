'use client';

import { useState } from 'react';

export default function Terminal() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    service: '',
    projectType: '',
    budget: '',
    timeline: '',
    company: '',
    contact: '',
    email: '',
    phone: '',
    description: ''
  });
  const [response, setResponse] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateFlightPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse('');

    try {
      const prompt = `Vytvoř profesionální letový plán (proposal) pro klienta na základě těchto údajů:

SLUŽBA: ${formData.service}
TYP PROJEKTU: ${formData.projectType}
ROZPOČET: ${formData.budget}
ČASOVÝ RÁMEC: ${formData.timeline}
FIRMA: ${formData.company}
KONTAKT: ${formData.contact}
EMAIL: ${formData.email}
TELEFON: ${formData.phone}
POPIS PROJEKTU: ${formData.description}

Vytvoř strukturovaný plán včetně:
1. Shrnutí projektu
2. Doporučené služby a postup
3. Časový harmonogram
4. Orientační rozpočet rozložený po etapách
5. Další kroky a doporučení

Odpověz profesionálně v češtině, používej Airport81 terminologii (letový plán, doky, vzlet apod.).`;

      // For now, create a mock response since we don't have the API endpoint yet
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      const mockResponse = `🛬 LETOVÝ PLÁN PRO ${formData.company.toUpperCase()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 SHRNUTÍ PROJEKTU
────────────────────
Projekt: ${formData.projectType} pro ${formData.company}
Služba: ${formData.service}
Rozpočet: ${formData.budget}
Termín: ${formData.timeline}

${formData.description}

✈️ DOPORUČENÝ LETOVÝ PLÁN
─────────────────────────
Fáze 1: Příprava mise (1-2 týdny)
• Detailní konzultace a analýza požadavků
• Technické mapování projektu
• Příprava flight crew a vybavení

Fáze 2: Vzlet (2-4 týdny)  
• Zahájení produkce podle specifikací
• Průběžné kontroly kvality
• Komunikace s řídící věží (klient)

Fáze 3: Přistání (1 týden)
• Finalizace a testování
• Předání projektu a školení
• Post-flight debriefing

💰 ORIENTAČNÍ ROZPOČET
──────────────────────
${formData.budget === '10000-25000' ? `
Celkový rozpočet: 10 000 - 25 000 Kč
• Konzultace a plánování: 20%
• Realizace: 70% 
• Finalizace a podpora: 10%
` : formData.budget === '25000-50000' ? `
Celkový rozpočet: 25 000 - 50 000 Kč
• Strategie a příprava: 25%
• Produkce: 65%
• Testování a předání: 10%
` : `
Rozpočet podle specifikace: ${formData.budget}
• Přizpůsobíme podle rozsahu projektu
• Transparentní cenová kalkulace
• Možnost rozložení na etapy
`}

🎯 DALŠÍ KROKY
──────────────
1. Schválení letového plánu
2. Domluvení startovního meetingu
3. Podpisání flight manifest (smlouva)
4. Zahájení mise

📞 KONTAKT FLIGHT CONTROL
─────────────────────────
Pro potvrzení letu kontaktujte naši řídící věž:
• Email: info@airport81.eu  
• Telefon: +420 XXX XXX XXX
• Online booking: airport81.eu/kontakt

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AIRPORT81 - Where creativity takes flight ✈️`;

      setResponse(mockResponse);

    } catch (error) {
      console.error('Chyba:', error);
      setResponse('⚠️ Omlouvám se, ale došlo k chybě při generování letového plánu. Zkuste to prosím znovu nebo nás kontaktujte přímo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Hero sekce */}
      <section className="section bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">
        <div className="container">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">✈️</div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              LETOVÝ PLÁN
            </h1>
            <p className="lead text-slate-300 max-w-2xl mx-auto">
              AI asistent pro přípravu vašeho projektu. Vyplňte údaje a získejte 
              detailní plán včetně harmonogramu a rozpočtu.
            </p>
          </div>
          
          {/* Terminál interface */}
          <div className="bg-black/50 backdrop-blur rounded-2xl border border-gray-700 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 p-4 border-b border-gray-700">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-400 text-sm ml-2">Airport81 Terminal v1.0</span>
            </div>
            
            <div className="p-6">
              <form onSubmit={generateFlightPlan} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Levý sloupec */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Jakou službu potřebujete? *
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Vyberte službu</option>
                        <option value="drone">🚁 Dronové natáčení/foto</option>
                        <option value="photo">📸 Fotografie</option>
                        <option value="web">🌐 Webové stránky</option>
                        <option value="design">🎨 Design & branding</option>
                        <option value="multiple">✨ Kombinace služeb</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Typ projektu *
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Vyberte typ</option>
                        <option value="Firemní prezentace">🏢 Firemní prezentace</option>
                        <option value="Marketing/reklama">📢 Marketing/reklama</option>
                        <option value="E-shop/katalog">🛒 E-shop/katalog</option>
                        <option value="Event/akce">🎉 Event/akce</option>
                        <option value="Nemovitosti">🏠 Nemovitosti</option>
                        <option value="Startup/nová značka">🚀 Startup/nová značka</option>
                        <option value="Jiné">📋 Jiné</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Rozpočtové rozpětí *
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Vyberte rozpočet</option>
                        <option value="10000-25000">💰 10 000 - 25 000 Kč</option>
                        <option value="25000-50000">💰💰 25 000 - 50 000 Kč</option>
                        <option value="50000-100000">💰💰💰 50 000 - 100 000 Kč</option>
                        <option value="100000-200000">💎 100 000 - 200 000 Kč</option>
                        <option value="200000+">💎💎 200 000+ Kč</option>
                        <option value="flexible">🔄 Flexibilní podle návrhu</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Časový rámec *
                      </label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Vyberte termín</option>
                        <option value="Co nejdříve (1-2 týdny)">🚀 Co nejdříve (1-2 týdny)</option>
                        <option value="Do 1 měsíce">📅 Do 1 měsíce</option>
                        <option value="Do 3 měsíců">🗓️ Do 3 měsíců</option>
                        <option value="Flexibilní termín">⏰ Flexibilní termín</option>
                        <option value="Plánované na konkrétní datum">📌 Plánované na konkrétní datum</option>
                      </select>
                    </div>
                  </div>

                  {/* Pravý sloupec */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Název firmy/organizace *
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Název vaší firmy"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Kontaktní osoba *
                      </label>
                      <input
                        type="text"
                        name="contact"
                        value={formData.contact}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Jméno kontaktní osoby"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="vas@email.cz"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+420 xxx xxx xxx"
                      />
                    </div>
                  </div>
                </div>

                {/* Popis projektu */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Podrobný popis projektu *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Popište co nejdetailněji váš projekt, cíle, představy, specifické požadavky..."
                  />
                </div>

                {/* Tlačítko */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`btn btn-primary px-8 py-3 text-lg ${
                      isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <span className="inline-block w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Připravuji letový plán...
                      </>
                    ) : (
                      '🚀 Generovat letový plán'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Výsledek */}
      {response && (
        <section className="section bg-slate-50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900">
                    📋 Váš letový plán je připraven
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigator.clipboard.writeText(response)}
                      className="btn bg-blue-600 text-white hover:bg-blue-700 text-sm"
                    >
                      📋 Kopírovat
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <pre className="whitespace-pre-wrap text-sm font-mono text-gray-700 leading-relaxed">
                    {response}
                  </pre>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <p className="text-gray-600 mb-4">
                  Líbí se vám náš návrh? Kontaktujte nás pro detailní konzultaci.
                </p>
                <div className="flex gap-4 justify-center">
                  <a href="/kontakt" className="btn btn-primary">
                    📞 Kontaktovat nás
                  </a>
                  <button
                    onClick={() => {
                      setResponse('');
                      setFormData({
                        service: '',
                        projectType: '',
                        budget: '',
                        timeline: '',
                        company: '',
                        contact: '',
                        email: '',
                        phone: '',
                        description: ''
                      });
                    }}
                    className="btn bg-gray-200 text-gray-800 hover:bg-gray-300"
                  >
                    🔄 Nový letový plán
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
