export default function HomePage() {
  return (
    <section className="max-w-6xl mx-auto px-4 pt-10 pb-20">
      {/* Hero */}
      <div className="rounded-2xl p-8 md:p-10 bg-gradient-to-b from-rose-50 to-white border">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Promocionales con Propósito
        </h1>
        <p className="mt-2 text-gray-600">
          Artículos promocionales para cualquier ocasión especial.
        </p>
      </div>

      {/* Grid de categorías destacadas */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Retention */}
        <a href="/category/retention" className="group rounded-2xl bg-white border shadow-sm hover:shadow-md transition overflow-hidden">
          <div className="p-6">
            <div className="aspect-[4/3] rounded-lg overflow-hidden border bg-gray-50">
              <img
                src="https://images.unsplash.com/photo-1610395219791-d83c2fbb08df?q=80&w=1200&auto=format&fit=crop"
                alt="Termos"
                className="h-full w-full object-cover group-hover:scale-[1.02] transition"
                loading="lazy"
              />
            </div>
            <h3 className="mt-4 text-xl font-semibold">Retention</h3>
            <p className="mt-1 text-sm text-gray-600">
              Refuerza la lealtad de tu equipo. Con estos increíbles productos.
            </p>
          </div>
        </a>

        {/* Recognition */}
        <a href="/category/recognition" className="group rounded-2xl bg-white border shadow-sm hover:shadow-md transition overflow-hidden">
          <div className="p-6">
            <div className="aspect-[4/3] rounded-lg overflow-hidden border bg-gray-50">
              <img
                src="https://images.unsplash.com/photo-1520975730590-0b5a1f6be25c?q=80&w=1200&auto=format&fit=crop"
                alt="Camiseta"
                className="h-full w-full object-cover group-hover:scale-[1.02] transition"
                loading="lazy"
              />
            </div>
            <h3 className="mt-4 text-xl font-semibold">Recognition</h3>
            <p className="mt-1 text-sm text-gray-600">
              Un detalle que dice: ¡gracias! Para los que estuvieron desde el inicio.
            </p>
          </div>
        </a>

        {/* Recruiting */}
        <a href="/category/recruiting" className="group rounded-2xl bg-white border shadow-sm hover:shadow-md transition overflow-hidden">
          <div className="p-6">
            <div className="aspect-[4/3] rounded-lg overflow-hidden border bg-gray-50">
              <img
                src="https://images.unsplash.com/photo-1586484639683-3b5b3a34b1d3?q=80&w=1200&auto=format&fit=crop"
                alt="Plumas"
                className="h-full w-full object-cover group-hover:scale-[1.02] transition"
                loading="lazy"
              />
            </div>
            <h3 className="mt-4 text-xl font-semibold">Recruiting</h3>
            <p className="mt-1 text-sm text-gray-600">
              Convierte talentos en equipo. Con estos productos.
            </p>
          </div>
        </a>
      </div>
    </section>
  );
}

