"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./PopularStoriesItem.module.css";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/utils/constants/routes";
import { useState } from "react";
import type { Story } from "@/types/story.types"; // ✅ используем бекенд-тип

type Props = { story: Story };

export default function PopularStoriesItem({ story }: Props) {
  const { isAuth } = useAuth();

  // поля бекенда: _id, title, description, img, owner{name, avatar}, date, favoriteCount
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
      // TODO: заменить на реальный API вызов
      await new Promise((res) => setTimeout(res, 800));
      setBookmarked((prev) => !prev);
      setCount((prev) => (bookmarked ? Math.max(0, prev - 1) : prev + 1));
    } catch {
      alert("Помилка при оновленні збережених історій");
    } finally {
      setLoading(false);
    }
  };

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
          <p className={styles.text}>
            {story.description.slice(0, 120)}
            {story.description.length > 120 ? "..." : ""}
          </p>
        )}

        <div className={styles.author}>
          <Image
            src={story.owner?.avatar || "/avatar.svg"}
            alt={story.owner?.name || "Автор"}
            width={32}
            height={32}
          />
          <span>{story.owner?.name || "Автор"}</span>
        </div>

        <div className={styles.footer}>
          <Link href={`/stories/${story._id}`} className={styles.link}>
            Переглянути статтю
          </Link>

          <button
            onClick={handleBookmark}
            className={`${styles.bookmark} ${bookmarked ? styles.active : ""}`}
            disabled={loading}
            aria-pressed={bookmarked}
          >
            {loading ? "..." : "★"} {count}
          </button>
        </div>
      </div>
    </div>
  );
}
