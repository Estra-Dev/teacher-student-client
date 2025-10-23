"use client";

import { useParams } from "next/navigation";
import { useSubmissions } from "@/hooks/useSubmissions";
import { useState, useEffect } from "react";

export default function GradeSubmissionsPage() {
  const { id } = useParams(); // assignmentId
  const { submissions, loadSubmissions, gradeSubmission } = useSubmissions(id as string);
  const [grade, setGrade] = useState<number>();
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (id) loadSubmissions();
  }, [id]);

  const handleGrade = async (submissionId: string) => {
    await gradeSubmission(submissionId, grade!, feedback);
    setGrade(undefined);
    setFeedback("");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-32">
      <h1 className="text-2xl font-semibold mb-4">Grade Submissions</h1>
      {submissions.map((s) => (
        <div key={s._id} className="border p-4 mb-4 rounded">
          <p className="mb-2"><b>Student:</b> {s.studentName}</p>
          <p className="mb-2">{s.content}</p>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              placeholder="Grade"
              value={grade || ""}
              onChange={(e) => setGrade(Number(e.target.value))}
              className="border p-2 w-24 rounded"
            />
            <input
              type="text"
              placeholder="Feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="border p-2 flex-1 rounded"
            />
            <button
              onClick={() => handleGrade(s._id)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Submit Grade
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
