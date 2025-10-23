"use client";

import { useApi } from "@/lib/api";
import { useState, useEffect } from "react";

type Course = {
  _id: string;
  title: string;
  description?: string;
  // add other fields returned by the API as needed
};
export const useCourses = () => {
  const api = useApi();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get("/courses");
        setCourses(data);
        console.log("courses", data)
      } catch (err) {
        console.error("Error loading courses", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const createCourse = async (title: string, description: string) => {
    const { data } = await api.post("/courses", { title, description });
    setCourses((prev) => [...prev, data]);
  };

  const enrollCourse = async (courseId: string) => {
    const res = await api.post(`/courses/${courseId}/enroll`);
    if (res.status === 200) {
      // Optionally, you can refresh the course list or update state here
      console.log("Enrolled successfully");
      alert("Enrolled successfully");
    }
  };

  return { courses, createCourse, enrollCourse, loading };
};
