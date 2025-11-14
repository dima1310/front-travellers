"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AddStoryForm from "@/components/forms/AddStoryForm/AddStoryForm";
import { useAuthStore } from "@/store/useAuthStore";
import styles from "./page.module.css";

export default function CreateStoryPage() {
  const router = useRouter();
  const { isAuthenticated, hydrated } = useAuthStore();

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [hydrated, isAuthenticated, router]);

  // Поки store НЕ завантажив дані — не редіректимо
  if (!hydrated) {
    return <p className={styles.loading}>Завантаження...</p>;
  }

  // Якщо вже загідровано і юзер не авторизований
  if (!isAuthenticated) {
    return <p className={styles.loading}>Перенаправлення...</p>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Створити нову історію</h1>
          <p className={styles.subtitle}>
            Поділіться своїм досвідом подорожей з іншими мандрівниками
          </p>
        </header>

        <AddStoryForm />
      </div>
    </div>
  );
}
