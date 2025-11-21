"use client";

import { useInfiniteStories } from "@/services/queries/useStoriesQuery";
import TravellersStoriesItem from "@/components/stories/TravellersStoriesItem/TravellersStoriesItem";
import styles from "./Popular.module.css";

import type { Story, StoriesResponse } from "@/types/story.types";
import type { InfiniteData } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useBreakpoint } from "@/hooks/useBreakpoint";

export default function Popular() {
    const router = useRouter();
    const { data, isLoading } = useInfiniteStories();

    const breakpoint = useBreakpoint();

    const pages =
        (data as InfiniteData<StoriesResponse, number> | undefined)?.pages ?? [];

    const allStories: Story[] = pages.flatMap((p) => p.items ?? []);

    // лимит по брейкпоинту:
    // mobile: 2, tablet: 4, desktop: 3
    const limit =
        breakpoint === "mobile"
            ? 2
            : breakpoint === "tablet"
                ? 4
                : 3;

    const stories = allStories.slice(0, limit);

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

                    {/* если нужна кнопка "Переглянути всі" */}
                    {/*<div className={styles.buttonWrapper}>
            <LoadMoreButton
              onClick={handleGoToStories}
              className={styles.button}
            >
              Переглянути всі
            </LoadMoreButton>
          </div>*/}
                </div>
            </div>
        </section>
    );
}