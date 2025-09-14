'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "Kolik stojí profesionální dronové natáčení?",
      answer: "Cena se odvíjí od složitosti projektu, délky natáčení a typu záběrů. Základní ceny: komerční natáčení od 8.000 Kč, nemovitosti od 5.000 Kč, události od 6.000 Kč. Každý projekt oceníme individuálně po konzultaci."
    },
    {
      question: "Potřebujete povolení pro létání s dronem?",
      answer: "Ano, máme všechna potřebná povolení a certifikace pro komerční létání. Starám se o získání všech administrativních povolení pro konkrétní lokace. Létáme v souladu s českými i evropskými předpisy."
    },
    {
      question: "Jaký je postup při objednávce služeb?",
      answer: "1. Kontaktujete nás s popisem projektu 2. Provedeme konzultaci a připravíme cenovou nabídku 3. Po odsouhlasení domluváme termín natáčení 4. Realizujeme natáčení podle plánu 5. Dodáváme finální materiály podle požadavků"
    },
    {
      question: "Jak dlouho trvá zpracování materiálů?",
      answer: "Závisí na rozsahu projektu. Základní střih a úpravy: 3-5 pracovních dní. Komplexní post-production s efekty: 7-14 dní. Při urgentních zakázkách dokážeme urychlit dodání za příplatek."
    },
    {
      question: "Můžete natáčet i v interiérech?",
      answer: "Samozřejmě! Specializujeme se na natáčení jak v exteriérech, tak interiérech. Máme potřebné vybavení pro natáčení v budovách, halách, kancelářích i domácnostech. Drony používáme i pro interiérové záběry velkých prostorů."
    },
    {
      question: "Jaké formáty a rozlišení dodáváte?",
      answer: "Standardně dodáváme ve 4K rozlišení (3840x2160). Podporujeme všechny běžné formáty: MP4, MOV, AVI. Pro sociální sítě připravíme specifické formáty: Instagram Stories (9:16), YouTube (16:9), TikTok (9:16)."
    },
    {
      question: "Poskytujete i jen fotografie bez videa?",
      answer: "Ano, nabízíme i čistě fotografické služby. Specializujeme se na leteckou fotografii nemovitostí, událostí, krajiny a komerční fotografie. Dodáváme v RAW i JPEG formátech, včetně profesionální úpravy."
    },
    {
      question: "Jak daleko dokážete létat s dronem?",
      answer: "Podle českých předpisů můžeme létat až do vzdálenosti 500m od operátora při zachování vizuálního kontaktu. Pro speciální případy máme povolení pro létání mimo vizuální kontakt (BVLOS) až do vzdálenosti několika kilometrů."
    },
    {
      question: "Máte pojištění pro případ škody?",
      answer: "Ano, máme pojištění profesionální odpovědnosti do výše 5 milionů Kč. Naše vybavení je pojištěno proti krádeži i poškození. Při každém natáčení dodržujeme přísné bezpečnostní protokoly."
    },
    {
      question: "Můžete natáčet i v noci nebo za špatného počasí?",
      answer: "Noční natáčení je možné s našimi drony vybavených osvětlením a termálními kamerami. Za deště nebo silného větru (nad 10 m/s) nelétáme z bezpečnostních důvodů. Vždy sledujeme předpověď a případně termín přesuneme."
    }
  ];

  return (
    <>
      {/* Hero sekce */}
      <section className="section bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">
        <div className="container">
          <div className="text-center mb-12">
            <div className="text-6xl mb-6">❓</div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              ČASTO KLADENÉ OTÁZKY
            </h1>
            <p className="lead text-blue-100 max-w-3xl mx-auto">
              Najděte odpovědi na nejčastější otázky týkající se našich služeb. 
              Pokud zde nenajdete to, co hledáte, neváhejte nás kontaktovat!
            </p>
          </div>
        </div>
      </section>

      {/* FAQ sekce */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    <div className={`text-2xl transition-transform duration-200 ${
                      openItems.includes(index) ? 'transform rotate-45' : ''
                    }`}>
                      ➕
                    </div>
                  </button>
                  
                  {openItems.includes(index) && (
                    <div className="px-6 pb-5">
                      <div className="pt-2 border-t border-gray-100">
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Kontakt CTA */}
      <section className="section bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Nepíšeme vaši otázku?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Naše flight crew je připravena odpovědět na jakékoli dotazy ohledně vašeho projektu. 
              Kontaktujte řídicí věž a získejte personalizovanou konzultaci!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/kontakt" 
                className="btn bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-medium"
              >
                📞 Kontaktovat flight control
              </a>
              <a 
                href="/terminal" 
                className="btn border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-medium"
              >
                ✈️ Vytvořit letový plán
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Rychlé informace */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3">Rychlá odpověď</h3>
              <p className="text-gray-600">
                Odpovídáme na všechny dotazy do 2 hodin v pracovní dny
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3">Přesná kalkulace</h3>
              <p className="text-gray-600">
                Každý projekt oceníme individuálně podle vašich specifických potřeb
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-semibold mb-3">Bezplatná konzultace</h3>
              <p className="text-gray-600">
                První konzultace je vždy zdarma, včetně základního návrhu řešení
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}