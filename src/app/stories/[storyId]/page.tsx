'use client';

import { use } from 'react';
import styles from './page.module.css';
import {useStory} from "@/src/hooks/useStories";
import {Loader} from "@/src/components/ui/Loader/Loader";
import {StoryDetails} from "@/src/components/stories/StoryDetails/StoryDetails";
import {Popular} from "@/src/components/stories/Popular/Popular";

interface StoryPageProps {
    params: Promise<{ storyId: string }>;
}

export default function StoryPage({ params }: StoryPageProps) {
    const { storyId } = use(params);
    const { data: story, isLoading, error } = useStory(storyId);

    if (isLoading) {
        return (
            <main className={styles.main}>
                <div className={styles.container}>
                    <Loader />
                </div>
            </main>
        );
    }

    if (error || !story) {
        return (
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.error}>
                        <h1>Історію не знайдено</h1>
                        <p>На жаль, ця історія не існує або була видалена.</p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                {/* Заголовок історії */}
                <h1 className={styles.title}>{story.title}</h1>

                {/* Деталі історії */}
                <StoryDetails story={story} />

                {/* Популярні історії */}
                <Popular limit={3} excludeId={storyId} />
            </div>
        </main>
    );
}