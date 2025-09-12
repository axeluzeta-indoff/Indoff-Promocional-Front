// src/modules/catalog/infrastructure/CatalogHttpRepository.ts
import { get } from "../../../utils/http";
import type { CatalogRepository, Category, Subcategory, Product } from "../domain";
import type { CategoryDTO, SubcategoryDTO, ProductListItemDTO, ProductDetailDTO } from "./dtos";
import { mapCategory, mapSubcategory, mapProductListItem, mapProductDetail } from "./mappers";

const asList = <T,>(x: any): T[] => (Array.isArray(x) ? x : (x?.items ?? x?.data ?? []));

export class CatalogHttpRepository implements CatalogRepository {
  private readonly base = "/catalog";

  async findActiveCategories(): Promise<Category[]> {
    const list = await get<CategoryDTO[]>(`${this.base}/categories`);
    return list.map(mapCategory).filter(c => c.isActive);
  }

  async findCategoryBySlug(slug: string): Promise<Category | null> {
    const all = await this.findActiveCategories();
    return all.find(c => c.slug === slug) ?? null;
  }

  async findActiveSubcategoriesByCategorySlug(categorySlug: string): Promise<Subcategory[]> {
    const res = await get<any>(`${this.base}/categories/${categorySlug}/subcategories`);
    return asList<SubcategoryDTO>(res).map(mapSubcategory).filter(s => s.isActive);
  }

  async findProductsPreview(categorySlug: string, subSlug: string, limit = 6): Promise<Product[]> {
    const res = await get<any>(`${this.base}/categories/${categorySlug}/subcategories/${subSlug}/products`);
    const list = asList<ProductListItemDTO>(res).map(mapProductListItem);
    return list.slice(0, limit); // el back no recibe ?limit; recortamos aquí
  }

  async findProductsBySubcategory(categorySlug: string, subSlug: string): Promise<Product[]> {
    const res = await get<any>(`${this.base}/categories/${categorySlug}/subcategories/${subSlug}/products`);
    return asList<ProductListItemDTO>(res).map(mapProductListItem);
  }

  async findProductDetail(params: { categorySlug: string; subSlug: string; productSlug: string }): Promise<Product | null> {
    // tu back: /catalog/products/:productSlug
    const dto = await get<ProductDetailDTO | null>(`${this.base}/products/${params.productSlug}`);
    return dto ? mapProductDetail(dto) : null;
  }
}

