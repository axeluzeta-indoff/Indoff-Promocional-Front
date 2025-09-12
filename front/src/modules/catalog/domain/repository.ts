import type { Category, Subcategory, Product } from "./entities";

// Contratos que la infraestructura deberá IMPLEMENTAR (HTTP, mocks, etc.)
export interface CatalogRepository {
  // Categorías
  findActiveCategories(): Promise<Category[]>;
  findCategoryBySlug(slug: string): Promise<Category | null>;

  // Subcategorías
  findActiveSubcategoriesByCategorySlug(categorySlug: string): Promise<Subcategory[]>;

  // Productos (previews y lista por subcategoría)
  findProductsPreview(categorySlug: string, subSlug: string, limit?: number): Promise<Product[]>;
  findProductsBySubcategory(categorySlug: string, subSlug: string, opts?: { page?: number; pageSize?: number }): Promise<Product[]>;
  findProductDetail(params: { categorySlug: string; subSlug: string; productSlug: string }): Promise<Product | null>;
}
