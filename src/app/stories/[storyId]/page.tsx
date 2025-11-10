import StoryDetails from "@/components/stories/StoryDetails/StoryDetails";
import Popular from "@/components/home/Popular/Popular";
import styles from "./page.module.css";

interface StoryPageProps {
  params: {
    storyId: string;
  };
}

// Mock story data
const mockStory = {
  id: "1",
  title: "Венеція без туристів: маршрути для справжніх мандрівників",
  category: "Європа",
  image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1200",
  content: `
    <p>Венеція — це місто, яке вражає своєю красою та унікальністю. Але як побачити справжню Венецію, далеко від натовпів туристів? У цій статті я поділюся з вами маршрутами, які допоможуть відкрити для себе автентичну Венецію.</p>

    <h2>Ранкові прогулянки</h2>
    <p>Найкращий час для прогулянок Венецією — це ранок. Коли місто тільки прокидається, ви можете насолодитися тишею та спокоєм. Рекомендую почати з площі Сан-Марко, коли там ще немає туристів.</p>

    <h2>Райони для відвідування</h2>
    <p>Каннареджо — один з найавтентичніших районів Венеції. Тут ви знайдете справжні венеціанські ресторани, де обідають місцеві жителі. Обов'язково відвідайте Jewish Ghetto — перше єврейське гетто у світі.</p>

    <h2>Острови лагуни</h2>
    <p>Не забудьте відвідати острови Мурано та Бурано. Мурано відомий своїм скляним виробництвом, а Бурано — яскраво пофарбованими будинками та мереживом ручної роботи.</p>

    <h2>Гастономічні рекомендації</h2>
    <p>Cicchetti — це венеціанські тапас, які обов'язково потрібно спробувати. Відвідайте традиційні бакарі (bacari) — венеціанські винні бари, де подають cicchetti та місцеве вино.</p>

    <p>Венеція — це не просто туристичний центр, це місто з багатою історією та культурою. Сподіваюся, мої поради допоможуть вам відкрити для себе справжню Венецію!</p>
  `,
  author: {
    id: "1",
    name: "Олена Коваленко",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  publishedDate: "2024-11-01T10:00:00Z",
  country: "Італія",
  bookmarksCount: 145,
  isBookmarked: false,
};

// Mock popular stories
const mockPopularStories = [
  {
    id: "2",
    title: "Японія навесні: сакура та традиції",
    description: "Подорож у світ японської культури під час цвітіння сакури.",
    category: "Азія",
    image: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800",
    author: {
      id: "2",
      name: "Андрій Петренко",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    publishedDate: "2024-10-28T14:30:00Z",
    bookmarksCount: 98,
    isBookmarked: false,
  },
  {
    id: "3",
    title: "Патагонія: на краю світу",
    description: "Пригоди в одному з найвіддаленіших куточків планети.",
    category: "Пригоди",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
    author: {
      id: "3",
      name: "Марія Шевченко",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    publishedDate: "2024-10-25T09:15:00Z",
    bookmarksCount: 127,
    isBookmarked: false,
  },
];

export default function StoryPage({ params }: StoryPageProps) {
  // TODO: Fetch story data based on params.storyId
  // const story = await fetchStory(params.storyId);

  return (
    <div className={styles.page}>
      <StoryDetails story={mockStory} />
      <div className={styles.popularSection}>
        <Popular
          initialStories={mockPopularStories}
          itemsPerPage={2}
          totalPages={1}
        />
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: StoryPageProps) {
  // TODO: Fetch story data for metadata
  return {
    title: `${mockStory.title} - Подорожники`,
    description: mockStory.content.substring(0, 160),
  };
}
