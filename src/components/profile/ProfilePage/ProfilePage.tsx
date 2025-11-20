"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import TravellerInfo from "@/components/travellers/TravellerInfo/TravellerInfo";
import TravellersStories from "@/components/stories/TravellersStories/TravellersStories";
import { Loader } from "@/components/ui/Loader/Loader";
import { api } from "@/services/api/axiosConfig";
import type { Story } from "@/types/story.types";

import styles from "./ProfilePage.module.css";
import MessageNoStories from "@/components/stories/MessageNoStories/MessageNoStories";

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
    articles?: Story[];
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
      return (data.data?.articles || []) as Story[];
    },
  });

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
            {/* TravellerInfo как был, без обёрток */}
            <TravellerInfo id={currentUser._id} />

            <section className={styles.storiesSection}>
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
                    <MessageNoStories
                      text={
                        activeTab === TABS.SAVED
                          ? "У вас ще немає збережених історій, мерщій збережіть вашу першу історію!"
                          : "Ви ще нічого не публікували, поділіться своєю першою історією!"
                      }
                      buttonText={
                        activeTab === TABS.SAVED
                          ? "До історій"
                          : "Опублікувати історію"
                      }
                      redirectTo={
                        activeTab === TABS.SAVED ? "/stories" : "/new-story"
                      }
                    />
                  )}

                {!isStoriesLoading && !isStoriesError && stories.length > 0 && (
                  <TravellersStories stories={stories} key={activeTab} />
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
