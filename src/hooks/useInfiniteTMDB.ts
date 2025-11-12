/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { httpHelper } from "../utils/httpHelper";

type TMDBPage<T> = {
  page: number;
  total_pages: number;
  results: T[];
};

type Options<TApi, TItem> = {
  endpoint: string;
  baseParams?: Record<string, string | number | boolean>;
  enabled?: boolean;
  selectItem?: (apiItem: TApi) => TItem;
  queryKey?: unknown[];
  retry?: number;
};

export function useInfiniteTMDB<TApi = any, TItem = TApi>({
  endpoint,
  baseParams = {},
  enabled = true,
  selectItem,
  queryKey,
  retry = 1,
}: Options<TApi, TItem>) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: queryKey ?? ["tmdb", endpoint, baseParams],
    initialPageParam: 1,
    enabled,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry,
    queryFn: async ({ pageParam }) => {
      return httpHelper.get<TMDBPage<TApi>>(endpoint, {
        ...baseParams,
        page: pageParam as number,
      });
    },
    getNextPageParam: (last) =>
      last.page < last.total_pages ? last.page + 1 : undefined,
  });

  // aplanar resultados y formatear items
  const items = useMemo<TItem[]>(() => {
    const raw = data?.pages.flatMap((p) => p.results) ?? [];
    return selectItem
      ? (raw as TApi[]).map(selectItem)
      : (raw as unknown as TItem[]);
  }, [data, selectItem]);

  // IntersectionObserver
  const loaderRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return {
    items,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    loaderRef,
  };
}
