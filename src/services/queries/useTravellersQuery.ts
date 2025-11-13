// src/services/queries/useTravellersQuery.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { travellersApi } from "@/services/api/travellersApi";
import type { Traveller } from "@/types/traveller.types";

export const useTravellersQuery = () => {
  return useInfiniteQuery<Traveller[], Error>({
    queryKey: ["travellers"],
    queryFn: async ({ pageParam = 1 }) => {
      const page = Number(pageParam) || 1; // ✅ приводим тип unknown → number
      const res = await travellersApi.list(page, 12);
      return res; // масив Traveller[]
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length === 0) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });
};
