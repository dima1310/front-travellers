// src/constants/authFormConfig.ts
export const loginFields = [
  {
    name: "email",
    label: "Пошта",
    type: "email",
    placeholder: "hello@podorozhnyky.ua",
    required: true,
    autoComplete: "email",
  },
  {
    name: "password",
    label: "Пароль",
    type: "password",
    placeholder: "********",
    required: true,
    autoComplete: "current-password",
  },
];

export const registerFields = [
  {
    name: "name",
    label: "Імʼя та Прізвище",
    type: "text",
    placeholder: "Ваше імʼя та прізвище",
    required: true,
    autoComplete: "name",
  },
  ...loginFields,
  {
    name: "confirmPassword",
    label: "Підтвердження пароля",
    type: "password",
    placeholder: "********",
    required: true,
    autoComplete: "new-password",
  },
];

export const loginInitialValues = {
  email: "",
  password: "",
};

export const registerInitialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
