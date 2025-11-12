import { notFound } from "next/navigation";
import css from "./page.module.css";

// Компоненты
import TravellerInfo from "@/components/travellers/TravellerInfo/TravellerInfo";
import ClientStories from "./ClientStories";
import MessageNoStories from "@/components/stories/MessageNoStories/MessageNoStories";

// Типы
import type { Traveller } from "@/types/traveller.types";
import type { Story } from "@/types/story.types";

/**
 * 🧩 Блок "Інформація про мандрівника"
 */
async function getTraveller(id: string): Promise<Traveller | null> {
  const base = process.env.NEXT_PUBLIC_API_URL || "";
  const res = await fetch(`${base}/users/${id}`, { cache: "no-store" });
  if (!res.ok) return null;

  const json = await res.json();
  const user = json?.data?.user;
  if (!user?._id) return null;

  return {
    _id: user._id,
    name: user.name,
    avatar: user.avatar,
    bio: user.bio,
    socialLinks: user.socialLinks,
  };
}

/**
 * ⚙️ ЗАГЛУШКА — поки не підключено бекенд
 * Замість цього пізніше буде запит `/users/:id/stories`
 */
async function getTravellerStories(id: string): Promise<Story[]> {
  // --- ЗАГЛУШКА НАЧАЛО ---
  return [];
  // --- ЗАГЛУШКА КІНЕЦЬ ---
}

/**
 * 🧭 Сторінка профілю мандрівника
 */
type Params = { params: { id: string } };

export default async function TravellerPage({ params }: Params) {
  const traveller = await getTraveller(params.id);
  if (!traveller) notFound();

  const stories = await getTravellerStories(params.id);

  return (
    <div className={css.wrap}>
      <TravellerInfo traveller={traveller} />
      {stories.length > 0 ? (
        <ClientStories initialStories={stories} userId={traveller._id} />
      ) : (
        <MessageNoStories />
      )}
    </div>
  );
}
