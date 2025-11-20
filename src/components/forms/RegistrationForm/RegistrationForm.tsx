"use client";

import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

import { api } from "@/services/api/axiosConfig";
import AuthForm from "../AuthForm/AuthForm";
import styles from "./RegistrationForm.module.css";
import {
  registerFields,
  registerInitialValues,
} from "@/utils/constants/authFormConfig";
import {
  showErrorToast,
  showSuccessToast,
} from "@/components/ui/Toast/toastHelpers";
import { RegistrationSchema } from "@/utils/validation/authSchemas";
import { translateAuthError } from "@/utils/helpers/translateAuthError";
import { useAuthStore } from "@/store/useAuthStore";
import type { User } from "@/types/auth.types";

type RegistrationFormValues = typeof registerInitialValues;

type ApiErrorShape = {
  message?: string;
  data?: {
    message?: string;
  };
};
type CurrentUserResponse = {
  status: number;
  message: string;
  data: User;
};

// такой же тип, как мы использовали в LoginForm
type LoginResponse = {
  status: number;
  message: string;
  data: {
    accessToken: string;
  };
};

export default function RegistrationForm() {
  const router = useRouter();

  // из стора берём login(token) и setUser(user)
  const loginToStore = useAuthStore((state) => state.login);
  const setUser = useAuthStore((state) => state.setUser);

  const handleRegister = async (values: RegistrationFormValues) => {
    const { name, email, password } = values;
    const payload = { name, email, password };

    try {
      // 1) регистрируем пользователя
      const res = await api.post("/auth/register", payload);

      if (res.status === 201 || res.status === 200) {
        showSuccessToast("Успішна реєстрація");

        try {
          // 2) сразу логинимся теми же email + password
          const loginRes = await api.post<LoginResponse>("/auth/login", {
            email,
            password,
          });

          console.log("REGISTER -> LOGIN response:", loginRes.data);

          if (loginRes.status === 200 || loginRes.status === 201) {
            const token = loginRes.data.data.accessToken;

            // 3) кладём токен в zustand
            loginToStore(token);

            const meRes = await api.get<CurrentUserResponse>("/users/current", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            console.log("REGISTER -> CURRENT USER:", meRes.data);

            setUser(meRes.data.data);

            console.log(
              "AUTH STORE AFTER auto register+login:",
              useAuthStore.getState()
            );

            showSuccessToast("Ви успішно увійшли");
            router.push("/");
          } else {
            // логин не прошёл, но регистрация ок
            showErrorToast(
              "Реєстрація пройшла успішно, але автоматичний вхід не вдався. Спробуйте увійти вручну."
            );
            router.push("/auth/login");
          }
        } catch (loginError: unknown) {
          let loginMsg =
            "Реєстрація пройшла успішно, але автоматичний вхід не вдався.";

          if (loginError instanceof AxiosError) {
            const data = loginError.response?.data as ApiErrorShape | undefined;
            const rawMessage = data?.message || data?.data?.message;
            loginMsg = translateAuthError(rawMessage) || loginMsg;
          }

          showErrorToast(loginMsg);
          router.push("/auth/login");
        }
      } else {
        showErrorToast("Помилка реєстрації");
      }
    } catch (error: unknown) {
      let msg = "Помилка реєстрації";

      if (error instanceof AxiosError) {
        const data = error.response?.data as ApiErrorShape | undefined;
        const rawMessage = data?.message || data?.data?.message;
        msg = translateAuthError(rawMessage) || msg;
      }

      showErrorToast(msg);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Реєстрація</h1>
      <p className={styles.subtitle}>
        Радий вас бачити у спільноті мандрівників!
      </p>

      <AuthForm<RegistrationFormValues>
        isLogin={false}
        fields={registerFields}
        initialValues={registerInitialValues}
        validationSchema={RegistrationSchema}
        submitText="Зареєструватися"
        onSubmitAction={async (vals, actions) => {
          await handleRegister(vals);
          actions.setSubmitting(false);
        }}
      />
    </div>
  );
}
