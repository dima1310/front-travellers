"use client";

import {useEffect, useState} from "react";
import {useParams} from "next/navigation";

import StoryDetails from "@/components/stories/StoryDetails/StoryDetails";
import Popular from "@/components/home/Popular/Popular";
import {Loader} from "@/components/ui/Loader/Loader";

import {getStoryById} from "@/services/api/storiesApi";
import type {Story} from "@/types/story.types";

import styles from "./page.module.css";

export default function StoryPage() {
    const {storyId} = useParams<{ storyId: string }>();
    const [story, setStory] = useState<Story | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!storyId) return;

        const fetchStory = async () => {
            try {
                const data = await getStoryById(String(storyId));
                setStory(data);
            } catch (err) {
                console.error("❌ Помилка завантаження історії:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStory();
    }, [storyId]);

    if (loading) {
        return (
            <main className={styles.loaderWrapper}>
                <Loader/>
            </main>
        );
    }

    if (!story) {
        return (
            <main className={styles.error}>
                <p>Історію не знайдено 🥲</p>
            </main>
        );
    }

    return (
        <div className={styles.page}>
            <StoryDetails story={story}/>

            {/* ❗ новый уникальный класс, чтобы НЕ конфликтовал */}
            <section className={styles.storyPopularWrapper}>
                <Popular/>
            </section>
        </div>
    );
}
