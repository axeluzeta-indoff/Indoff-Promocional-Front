// Centralizamos las keys de React Query para evitar strings mágicos
export const qk = {
  categories: ["catalog", "categories"] as const,
  category: (slug: string) => ["catalog", "category", slug] as const,
  subcategories: (categorySlug: string) => ["catalog", "subcategories", categorySlug] as const,
  productsPreview: (categorySlug: string, subSlug: string) => ["catalog", "productsPreview", categorySlug, subSlug] as const,
  productsBySub: (categorySlug: string, subSlug: string) => ["catalog", "productsBySub", categorySlug, subSlug] as const,
  productDetail: (categorySlug: string, subSlug: string, productSlug: string) =>
    ["catalog", "productDetail", categorySlug, subSlug, productSlug] as const,
};
