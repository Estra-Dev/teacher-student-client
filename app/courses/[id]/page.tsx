"use client";

import { useParams } from "next/navigation";
import { useAssignments } from "@/hooks/useAssignment";
import { useDiscussions } from "@/hooks/useDiscussion";
import { useSubmissions } from "@/hooks/useSubmissions";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUserProfile } from "@/hooks/useUser";

export default function CourseDetailPage() {
  const { id } = useParams(); // courseId
  const { assignments, loadAssignments } = useAssignments();
  const { messages, sendMessage, loading: msgLoading } = useDiscussions(id as string);
  const [currentAssignment, setCurrentAssignment] = useState<string | null>(null);
  const { submissions, loadSubmissions, createSubmission } = useSubmissions(currentAssignment || "");
  const [newMsg, setNewMsg] = useState("");
  const [submissionContent, setSubmissionContent] = useState("");
  const [userName, setUserName] = useState("Student"); // from Clerk in real app
  const { user, loading: userLoading } = useUserProfile();
  

  const isTeacher = user?.role === "teacher";

  useEffect(() => {
    if (id) loadAssignments(id as string);
  }, [id]);

  useEffect(() => {
    if (currentAssignment) loadSubmissions();
  }, [currentAssignment]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    await sendMessage(newMsg, userName);
    setNewMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createSubmission(submissionContent, userName);
    setSubmissionContent("");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 mt-32 min-h-screen">
      <h1 className="text-3xl font-semibold">Course Discussions & Assignments</h1>

      {/* Assignments */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Assignments</h2>
        {
          isTeacher && (
            <div className=" flex justify-end items-center my-2.5">
              <Link href="/assignment/create" className=" px-2 py-1.5 text-white bg-blue-500 rounded-sm">Create New Assignment</Link>
            </div>
          )
        }
        {assignments.length === 0 && <p>No assignments yet.</p>}
        {assignments.map((a) => (
          <div
            key={a._id}
            onClick={() => setCurrentAssignment(a._id)}
            className={`border p-3 rounded cursor-pointer flex justify-between items-end ${
              currentAssignment === a._id ? "bg-blue-100" : "bg-white"
            }`}
          >
            <div className="">
              <h3 className="font-medium">{a.title}</h3>
              <p>{a.description}</p>
              <p className="text-sm text-gray-500">Due: {a.dueDate}</p>
            </div>
            {!isTeacher && (
              <Link
                href={`/assignment/${a._id}`}
                className="mt-2 inline-block bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
              >
                View
              </Link>
            )}
          </div>
        ))}
        
      </section>

      {/* Submission */}
      {currentAssignment && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Submit Work</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <textarea
              placeholder="Paste your answer or upload link..."
              value={submissionContent}
              onChange={(e) => setSubmissionContent(e.target.value)}
              className="border p-2 w-full rounded"
            />
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
              Submit
            </button>
          </form>

          <h3 className="font-medium mt-4">Previous Submissions</h3>
          {submissions.map((s) => (
            <div key={s._id} className="border p-3 mt-2 rounded">
              <p>{s.content}</p>
              <p>{s.studentName}</p>
              <div className=" flex justify-end">
                <Link href={`/assignment/${s.assignmentId}/grade`} className=" bg-green-500 text-white px-2 py-1.5 rounded-sm">Score</Link>
              </div>
              {s.grade && (
                <p className="text-sm text-gray-600">
                  Grade: <b>{s.grade}</b> | Feedback: {s.feedback || "None"}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Discussions */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Discussions</h2>
        <div className="border rounded p-3 h-64 overflow-y-auto bg-gray-50">
          {msgLoading ? (
            <p>Loading messages...</p>
          ) : (
            messages.map((m) => (
              <div key={m._id} className="mb-3">
                <p className="font-medium">{m.userName}</p>
                <p>{m.message}</p>
                <p className="text-xs text-gray-500">{new Date(m.createdAt).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>
        <form onSubmit={handleSend} className="flex mt-3 gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            className="border p-2 rounded flex-1"
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded">Send</button>
        </form>
      </section>
    </div>
  );
}
