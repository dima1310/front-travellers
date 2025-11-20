'use client'
import LoadMoreButton from "@/components/ui/Button/LoadMoreButton/LoadMoreButton";
import HomeStyles from "@/app/Home.module.css";
import styles from "./Join.module.css";
import { useRouter } from "next/navigation";

export default function CTA() {
  const router = useRouter();
  return (
    <section className={styles.section} id="join">
      <div className={HomeStyles.container}>
        <div className={`container ${styles.inner}`}>
          <div className={styles.wrapper}>
            <div className={styles.background}></div>
            <div className={styles.overlay}></div>

            <div className={styles.content}>
              <h2 className={styles.title}>Приєднуйтесь до нашої спільноти</h2>

              <p className={styles.text}>
                Долучайтеся до мандрівників, які діляться своїми історіями та
                надихають на нові пригоди.
              </p>

              <LoadMoreButton className={styles.button} width={169} onClick={() => router.push("/auth/register")}>
                Зареєструватися
              </LoadMoreButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
