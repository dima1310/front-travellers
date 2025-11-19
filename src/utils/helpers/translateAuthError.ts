const authErrorMap: Record<string, string> = {
  "User not found": "Користувача не знайдено",
  "Invalid credentials": "Невірна електронна адреса або пароль",
  "Wrong password": "Невірний пароль",
  "Email in use": "Ця електронна адреса вже використовується",
};

export function translateAuthError(message?: string): string {
  if (!message) {
    return "Сталася помилка. Спробуйте ще раз.";
  }

  return authErrorMap[message] || message;
}
