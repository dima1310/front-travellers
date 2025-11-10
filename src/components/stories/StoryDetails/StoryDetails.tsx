"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import toast from "react-hot-toast";
import styles from "./StoryDetails.module.css";

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

interface StoryDetailsProps {
  story: Story;
}

export default function StoryDetails({ story }: StoryDetailsProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [isBookmarked, setIsBookmarked] = useState(story.isBookmarked);
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
      // TODO: Replace with actual API call
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

  return (
    <article className={styles.storyDetails}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.meta}>
            <div className={styles.author}>
              <img
                src={story.author.avatar}
                alt={story.author.name}
                className={styles.authorAvatar}
              />
              <div className={styles.authorInfo}>
                <span className={styles.authorLabel}>Автор статті</span>
                <span className={styles.authorName}>{story.author.name}</span>
              </div>
            </div>
            <div className={styles.published}>
              <span className={styles.publishedLabel}>Опубліковано</span>
              <span className={styles.publishedDate}>
                {formatDate(story.publishedDate)}
              </span>
            </div>
          </div>

          <h1 className={styles.title}>{story.title}</h1>

          <div className={styles.country}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {story.country}
          </div>
        </header>

        <div className={styles.imageWrapper}>
          <img src={story.image} alt={story.title} className={styles.image} />
        </div>

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: story.content }}
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
