"use client";

import { useState, useEffect } from "react";
import { useApi } from "@/lib/api";
import { useCourses } from "@/hooks/useCourses";
import { useRouter } from "next/navigation";

export default function CreateAssignmentPage() {
  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { courses, loading } = useCourses();
  const api = useApi();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/assignments", { courseId, title, description, dueDate });
    router.push("/assignment/" + courseId);
  };

  return (
    <div className="max-w-lg mx-auto p-6 mt-32">
      <h1 className="text-2xl font-semibold mb-4">Set Assignment</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <select
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="border p-2 rounded w-full"
          required
        >
          <option value="">Select Course</option>
          {!loading &&
            courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
        </select>

        <input
          type="text"
          placeholder="Assignment Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create
        </button>
      </form>
    </div>
  );
}
