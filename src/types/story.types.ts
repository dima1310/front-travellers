export type StoryOwner = {
  _id: string;
  name: string;
  avatar?: string;
  bio?: string;
};

export type StoryCategory = {
  _id: string;
  name: string;
};

export type Story = {
  _id: string;
  img: string; // бек всегда отдает uri картинки
  title: string;
  description: string;
  date: string; // ISO-строка с датой
  favoriteCount: number;
  category: StoryCategory;
  owner: StoryOwner;
};

// Ответ пагинации от бека: поле data = массив историй + мета
export type StoriesApiPage = {
  data: Story[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

// Удобный формат для UI
export type StoriesResponse = {
  items: Story[];
  page: number;
  limit: number; // = perPage
  total: number;
  totalPages: number;
  hasNextPage: boolean;
};

// Ответ create / update / getById — те же поля, что у Story
export interface CreatedStoryResponse {
  status: number;
  message: string;
  data: Story;
}
