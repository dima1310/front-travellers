"use client";

import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";
import styles from "./RegistrationForm.module.css";

const RegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Ім'я повинно містити мінімум 2 символи")
    .max(50, "Ім'я не може перевищувати 50 символів")
    .required("Обов'язкове поле"),
  email: Yup.string()
    .email("Невірний формат email")
    .required("Обов'язкове поле"),
  password: Yup.string()
    .min(8, "Пароль повинен містити мінімум 8 символів")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Пароль повинен містити великі та малі літери, цифри"
    )
    .required("Обов'язкове поле"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Паролі не співпадають")
    .required("Обов'язкове поле"),
});

export default function RegistrationForm() {
  const router = useRouter();
  const { login } = useAuthStore();

  const handleSubmit = async (
    values: {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    },
    { setSubmitting }: any
  ) => {
    try {
      // TODO: Replace with actual API call
      // const response = await axios.post('/api/auth/register', {
      //   name: values.name,
      //   email: values.email,
      //   password: values.password,
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock response
      const mockUser = {
        id: "1",
        name: values.name,
        email: values.email,
        avatar: "https://i.pravatar.cc/150?img=1",
      };
      const mockToken = "mock_token_123456789";

      login(mockUser, mockToken);
      toast.success("Реєстрація пройшла успішно!");
      router.push("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Помилка реєстрації");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Реєстрація</h1>
        <p className={styles.subtitle}>
          Створіть обліковий запис, щоб почати ділитися своїми історіями
        </p>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={RegistrationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className={styles.form}>
              <div className={styles.fieldGroup}>
                <label htmlFor="name" className={styles.label}>
                  Ім'я
                </label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className={`${styles.input} ${
                    errors.name && touched.name ? styles.inputError : ""
                  }`}
                  placeholder="Введіть ваше ім'я"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={styles.error}
                />
              </div>

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
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="confirmPassword" className={styles.label}>
                  Підтвердження паролю
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className={`${styles.input} ${
                    errors.confirmPassword && touched.confirmPassword
                      ? styles.inputError
                      : ""
                  }`}
                  placeholder="Підтвердіть пароль"
                />
                <ErrorMessage
                  name="confirmPassword"
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
                    Реєстрація...
                  </>
                ) : (
                  "Зареєструватися"
                )}
              </button>
            </Form>
          )}
        </Formik>

        <p className={styles.loginLink}>
          Вже маєте акаунт?{" "}
          <a href="/auth/login" className={styles.link}>
            Увійти
          </a>
        </p>
      </div>
    </div>
  );
}
