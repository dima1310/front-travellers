export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
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
