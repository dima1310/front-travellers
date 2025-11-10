export interface Category {
    _id: string;
    name: string;
}

export interface Author {
    _id: string;
    name: string;
    avatar?: string;
}

export interface Article {
    _id: string;
    img: string;
    title: string;
    article: string;
    category: Category;
    ownerId: Author;
    date: string;
    favoriteCount: number;
    isFavorite?: boolean;
}

export interface StoriesResponse {
    total: number;
    page: number;
    limit: number;
    articles: Article[];
}