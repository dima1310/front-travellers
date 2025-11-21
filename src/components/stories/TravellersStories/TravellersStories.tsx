"use client";

import { useState } from "react";
import { useInfiniteStories } from "@/services/queries/useStoriesQuery";
import TravellersStoriesItem from "@/components/stories/TravellersStoriesItem/TravellersStoriesItem";
import StoriesFilter, {
  type StoriesFilterValue,
} from "@/components/stories/StoriesFilter/StoriesFilter";
import styles from "./TravellersStories.module.css";
import type { Story } from "@/types/story.types";

type Props = {
  stories?: Story[];
};

export default function TravellersStories({ stories }: Props) {
  const isManaged = Array.isArray(stories);

  const [filter, setFilter] = useState<StoriesFilterValue>("all");
  const [visibleCount, setVisibleCount] = useState(6);

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteStories(
      isManaged ? undefined : filter === "all" ? undefined : filter
    );

  const fetched: Story[] = data?.pages?.flatMap((p) => p.items) ?? [];
  const allStories = isManaged ? stories! : fetched;

  const list = isManaged ? allStories.slice(0, visibleCount) : allStories;
  const hasMoreManaged = isManaged && visibleCount < allStories.length;

  return (
    <section className={styles.storiesSection}>
      <div className={styles.storiesContainer}>
        {!isManaged && (
          <header className={styles.header}>
            <h1 className={styles.storiesTitle}>Історії мандрівників</h1>
          </header>
        )}

        <p className={styles.storiesCategory}>Категорії</p>

        {!isManaged && (
          <StoriesFilter value={filter} onChange={setFilter} />
        )}

        {!isManaged && isLoading ? (
          <p className={styles.storiesLoading}>Завантаження...</p>
        ) : list.length === 0 ? (
          <p className={styles.storiesLoading}>Немає історій</p>
        ) : (
          <div className={styles.storiesGrid}>
            {list.map((story) => (
              <TravellersStoriesItem key={story._id} story={story} />
            ))}
          </div>
        )}

        {!isManaged && hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            className={styles.storiesButton}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Завантаження..." : "Показати ще"}
          </button>
        )}

        {hasMoreManaged && (
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className={styles.storiesButton}
          >
            Показати ще
          </button>
        )}
      </div>
    </section>
  );
}
