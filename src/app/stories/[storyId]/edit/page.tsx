"use client";

import { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";

import AddStoryForm from "@/components/forms/AddStoryForm/AddStoryForm";
import { useAuthStore } from "@/store/useAuthStore";
import { getStoryById } from "@/services/api/storiesApi";
import { Loader } from "@/components/ui/Loader/Loader";
import type { Story } from "@/types/story.types";

import styles from "./page.module.css";

type StoryWithCategory = Story & {
  category?: { name: string } | string;
};

export default function EditStoryPage() {
  const { storyId } = useParams<{ storyId: string }>();
  const { isAuthenticated, hydrated } = useAuthStore();

  const [story, setStory] = useState<StoryWithCategory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hydrated) return;
    if (!isAuthenticated) {
      redirect("/auth/login");
    }
  }, [hydrated, isAuthenticated]);

  useEffect(() => {
    if (!storyId) return;

    const loadStory = async () => {
      try {
        const data = await getStoryById(String(storyId));
        setStory(data as StoryWithCategory);
      } catch (error) {
        console.error("Помилка завантаження історії", error);
      } finally {
        setLoading(false);
      }
    };

    loadStory();
  }, [storyId]);

  if (!hydrated || loading) {
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

  const category =
    typeof story.category === "string"
      ? story.category
      : (story.category?.name ?? "");

  const initialData = {
    title: story.title,
    category,
    content: story.description,
    imageUrl: story.img,
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Редагувати історію</h1>
          <p className={styles.subtitle}>
            Внесіть зміни до вашої історії подорожі
          </p>
        </header>

        <AddStoryForm
          initialData={initialData}
          isEdit
          storyId={String(storyId)}
        />
      </div>
    </div>
  );
}
