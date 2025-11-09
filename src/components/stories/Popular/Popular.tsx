'use client';

import styles from './Popular.module.css';
import {useStories} from "@/src/hooks/useStories";
import {Loader} from "@/src/components/ui/Loader/Loader";
import {TravellersStoriesItem} from "@/src/components/stories";

interface PopularProps {
    limit?: number;
    excludeId?: string;
}

export const Popular = ({ limit = 3, excludeId }: PopularProps) => {
    const { data, isLoading, error } = useStories(1, limit);

    if (isLoading) {
        return <Loader />;
    }

    if (error || !data || data.articles.length === 0) {
        return null;
    }

    // Виключаємо поточну статтю зі списку
    const filteredArticles = excludeId
        ? data.articles.filter((article) => article._id !== excludeId)
        : data.articles;

    if (filteredArticles.length === 0) {
        return null;
    }

    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Популярні історії</h2>
            <div className={styles.grid}>
                {filteredArticles.slice(0, limit).map((article) => (
                    <TravellersStoriesItem key={article._id} article={article} />
                ))}
            </div>
        </section>
    );
};
