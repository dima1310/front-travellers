"use client";

import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getStoryById, updateStory } from "@/services/api/storiesApi";
import AddStoryForm from "@/components/forms/AddStoryForm/AddStoryForm";
import { Loader } from "@/components/ui/Loader";
import { Story } from "@/types/story.types";

export default function EditStoryPage() {
  const router = useRouter();
  const params = useParams();
  const storyId = params.storyId as string;
  const queryClient = useQueryClient();

  const { data: story, isLoading } = useQuery<Story>({
    queryKey: ["story", storyId],
    queryFn: () => getStoryById(storyId),
  });

  const mutation = useMutation({
    mutationFn: (data: Partial<Story>) => updateStory(storyId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["story"] });
      router.push(`/stories/${storyId}`);
    },
  });

  const handleSubmit = (values: Partial<Story>) => {
    mutation.mutate(values);
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      <h1>Редагувати історію</h1>
      {story && <AddStoryForm initialData={story} onSubmit={handleSubmit} />}
    </div>
  );
}
