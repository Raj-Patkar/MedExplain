export interface User {
  id: string;
  email: string;
  name: string;
  role: "patient" | "doctor" | "admin";
  avatar?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "patient" | "doctor";
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}