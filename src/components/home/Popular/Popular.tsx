"use client";

import { useInfiniteStories } from "@/services/queries/useStoriesQuery";
import LoadMoreButton from "@/components/ui/Button/LoadMoreButton/LoadMoreButton";
import TravellersStoriesItem from "@/components/stories/TravellersStoriesItem/TravellersStoriesItem";
import styles from "./Popular.module.css";

import type { Story, StoriesResponse } from "@/types/story.types";
import type { InfiniteData } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Popular() {
  const router = useRouter();
  const { data, isLoading } = useInfiniteStories();

  const pages =
    (data as InfiniteData<StoriesResponse, number> | undefined)?.pages ?? [];

  const stories: Story[] = pages.flatMap((p) => p.items ?? []).slice(0, 3);

  const handleGoToStories = () => {
    router.push("/stories");
  };

  return (
    <section className={styles.section} id="popular">
      <div className="container">
        <div className={styles.inner}>
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

          <div className={styles.buttonWrapper}>
            <LoadMoreButton
              onClick={handleGoToStories}
              className={styles.button}
            >
              Переглянути всі
            </LoadMoreButton>
          </div>
        </div>
      </div>
    </section>
  );
}
