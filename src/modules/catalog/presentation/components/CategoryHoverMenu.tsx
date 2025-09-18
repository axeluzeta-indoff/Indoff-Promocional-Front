import { useEffect, useMemo, useRef, useState } from "react";
import { Popover, Spin } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import type { Category, Subcategory } from "../../domain";
import { useSubcategories } from "../../application/hooks/useSubcategories";
import { useProductsPreview, prefetchProductsPreview } from "../../application/hooks/useProductsPreview";
import { useQueryClient } from "@tanstack/react-query";

export default function CategoryHoverMenu({ category, children }: { category: Category; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [activeSub, setActiveSub] = useState<string | null>(null);

  // (opcional) recordar última subcat por categoría para reabrir en la misma
  const lastActiveByCategoryRef = useRef<Map<string, string>>(new Map());

  const qc = useQueryClient();
  const { data: subs = [], isLoading: loadingSubs } = useSubcategories(category.slug, undefined, {
    enabled: open,
    staleTime: 60_000,
  });

  const { data: products = [], isFetching: loadingProds } = useProductsPreview(
    category.slug,
    activeSub ?? "",
    6,
    undefined,
    { enabled: open && Boolean(activeSub), staleTime: 30_000 }
  );

  // 1) Al abrir y tener subcats, fijar subcat activa:
  useEffect(() => {
    if (!open) return;
    if (!subs.length) return;

    // intenta restaurar la última subcat usada para esta categoría
    const remembered = lastActiveByCategoryRef.current.get(category.slug);
    const first = subs[0]?.slug;

    const next = remembered ?? first ?? null;
    if (next && next !== activeSub) {
      setActiveSub(next);
      prefetchProductsPreview(qc, category.slug, next, 6);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, subs.length, category.slug]);

  // 2) cuando el usuario cambia subcat, recordarla
  useEffect(() => {
    if (activeSub) {
      lastActiveByCategoryRef.current.set(category.slug, activeSub);
    }
  }, [activeSub, category.slug]);

  const content = useMemo(() => (
    <div className="w-[680px] max-w-[80vw]">
      <div className="grid grid-cols-12 gap-4">
        {/* Subcategorías */}
        <div className="col-span-5">
          <div className="text-xs font-semibold text-[#67161f] mb-2">Subcategorías</div>
          <div className="rounded-xl border bg-white">
            {loadingSubs ? (
              <div className="p-6 flex items-center justify-center"><Spin size="small" /></div>
            ) : subs.length ? (
              <ul className="divide-y">
                {subs.map((s: Subcategory) => (
                  <li key={s.id}>
                    <button
                      onMouseEnter={() => {
                        setActiveSub(s.slug);
                        prefetchProductsPreview(qc, category.slug, s.slug, 6);
                      }}
                      onFocus={() => setActiveSub(s.slug)}
                      className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-black/5 ${activeSub === s.slug ? "bg-black/5" : ""}`}
                      aria-current={activeSub === s.slug ? "true" : undefined}
                    >
                      <span className="truncate">{s.name}</span>
                      <RightOutlined className="text-xs opacity-60" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-6 text-sm text-gray-500">No hay subcategorías activas.</div>
            )}
          </div>
        </div>

        {/* Productos */}
        <div className="col-span-7">
          <div className="text-xs font-semibold text-[#67161f] mb-2">Productos</div>

          {/* minHeight para evitar “saltos” del popover; ajusta según tus cards */}
          <div className="grid grid-cols-3 gap-3" style={{ minHeight: 240 }}>
            {(loadingProds || !activeSub) &&
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl border bg-white p-3 animate-pulse">
                  <div className="aspect-square rounded-lg bg-gray-200" />
                  <div className="mt-2 h-3 w-3/4 bg-gray-200 rounded" />
                </div>
              ))
            }

            {!loadingProds && activeSub && products.length > 0 && products.map((p) => (
              <Link
                key={p.id}
                to={`/category/${category.slug}/${activeSub}/${p.slug}`}
                className="group rounded-xl border bg-white p-3 hover:shadow-sm transition"
              >
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-50 border">
                  {p.images?.[0]?.url ? (
                    <img
                      src={p.images[0].url}
                      alt={p.images[0].alt ?? p.name}
                      loading="lazy"
                      className="h-full w-full object-cover group-hover:scale-[1.02] transition"
                    />
                  ) : (
                    <div className="grid place-items-center h-full text-gray-400 text-xs">Sin imagen</div>
                  )}
                </div>
                <div className="mt-2 text-xs font-medium line-clamp-2">{p.name}</div>
              </Link>
            ))}

            {!loadingProds && activeSub && products.length === 0 && (
              <div className="col-span-3 text-sm text-gray-500">Sin productos para esta subcategoría.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  ), [subs, loadingSubs, products, loadingProds, activeSub, category.slug, qc]);

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      trigger={["hover", "click"]}
      mouseEnterDelay={0.12}
      mouseLeaveDelay={0.15}
      placement="bottom"
      content={content}
    >
      <div className="cursor-default">{children}</div>
    </Popover>
  );
}

