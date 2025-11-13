// Тип одной истории — совпадает с бэком
export type Story = {
  _id: string;
  title: string;
  description: string;   // было content
  img?: string;          // было coverUrl
  owner?: {
    name: string;
    avatar?: string;     // было avatarUrl
  };
  date: string;          // было createdAt
  favoriteCount: number; // было bookmarks
};

// ⚠️ Бэк отдает обёртку с полем data, внутри — страница
// status/message опускаем на уровне API-клиента.
export type StoriesApiPage = {
  data: Story[];        // список историй
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

// Удобная форма для UI (если уже используешь items/limit):
export type StoriesResponse = {
  items: Story[];
  page: number;
  limit: number;        // = perPage
  total: number;
  totalPages: number;
  hasNextPage: boolean;
};
