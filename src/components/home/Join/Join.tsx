"use client";

import { ROUTES } from "@/utils/constants/routes";
import { useAuthStore } from "@/store/useAuthStore";
import styles from "./Join.module.css";

export default function Join() {
  const isAuth = useAuthStore((s) => s.isAuthenticated);

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
