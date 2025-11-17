"use client";

import { useInfiniteStories } from "@/services/queries/useStoriesQuery";
import LoadMoreButton from "@/components/ui/Button/LoadMoreButton/LoadMoreButton";
import styles from "./Popular.module.css";

import type { Story, StoriesResponse } from "@/types/story.types";
import type { InfiniteData } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import TravellersStoriesItem from "@/components/stories/TravellersStoriesItem/TravellersStoriesItem";

export default function Popular() {
  const router = useRouter();

  // берем только data и isLoading — пагинация тут НЕ нужна
  const { data, isLoading } = useInfiniteStories();

  const pages =
    (data as InfiniteData<StoriesResponse, number> | undefined)?.pages ?? [];

  // на главной показываем только 3 истории
  const stories: Story[] = pages.flatMap((p) => p.items ?? []).slice(0, 3);

  const handleGoToStories = () => {
    router.push("/stories");
  };

  return (
    <section className={styles.section} id="popular">
      <div className={styles.container}>
        <h2 className={styles.title}>Популярні історії</h2>

        {isLoading ? (
          <p className={styles.loading}>Завантаження...</p>
        ) : (
          <div className={styles.grid}>
            {stories.map((story: Story) => (
              <TravellersStoriesItem key={story._id} story={story} />
            ))}
          </div>
        )}

        {/* центрированная кнопка "Переглянути всі" */}
        <div className={styles.buttonWrapper}>
          <LoadMoreButton
            onClick={handleGoToStories}
            className={styles.button}
          >
            Переглянути всі
          </LoadMoreButton>
        </div>
      </div>
    </section>
  );
}
