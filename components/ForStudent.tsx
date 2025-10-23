"use client";

import { useApi } from '@/lib/api';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const ForStudent = () => {

  const [bio, setBio] = useState("");
    const [subject, setSubject] = useState("");
    const api = useApi();
    const router = useRouter();
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await api.put("/users/update-role", {
          role: "student",
          bio,
          subject,
        });
        router.push("/dashboard/student");
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className="max-w-lg mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-6">Join Us as Student</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        
      <label className="block mb-1 text-sm font-medium">Short Bio</label>
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Tell us about yourself..."
        className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
        rows={3}
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

export default ForStudent
