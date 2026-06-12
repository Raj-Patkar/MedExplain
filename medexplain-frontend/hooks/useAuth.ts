"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { AuthState, LoginCredentials, RegisterCredentials } from "@/types/auth";
import { ROUTES } from "@/lib/constants";

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

export function useAuth() {
  const [state, setState] = useState<AuthState>(initialState);
  const router = useRouter();

  useEffect(() => {
    const user = authService.getStoredUser();
    const token = authService.getToken();
    setState({
      user,
      token,
      isAuthenticated: !!token,
      isLoading: false,
    });
  }, []);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setState((s) => ({ ...s, isLoading: true }));
      try {
        const { user, token } = await authService.login(credentials);
        setState({ user, token, isAuthenticated: true, isLoading: false });
        router.push(ROUTES.DASHBOARD);
      } catch (error) {
        setState((s) => ({ ...s, isLoading: false }));
        throw error;
      }
    },
    [router]
  );

  const register = useCallback(
    async (credentials: RegisterCredentials) => {
      setState((s) => ({ ...s, isLoading: true }));
      try {
        const { user, token } = await authService.register(credentials);
        setState({ user, token, isAuthenticated: true, isLoading: false });
        router.push(ROUTES.DASHBOARD);
      } catch (error) {
        setState((s) => ({ ...s, isLoading: false }));
        throw error;
      }
    },
    [router]
  );

  const logout = useCallback(() => {
    authService.logout();
    setState({ user: null, token: null, isAuthenticated: false, isLoading: false });
    router.push(ROUTES.LOGIN);
  }, [router]);

  return { ...state, login, register, logout };
}