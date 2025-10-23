"use client";

import { useUserProfile } from "@/hooks/useUser";
import { useRouter, redirect } from "next/navigation";

export default function Dashboard() {
  const { user, loading } = useUserProfile();
  const router = useRouter();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return <p>No user found. Please log in again.</p>;
  }

  // Redirect based on role
  if (user.role === "teacher") redirect("/dashboard/teacher");
  else redirect("/dashboard/student");

  return <p>Redirecting...</p>;
}
