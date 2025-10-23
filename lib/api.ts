"use client";

import axios from "axios";
import { useAuth } from "@clerk/nextjs";

export const useApi = () => {
  const { getToken } = useAuth();

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  });

  // Intercept and add Clerk token before requests
  api.interceptors.request.use(async (config) => {
    const token = await getToken({ template: "integrated_fallback" });
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return api;
};
