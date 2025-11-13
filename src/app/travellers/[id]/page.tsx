import css from "./page.module.css";

import TravellerInfo from "@/components/travellers/TravellerInfo/TravellerInfo";
import ClientStories from "./ClientStories";
import MessageNoStories from "@/components/stories/MessageNoStories/MessageNoStories";

import type { Story } from "@/types/story.types";

// ======================================================================
//  ЗАВАНТАЖЕННЯ ІСТОРІЙ МАНДРІВНИКА
// ======================================================================

async function getTravellerStories(id: string): Promise<Story[]> {
  try {
    const base = process.env.NEXT_PUBLIC_API_URL!;
    const res = await fetch(`${base}/users/${id}`, { cache: "no-store" });

    if (!res.ok) return [];

    const json = (await res.json()) as { data?: { articles?: unknown[] } };
    const list = json?.data?.articles ?? [];

    return list as unknown as Story[];
  } catch {
    return [];
  }
}

// ======================================================================
//  СТОРІНКА ПУБЛІЧНОГО ПРОФІЛЯ МАНДРІВНИКА
// ======================================================================

export default async function TravellerPublicProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const stories = await getTravellerStories(id);

  const hasStories = Array.isArray(stories) && stories.length > 0;

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
