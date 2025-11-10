"use client";

import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/utils/constants/routes";
import styles from "./Join.module.css";

export default function Join() {
  const { isAuth } = useAuth();

  const handleClick = () => {
    if (isAuth) {
      window.location.href = ROUTES.AUTH.PROFILE;
    } else {
      window.location.href = ROUTES.AUTH.REGISTER;
    }
  };

  return (
    <section className={styles.join} id="join">
      <div className={styles.overlay}>
        <div className={styles.container}>
          <h2 className={styles.title}>Приєднуйтесь до нашої спільноти</h2>
          <p className={styles.text}>
            Станьте частиною всесвітньої спільноти мандрівників. Діліться своїми
            історіями, надихайте інших і відкривайте для себе світ очима тих,
            хто вже його пізнав.
          </p>
          <button className={styles.button} onClick={handleClick}>
            {isAuth ? "Збережені" : "Зареєструватися"}
          </button>
        </div>
      </div>
    </section>
  );
}
