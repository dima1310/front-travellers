import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email("Невірний email").required("Обов’язково"),
  password: Yup.string().min(6, "Мінімум 6 символів").required("Обов’язково"),
});

export const registerSchema = Yup.object({
  name: Yup.string().min(2, "Закоротке ім’я").required("Обов’язково"),
  email: Yup.string().email("Невірний email").required("Обов’язково"),
  password: Yup.string().min(6, "Мінімум 6 символів").required("Обов’язково"),
});
