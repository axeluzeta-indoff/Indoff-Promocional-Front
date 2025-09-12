import { useQuery } from "@tanstack/react-query";
import { qk } from "../queryKeys";
import type { Product, CatalogRepository } from "../../domain";
import { CatalogHttpRepository } from "../../infrastructure";
import { GetProductsBySubcategory } from "../usecases/GetProductsBySubcategory";

export function useProductsBySubcategory(
  categorySlug: string,
  subSlug: string,
  opts?: { page?: number; pageSize?: number },
  repo?: CatalogRepository
) {
  const effectiveRepo = repo ?? new CatalogHttpRepository();
  const uc = new GetProductsBySubcategory(effectiveRepo);

  return useQuery<Product[]>({
    queryKey: qk.productsBySub(categorySlug, subSlug),
    queryFn: () => uc.execute(categorySlug, subSlug, opts),
    enabled: Boolean(categorySlug && subSlug),
    staleTime: 30_000,
  });
}
