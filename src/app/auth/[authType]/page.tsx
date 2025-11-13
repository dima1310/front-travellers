import Link from "next/link";

import LoginForm from "@/components/forms/LoginForm/LoginForm";
import RegistrationForm from "@/components/forms/RegistrationForm/RegistrationForm";
import styles from "./AuthPage.module.css";

type AuthPageParams = {
  authType: string;
};

type AuthPageProps = {
  // В Next сейчас params приходит как Promise
  params: Promise<AuthPageParams>;
};

export default async function AuthPage({ params }: AuthPageProps) {
  // обязательно await
  const { authType } = await params;

  const current =
    authType === "login" || authType === "register" ? authType : "login";

  return (
    <main className={styles.authBgc}>
      <section className={styles.wrapper}>
        <div className={styles.content}>
          <ul className={styles.nav}>
            <li>
              <Link
                href="/auth/register"
                className={`${styles.tab} ${
                  current === "register" ? styles.active : ""
                }`}
              >
                Реєстрація
              </Link>
            </li>
            <li>
              <Link
                href="/auth/login"
                className={`${styles.tab} ${
                  current === "login" ? styles.active : ""
                }`}
              >
                Вхід
              </Link>
            </li>
          </ul>

          {current === "register" ? <RegistrationForm /> : <LoginForm />}

          <div className={styles.copy}>
            <p>© 2025 Подорожники. Усі права захищені.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
