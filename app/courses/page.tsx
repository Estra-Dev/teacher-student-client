"use client";

import { useCourses } from "@/hooks/useCourses";
import { useUserProfile } from "@/hooks/useUser";
import Link from "next/link";

export default function CoursesPage() {
  const { courses, enrollCourse, loading } = useCourses();
  const { user, loading: userLoading } = useUserProfile();

  if (loading || userLoading) return <p className="p-6">Loading...</p>;

  const isTeacher = user?.role === "teacher";

  return (
    <div className="max-w-6xl mx-auto p-6 mt-32 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Courses</h1>
        {isTeacher && (
          <Link
            href="/courses/create"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            + Create Course
          </Link>
        )}
      </div>

      {courses.length === 0 ? (
        <p>No courses available yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div
              key={course._id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold">{course.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{course.description}</p>
              <div className="mt-3 flex justify-between items-center">
                <Link
                  href={`/courses/${course._id}`}
                  className="text-blue-600 hover:underline"
                >
                  View Details
                </Link>

                {!isTeacher && (
                  <button
                    onClick={() => enrollCourse(course._id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Enroll
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
