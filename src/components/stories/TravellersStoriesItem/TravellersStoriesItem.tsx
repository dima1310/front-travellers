"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/utils/constants/routes";
import styles from "./TravellersStoriesItem.module.css";
import type { Story } from "@/types/story.types";

interface StoryProps {
  story: Story;
}

export default function TravellersStoriesItem({ story }: StoryProps) {
  const { isAuth } = useAuth();
  const [bookmarked, setBookmarked] = useState(false);
  const [count, setCount] = useState<number>(story.favoriteCount);
  const [loading, setLoading] = useState(false);

  const handleBookmark = async () => {
    if (!isAuth) {
      window.location.href = ROUTES.AUTH.REGISTER;
      return;
    }
    try {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 800)); // mock-запит
      setBookmarked((prev) => !prev);
      setCount((prev) => (bookmarked ? prev - 1 : prev + 1));
    } catch {
      alert("Помилка при збереженні статті");
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={story.img || "/images/story-placeholder.jpg"}
          alt={story.title}
          width={400}
          height={260}
          className={styles.image}
        />
      </div>

      <div className={styles.info}>
        <span className={styles.category}>Подорож</span>
        <h3 className={styles.title}>{story.title}</h3>
        <p className={styles.description}>
          {story.description?.slice(0, 100) ?? ""}...
        </p>

        <div className={styles.meta}>
          <div className={styles.author}>
            <Image
              src={story.owner?.avatar || "/avatar.svg"}
              alt={story.owner?.name || "author"}
              width={32}
              height={32}
            />
            <span>{story.owner?.name}</span>
          </div>
          <time className={styles.date}>
            {new Date(story.date).toLocaleDateString("uk-UA")}
          </time>
        </div>

        <div className={styles.footer}>
          <Link href={`/stories/${story._id}`} className={styles.link}>
            Переглянути статтю
          </Link>

          <button
            onClick={handleBookmark}
            className={`${styles.bookmark} ${bookmarked ? styles.active : ""}`}
            disabled={loading}
          >
            {loading ? "..." : "★"} {count}
          </button>
        </div>
      </div>
    </article>
  );
}
