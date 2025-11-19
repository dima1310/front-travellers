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

type LoginFormValues = typeof loginInitialValues;

type ApiErrorShape = {
  message?: string;
  data?: {
    message?: string;
  };
};

export default function LoginForm() {
  const router = useRouter();

  const login = useAuthStore((state) => state.login);

  const handleLogin = async (values: LoginFormValues) => {
    try {
      const res = await api.post("/auth/login", values);

      if (res.status === 200 || res.status === 201) {
        login(res.data.user, res.data.token);

        showSuccessToast("Логін успішний");
        router.push("/");
      } else {
        showErrorToast("Помилка логіна");
      }
    } catch (error: unknown) {
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
