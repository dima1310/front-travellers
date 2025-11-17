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

  // Fetch only if not managed mode
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteStories(isManaged ? undefined : filter === "all" ? undefined : filter);

  const fetched: Story[] = data?.pages?.flatMap((p) => p.items) ?? [];

  // What to display
  const list: Story[] = isManaged ? (stories as Story[]) : fetched;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* Title only in browse mode */}
        {!isManaged && (
          <h2 className={styles.title}>Історії мандрівників</h2>
        )}

        {/* Filter only in browse mode */}
        {!isManaged && (
          <StoriesFilter value={filter} onChange={setFilter} />
        )}

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

        {/* Load more button only in browse mode */}
        {!isManaged && hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            className={styles.button}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Завантаження..." : "Показати ще"}
          </button>
        )}

      </div>
    </section>
  );
}