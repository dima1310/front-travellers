export interface Story {
<<<<<<< HEAD
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
=======
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  author?: string;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
>>>>>>> c1229d73f2663a248e9cd211698e935a2ae321ce
}
