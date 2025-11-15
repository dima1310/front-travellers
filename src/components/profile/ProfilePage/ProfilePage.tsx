"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import TravellerInfo from "@/components/travellers/TravellerInfo/TravellerInfo";
import TravellersStories from "@/components/stories/TravellersStories/TravellersStories";
import { Loader } from "@/components/ui/Loader/Loader";
import { api } from "@/services/api/axiosConfig";
import type { Story } from "@/types/story.types";

import styles from "./ProfilePage.module.css";

type SavedStoryRef = string | { _id: string };

type CurrentUser = {
  _id: string;
  name: string;
  email?: string;
  avatar?: string;
  bio?: string;
  savedStories?: SavedStoryRef[];
};

type PublicProfileResponse = {
  data?: {
    user?: {
      _id: string;
    };
    articles?: Story[];
    stories?: Story[];
  };
};

type StoryResponse = {
  data: Story;
};

const TABS = {
  SAVED: "saved",
  MINE: "mine",
} as const;

type ActiveTab = (typeof TABS)[keyof typeof TABS];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(TABS.SAVED);

  const {
    data: currentUser,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const { data } = await api.get<{ data: CurrentUser }>("/users/current");
      return data.data;
    },
  });

  const userId = currentUser?._id;

  const savedIds =
    currentUser?.savedStories?.map((s) =>
      typeof s === "string" ? s : s._id
    ) ?? [];

  // 2️⃣ Мої історії (створені користувачем)
  const {
    data: myStories = [],
    isLoading: isMyLoading,
    isError: isMyError,
  } = useQuery({
    queryKey: ["profile-my-stories", userId],
    enabled: Boolean(userId) && activeTab === TABS.MINE,
    queryFn: async () => {
      if (!userId) return [];
      const { data } = await api.get<PublicProfileResponse>(`/users/${userId}`);
      const payload = data.data;
      if (!payload) return [];
      // на всякий випадок підтримуємо і articles, і stories
      return (payload.articles || payload.stories || []) as Story[];
    },
  });

  // 3️⃣ Збережені історії
  const {
    data: savedStories = [],
    isLoading: isSavedLoading,
    isError: isSavedError,
  } = useQuery({
    queryKey: ["profile-saved-stories", savedIds],
    enabled: activeTab === TABS.SAVED && savedIds.length > 0,
    queryFn: async () => {
      if (!savedIds.length) return [];
      const responses = await Promise.all(
        savedIds.map((id) =>
          api
            .get<StoryResponse>(`/stories/${id}`)
            .then((res) => res.data.data)
            .catch(() => null)
        )
      );
      return responses.filter(Boolean) as Story[];
    },
  });

  const isStoriesLoading =
    activeTab === TABS.SAVED ? isSavedLoading : isMyLoading;

  const isStoriesError = activeTab === TABS.SAVED ? isSavedError : isMyError;

  const stories = activeTab === TABS.SAVED ? savedStories : myStories;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {isUserLoading && (
          <div className={styles.loaderWrapper}>
            <Loader />
          </div>
        )}

        {isUserError && (
          <p className={styles.error}>
            Не вдалося завантажити профіль. Увійдіть у свій акаунт ще раз.
          </p>
        )}

        {currentUser && (
          <>
            {/* 🧍‍♀️ Інформація про мандрівника */}
            <TravellerInfo id={currentUser._id} />

            {/* 📚 Секція історій */}
            <section className={styles.storiesSection}>
              <div className={styles.storiesHeader}>
                <h2 className={styles.storiesTitle}>Історії мандрівника</h2>

                <div className={styles.tabs}>
                  <button
                    className={`${styles.tabButton} ${
                      activeTab === TABS.SAVED ? styles.tabButtonActive : ""
                    }`}
                    onClick={() => setActiveTab(TABS.SAVED)}
                  >
                    Збережені історії
                  </button>

                  <button
                    className={`${styles.tabButton} ${
                      activeTab === TABS.MINE ? styles.tabButtonActive : ""
                    }`}
                    onClick={() => setActiveTab(TABS.MINE)}
                  >
                    Мої історії
                  </button>
                </div>
              </div>

              <div className={styles.storiesInner}>
                {isStoriesLoading && (
                  <div className={styles.loaderWrapper}>
                    <Loader />
                  </div>
                )}

                {isStoriesError && (
                  <p className={styles.error}>
                    Помилка завантаження історій. Спробуйте ще раз.
                  </p>
                )}

                {!isStoriesLoading &&
                  !isStoriesError &&
                  stories.length === 0 && (
                    <p className={styles.empty}>
                      {activeTab === TABS.SAVED
                        ? "У вас ще немає збережених історій."
                        : "Ви ще не додали жодної історії."}
                    </p>
                  )}

                {/* ⭐ Тут вже використовуємо TravellersStories як в ТЗ */}
                {!isStoriesLoading && !isStoriesError && stories.length > 0 && (
                  <TravellersStories stories={stories} />
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
