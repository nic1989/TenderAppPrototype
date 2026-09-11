import axios from "axios";
import { cookie } from "./cookie";
import { toast } from "sonner";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  }
});

api.interceptors.request.use(
  (config) => {
    const token = cookie.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      cookie.removeToken();

      window.location.href = "/login";
    }

    if (error.response?.status === 400 || error.response?.status === 404) {
      toast.error(error?.response?.data?.message ?? "Something went wrong.");
    }

    return Promise.reject(error);
  }
);
