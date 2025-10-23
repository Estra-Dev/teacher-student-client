"use client";
import { useApi } from "@/lib/api";
import { useState } from "react";

type Submission = {
  _id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  content: string;
  grade?: number;
  feedback?: string;
  submittedAt: string;
};

export const useSubmissions = (assignmentId: string) => {
  const api = useApi();
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  const loadSubmissions = async () => {
    const { data } = await api.get(`/submissions/${assignmentId}`);
    setSubmissions(data);
  };

  const createSubmission = async (content: string, studentName: string) => {
    const { data } = await api.post("/submissions", { assignmentId, content, studentName });
    setSubmissions((prev) => [...prev, data]);
  };

  const gradeSubmission = async (id: string, grade: number, feedback: string) => {
    const { data } = await api.put(`/submissions/${id}/grade`, { grade, feedback });
    setSubmissions((prev) =>
      prev.map((s) => (s._id === id ? data : s))
    );
  };

  return { submissions, loadSubmissions, createSubmission, gradeSubmission };
};
