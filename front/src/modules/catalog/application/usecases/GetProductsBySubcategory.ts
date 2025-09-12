import type { CatalogRepository, Product } from "../../domain";

export class GetProductsBySubcategory {
    private repo: CatalogRepository
  constructor(repo: CatalogRepository) {
    this.repo = repo
  }

  execute(categorySlug: string, subSlug: string, opts?: { page?: number; pageSize?: number }): Promise<Product[]> {
    return this.repo.findProductsBySubcategory(categorySlug, subSlug, opts);
  }
}
