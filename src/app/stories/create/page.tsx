"use client";

import { redirect } from "next/navigation";
import AddStoryForm from "@/components/forms/AddStoryForm/AddStoryForm";
import { useAuthStore } from "@/store/useAuthStore";
import styles from "./page.module.css";

export default function CreateStoryPage() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    redirect("/auth/login");
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
