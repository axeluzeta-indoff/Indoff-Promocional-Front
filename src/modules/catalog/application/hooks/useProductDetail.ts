import { useQuery } from '@tanstack/react-query';
import { qk } from "../queryKeys";
import type { Product, CatalogRepository } from "../../domain";
import { CatalogHttpRepository } from "../../infrastructure";
import { GetProductDetail } from "../usecases/GetProductDetail";

export function useProductDetail(
  params: { categorySlug: string; subSlug: string; productSlug: string },
  repo?: CatalogRepository
) {
  const effectiveRepo = repo ?? new CatalogHttpRepository();
  const uc = new GetProductDetail(effectiveRepo);

  return useQuery<Product | null>({
    queryKey: qk.productDetail(params.categorySlug, params.subSlug, params.productSlug),
    queryFn: () => uc.execute(params),
    enabled: Boolean(params.categorySlug && params.subSlug && params.productSlug),
    staleTime: 60_000,
  });
}
