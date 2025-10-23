"use client";

import { useCourses } from "@/hooks/useCourses";
import Link from "next/link";
import { useState } from "react";

export default function TeacherDashboard() {
  const { courses, createCourse, loading } = useCourses();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createCourse(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-32">
      <h1 className="text-2xl font-semibold mb-4">Teacher Dashboard</h1>

      {loading ? (
        <p>Loading courses...</p>
      ) : (
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course._id} className="border p-4 rounded shadow-sm">
              <h2 className="text-lg font-semibold">{course.title}</h2>
              <p>{course.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
