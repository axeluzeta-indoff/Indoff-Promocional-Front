import type { CatalogRepository, Category } from "../../domain";

export class GetCategoryBySlug {
    private repo: CatalogRepository
  constructor(repo: CatalogRepository) {
    this.repo = repo
  }

  execute(slug: string): Promise<Category | null> {
    return this.repo.findCategoryBySlug(slug);
  }
}
