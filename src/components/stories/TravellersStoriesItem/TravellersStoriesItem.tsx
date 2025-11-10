"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/utils/constants/routes";
import styles from "./TravellersStoriesItem.module.css";

interface StoryProps {
  story: {
    id: string;
    title: string;
    content: string;
    coverUrl?: string;
    author?: {
      name: string;
      avatarUrl?: string;
    };
    createdAt: string;
    bookmarks: number;
  };
}

export default function TravellersStoriesItem({ story }: StoryProps) {
  const { isAuth } = useAuth();
  const [bookmarked, setBookmarked] = useState(false);
  const [count, setCount] = useState(story.bookmarks);
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
          src={story.coverUrl || "/images/story-placeholder.jpg"}
          alt={story.title}
          width={400}
          height={260}
          className={styles.image}
        />
      </div>

      <div className={styles.info}>
        <span className={styles.category}>Подорож</span>
        <h3 className={styles.title}>{story.title}</h3>
        <p className={styles.description}>{story.content.slice(0, 100)}...</p>

        <div className={styles.meta}>
          <div className={styles.author}>
            <Image
              src={story.author?.avatarUrl || "/avatar.svg"}
              alt={story.author?.name || "author"}
              width={32}
              height={32}
            />
            <span>{story.author?.name}</span>
          </div>
          <time className={styles.date}>
            {new Date(story.createdAt).toLocaleDateString("uk-UA")}
          </time>
        </div>

        <div className={styles.footer}>
          <Link href={`/stories/${story.id}`} className={styles.link}>
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
