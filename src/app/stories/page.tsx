import TravellersStories from "@/components/stories/TravellersStories/TravellersStories";
import styles from "./page.module.css";

export default function StoriesPage() {
  return (
    <div className={styles.page}>
        <TravellersStories />
    </div>
  );
}
