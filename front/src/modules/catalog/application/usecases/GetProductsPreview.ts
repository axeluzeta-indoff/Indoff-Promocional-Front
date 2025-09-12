import type { CatalogRepository, Product } from "../../domain";

export class GetProductsPreview {
    private repo: CatalogRepository
  constructor(repo: CatalogRepository) {
    this.repo = repo
  }

  execute(categorySlug: string, subSlug: string, limit = 6): Promise<Product[]> {
    return this.repo.findProductsPreview(categorySlug, subSlug, limit);
  }
}
