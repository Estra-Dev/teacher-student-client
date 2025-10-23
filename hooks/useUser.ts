"use client";

import { useApi } from "@/lib/api";
import { useState, useEffect } from "react";

type User = Record<string, unknown> | null;

export const useUserProfile = () => {
  const api = useApi();
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/users/profile");
        setUser(data as Record<string, unknown>);
      } catch (err) {
        console.error("Error fetching user profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return { user, loading };
};
