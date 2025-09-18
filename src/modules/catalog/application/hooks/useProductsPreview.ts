import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
  type QueryClient,
} from "@tanstack/react-query";
import { qk } from "../queryKeys";
import type { Product, CatalogRepository } from "../../domain";
import { CatalogHttpRepository } from "../../infrastructure";
import { GetProductsPreview } from "../usecases/GetProductsPreview";

type Key = ReturnType<typeof qk.productsPreview>;

// ✅ No omitimos "enabled"
type Opts = Omit<UseQueryOptions<Product[], Error, Product[], Key>, "queryKey" | "queryFn">;

export function useProductsPreview(
  categorySlug: string,
  subSlug: string,
  limit = 6,
  repo?: CatalogRepository,
  options?: Opts
): UseQueryResult<Product[], Error> {
  const effectiveRepo = repo ?? new CatalogHttpRepository();
  const uc = new GetProductsPreview(effectiveRepo);

  return useQuery<Product[], Error, Product[], Key>({
    queryKey: qk.productsPreview(categorySlug, subSlug),
    queryFn: () => uc.execute(categorySlug, subSlug, limit),
    enabled: Boolean(categorySlug && subSlug), // default de seguridad
    staleTime: 30_000,
    ...options, // y aquí ya puedes pasar enabled en options
  });
}

// Prefetch (sin options)
export function prefetchProductsPreview(
  qc: QueryClient,
  categorySlug: string,
  subSlug: string,
  limit = 6,
  repo?: CatalogRepository
) {
  const effectiveRepo = repo ?? new CatalogHttpRepository();
  const uc = new GetProductsPreview(effectiveRepo);

  return qc.prefetchQuery<Product[], Error, Product[], Key>({
    queryKey: qk.productsPreview(categorySlug, subSlug),
    queryFn: () => uc.execute(categorySlug, subSlug, limit),
    staleTime: 30_000,
  });
}
