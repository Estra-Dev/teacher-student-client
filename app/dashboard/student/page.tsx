"use client";

import { useCourses } from "@/hooks/useCourses";

export default function StudentDashboard() {
  const { courses, enrollCourse, loading } = useCourses();

  return (
    <div className="max-w-4xl mx-auto p-6 mt-32 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Student Dashboard</h1>

      {loading ? (
        <p>Loading courses...</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {courses.map((course) => (
            <div key={course._id} className="border p-4 rounded shadow-sm">
              <h2 className="text-lg font-semibold">{course.title}</h2>
              <p className="text-sm text-gray-600">{course.description}</p>

              <button
                onClick={() => enrollCourse(course._id)}
                className="mt-3 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
              >
                Enroll
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
