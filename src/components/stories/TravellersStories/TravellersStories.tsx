"use client";

import { useInfiniteStories } from "@/services/queries/useStoriesQuery";
import TravellersStoriesItem from "@/components/stories/TravellersStoriesItem/TravellersStoriesItem";
import styles from "./TravellersStories.module.css";
import type { Story } from "@/types/story.types";

type Props = {
  stories?: Story[]; // If provided, use these (Profile page mode)
};

export default function TravellersStories({ stories }: Props) {
  // Determine if we're in "managed mode" (stories passed from parent)
  const isManagedMode = Array.isArray(stories);

  // Only fetch data if stories not provided (Homepage/Browse mode)
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteStories();

  const fetchedStories: Story[] = data?.pages?.flatMap((p) => p.items) ?? [];
  const displayStories: Story[] = isManagedMode ? stories : fetchedStories;

  // Show loading only when fetching in browse mode
  if (!isManagedMode && isLoading) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <p className={styles.loading}>Завантаження...</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Show title only in browse/homepage mode */}
        {!isManagedMode && (
          <h2 className={styles.title}>Історії мандрівників</h2>
        )}

        {displayStories.length === 0 ? (
          <p className={styles.loading}>Немає історій</p>
        ) : (
          <div className={styles.grid}>
            {displayStories.map((story) => (
              <TravellersStoriesItem key={story._id} story={story} />
            ))}
          </div>
        )}

        {/* Show "Load more" button only in browse/homepage mode */}
        {!isManagedMode && hasNextPage && (
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
