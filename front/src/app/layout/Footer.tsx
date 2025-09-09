export default function Footer() {
  return (
    <footer className="mt-16">
      {/* Barra superior roja */}
      <div className="bg-red-700 text-white text-center text-sm py-2">
        Inicio de página
      </div>

      {/* Cuerpo beige */}
      <div className="bg-amber-100">
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h4 className="font-semibold mb-3">Categorías</h4>
            <ul className="space-y-2 text-sm text-gray-800">
              <li>Plumas</li>
              <li>Termos</li>
              <li>Camisetas</li>
              <li>Gorras</li>
              <li>Bolsas</li>
              <li>Placas</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Contactanos</h4>
            <ul className="space-y-2 text-sm text-gray-800">
              <li>Tijuana, México</li>
              <li>mexico@indoff.com</li>
              <li>(664) 625 1114</li>
              <li>(619) 713 7190</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Redes</h4>
            <div className="flex items-center gap-3">
              <a className="inline-flex items-center justify-center w-9 h-9 rounded bg-blue-600 text-white">f</a>
              <a className="inline-flex items-center justify-center w-9 h-9 rounded bg-sky-700 text-white">in</a>
            </div>
          </div>
        </div>
      </div>

      {/* Línea inferior + logo + aviso */}
      <div className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col items-center gap-3">
          <img src="/logo_indoff_pro.png" alt="Indoff Pro" className="h-8 w-auto" />
          <p className="text-xs text-gray-600">
            Aviso de privacidad | © {new Date().getFullYear()} Copyright: indoffpro.com
          </p>
        </div>
      </div>
    </footer>
  );
}
