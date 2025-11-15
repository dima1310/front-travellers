export interface User {
  _id: string; // Changed from id
  name: string;
  email: string;
  avatar?: string; // Changed from avatarUrl
  bio?: string;
  onboardingCompleted?: boolean;
  settings?: {
    darkMode?: boolean;
  };
  socialLinks?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  savedStories?: string[]; // Array of story IDs
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto extends LoginDto {
  name: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuth: boolean;
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
}
