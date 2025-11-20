"use client";

import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

import { api } from "@/services/api/axiosConfig";
import AuthForm from "../AuthForm/AuthForm";
import styles from "./LoginForm.module.css";

import { useAuthStore } from "@/store/useAuthStore";

import {
  loginFields,
  loginInitialValues,
} from "@/utils/constants/authFormConfig";
import {
  showErrorToast,
  showSuccessToast,
} from "@/components/ui/Toast/toastHelpers";
import { LoginSchema } from "@/utils/validation/authSchemas";
import { translateAuthError } from "@/utils/helpers/translateAuthError";
import type { User } from "@/types/auth.types";

type LoginResponse = {
  status: number;
  message: string;
  data: {
    accessToken: string;
  };
};

type LoginFormValues = typeof loginInitialValues;

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

export default function LoginForm() {
  const router = useRouter();

  const login = useAuthStore((state) => state.login);
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogin = async (values: LoginFormValues) => {
    try {
      // 1) логинимся, получаем accessToken
      const { data } = await api.post<LoginResponse>("/auth/login", values);

      console.log("LOGIN /auth/login response:", data);

      const token = data.data.accessToken;

      // 2) кладём токен в zustand
      login(token);

      // 3) забираем текущего юзера по токену
      const meRes = await api.get<CurrentUserResponse>("/users/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("CURRENT USER response:", meRes.data);

      // 👈 вытаскиваем именно объект юзера
      setUser(meRes.data.data);

      console.log("AUTH STORE AFTER login():", useAuthStore.getState());

      showSuccessToast("Логін успішний");
      router.push("/");
    } catch (error: unknown) {
      console.log("LOGIN ERROR:", error);

      let msg = "Помилка логіна";

      if (error instanceof AxiosError) {
        const data = error.response?.data as ApiErrorShape | undefined;
        const rawMessage = data?.message || data?.data?.message;
        msg = translateAuthError(rawMessage);
      }

      showErrorToast(msg);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Вхід</h1>
      <p className={styles.subtitle}>Вітаємо знову у спільноті мандрівників!</p>

      <AuthForm<LoginFormValues>
        isLogin
        fields={loginFields}
        initialValues={loginInitialValues}
        validationSchema={LoginSchema}
        submitText="Увійти"
        onSubmitAction={async (vals, actions) => {
          await handleLogin(vals);
          actions.setSubmitting(false);
        }}
      />
    </div>
  );
}
