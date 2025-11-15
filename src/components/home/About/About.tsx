import styles from "./About.module.css";

export default function About() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* LEF BLOCK */}
        <div className={styles.titleBlock}>
          <h2 className={styles.title}>
            Проєкт, створений для тих, <br />
            хто живе подорожами
          </h2>
        </div>

        {/* RIGHT TEXT */}
        <p className={styles.description}>
          Ми віримо, що кожна подорож — це унікальна історія,
          варта того, щоб нею поділилися. Наша платформа створена,
          щоб об’єднати людей, закоханих у відкриття нового...
        </p>

        {/* FEATURES */}
        <div className={styles.features}>

          <div className={styles.featureItem}>
            <img src="/public/icons/Icon1.svg" className={styles.icon} />
            <h3 className={styles.featureTitle}>Наша місія</h3>
            <p className={styles.featureText}>
              Об’єднувати людей через любов до пригод...
            </p>
          </div>

          <div className={styles.featureItem}>
            <img src="/public/icons/Icon2.svg" className={styles.icon} />
            <h3 className={styles.featureTitle}>Автентичні історії</h3>
            <p className={styles.featureText}>
              Ми цінуємо справжні, непереглянуті враження...
            </p>
          </div>

          <div className={styles.featureItem}>
            <img src="/public/icons/Vector3.svg" className={styles.icon} />
            <h3 className={styles.featureTitle}>Ваша спільнота</h3>
            <p className={styles.featureText}>
              Станьте частиною спільноти, де кожен може бути...
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}