'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './TravellersStoriesItem.module.css';
import {Article} from "@/src/types/article.types";
import {useAuthStore} from "@/src/store/useAuthStore";
import {useSaveStory} from "@/src/hooks/useStories";
import {Button} from "@/src/components/ui/Button/Button";

interface TravellersStoriesItemProps {
    article: Article;
}

export const TravellersStoriesItem = ({ article }: TravellersStoriesItemProps) => {
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();
    const { mutate: saveStory, isPending } = useSaveStory();

    // Форматування дати
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('uk-UA', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    // Обробка збереження історії
    const handleSave = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isAuthenticated) {
            router.push('/auth/register');
            return;
        }

        saveStory({
            storyId: article._id,
            isFavorite: article.isFavorite || false,
        });
    };

    // Перехід на сторінку історії
    const handleViewStory = () => {
        router.push(`/stories/${article._id}`);
    };

    return (
        <article className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    src={article.img}
                    alt={article.title}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 33vw"
                />
                <span className={styles.category}>{article.category.name}</span>
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>{article.title}</h3>

                <p className={styles.description}>
                    {article.article.substring(0, 150)}...
                </p>

                <div className={styles.author}>
                    <div className={styles.authorInfo}>
                        {article.ownerId.avatar && (
                            <Image
                                src={article.ownerId.avatar}
                                alt={article.ownerId.name}
                                width={40}
                                height={40}
                                className={styles.authorAvatar}
                            />
                        )}
                        <div>
                            <p className={styles.authorName}>{article.ownerId.name}</p>
                            <p className={styles.date}>{formatDate(article.date)}</p>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button
                            className={`${styles.saveButton} ${article.isFavorite ? styles.saved : ''}`}
                            onClick={handleSave}
                            disabled={isPending}
                            aria-label="Зберегти історію"
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                    fill={article.isFavorite ? 'currentColor' : 'none'}
                                    stroke="currentColor"
                                    strokeWidth="2"
                                />
                            </svg>
                            <span className={styles.favoriteCount}>{article.favoriteCount}</span>
                        </button>
                    </div>
                </div>

                <Button onClick={handleViewStory} variant="primary" className={styles.viewButton}>
                    Переглянути статтю
                </Button>
            </div>
        </article>
    );
};
