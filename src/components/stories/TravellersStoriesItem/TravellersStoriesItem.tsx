"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import styles from "./TravellersStoriesItem.module.css";

import type { Story } from "@/types/story.types";
import { useAuthStore } from "@/store/useAuthStore";
import { useModal } from "@/hooks/useModal";
import ConfirmModal from "@/components/modals/ConfirmModal/ConfirmModal";
import { addSavedStory, removeSavedStory } from "@/services/api/savedStories";
import type { User } from "@/types/auth.types";

interface StoryProps {
  story: Story;
}

export default function TravellersStoriesItem({ story }: StoryProps) {
  const router = useRouter();

  // берём данные из zustand-стора
  const { isAuthenticated, user, setUser } = useAuthStore();
  const { open, onOpen, onClose } = useModal();

  // изначально — сохранена ли история у юзера
  const initiallySaved = useMemo(
    () => !!user?.savedStories?.includes(story._id),
    [user?.savedStories, story._id]
  );

  const [bookmarked, setBookmarked] = useState(initiallySaved);
  const [count, setCount] = useState<number>(story.favoriteCount ?? 0);
  const [loading, setLoading] = useState(false);

  const handleBookmark = async () => {
    if (!isAuthenticated) {
      // не авторизован — показываем модалку
      onOpen();
      return;
    }

    if (!user) return;

    const next = !bookmarked;
    setLoading(true);

    try {
      if (next) {
        // добавляем в сохранённые на бэке
        await addSavedStory(story._id);

        // обновляем savedStories в zustand
        const nextSaved = [...(user.savedStories ?? []), story._id];
        setUser({
          ...(user as User),
          savedStories: nextSaved,
        });

        // увеличиваем счётчик (если он у тебя для избранного)
        setCount((prev) => prev + 1);
      } else {
        // удаляем из сохранённых
        await removeSavedStory(story._id);

        const nextSaved = (user.savedStories ?? []).filter(
          (id) => id !== story._id
        );
        setUser({
          ...(user as User),
          savedStories: nextSaved,
        });

        setCount((prev) => Math.max(0, prev - 1));
      }

      setBookmarked(next);

      toast.success(
        next ? "Історію додано до збережених" : "Історію видалено зі збережених"
      );
    } catch (e) {
      toast.error("Помилка при збереженні історії");
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
        <span className={styles.category}>{story.category.name}</span>
        <h3 className={styles.title}>{story.title}</h3>

        {!!story.description && (
          <p className={styles.text}>{story.description}</p>
        )}

        {/* === Автор, дата, кол-во === */}
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
                <span className={styles.authorDate}>
                  {new Date(story.date).toLocaleDateString("uk-UA")}
                </span>

                <span className={styles.authorDot}>•</span>

                <span className={styles.authorCount}>
                  {count}
                  <Image
                    src="/icons/vector.svg"
                    alt="Закладка"
                    width={16}
                    height={16}
                    className={styles.authorBookmarkIcon}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* === Низ карточки === */}
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
          >
            {loading ? (
              "…"
            ) : (
              <Image
                src="/icons/vector.svg"
                alt="Обрані"
                width={20}
                height={20}
                className={styles.iconSvg}
              />
            )}
          </button>

          {open && (
            <ConfirmModal
              title="Помилка під час збереження"
              text="Щоб зберегти статтю вам треба увійти, якщо ще немає облікового запису зареєструйтесь"
              cancelButtonText="Увійти"
              confirmButtonText="Зареєструватись"
              onCancel={() => {
                router.push("/auth/login");
                onClose();
              }}
              onConfirm={() => {
                router.push("/auth/register");
                onClose();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
