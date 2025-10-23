"use client";

import { useApi } from "@/lib/api";
import { useState } from "react";

type Assignment = {
  _id: string;
  course: string;
  title: string;
  description?: string;
  dueDate?: string;
  // add other fields returned by the API as needed
};

export const useAssignments = () => {
  const api = useApi();
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const loadAssignments = async (courseId: string) => {
    const { data } = await api.get(`/assignments/${courseId}`);
    setAssignments(data);
  };

  const createAssignment = async (courseId: string, title: string, description: string, dueDate: string) => {
    const { data } = await api.post("/assignments", { courseId, title, description, dueDate });
    setAssignments((prev) => [...prev, data]);
  };

  return { assignments, loadAssignments, createAssignment };
};
