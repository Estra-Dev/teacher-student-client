"use client";

import { useParams } from "next/navigation";
import { useSubmissions } from "@/hooks/useSubmissions";
import { useState, useEffect } from "react";

export default function SubmitAssignmentPage() {
  const { id } = useParams(); // assignmentId
  const { submissions, createSubmission, loadSubmissions } = useSubmissions(id as string);
  const [content, setContent] = useState("");
  const [studentName, setStudentName] = useState("Student");

  useEffect(() => {
    if (id) loadSubmissions();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createSubmission(content, studentName);
    setContent("");
  };

  return (
    <div className="max-w-lg mx-auto p-6 mt-32">
      <h1 className="text-2xl font-semibold mb-4">Submit Assignment</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          placeholder="Write your answer or paste a link"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Previous Submissions</h2>
        {submissions.map((s) => (
          <div key={s._id} className="border p-3 rounded mb-2">
            <p>{s.content}</p>
            {s.grade ? (
              <p className="text-sm text-gray-600">
                Grade: <b>{s.grade}</b> | Feedback: {s.feedback || "None"}
              </p>
            ) : (
              <p className="text-sm text-yellow-600">Pending review</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
