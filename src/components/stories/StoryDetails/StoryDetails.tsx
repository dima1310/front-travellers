'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './StoryDetails.module.css';
import {Article} from "@/src/types/article.types";
import {useAuthStore} from "@/src/store/useAuthStore";
import {useSaveStory} from "@/src/hooks/useStories";
import {Button} from "@/src/components/ui/Button/Button";

interface StoryDetailsProps {
    story: Article;
}

export const StoryDetails = ({ story }: StoryDetailsProps) => {
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
    const handleSave = () => {
        if (!isAuthenticated) {
            router.push('/auth/register');
            return;
        }

        saveStory({
            storyId: story._id,
            isFavorite: story.isFavorite || false,
        });
    };

    return (
        <article className={styles.article}>
            {/* Мета-інформація */}
            <div className={styles.meta}>
                <div className={styles.author}>
                    {story.ownerId.avatar && (
                        <Image
                            src={story.ownerId.avatar}
                            alt={story.ownerId.name}
                            width={48}
                            height={48}
                            className={styles.authorAvatar}
                        />
                    )}
                    <div>
                        <p className={styles.authorLabel}>Автор статті</p>
                        <p className={styles.authorName}>{story.ownerId.name}</p>
                    </div>
                </div>

                <div className={styles.dateBlock}>
                    <p className={styles.dateLabel}>Опубліковано</p>
                    <p className={styles.date}>{formatDate(story.date)}</p>
                </div>
            </div>

            {/* Категорія */}
            <div className={styles.categoryWrapper}>
                <span className={styles.category}>{story.category.name}</span>
            </div>

            {/* Зображення */}
            <div className={styles.imageWrapper}>
                <Image
                    src={story.img}
                    alt={story.title}
                    fill
                    className={styles.image}
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1440px) 80vw, 1200px"
                />
            </div>

            {/* Опис мандрівки */}
            <div className={styles.content}>
                <p className={styles.description}>{story.article}</p>
            </div>

            {/* Блок збереження */}
            <div className={styles.saveBlock}>
                <h3 className={styles.saveTitle}>Збережіть собі історію</h3>
                <p className={styles.saveText}>
                    Вона буде доступна у вашому профілі у розділі збережене
                </p>
                <Button
                    onClick={handleSave}
                    disabled={isPending}
                    variant={story.isFavorite ? 'secondary' : 'primary'}
                    className={styles.saveButton}
                >
                    {isPending ? 'Збереження...' : story.isFavorite ? 'Збережено' : 'Зберегти'}
                </Button>
            </div>
        </article>
    );
};
