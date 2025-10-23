"use client";

import React, { useState } from 'react'
import { useApi } from '@/lib/api';
import { useRouter } from 'next/navigation';

const ForTeacher = () => {

  const [bio, setBio] = useState("");
  const [subject, setSubject] = useState("");
  const api = useApi();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put("/users/update-role", {
        role: "teacher",
        bio,
        subject,
      });
      router.push("/dashboard/teacher");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-6">Become a Teacher</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your subject area"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Short teaching bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Continue
        </button>
      </form>
    </div>
  )
}

export default ForTeacher
