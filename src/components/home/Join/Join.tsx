import styles from "./Join.module.css";

export default function CTA() {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.background}></div>
        <div className={styles.overlay}></div>

        <div className={styles.content}>
          <h2 className={styles.title}>Приєднуйтесь до нашої спільноти</h2>

          <p className={styles.text}>
            Долучайтеся до мандрівників, які діляться своїми історіями та
            надихають на нові пригоди.
          </p>

          <button className={styles.button}>Зареєструватися</button>
        </div>
      </div>
    </section>
  );
}
