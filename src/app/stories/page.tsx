import styles from './page.module.css';
import {TravellersStories} from "@/src/components/stories/TravellersStories/TravellersStories";

export const metadata = {
    title: 'Історії Мандрівників | Подорожники',
    description: 'Читайте захоплюючі історії мандрівників з усього світу',
};

export default function StoriesPage() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>Історії Мандрівників</h1>
                <TravellersStories initialLimit={9}/>
            </div>
        </main>
    );
}