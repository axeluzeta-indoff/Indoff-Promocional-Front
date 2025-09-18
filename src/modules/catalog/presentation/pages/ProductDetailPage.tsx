// src/modules/catalog/presentation/pages/ProductDetailPage.tsx
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { InputNumber } from "antd";
import { useProductDetail } from "../../application/hooks/useProductDetail";
import type { Product } from "../../domain";
import VariantPicker from "../components/VariantPicker";
import ColorSelect from "../components/ColorSelect";

export default function ProductDetailPage() {
  const { categorySlug = "", subSlug = "", productSlug = "" } = useParams();
  const { data: product, isLoading, error } = useProductDetail({ categorySlug, subSlug, productSlug });

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* Migas */}
      <nav className="text-sm text-[#11110f]/70 mb-4 flex flex-wrap items-center gap-2">
        <Link to="/" className="hover:underline">Inicio</Link>
        <span>/</span>
        <span className="capitalize">{categorySlug}</span>
        <span>/</span>
        <span className="capitalize">{subSlug}</span>
        <span>/</span>
        <span className="text-[#11110f]">{productSlug}</span>
      </nav>

      {/* Loading / Error */}
      {isLoading && <Skeleton />}
      {!isLoading && error && (
        <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 p-4">
          No se pudo cargar el producto.
        </div>
      )}

      {/* Contenido */}
      {!isLoading && !error && product && (
        <Detail product={product} categorySlug={categorySlug} subSlug={subSlug} />
      )}
    </main>
  );
}

function Skeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="aspect-square rounded-2xl bg-gray-200 animate-pulse" />
      <div className="space-y-4">
        <div className="h-8 w-2/3 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-4/5 bg-gray-100 rounded animate-pulse" />
        <div className="h-4 w-3/5 bg-gray-100 rounded animate-pulse" />
        <div className="h-10 w-40 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
}

function Detail({ product, categorySlug, subSlug }: { product: Product; categorySlug: string; subSlug: string }) {
  const mainImg = product.images?.[0];

  // Datos de variantes desde atributos
  const sizes = product.attributes?.sizes ?? [];
  const colors = product.attributes?.colors ?? [];

  // Selección local
  const [selectedSize, setSelectedSize] = useState<string | null>(sizes[0] ?? null);
  const [selectedColor, setSelectedColor] = useState<string | null>(colors[0] ?? null);
  const [qty, setQty] = useState<number>(1);

  const needsSize = sizes.length > 0;
  const needsColor = colors.length > 0;
  const canAdd =
    (!needsSize || !!selectedSize) &&
    (!needsColor || !!selectedColor) &&
    qty > 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Galería */}
      <div>
        <div className="aspect-square rounded-2xl overflow-hidden border bg-white">
          {mainImg?.url ? (
            <img
              src={mainImg.url}
              alt={mainImg.alt ?? product.name}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full grid place-items-center text-sm text-gray-400">Sin imagen</div>
          )}
        </div>
        {product.images && product.images.length > 1 && (
          <div className="mt-3 grid grid-cols-5 gap-2">
            {product.images.slice(0, 5).map((img, i) => (
              <div key={i} className="aspect-square rounded-lg overflow-hidden border bg-white">
                <img src={img.url} alt={img.alt ?? product.name} loading="lazy" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#11110f]">{product.name}</h1>
        {product.description && <p className="mt-2 text-[#11110f]/80">{product.description}</p>}

        {/* Pickers de variantes (Ant Design) */}
        <div className="mt-6 space-y-4">
          <VariantPicker
            label="Talla"
            placeholder="Selecciona talla"
            options={sizes}
            value={selectedSize}
            onChange={setSelectedSize}
            mode="segmented"     // usa "select" si prefieres dropdown
            hidden={!needsSize}
          />

          <ColorSelect
            colors={colors}
            value={selectedColor}
            onChange={setSelectedColor}
            hidden={!needsColor}
            />

          {/* Cantidad */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-[#11110f] min-w-16" htmlFor="qty">Cantidad</label>
            <InputNumber
              id="qty"
              min={1}
              value={qty}
              onChange={(v) => setQty(Number(v || 1))}
            />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            disabled={!canAdd}
            className={`inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-white
              ${canAdd ? "bg-[#c21320] hover:bg-[#67161f]" : "bg-gray-300 cursor-not-allowed"}
              ring-1 ${canAdd ? "ring-[#c21320]/30" : "ring-transparent"}`}
            onClick={() => {
              if (!canAdd) return;
              const payload = {
                productId: product.id,
                slug: product.slug,
                qty,
                ...(needsSize ? { size: selectedSize } : {}),
                ...(needsColor ? { color: selectedColor } : {}),
              };
              console.log("ADD_TO_CART", payload);
              alert(`Añadido: ${product.name}\n${selectedSize ?? ""} ${selectedColor ?? ""} x${qty}`);
            }}
          >
            Añadir al carrito
          </button>

          <Link
            to="/quote"
            className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-[#11110f] bg-white hover:bg-[#f7f7f7] ring-1 ring-[#11110f]/10"
          >
            Solicitar cotización
          </Link>
        </div>

        {/* Atributos (resumen tipado) */}
        <Attributes attrs={product.attributes} />

        {/* Metadatos */}
        <dl className="mt-6 grid grid-cols-2 gap-4 text-sm text-[#11110f]/80">
          <div>
            <dt className="font-semibold text-[#11110f]">Categoría</dt>
            <dd className="capitalize">{categorySlug}</dd>
          </div>
          <div>
            <dt className="font-semibold text-[#11110f]">Subcategoría</dt>
            <dd className="capitalize">{subSlug}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function Attributes({ attrs }: { attrs?: Product["attributes"] }) {
  if (!attrs) return null;
  const { sizes, colors, material, dimensions } = attrs;
  if (!sizes?.length && !colors?.length && !material && !dimensions) return null;

  return (
    <div className="mt-8 rounded-xl border bg-white p-4">
      <h3 className="font-semibold text-[#11110f] mb-3">Especificaciones</h3>
      <div className="space-y-3 text-sm text-[#11110f]/80">
        {Array.isArray(sizes) && sizes.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-[#11110f]">Tallas:</span>
            <div className="flex gap-2 flex-wrap">
              {sizes.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center justify-center rounded-md border px-2 py-1 text-xs bg-white"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {Array.isArray(colors) && colors.length > 0 && (
          <div>
            <span className="font-medium text-[#11110f]">Colores:</span>{" "}
            <span>{colors.join(", ")}</span>
          </div>
        )}

        {material && (
          <div>
            <span className="font-medium text-[#11110f]">Material:</span>{" "}
            <span className="capitalize">{material}</span>
          </div>
        )}

        {dimensions && (dimensions.widthMm || dimensions.heightMm || dimensions.depthMm) && (
          <div>
            <span className="font-medium text-[#11110f]">Dimensiones:</span>{" "}
            <span>
              {dimensions.widthMm ?? "—"} × {dimensions.heightMm ?? "—"} × {dimensions.depthMm ?? "—"} mm
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
