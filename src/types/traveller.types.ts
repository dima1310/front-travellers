// Тип для публичного профиля путешественника
export type Traveller = {
  _id: string;
  name: string;
  avatar?: string;
  bio?: string;
  socialLinks?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
};
