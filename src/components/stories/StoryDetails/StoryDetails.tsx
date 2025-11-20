"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useAuthStore } from "@/store/useAuthStore";
import { useModal } from "@/hooks/useModal";
import ConfirmModal from "@/components/modals/ConfirmModal/ConfirmModal";

import { addSavedStory, removeSavedStory } from "@/services/api/savedStories";
import type { Story } from "@/types/story.types";
import type { User } from "@/types/auth.types";

import styles from "./StoryDetails.module.css";

interface StoryDetailsProps {
  story: Story;
}

export default function StoryDetails({ story }: StoryDetailsProps) {
  const router = useRouter();
  const { isAuthenticated, user, setUser } = useAuthStore();
  const { open, onOpen, onClose } = useModal();

  const initiallySaved = useMemo(
    () => !!user?.savedStories?.includes(story._id),
    [user?.savedStories, story._id]
  );

  const [isBookmarked, setIsBookmarked] = useState(initiallySaved);
  const [isLoading, setIsLoading] = useState(false);

  // 🔹 безопасный форматтер даты
  const formatDate = (value?: string) => {
    if (!value) return "";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";

    return date.toLocaleDateString("uk-UA", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  };

  type StoryWithDates = Story & {
    createdAt?: string;
    updatedAt?: string;
  };

  const s = story as StoryWithDates;

  const publicationDateRaw: string | undefined =
    s.date || s.createdAt || s.updatedAt || undefined;

  const publicationDate = formatDate(publicationDateRaw);

  const handleBookmark = async () => {
    if (!isAuthenticated) {
      onOpen();
      return;
    }

    if (!user) return;

    setIsLoading(true);
    const next = !isBookmarked;

    try {
      if (next) {
        await addSavedStory(story._id);
        const nextSaved = [...(user.savedStories ?? []), story._id];

        setUser({
          ...(user as User),
          savedStories: nextSaved,
        });
      } else {
        await removeSavedStory(story._id);
        const nextSaved = (user.savedStories ?? []).filter(
          (id) => id !== story._id
        );

        setUser({
          ...(user as User),
          savedStories: nextSaved,
        });
      }

      setIsBookmarked(next);

      toast.success(
        next ? "Історію додано до збережених" : "Історію видалено зі збережених"
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
        <h1 className={styles.title}>{story.title}</h1>

        <div className={styles.meta}>
          <div className={styles.author}>
            <div className={styles.authorInfo}>
              <span className={styles.authorLabel}>Автор статті</span>
              <span className={styles.authorName}>{authorName}</span>
            </div>
          </div>

          <div className={styles.published}>
            <span className={styles.publishedLabel}>Опубліковано</span>
            <span className={styles.publishedDate}>
              {publicationDate || "—"}
            </span>
          </div>

          <div className={styles.categoryDate}>
            <span className={styles.categoryDateName}>
              {story.category.name}
            </span>
          </div>
        </div>

        <div className={styles.imageWrapper}>
          <img
            src={story.img || "/images/story-placeholder.jpg"}
            alt={story.title}
            className={styles.image}
          />
        </div>

        <div className={styles.contentBox}>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: story.description }}
          />

          <aside className={styles.saveSection}>
            <h2 className={styles.saveTitle}>Збережіть собі історію</h2>
            <p className={styles.saveText}>
              Вона буде доступна у вашому профілі у розділі збережене
            </p>

            <button
              className={`${styles.saveBtn} ${
                isBookmarked ? styles.saved : ""
              }`}
              onClick={handleBookmark}
              disabled={isLoading}
            >
              {isLoading
                ? "Збереження..."
                : isBookmarked
                  ? "Збережено"
                  : "Зберегти"}
            </button>

            {open && (
              <ConfirmModal
                title="Помилка під час збереження"
                text="Щоб зберегти статтю вам треба увійти, якщо ще немає облікового запису — зареєструйтесь"
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
          </aside>
        </div>
      </div>
    </article>
  );
}
