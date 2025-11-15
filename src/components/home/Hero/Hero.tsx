"use client";

import styles from "./Hero.module.css";

export default function Hero() {
  const handleScrollToJoin = () => {
    const section = document.getElementById("join");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <div className={styles.container}>
          <h1 className={styles.title}>Відкрийте світ подорожей з нами!</h1>
          <p className={styles.subtitle}>
           Приєднуйтесь до нашої спільноти мандрівників, де ви зможете ділитися своїми 
           історіями та отримувати натхнення для нових пригод. Відкрийте для себе нові 
           місця та знайдіть однодумців!
          </p>
          <button className={styles.button} onClick={handleScrollToJoin}>
            Доєднатись
          </button>
        </div>
      </div>
    </section>
  );
}
