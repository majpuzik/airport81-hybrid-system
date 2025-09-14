# Airport81 Starter (Next.js + Tailwind)

Rychlý skeleton pro hybridní web „Airport81“. Marketing může zůstat ve WordPressu/Elementoru; tahle app je pro rychlou, moderní část (doky, terminál, AI formuláře).

## Lokální spuštění
```bash
npm install
npm run dev
# otevři http://localhost:3000
```

## Obrázky
Vzorové obrázky jsou v `public/images`. Můžeš je nahradit svými.

## AI napojení
Vyplň `.env.local` podle `.env.example` a používej serverové akce / API route pro volání interní AI gateway.

## Další kroky
- Přidat stránky: /drone-dock, /foto-dock, /online-dock, /design-dock
- Přidat formulář „Letový plán“ (poptávka) → AI → PDF nabídka
- Přidat SEO (sitemap, metadata) a nasazení v Dockeru / Traefiku
