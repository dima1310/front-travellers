import { notFound } from "next/navigation";
import css from "./page.module.css";

// Компоненты
import TravellerInfo from "@/components/travellers/TravellerInfo/TravellerInfo";
import ClientStories from "./ClientStories";
import MessageNoStories from "@/components/stories/MessageNoStories/MessageNoStories";

// Типы
import type { Traveller } from "@/types/traveller.types";
import type { Story } from "@/types/story.types";


// ======================================================================
// 🔹 ВРЕМЕННАЯ ЗАГЛУШКА ДЛЯ РАЗРАБОТКИ (без API)
// TODO: удалить этот блок целиком после подключения бэкенда
// ======================================================================

// Блок "Информация про путешественника"
async function getTraveller(id: string): Promise<Traveller | null> {
  return {
    _id: id,
    name: "Анастасія Олійник",
    avatar: "/avatar.png",
    bio: "Люблю активні подорожі та дослідження нових місць. Ділюся практичними порадами та маршрутами для мандрівників.",
  };
}

// Блок "Список историй"
async function getTravellerStories(id: string): Promise<Story[]> {
  return [
    {
      _id: "story1",
      title: "Північне сяйво в Норвегії: погоня за світлом",
      category: "Європа",
      excerpt:
        "Побачити північне сяйво було мрією з дитинства. І ось ми поїхали у Норвегію...",
      image: "/images/mock-aurora.jpg",
      createdAt: "2024-02-14",
      author: {
        _id: id,
        name: "Анастасія Олійник",
        avatar: "/avatar.png",
      },
      views: 58,
      likes: 14,
    },
  ];
}

// ======================================================================
// 🔹 КОНЕЦ ЗАГЛУШКИ
// ======================================================================



// Основная страница публичного профиля
export default async function TravellerPublicProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params; // достаём id из URL

  // Параллельно получаем данные путешественника и список его историй
  const [traveller, stories] = await Promise.all([
    getTraveller(id),
    getTravellerStories(id),
  ]);

  // Если путешественник не найден → показываем 404
  if (!traveller) return notFound();

  // Проверяем, есть ли истории у пользователя
  const hasStories = stories.length > 0;

  return (
    <main className={css.publicProfile}>

      {/* Профиль путешественника */}
      <section className={css.travellerInfo}>
        <TravellerInfo traveller={traveller} />
      </section>

      {/* Секция историй */}
      <section className={css.travellerStories}>
        <h2 className={css.travellerStoriesTitle}>Історії Мандрівника</h2>

        {hasStories ? (
          // Если истории есть → показываем список с кнопкой "Показати ще"
          <ClientStories
            stories={stories}
            initialDesktopCount={6}
            initialTabletMobileCount={4}
          />
        ) : (
          // Если историй нет → показываем заглушку
          <MessageNoStories />
        )}
      </section>

    </main>
  );
}
