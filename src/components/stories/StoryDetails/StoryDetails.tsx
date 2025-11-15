"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import toast from "react-hot-toast";
import type { Story } from "@/types/story.types"; // 👈 общий тип из types
import styles from "./StoryDetails.module.css";

interface StoryDetailsProps {
  story: Story;
}

export default function StoryDetails({ story }: StoryDetailsProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  // на бэке нет флага isBookmarked, поэтому начинаем с false
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("uk-UA", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleBookmark = async () => {
    if (!isAuthenticated) {
      router.push("/auth/register");
      return;
    }

    setIsLoading(true);

    try {
      // TODO: сюда придёт реальний запит на бек
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newBookmarkedState = !isBookmarked;
      setIsBookmarked(newBookmarkedState);

      toast.success(
        newBookmarkedState
          ? "Історію додано до збережених"
          : "Історію видалено зі збережених"
      );
    } catch (error) {
      toast.error("Помилка при збереженні історії");
    } finally {
      setIsLoading(false);
    }
  };

  const authorName = story.owner?.name ?? "Невідомий автор";
  const authorAvatar = story.owner?.avatar || "/images/avatar-placeholder.png";

  return (
    <article className={styles.storyDetails}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.meta}>
            <div className={styles.author}>
              <img
                src={authorAvatar}
                alt={authorName}
                className={styles.authorAvatar}
              />
              <div className={styles.authorInfo}>
                <span className={styles.authorLabel}>Автор статті</span>
                <span className={styles.authorName}>{authorName}</span>
              </div>
            </div>
            <div className={styles.published}>
              <span className={styles.publishedLabel}>Опубліковано</span>
              <span className={styles.publishedDate}>
                {formatDate(story.date)}
              </span>
            </div>
          </div>

          <h1 className={styles.title}>{story.title}</h1>
        </header>

        <div className={styles.imageWrapper}>
          <img
            src={story.img || "/images/story-placeholder.jpg"}
            alt={story.title}
            className={styles.image}
          />
        </div>

        <div
          className={styles.content}
          // description у тебе строка — якщо це не HTML, можна замінити на <p>{story.description}</p>
          dangerouslySetInnerHTML={{ __html: story.description }}
        />

        <aside className={styles.saveSection}>
          <h2 className={styles.saveTitle}>Збережіть собі історію</h2>
          <p className={styles.saveText}>
            Вона буде доступна у вашому профілі у розділі збережене
          </p>
          <button
            className={`${styles.saveBtn} ${isBookmarked ? styles.saved : ""}`}
            onClick={handleBookmark}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className={styles.spinner}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    opacity="0.25"
                  />
                  <path
                    d="M12 2a10 10 0 0 1 10 10"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
                Збереження...
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill={isBookmarked ? "currentColor" : "none"}
                  />
                </svg>
                {isBookmarked ? "Збережено" : "Зберегти"}
              </>
            )}
          </button>
        </aside>
      </div>
    </article>
  );
}
