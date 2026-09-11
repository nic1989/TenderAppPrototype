import Cookies from "js-cookie";
import { AUTH } from "@/constants/auth";

const COOKIE_OPTIONS = {
  expires: 1, // 1 day
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};

export const cookie = {
  getToken: () => Cookies.get(AUTH.ACCESS_TOKEN),
  setToken: (token: string) => 
    Cookies.set(
      AUTH.ACCESS_TOKEN,
      token,
      COOKIE_OPTIONS,
    ),
  removeToken: () => Cookies.remove(AUTH.ACCESS_TOKEN),
  hasToken: () => !!Cookies.get(AUTH.ACCESS_TOKEN)
};