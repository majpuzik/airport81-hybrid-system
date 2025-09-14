import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-10 bg-slate-50">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">✈️</span>
              <span className="font-bold">AIRPORT81</span>
            </div>
            <p className="text-sm text-slate-600">
              Virtuální letiště pro vaše kreativní projekty.
            </p>
          </div>

          {/* Služby */}
          <div>
            <h3 className="font-semibold mb-3">Naše doky</h3>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/drone-dock" className="text-slate-600 hover:text-blue-600">🚁 Drone Dock</Link>
              <Link href="/foto-dock" className="text-slate-600 hover:text-purple-600">📸 Foto Dock</Link>
              <Link href="/online-dock" className="text-slate-600 hover:text-green-600">🌐 Online Dock</Link>
              <Link href="/design-dock" className="text-slate-600 hover:text-pink-600">🎨 Design Dock</Link>
            </nav>
          </div>

          {/* Rychlé odkazy */}
          <div>
            <h3 className="font-semibold mb-3">Rychlé odkazy</h3>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/terminal" className="text-slate-600 hover:text-slate-900">✈️ Letový plán</Link>
              <Link href="/kontakt" className="text-slate-600 hover:text-slate-900">📞 Kontakt</Link>
              <Link href="/#docks" className="text-slate-600 hover:text-slate-900">📋 Služby</Link>
              <Link href="/faq" className="text-slate-600 hover:text-slate-900">❓ FAQ</Link>
            </nav>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="font-semibold mb-3">Kontakt</h3>
            <div className="text-sm text-slate-600 space-y-2">
              <p>📧 info@airport81.eu</p>
              <p>📱 +420 XXX XXX XXX</p>
              <p>📍 Praha, Česká republika</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} Airport81. All rights reserved.</p>
          <nav className="text-sm flex gap-4 text-slate-500">
            <Link href="/gdpr" className="hover:text-slate-700">GDPR</Link>
            <Link href="/cookies" className="hover:text-slate-700">Cookies</Link>
            <Link href="/pristupnost" className="hover:text-slate-700">Přístupnost</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
