import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { qk } from "../queryKeys";
import type { Category, CatalogRepository } from "../../domain";
import { CatalogHttpRepository } from "../../infrastructure";
import { GetCategories } from "../usecases/GetCategories";

type Key = typeof qk.categories;

type Opts = Omit<
  UseQueryOptions<Category[], Error, Category[], Key>,
  "queryKey" | "queryFn"
>;

export function useCategories(
  repo?: CatalogRepository,
  options?: Opts
): UseQueryResult<Category[], Error> {
  const effectiveRepo = repo ?? new CatalogHttpRepository();
  const uc = new GetCategories(effectiveRepo);

  return useQuery<Category[], Error, Category[], Key>({
    queryKey: qk.categories,
    queryFn: () => uc.execute(),
    staleTime: 60_000,
    ...options,
  });
}

