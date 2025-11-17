import {useQuery, useInfiniteQuery} from "@tanstack/react-query";
import {storiesApi} from "../api/storiesApi";
import type {StoriesResponse} from "@/types/story.types";

export const usePopularStories = () =>
    useQuery({
        queryKey: ["stories", "popular"],
        queryFn: storiesApi.popular,
    });

// ✅ 5 дженериков: TQueryFnData, TError, TData, TQueryKey, TPageParam
export const useInfiniteStories = (categoryName?: string) =>
    useInfiniteQuery<
        StoriesResponse,
        Error,
        import("@tanstack/react-query").InfiniteData<StoriesResponse, number>,
        ["stories", "infinite", string | undefined],
        number
    >({
        queryKey: ["stories", "infinite", categoryName ?? "all"],
        initialPageParam: 1,
        queryFn: ({pageParam}) =>
            storiesApi.list(pageParam, 12, categoryName),
        getNextPageParam: (lastPage) =>
            lastPage.hasNextPage ? lastPage.page + 1 : undefined,
        getPreviousPageParam: (firstPage) =>
            firstPage.page > 1 ? firstPage.page - 1 : undefined,
    });
