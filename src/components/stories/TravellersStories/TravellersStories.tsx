'use client';

import {useState} from 'react';
import styles from './TravellersStories.module.css';
import {useStories} from "@/src/hooks/useStories";
import {Loader} from "@/src/components/ui/Loader/Loader";
import {Button} from "@/src/components/ui/Button/Button";
import {TravellersStoriesItem} from "@/src/components/stories";

interface TravellersStoriesProps {
    initialLimit?: number;
    category?: string;
}

export const TravellersStories = ({
                                      initialLimit = 9,
                                      category
                                  }: TravellersStoriesProps) => {
    const [page, setPage] = useState(1);
    const {data, isLoading, error} = useStories(page, initialLimit, category);

    const handleLoadMore = () => {
        setPage((prev) => prev + 1);
    };

    if (isLoading && page === 1) {
        return <Loader/>;
    }

    if (error) {
        return (
            <div className={styles.error}>
                <p>Помилка завантаження історій. Спробуйте пізніше.</p>
            </div>
        );
    }

    if (!data || data.articles.length === 0) {
        return (
            <div className={styles.empty}>
                <p>Історій поки що немає</p>
            </div>
        );
    }

    const hasMore = data.page * data.limit < data.total;

    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                {data.articles.map((article) => (
                    <TravellersStoriesItem key={article._id} article={article}/>
                ))}
            </div>

            {isLoading && page > 1 && (
                <div className={styles.loadingMore}>
                    <Loader/>
                </div>
            )}

            {hasMore && !isLoading && (
                <div className={styles.loadMoreWrapper}>
                    <Button onClick={handleLoadMore} variant="outline">
                        Переглянути всі
                    </Button>
                </div>
            )}
        </div>
    );
};
