"use client";

import {useState, useMemo} from "react";
import useMediaQuery from "@/hooks/useMediaQuery";
import type {Story} from "@/types/story.types";
import TravellersStoriesItem from "@/components/stories/TravellersStoriesItem/TravellersStoriesItem";
import HomeStyles from "@/app/Home.module.css";
import styles from "./ClientStories.module.css";

type Props = {
    stories: Story[];
};

export default function ClientStories({stories}: Props) {
    const isTablet = useMediaQuery("(max-width: 1279px)");
    const isMobile = useMediaQuery("(max-width: 767px)");

    // --- кількість за макетом ---
    const initialCount = isTablet ? 8 : 9;

    const [visibleCount, setVisibleCount] = useState(initialCount);

    const visibleStories = useMemo(
        () => stories.slice(0, visibleCount),
        [stories, visibleCount]
    );

    const hasMore = visibleCount < stories.length;

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 3);
    };

    return (
        <section className={styles.section}>
            <div className={HomeStyles.container}>
                <div className={`container ${styles.inner}`}>
                    <h2 className={styles.title}>Історії Мандрівників</h2>

                    <div className={styles.grid}>
                        {visibleStories.map((s) => (
                            <TravellersStoriesItem key={s._id} story={s}/>
                        ))}
                    </div>

                    {hasMore && (
                        <div className={styles.moreWrapper}>
                            <button onClick={handleLoadMore} className={styles.moreButton}>
                                Переглянути всі
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
