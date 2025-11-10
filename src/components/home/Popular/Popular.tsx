"use client";

import { useState } from "react";
import { useInfiniteStories } from "@/services/queries/useStoriesQuery";
import PopularStoriesItem from "./PopularStoriesItem/PopularStoriesItem";
import styles from "./Popular.module.css";

export default function Popular() {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteStories();

  const stories = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <section className={styles.section} id="popular">
      <div className={styles.container}>
        <h2 className={styles.title}>Популярні історії</h2>

        {isLoading ? (
          <p className={styles.loading}>Завантаження...</p>
        ) : (
          <div className={styles.grid}>
            {stories.map((story) => (
              <PopularStoriesItem key={story.id} story={story} />
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
