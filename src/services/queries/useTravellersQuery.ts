// src/services/queries/useTravellersQuery.ts
import {useInfiniteQuery} from "@tanstack/react-query";
import {travellersApi} from "@/services/api/travellersApi";
import type {Traveller} from "@/types/traveller.types";

export const useTravellersQuery = () => {
    return useInfiniteQuery<Traveller[], Error>({
        queryKey: ["travellers"],

        //  ПАГІНАЦІЯ — кожний запит тягне рівно 4 мандрівники
        queryFn: async ({pageParam = 1}) => {
            const page = Number(pageParam) || 1;
            const res = await travellersApi.list(page, 4); // ← ТУТ ГОЛОВНЕ: limit = 4
            return res;
        },

        // якщо масив пустий → сторінок більше нема
        getNextPageParam: (lastPage, allPages) => {
            if (!lastPage || lastPage.length === 0) return undefined;
            return allPages.length + 1;
        },

        initialPageParam: 1,
    });
};
