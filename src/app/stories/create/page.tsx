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
    if (!hydrated) return;

    if (!isAuthenticated) {
      router.replace("/auth/login?from=/stories/create");
    }
  }, [hydrated, isAuthenticated, router]);

  if (!hydrated) {
    return null;
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Створити нову історію</h1>
        <AddStoryForm />
      </div>
    </div>
  );
}
