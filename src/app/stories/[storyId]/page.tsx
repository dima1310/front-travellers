"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import StoryDetails from "@/components/stories/StoryDetails/StoryDetails";
import Popular from "@/components/home/Popular/Popular";
import { Loader } from "@/components/ui/Loader/Loader";
import styles from "./page.module.css";

interface Story {
  id: string;
  title: string;
  category: string;
  image: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  publishedDate: string;
  country: string;
  bookmarksCount: number;
  isBookmarked: boolean;
}

export default function StoryPage() {
  const { storyId } = useParams<{ storyId: string }>();
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!storyId) return;

    const fetchStory = async () => {
      try {
        const res = await fetch(
          "http://podorozhniky-back.onrender.com/api/stories/${storyId}"
        );

        if (!res.ok) {
          throw new Error("Помилка завантаження історії");
        }

        const data = await res.json();
        setStory(data);
      } catch (err) {
        console.error("❌ Помилка:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [storyId]);

  if (loading) {
    return (
      <main className={styles.loaderWrapper}>
        <Loader />
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
      <StoryDetails story={story} />

      <div className={styles.popularSection}>
        <Popular />
      </div>
    </div>
  );
}