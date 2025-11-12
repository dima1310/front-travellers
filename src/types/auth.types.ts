export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
}

export interface AuthResponse {
  status: number;
  message: string;
  data: {
    accessToken: string;
    user: User;
  };
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuth: boolean;
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
}
