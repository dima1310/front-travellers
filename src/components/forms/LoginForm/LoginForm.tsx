"use client";

import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/useAuthStore";
import { login as apiLogin } from "@/services/api/authApi";
import styles from "./LoginForm.module.css";
import Link from "next/link";
import { LoginSchema } from "@/utils/validation/authSchemas";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuthStore();

  const handleSubmit = async (
    values: { email: string; password: string },
    { setSubmitting }: any
  ) => {
    try {
      // Сервер ставит HttpOnly cookies и возвращает user
      const res = await apiLogin({
        email: values.email,
        password: values.password,
      });

      // кладём пользователя в Zustand; токен нам не нужен, он в HttpOnly cookies
      login(res.data.user, "cookie");

      toast.success("Вітаємо! Ви увійшли.");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message || "Помилка входу");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Вхід</h1>
        <p className={styles.subtitle}>Увійдіть, щоб продовжити</p>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className={styles.form}>
              <div className={styles.fieldGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className={`${styles.input} ${
                    errors.email && touched.email ? styles.inputError : ""
                  }`}
                  placeholder="your.email@example.com"
                  autoComplete="email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="password" className={styles.label}>
                  Пароль
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className={`${styles.input} ${
                    errors.password && touched.password ? styles.inputError : ""
                  }`}
                  placeholder="Введіть пароль"
                  autoComplete="current-password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.error}
                />
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className={styles.spinner}
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        opacity="0.25"
                      />
                      <path
                        d="M12 2a10 10 0 0 1 10 10"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                    Входимо...
                  </>
                ) : (
                  "Увійти"
                )}
              </button>
            </Form>
          )}
        </Formik>

        <p className={styles.loginLink}>
          Немає акаунта?{" "}
          <Link href="/auth/register" className={styles.link}>
            Зареєструватися
          </Link>
        </p>
      </div>
    </div>
  );
}
