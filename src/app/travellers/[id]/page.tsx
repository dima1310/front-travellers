// src/app/travellers/[id]/page.tsx
import css from "./page.module.css";

import TravellerInfo from "@/components/travellers/TravellerInfo/TravellerInfo";
import ClientStories from "@/components/travellers/ClientStories/ClientStories";
import MessageNoStories from "@/components/stories/MessageNoStories/MessageNoStories";

import type { Story } from "@/types/story.types";

export const dynamic = "force-dynamic";

type PageProps = { params: { id: string } };

// ======================================================================
// ЗАВАНТАЖЕННЯ ІСТОРІЙ КОРИСТУВАЧА
// ======================================================================

type TravellerArticlesResponse = {
  data?: { articles?: Story[] };
};

async function getTravellerStories(id: string): Promise<Story[]> {
  try {
    const base = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api")
      .replace(/\/$/, "");
    const res = await fetch(`${base}/users/${id}`, { cache: "no-store" });
    if (!res.ok) return [];

    const json = (await res.json()) as TravellerArticlesResponse;
    return Array.isArray(json?.data?.articles) ? json.data!.articles! : [];
  } catch {
    return [];
  }
}

// ======================================================================
// СТОРІНКА ПУБЛІЧНОГО ПРОФІЛЯ
// ======================================================================

export default async function TravellerPublicProfilePage({ params }: PageProps) {
  const { id } = params;

  const stories = await getTravellerStories(id);
  const hasStories = stories.length > 0;

  return (
    <main className={css.publicProfile}>
      {/* Профіль мандрівника */}
      <section className={css.travellerInfo}>
        <TravellerInfo id={id} />
      </section>

      {/* Секція "Історії Мандрівника" */}
      <section className={css.travellerStories}>
        <h2 className={css.travellerStoriesTitle}>Історії Мандрівника</h2>

        {hasStories ? (
          <ClientStories
            stories={stories}
            initialDesktopCount={6}
            initialTabletMobileCount={4}
          />
        ) : (
          <MessageNoStories
            text="Цей користувач ще не публікував історій"
            buttonText="Назад до історій"
            redirectTo="/stories"
          />
        )}
      </section>
    </main>
  );
}
