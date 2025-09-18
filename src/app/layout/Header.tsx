import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-[#f0dbbe] border-b">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Menú (hamburger)*/}
        <button
          aria-label="Abrir menú"
          className="p-2 rounded hover:bg-amber-200 focus:outline-none focus:ring"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Logo */}
        <Link to="/" className="inline-flex items-center">
          <img src="/logo_indoff_pro.png" alt="Indoff Pro" className="h-16 w-auto" />
        </Link>

        {/* Carrito */}
        <Link to="/cart" aria-label="Carrito" className="p-2 rounded hover:bg-amber-200 focus:outline-none focus:ring">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M3 3h2l.4 2M7 13h9l3-8H6.4M7 13l-2 5h13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </header>
  );
}
