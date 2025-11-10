"use client";

import { redirect } from "next/navigation";
import AddStoryForm from "@/components/forms/AddStoryForm/AddStoryForm";
import { useAuthStore } from "@/store/authStore";
import styles from "./page.module.css";

interface EditStoryPageProps {
  params: {
    storyId: string;
  };
}

// Mock story data for editing
const mockStoryData = {
  title: "Венеція без туристів: маршрути для справжніх мандрівників",
  category: "Європа",
  content: `Венеція — це місто, яке вражає своєю красою та унікальністю. Але як побачити справжню Венецію, далеко від натовпів туристів? У цій статті я поділюся з вами маршрутами, які допоможуть відкрити для себе автентичну Венецію.

Найкращий час для прогулянок Венецією — це ранок. Коли місто тільки прокидається, ви можете насолодитися тишею та спокоєм. Рекомендую почати з площі Сан-Марко, коли там ще немає туристів.

Каннареджо — один з найавтентичніших районів Венеції. Тут ви знайдете справжні венеціанські ресторани, де обідають місцеві жителі.`,
  image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1200",
};

export default function EditStoryPage({ params }: EditStoryPageProps) {
  const { isAuthenticated } = useAuthStore();

  // Redirect if not authenticated
  if (!isAuthenticated) {
    redirect("/auth/login");
  }

  // TODO: Fetch story data
  // const story = await fetchStory(params.storyId);
  // Check if user is the author

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
          initialData={mockStoryData}
          isEdit={true}
          storyId={params.storyId}
        />
      </div>
    </div>
  );
}
