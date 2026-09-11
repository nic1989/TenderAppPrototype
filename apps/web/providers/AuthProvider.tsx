"use client";

import { useEffect, useState } from "react";

import { cookie } from "@/lib/cookie";
import { useAuthStore } from "@/store/auth.store";
import { useProfile } from "@/features/auth/hooks/useProfile";
import { LoadingScreen } from "@/features/auth/components/loading-screen";

interface Props {
  children: React.ReactNode;
}

export function AuthProvider({ children }: Props) {
  const setUser = useAuthStore((s) => s.setUser);
  const logout = useAuthStore((s) => s.logout);
  const [hasToken, setHasToken] = useState<boolean | null>(null);

  useEffect(() => {
    setHasToken(cookie.hasToken());
  }, []);

  const profileQuery = useProfile(hasToken === true);

  useEffect(() => {
    if (hasToken === false) {
      logout();
    }
    if (profileQuery.isSuccess) {
      setUser(profileQuery.data);
    }

    if (profileQuery.isError) {
      logout();
    }
  }, [
    hasToken,
    profileQuery.isSuccess,
    profileQuery.isError,
    profileQuery.data,
    setUser,
    logout,
  ]);

  if (hasToken === null) {
    return <LoadingScreen />;
  }

  if (hasToken && profileQuery.isPending) {
    return <LoadingScreen />;
  }

  return children;
}