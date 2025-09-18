import { useQuery, type UseQueryOptions, type UseQueryResult } from "@tanstack/react-query";
import { qk } from "../queryKeys";
import type { Subcategory, CatalogRepository } from "../../domain";
import { CatalogHttpRepository } from "../../infrastructure";
import { GetSubcategories } from "../usecases/GetSubcategories";

type Key = ReturnType<typeof qk.subcategories>;

type Opts = Omit<UseQueryOptions<Subcategory[], Error, Subcategory[], Key>, "queryKey" | "queryFn">;

export function useSubcategories(
  categorySlug: string,
  repo?: CatalogRepository,
  options?: Opts
): UseQueryResult<Subcategory[], Error> {
  const effectiveRepo = repo ?? new CatalogHttpRepository();
  const uc = new GetSubcategories(effectiveRepo);

  return useQuery<Subcategory[], Error, Subcategory[], Key>({
    queryKey: qk.subcategories(categorySlug),
    queryFn: () => uc.execute(categorySlug),
    enabled: Boolean(categorySlug),
    staleTime: 60_000,
    ...options,
  });
}
