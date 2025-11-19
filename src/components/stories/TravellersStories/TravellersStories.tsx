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
  stories?: Story[]; // If provided — profile mode
};

export default function TravellersStories({ stories }: Props) {
  // Mode: managed (profile) or infinite (homepage/browse)
  const isManaged = Array.isArray(stories);

  // Filter (only in browse mode)
  const [filter, setFilter] = useState<StoriesFilterValue>("all");

  // Pagination for managed mode (Profile page)
  const [visibleCount, setVisibleCount] = useState(6);

  // Fetch only if not managed mode
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteStories(
      isManaged ? undefined : filter === "all" ? undefined : filter
    );

  const fetched: Story[] = data?.pages?.flatMap((p) => p.items) ?? [];

  // All available stories
  const allStories: Story[] = isManaged ? (stories as Story[]) : fetched;

  // What to display (limited in managed mode)
  const list: Story[] = isManaged
    ? allStories.slice(0, visibleCount)
    : allStories;

  // Check if there are more stories to show in managed mode
  const hasMoreManaged = isManaged && visibleCount < allStories.length;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header only for browse mode */}
        {!isManaged && (
          <header className={styles.header}>
            <h1 className={styles.title}>Історії Мандрівників</h1>
          </header>
        )}

        {/* Filter only in browse mode */}
        {!isManaged && <StoriesFilter value={filter} onChange={setFilter} />}

        {/* Loading / Empty / Grid */}
        {!isManaged && isLoading ? (
          <p className={styles.loading}>Завантаження...</p>
        ) : list.length === 0 ? (
          <p className={styles.loading}>Немає історій</p>
        ) : (
          <div className={styles.grid}>
            {list.map((story) => (
              <TravellersStoriesItem key={story._id} story={story} />
            ))}
          </div>
        )}

        {/* Load more button for browse mode */}
        {!isManaged && hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            className={styles.button}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Завантаження..." : "Показати ще"}
          </button>
        )}

        {/* Load more button for managed mode (Profile page) */}
        {hasMoreManaged && (
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className={styles.button}
          >
            Показати ще
          </button>
        )}
      </div>
    </section>
  );
}
