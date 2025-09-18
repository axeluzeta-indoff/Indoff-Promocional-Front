import type { CatalogRepository, Product } from "../../domain";

export class GetProductDetail {
    private repo: CatalogRepository
  constructor(repo: CatalogRepository) {
    this.repo = repo
  }

  execute(params: { categorySlug: string; subSlug: string; productSlug: string }): Promise<Product | null> {
    return this.repo.findProductDetail(params);
  }
}
