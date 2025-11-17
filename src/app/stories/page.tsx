import TravellersStories from "@/components/stories/TravellersStories/TravellersStories";
import styles from "./page.module.css";

export default function StoriesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Історії Мандрівників</h1>
          {/*<p className={styles.subtitle}>*/}
          {/*  Відкрийте для себе захоплюючі розповіді про подорожі від нашої спільноти мандрівників*/}
          {/*</p>*/}
        </header>
        <TravellersStories />
      </div>
    </div>
  );
}
