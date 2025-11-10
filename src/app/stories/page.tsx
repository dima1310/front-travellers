import TravellersStories from "@/components/stories/TravellersStories/TravellersStories";
import styles from "./page.module.css";

// Mock data for stories
const mockStories = Array.from({ length: 9 }, (_, i) => ({
  id: `story-${i + 1}`,
  title: `Захоплююча подорож ${i + 1}: відкриття нових горизонтів`,
  description:
    "Детальна розповідь про незабутню мандрівку, повну вражень, пригод та цікавих зустрічей. Дізнайтеся про найкращі місця та корисні поради.",
  category: ["Європа", "Азія", "Америка", "Африка", "Пригоди"][i % 5],
  image: `https://images.unsplash.com/photo-${
    [
      "1488646953014-85cb44e25828",
      "1506905925346-21bda4d32df4",
      "1469854523086-cc02fe5d8800",
      "1476514525535-07fb3b4ae5f1",
      "1523906834658-6e24ef2386f9",
      "1492571350019-22de08371fd3",
      "1501785888041-af3ef285b470",
      "1519681393784-d120267933ba",
      "1504893524553-b855bce32c67",
    ][i]
  }?w=800`,
  author: {
    id: `author-${(i % 5) + 1}`,
    name: [
      "Олена Коваленко",
      "Андрій Петренко",
      "Марія Шевченко",
      "Дмитро Іваненко",
      "Катерина Мельник",
    ][i % 5],
    avatar: `https://i.pravatar.cc/150?img=${(i % 5) + 1}`,
  },
  publishedDate: new Date(
    Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
  ).toISOString(),
  bookmarksCount: Math.floor(Math.random() * 150) + 20,
  isBookmarked: false,
}));

export default function StoriesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Історії Мандрівників</h1>
          <p className={styles.subtitle}>
            Відкрийте для себе захоплюючі розповіді про подорожі від нашої
            спільноти мандрівників
          </p>
        </header>

        <TravellersStories
          initialStories={mockStories}
          totalPages={5}
          itemsPerPage={9}
        />
      </div>
    </div>
  );
}
