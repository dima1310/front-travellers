"use client";

import { useInfiniteStories } from "@/services/queries/useStoriesQuery";
import PopularStoriesItem from "./PopularStoriesItem/PopularStoriesItem";
import styles from "./Popular.module.css";

// ✅ типы
import type { Story, StoriesResponse } from "@/types/story.types";
import type { InfiniteData } from "@tanstack/react-query";

export default function Popular() {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteStories();

  // ✅ Явно приводим data к InfiniteData и получаем страницы
  const pages =
    (data as InfiniteData<StoriesResponse, number> | undefined)?.pages ?? [];

  // ✅ Гарантируем тип Story[]
  const stories: Story[] = pages.flatMap((p) => p.items ?? []);

  return (
    <section className={styles.section} id="popular">
      <div className={styles.container}>
        <h2 className={styles.title}>Популярні історії</h2>

        {isLoading ? (
          <p className={styles.loading}>Завантаження...</p>
        ) : (
          <div className={styles.grid}>
            {stories.map((story: Story) => (
              <PopularStoriesItem key={story._id} story={story} />
            ))}
          </div>
        )}

        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            className={styles.button}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Завантаження..." : "Переглянути всі"}
          </button>
        )}
      </div>
    </section>
  );
}
