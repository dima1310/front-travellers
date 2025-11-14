"use client";

import { useInfiniteStories } from "@/services/queries/useStoriesQuery";
import TravellersStoriesItem from "@/components/stories/TravellersStoriesItem/TravellersStoriesItem";
import styles from "./TravellersStories.module.css";
import type { Story } from "@/types/story.types";

type Props = {
  // 👇 робимо проп опціональним
  stories?: Story[];
};

export default function TravellersStories({ stories }: Props) {
  // якщо stories передані ззовні (наприклад, з ClientStories) — не грузимо дані тут
  const isManaged = Array.isArray(stories);

  // дані з хука — тільки якщо проп не переданий
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteStories();

  const fetched: Story[] = data?.pages?.flatMap((p) => p.items) ?? [];

  // фактичний список до рендеру
  const list: Story[] = isManaged ? (stories as Story[]) : fetched;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Історії мандрівників</h2>

        {/* якщо список керується зовні, isLoading і кнопки не показуємо */}
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

        {/* Кнопка "Показати ще" тільки коли ми самі вантажимо дані */}
        {!isManaged && hasNextPage && (
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
