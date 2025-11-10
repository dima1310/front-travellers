"use client";

import Image from "next/image";
import styles from "./About.module.css";

export default function About() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <Image
            src="/images/about.jpg" // заміни на своє зображення з макету
            alt="Подорожі навколо світу"
            width={600}
            height={480}
            className={styles.image}
          />
        </div>

        <div className={styles.textBlock}>
          <h2 className={styles.title}>
            Проєкт, створений для тих, хто живе подорожами
          </h2>
          <p className={styles.description}>
            Ми віримо, що кожна подорож — це унікальна історія, варта того, щоб
            нею поділитися. Наша платформа створена, щоб об’єднати людей,
            закоханих у відкриття нового. Тут ви можете ділитися власним
            досвідом, знаходити друзів та надихатися на наступні пригоди разом з
            нами.
          </p>
        </div>
      </div>
    </section>
  );
}
