"use client";

import { Card } from "@/components/ui/card";
import { useUserProfile } from "@/hooks/useUser";
import Link from "next/link";


export default function Home() {

  const { user } = useUserProfile();

  const role = user?.role;
  console.log("role", role)
  return (
    <div className=" mt-30 min-h-screen p-4">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20 md:py-32">
        <div className=" w-[80%] mx-auto sm:px-6 lg:px-8 px-[5%]">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 w-full">
              <h1 className="text-4xl md:text-5xl font-bold text-balance leading-tight">
                Connect, Teach, and Learn Together
              </h1>
              <p className="text-lg text-muted-foreground text-balance">
                PrinceLearner is a modern platform designed to bridge the gap between teachers and students. Create engaging
                lessons, track progress, and build meaningful educational experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href={` ${ role === "student" ? "/become_teacher" : "/dashboard/teacher" }`}
                  className="bg-blue-500 hover:bg-blue-500/90 text-primary-foreground px-4 py-2 rounded text-center"
                >
                  Start Teaching
                </Link>
                <Link href={role === "teacher" ? "/become_student" : "/dashboard/student"} className=" hover:bg-gray-100/80 text-foreground shadow-2xl px-4 py-2 rounded text-center">
                Start Learning
                </Link>
              </div>
            </div>
            <div className="hidden md:block bg-blue-100">
              <div className="relative w-full aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center">
                <div className="text-[16rem]">📚</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-card">
        <div className="w-[80%] mx-auto px-[5%] sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose PrinceLearner?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need for effective online education in one beautiful platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "✨",
                title: "Easy to Use",
                description: "Intuitive interface designed for both teachers and students",
              },
              {
                icon: "📊",
                title: "Track Progress",
                description: "Monitor student performance with detailed analytics and insights",
              },
              {
                icon: "🎯",
                title: "Engaging Content",
                description: "Create interactive lessons that keep students motivated",
              },
              {
                icon: "💬",
                title: "Real-time Feedback",
                description: "Instant communication between teachers and students",
              },
              {
                icon: "🔒",
                title: "Secure & Private",
                description: "Your data is protected with enterprise-grade security",
              },
              {
                icon: "🚀",
                title: "Always Available",
                description: "Access your courses anytime, anywhere, on any device",
              },
            ].map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of educators and students already using EduHub to transform education
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={` ${ role === "student" ? "/become_teacher" : "/dashboard/teacher" }`}
              className="bg-blue-500 px-2 py-1.5 rounded-sm hover:bg-blue-500/90 text-primary-foreground"
            >
              Start Teaching
            </Link>
            <Link 
              href={role === "teacher" ? "/become_student" : "/dashboard/student"}
              className="bg-gray-100 px-2 py-1.5 rounded-sm hover:bg-gray-100/90 text-gray-800 border"
            >
              Start Learning
            </Link>
          </div>
        </div> 
      </section>
    </div>
  );
}
