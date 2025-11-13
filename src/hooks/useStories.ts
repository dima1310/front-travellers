import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "@/lib/axios";
import toast from "react-hot-toast";
import {Article, StoriesResponse} from "@/types/article.types";

interface StoriesParams {
    page: number;
    limit: number;
    category?: string;
}

// Отримання списку історій
export const useStories = (page: number = 1, limit: number = 9, category?: string) => {
    return useQuery({
        queryKey: ['stories', page, limit, category],
        queryFn: async () => {
            const params: StoriesParams = {page, limit};
            if (category) {
                params.category = category;
            }

            const {data} = await axiosInstance.get<StoriesResponse>('/articles', {params});
            return data;
        },
    });
};

// Отримання однієї історії
export const useStory = (storyId: string) => {
    return useQuery({
        queryKey: ['story', storyId],
        queryFn: async () => {
            const {data} = await axiosInstance.get<Article>(`/articles/${storyId}`);
            return data;
        },
        enabled: !!storyId,
    });
};

// Додавання/видалення зі збережених
export const useSaveStory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({storyId, isFavorite}: { storyId: string; isFavorite: boolean }) => {
            if (isFavorite) {
                await axiosInstance.delete(`/users/saved-stories/${storyId}`);
            } else {
                await axiosInstance.post(`/users/saved-stories`, {storyId});
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['stories']});
            queryClient.invalidateQueries({queryKey: ['story']});
            toast.success('Історію оновлено!');
        },
        onError: () => {
            toast.error('Помилка при збереженні історії');
        },
    });
};