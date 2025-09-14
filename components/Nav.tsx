'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="container flex items-center justify-between h-14">
        <Link href="/" className="font-semibold tracking-wide flex items-center gap-2">
          <span className="text-xl">✈️</span>
          <span>AIRPORT81</span>
        </Link>
        
        {/* Desktop menu */}
        <nav className="hidden md:flex gap-6 text-sm items-center">
          <div className="flex gap-3">
            <Link href="/drone-dock" className="hover:text-blue-600 transition-colors">Drone</Link>
            <Link href="/foto-dock" className="hover:text-purple-600 transition-colors">Foto</Link>
            <Link href="/online-dock" className="hover:text-green-600 transition-colors">Online</Link>
            <Link href="/design-dock" className="hover:text-pink-600 transition-colors">Design</Link>
          </div>
          <Link href="/terminal" className="hover:text-gray-600 transition-colors">✈️ Terminál</Link>
          <Link href="/admin" className="hover:text-orange-600 transition-colors text-xs">⚙️ Admin</Link>
          <Link href="/kontakt" className="btn btn-primary">Kontakt</Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav className="md:hidden border-t border-slate-200 bg-white p-4">
          <div className="flex flex-col gap-3">
            <Link href="/drone-dock" className="py-2">🚁 Drone Dock</Link>
            <Link href="/foto-dock" className="py-2">📸 Foto Dock</Link>
            <Link href="/online-dock" className="py-2">🌐 Online Dock</Link>
            <Link href="/design-dock" className="py-2">🎨 Design Dock</Link>
            <Link href="/terminal" className="py-2">✈️ Terminál</Link>
            <Link href="/kontakt" className="py-2 font-semibold">📞 Kontakt</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
