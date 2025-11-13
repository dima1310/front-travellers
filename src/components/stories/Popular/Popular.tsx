"use client";

import { useInfiniteStories } from "@/services/queries/useStoriesQuery";
import PopularStoriesItem from "@/components/home/Popular/PopularStoriesItem/PopularStoriesItem";
import styles from "./Popular.module.css";

import type { Story, StoriesResponse } from "@/types/story.types";
import type { InfiniteData } from "@tanstack/react-query";

export default function Popular() {
  const { data, isLoading } = useInfiniteStories();

  // ✅ корректно извлекаем страницы из InfiniteData
  const pages =
    (data as InfiniteData<StoriesResponse, number> | undefined)?.pages ?? [];

  // ✅ строгий тип: Story[]
  const stories: Story[] = pages.flatMap((page: StoriesResponse) =>
    Array.isArray(page.items) ? page.items : []
  );

  return (
    <section className={styles.section} id="popular">
      <div className={styles.container}>
        <h2 className={styles.title}>Популярні історії</h2>

        {isLoading ? (
          <p className={styles.loading}>Завантаження...</p>
        ) : stories.length > 0 ? (
          <div className={styles.grid}>
            {stories.map((story: Story) => (
              <PopularStoriesItem key={story._id} story={story} />
            ))}
          </div>
        ) : (
          <p className={styles.loading}>Немає історій</p>
        )}
      </div>
    </section>
  );
}
