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

type RegistrationFormValues = typeof registerInitialValues;

type ApiErrorShape = {
  message?: string;
  data?: {
    message?: string;
  };
};

export default function RegistrationForm() {
  const router = useRouter();

  const handleRegister = async (values: RegistrationFormValues) => {
    const { name, email, password } = values;
    const payload = { name, email, password };

    try {
      const res = await api.post("/auth/register", payload);

      if (res.status === 201 || res.status === 200) {
        showSuccessToast("Успішна реєстрація");
        router.push("/");
      } else {
        showErrorToast("Помилка реєстрації");
      }
    } catch (error: unknown) {
      let msg = "Помилка реєстрації";

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
