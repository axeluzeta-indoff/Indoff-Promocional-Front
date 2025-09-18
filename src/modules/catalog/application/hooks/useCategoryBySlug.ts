import { useQuery } from "@tanstack/react-query";
import { qk } from "../queryKeys";
import type { CatalogRepository } from "../../domain";
import { CatalogHttpRepository } from "../../infrastructure";
import { GetCategoryBySlug } from "../usecases/GetCategoryBySlug";

export function useCategoryBySlug(slug: string, repo?: CatalogRepository) {
  const effectiveRepo = repo ?? new CatalogHttpRepository();
  // Evitar parameter properties:
  const uc = new GetCategoryBySlug(effectiveRepo);

  return useQuery({
    queryKey: qk.category(slug),
    queryFn: () => uc.execute(slug),
    enabled: Boolean(slug),
    staleTime: 60_000,
  });
}
