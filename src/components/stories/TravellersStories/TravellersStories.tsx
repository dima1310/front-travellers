"use client";

import { useInfiniteStories } from "@/services/queries/useStoriesQuery";
import TravellersStoriesItem from "@/components/stories/TravellersStoriesItem/TravellersStoriesItem";
import styles from "./TravellersStories.module.css";

export default function TravellersStories() {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteStories();

  const stories = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Історії мандрівників</h2>

        {isLoading ? (
          <p className={styles.loading}>Завантаження...</p>
        ) : (
          <div className={styles.grid}>
            {stories.map((story) => (
              <TravellersStoriesItem key={story.id} story={story} />
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
