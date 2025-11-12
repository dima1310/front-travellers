// Тип для истории (story)
export type Story = {
  _id: string;
  title: string;
  description: string;
  img?: string;             // URL картинки
  owner?: {
    name: string;
    avatar?: string;
  };
  date: string;             // ISO строка
  favoriteCount: number;    // количество добавлений в избранное
};
