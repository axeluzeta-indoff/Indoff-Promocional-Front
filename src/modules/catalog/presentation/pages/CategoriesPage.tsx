import { useCategories } from "../../application/hooks/useCategories";
import CategoryCard from "../../presentation/components/CategoryCard";
import CategoryHoverMenu from "../../presentation/components/CategoryHoverMenu";
import { Link } from "react-router-dom";

export default function CategoriesPage() {
  const { data, isLoading, error } = useCategories();

  return (
    <main>
      {/* HERO */}
      <section className="bg-gradient-to-b from-[#f0dbbe] to-white ">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
          <div className="rounded-2xl border bg-white/70 backdrop-blur px-6 py-8 md:px-10 md:py-12 shadow-sm">
            <span className="inline-block text-xs font-semibold tracking-wider text-[#67161f] bg-[#c21320]/10 ring-1 ring-[#c21320]/20 rounded-full px-3 py-1">
              Indoff Pro · México
            </span>
            <h1 className="mt-4 text-3xl md:text-4xl font-bold text-[#11110f]">
              Promocionales con Propósito
            </h1>
            <p className="mt-2 text-[#11110f]/70 max-w-2xl">
              Artículos para <b>Recruiting</b>, <b>Retention</b> y <b>Recognition</b>.
              Personalización, calidad y soporte cercano.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="#categories"
                className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-white bg-[#c21320] hover:bg-[#67161f] ring-1 ring-[#c21320]/30"
              >
                Ver catálogo
              </a>
              <Link
                to="/quote"
                className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-[#11110f] bg-white hover:bg-[#f7f7f7] ring-1 ring-[#11110f]/10"
              >
                Solicitar cotización
              </Link>
            </div>
          </div>

          {/* CATEGORÍAS */}
          <section id="categories" className="max-w-6xl mx-auto px-4 pt-8 pb-16">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#11110f]">Explora por categoría</h2>
                <p className="mt-1 text-sm text-[#11110f]/70">Elige el enfoque y descubre subcategorías.</p>
              </div>
            </div>

            {/* Loading */}
            {isLoading && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="rounded-2xl bg-white border p-6 shadow-sm animate-pulse">
                    <div className="aspect-[4/3] rounded-lg bg-gray-200" />
                    <div className="mt-4 h-5 w-1/2 bg-gray-200 rounded" />
                    <div className="mt-2 h-4 w-3/4 bg-gray-100 rounded" />
                  </div>
                ))}
              </div>
            )}

            {/* Error */}
            {!isLoading && error && (
              <div className="mt-6 rounded-lg border border-red-200 bg-red-50 text-red-700 p-4">
                No se pudieron cargar las categorías.
              </div>
            )}

            {/* Grid */}
            {!isLoading && !error && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {(data ?? []).map((c) => (
                  <CategoryHoverMenu key={c.id} category={c}>
                    <CategoryCard category={c} />
                  </CategoryHoverMenu>
                ))}
              </div>
            )}

            {/* Empty */}
            {!isLoading && !error && (data?.length ?? 0) === 0 && (
              <p className="mt-6 text-[#11110f]/70">Aún no hay categorías activas.</p>
            )}
          </section>

          {/* FEATURES */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Feature
              title="Personalización"
              desc="Grabado, bordado o impresión para tu marca."
              icon={<path d="M4 7h16M4 12h10M4 17h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />}
            />
            <Feature
              title="Catálogo curado"
              desc="Selección clara para no perder tiempo."
              icon={<path d="M4 5h6v14H4zM14 5h6v8h-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />}
            />
            <Feature
              title="Acompañamiento"
              desc="Atención directa durante todo el proceso."
              icon={<path d="M12 11c2.761 0 5-2.239 5-5M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function Feature({ title, desc, icon }: { title: string; desc: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="h-10 w-10 grid place-items-center rounded-full bg-[#c21320]/10 text-[#c21320] ring-1 ring-[#c21320]/20">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">{icon}</svg>
      </div>
      <h3 className="mt-3 font-semibold text-[#11110f]">{title}</h3>
      <p className="mt-1 text-sm text-[#11110f]/70">{desc}</p>
    </div>
  );
}
