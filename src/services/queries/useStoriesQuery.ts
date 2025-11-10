import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { storiesApi } from "../api/storiesApi";

export const usePopularStories = () =>
  useQuery({
    queryKey: ["stories", "popular"],
    queryFn: storiesApi.popular,
  });

export const useInfiniteStories = () =>
  useInfiniteQuery({
    queryKey: ["stories", "infinite"],
    queryFn: ({ pageParam = 1 }) => storiesApi.list(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.nextPage ? lastPage.nextPage : undefined,
  });
