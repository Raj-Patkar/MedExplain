"use client";

import { useEffect, useState } from "react";

interface CurrentUser {
  userId: string;
  name?: string;
  email: string;
}

interface UseCurrentUserState {
  user: CurrentUser | null;
  isLoading: boolean;
}

/**
 * Attempts to load the current user from /api/auth/me.
 * If the endpoint doesn't exist or fails, falls back to `user: null`
 * so the UI can render a generic greeting instead of breaking.
 */
export function useCurrentUser() {
  const [state, setState] = useState<UseCurrentUserState>({
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to load user");
        const data = await res.json();
        if (!cancelled) {
          setState({
            user: { userId: data.userId, name: data.name, email: data.email },
            isLoading: false,
          });
        }
      } catch {
        if (!cancelled) setState({ user: null, isLoading: false });
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}