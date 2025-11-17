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

    const {
        data,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteStories(filter === "all" ? undefined : filter);

    const fetched: Story[] = data?.pages?.flatMap((p) => p.items) ?? [];

    // фактичний список до рендеру
    const list: Story[] = isManaged ? (stories as Story[]) : fetched;

    return (
        <section className={styles.section}>
                {/* Фільтр по категоріях */}
                <StoriesFilter value={filter} onChange={setFilter} />
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

                {!isManaged && hasNextPage && (
                    <button
                        onClick={() => fetchNextPage()}
                        className={styles.button}
                        disabled={isFetchingNextPage}
                    >
                        {isFetchingNextPage ? "Завантаження..." : "Переглянути всі"}
                    </button>
                )}
        </section>
    );
}