import type { CatalogRepository, Category } from "../../domain";

export class GetCategories {
  private repo: CatalogRepository;         
  constructor(repo: CatalogRepository) {  
    this.repo = repo;
  }
  execute(): Promise<Category[]> {
    return this.repo.findActiveCategories();
  }
}

