export interface Story {
  id: string;
  title: string;
  content: string;
  country: string;
  authorId: string;
  coverUrl?: string;
  createdAt: string;
}

export interface StoriesResponse {
  items: Story[];
  nextPage?: number;
  total: number;
}
