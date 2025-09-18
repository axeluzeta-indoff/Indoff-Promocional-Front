import type { Category, Subcategory, Product, ProductImage, ProductAttributes } from "../domain";
import type { CategoryDTO, SubcategoryDTO, ProductListItemDTO, ProductDetailDTO } from "./dtos";
import { API_BASE } from "../../../utils/http";

const BASE = (API_BASE ?? "").replace(/\/+$/, "");
const normalizeUrl = (u?: string | null): string | null =>
  !u ? null : /^https?:\/\//i.test(u) ? u : `${BASE}/${u.replace(/^\/+/, "")}`;

const iso = (v?: string | null) => v ?? new Date(0).toISOString();
const bool = (v?: boolean | null) => Boolean(v);

// ===== Categorías / Subcategorías =====
export const mapCategory = (dto: CategoryDTO): Category => ({
  id: dto.id,
  name: dto.name,
  slug: dto.slug,
  imageUrl: dto.imageUrl ?? null,
  imageAlt: dto.imageAlt ?? dto.name,
  isActive: true,
  createdAt: iso(dto.createdAt),
  updatedAt: iso(dto.updatedAt),
});

export const mapSubcategory = (dto: SubcategoryDTO): Subcategory => ({
  id: dto.id,
  name: dto.name,
  slug: dto.slug,
  // tu back no manda categoryId aquí, así que dejamos string vacío
  categoryId: "",
  imageUrl: dto.imageUrl ?? null,
  imageAlt: dto.imageAlt ?? dto.name,
  isActive: true,
  createdAt: iso(dto.createdAt),
  updatedAt: iso(dto.updatedAt),
});

// ===== Productos (LISTA / hover) =====
// Convierte imageUrl plano → images[0]
export const mapProductListItem = (dto: ProductListItemDTO): Product => {
  const first: ProductImage | undefined = dto.imageUrl
    ? { id: "0", url: normalizeUrl(dto.imageUrl)!, alt: dto.imageAlt ?? dto.name, sortOrder: 0 }
    : undefined;

  return {
    id: dto.id,
    name: dto.name,
    slug: dto.slug,
    description: dto.description ?? null,
    categoryId: "",
    subcategoryId: "",
    images: first ? [first] : undefined,
    attributes: undefined,              // la lista no trae atributos
    isActive: bool(dto.isActive ?? true),
    createdAt: iso(dto.createdAt),
    updatedAt: iso(dto.updatedAt),
  };
};

// Detalle → Product (incluye images[] y attributes)
export const mapProductDetail = (dto: ProductDetailDTO): Product => {
  const images: ProductImage[] | undefined = dto.images?.length
    ? [...dto.images]
        .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
        .map((i, idx) => ({
          id: `${idx}`,
          url: normalizeUrl(i.url)!,
          alt: i.alt ?? undefined,
          sortOrder: i.sortOrder ?? idx,
        }))
    : undefined;

  const attributes: ProductAttributes | undefined = dto.attributes
    ? {
        sizes: dto.attributes.sizes ?? undefined,
        colors: dto.attributes.colors ?? undefined,
        material: dto.attributes.material ?? null,
        dimensions: dto.attributes.dimensions ?? null,
      }
    : undefined;

  return {
    id: dto.id,
    name: dto.name,
    slug: dto.slug,
    description: dto.description ?? null,
    categoryId: dto.category?.id ?? "",
    subcategoryId: dto.subcategory?.id ?? "",
    images,
    attributes,                         // 👈 ya tipado
    isActive: bool(dto.isActive ?? true),
    createdAt: iso(dto.createdAt),
    updatedAt: iso(dto.updatedAt),
  };
};

