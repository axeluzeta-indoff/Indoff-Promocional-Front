import type { CatalogRepository, Subcategory } from "../../domain";

export class GetSubcategories {
    private repo: CatalogRepository
  constructor(repo: CatalogRepository) {
    this.repo = repo
  }

  execute(categorySlug: string): Promise<Subcategory[]> {
    return this.repo.findActiveSubcategoriesByCategorySlug(categorySlug);
  }
}
