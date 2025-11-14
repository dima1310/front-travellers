"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./PopularStoriesItem.module.css";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/utils/constants/routes";
import { useState } from "react";
import type { Story } from "@/types/story.types";

type Props = { story: Story };

export default function PopularStoriesItem({ story }: Props) {
  const { isAuth } = useAuth();

  const [bookmarked, setBookmarked] = useState(false);
  const [count, setCount] = useState<number>(story.favoriteCount ?? 0);
  const [loading, setLoading] = useState(false);

  const handleBookmark = async () => {
    if (!isAuth) {
      window.location.href = ROUTES.AUTH.REGISTER;
      return;
    }

    try {
      setLoading(true);
      // TODO: заменить на реальный API-вызов
      await new Promise((res) => setTimeout(res, 800));
      setBookmarked((prev) => !prev);
      setCount((prev) => (bookmarked ? Math.max(0, prev - 1) : prev + 1));
    } catch {
      alert("Помилка при оновленні збережених історій");
    } finally {
      setLoading(false);
    }
  };

  const formattedDate = new Date(story.date).toLocaleDateString("uk-UA");

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={story.img || "/images/story-placeholder.jpg"}
          alt={story.title}
          width={400}
          height={260}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{story.title}</h3>

        {!!story.description && (
          // ✅ даём полный текст, сокращать будем через CSS (3 строки)
          <p className={styles.text}>{story.description}</p>
        )}

        {/* === Автор, дата, кількість === */}
        <div className={styles.authorRow}>
          <div className={styles.author}>
            <Image
              src={story.owner?.avatar || "/avatar.svg"}
              alt={story.owner?.name || "Автор"}
              width={48}
              height={48}
              className={styles.authorAvatar}
            />

            <div className={styles.authorInfo}>
              <span className={styles.authorName}>
                {story.owner?.name || "Автор"}
              </span>

              <div className={styles.authorMeta}>
                <span className={styles.authorDate}>{formattedDate}</span>
                <span className={styles.authorDot}>•</span>
                <span className={styles.authorCount}>{count}</span>
                <span className={styles.authorIcon}>★</span>
              </div>
            </div>
          </div>
        </div>

        {/* === Низ: кнопка + bookmark === */}
        <div className={styles.footer}>
          <Link href={`/stories/${story._id}`} className={styles.button}>
            Переглянути статтю
          </Link>

          <button
            type="button"
            onClick={handleBookmark}
            className={`${styles.iconButton} ${
              bookmarked ? styles.iconButtonActive : ""
            }`}
            disabled={loading}
            aria-pressed={bookmarked}
            aria-label={
              bookmarked
                ? "Видалити історію з обраних"
                : "Додати історію в обрані"
            }
          >
            {loading ? "…" : "★"}
          </button>
        </div>
      </div>
    </div>
  );
}
