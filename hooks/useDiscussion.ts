"use client";
import { useApi } from "@/lib/api";
import { useState, useEffect } from "react";

type DiscussionMessage = {
  _id: string;
  courseId: string;
  userId: string;
  userName: string;
  message: string;
  createdAt: string;
  updatedAt: string;
};

export const useDiscussions = (courseId: string) => {
  const api = useApi();
  const [messages, setMessages] = useState<DiscussionMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId) return;
    const load = async () => {
      const { data } = await api.get(`/discussions/${courseId}`);
      setMessages(data);
      setLoading(false);
    };
    load();
  }, [courseId]);

  const sendMessage = async (message: string, userName: string) => {
    const { data } = await api.post("/discussions", { courseId, message, userName });
    setMessages((prev) => [...prev, data]);
  };

  return { messages, sendMessage, loading };
};
