//Footer te la pagina que llamamos en AppLayout ya que se utilziara en todas las vistas
export default function Footer() {
  const year = new Date().getFullYear(); //Obtener el año actual para la parte de copyright

  //Despues se deberan consumir en la api para no tenerlas hardcode
  const categories = [
    { label: 'Plumas', href: '/category/recruiting' },
    { label: 'Termos', href: '/category/retention' },
    { label: 'Camisetas', href: '/category/recognition' },
    { label: 'Gorras', href: '/category/recruiting' },
    { label: 'Bolsas', href: '/category/retention' },
    { label: 'Placas', href: '/category/recognition' },
  ];

  return (
    <footer className="text-[#11110f]">
      {/* Barra previa al pie de pagina */}
      <div className="bg-[#c21320] text-white">
        <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3 items-center justify-between sm:flex-row">
          <p className="text-center text-sm sm:text-base">
            ¿Tienes un proyecto? Solicita una cotización personalizada.
          </p>
          <a //Boton de solicitar cotizacion tal vez lo quite
            href="/quote"
            className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium
                       ring-1 ring-white/30 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
          >
            Solicitar cotización
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Cuerpo Principal */}
      <div className="bg-[#f0dbbe]">
        <div className="mx-auto max-w-6xl px-4 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Marca + redes */}
          <div className="text-center sm:text-left">
            <img src="/logo_indoff_pro.png" alt="Indoff Pro" className="h-10 w-auto mx-auto sm:mx-0" />
            <p className="mt-3 text-sm/6 text-[#11110f]/80">
              Promocionales con propósito. Soluciones para recruiting, retention y recognition.
            </p>
            <div className="mt-4 flex items-center justify-center sm:justify-start gap-3">
              <a //TODO: Cambiar links a las redes de indoff
                href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#c21320] text-white
                           hover:bg-[#67161f] focus:outline-none focus:ring-2 focus:ring-[#c21320]"
                aria-label="Facebook"
              >
                {/* Facebook */}
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M13.5 9.5V7.8c0-.8.2-1.3 1.4-1.3h1.1V4h-1.8c-2.2 0-3.5 1.3-3.5 3.6v1.9H9v2.5h1.7V20h2.8v-8h1.9l.3-2.5h-2.2z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#c21320] text-white
                           hover:bg-[#67161f] focus:outline-none focus:ring-2 focus:ring-[#c21320]"
                aria-label="LinkedIn"
              >
                {/* LinkedIn */}
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6.94 8.5H4.1V20h2.84V8.5zM5.52 7.14a1.65 1.65 0 1 0 0-3.3 1.65 1.65 0 0 0 0 3.3zM20 20h-2.82v-5.6c0-1.33-.48-2.23-1.68-2.23-.92 0-1.47.62-1.71 1.22-.09.22-.12.53-.12.84V20H10.9s.04-9.77 0-10.8h2.77v1.53c.37-.57 1.03-1.38 2.51-1.38 1.83 0 3.21 1.2 3.21 3.78V20z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Categorías ya mapeadas */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-[#11110f]">Categorías</h4>
            <ul className="mt-3 space-y-2 text-sm text-[#11110f]/80">
              {categories.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    className="hover:text-[#67161f] underline decoration-transparent hover:decoration-[#67161f]/40 underline-offset-4"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-[#11110f]">Contáctanos</h4>
            <ul className="mt-3 space-y-2 text-sm text-[#11110f]/80">
              <li>Tijuana, México</li>
              <li>
                <a href="mailto:mexico@indoff.com" className="hover:text-[#67161f]">mexico@indoff.com</a>
              </li>
              <li><a href="tel:+526646251114" className="hover:text-[#67161f]">(664) 625 1114</a></li>
              <li><a href="tel:+16197137190" className="hover:text-[#67161f]">(619) 713 7190</a></li>
            </ul>
          </div>

          {/* Legal TODO: Esto si tendra pagina propia o por lo menos pop-up */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-[#11110f]">Legal</h4>
            <ul className="mt-3 space-y-2 text-sm text-[#11110f]/80">
              <li><a href="/privacy" className="hover:text-[#67161f]">Aviso de privacidad</a></li>
              <li><a href="/terms" className="hover:text-[#67161f]">Términos y condiciones</a></li>
              <li><a href="/cookies" className="hover:text-[#67161f]">Política de cookies</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <a //Para volver hasta arriba d ela pagina
            href="#top"
            className="inline-flex items-center gap-2 text-sm text-[#11110f]/70 hover:text-[#67161f]"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 19V5m0 0l-6 6m6-6l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Volver arriba
          </a>

          <div className="flex items-center gap-3">
            <img src="/logo_indoff_pro.png" alt="Indoff Pro" className="h-6 w-auto" />
            <p className="text-xs text-[#11110f]/70">
              © {year} indoffpro.com — Todos los derechos reservados
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

