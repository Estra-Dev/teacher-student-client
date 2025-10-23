"use client";

import Image from "next/image";
import React, {useState} from "react";
import { useUser, SignedIn, SignedOut, UserButton, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { BookDashed, GraduationCap, Home, Pen, Menu, X, LayoutDashboard, BookAIcon, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { useUserProfile } from "@/hooks/useUser";

const Nav = () => {
  const { user, loading } = useUserProfile();
  const { signOut } = useClerk();
  const [open, setOpen] = useState(false);
  // const { user } = useUser();
  console.log("user", user);

  const role = user?.role || "student"; // Default to 'student' if role is undefined

  const teacherLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard/teacher", label: "Dashboard", icon: LayoutDashboard },
    { href: "/courses/create", label: "Create Course", icon: Pen },
    { href: "/courses", label: "Courses", icon: BookDashed },
    // { href: "/discussions", label: "Discussions", icon: MessageCircle },
  ];

  const studentLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard/student", label: "Dashboard", icon: LayoutDashboard },
    { href: "/courses", label: "Courses", icon: BookDashed },
    // { href: "/assignment", label: "Assignments", icon: Pen },
    // { href: "/discussions", label: "Discussions", icon: MessageCircle },
  ];

  const links = role === "teacher" ? teacherLinks : studentLinks;
  
  const pathName = usePathname();

  return (
    <nav className="w-full bg-transparent backdrop-blur-md border-b border-gray-200 shadow-sm fixed top-0 left-0 z-50 ">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600 flex items-center flex-col">
          <Image
            src="/prin.png"
            alt="PrinceLearner Logo"
            width={60}
            height={60}
            className="inline-block mr-2"
          />
          PrinceLearner
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {loading ? (
            <p>Loading...</p>
          ) : (
            links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-gray-700 text-lg px-2 py-1.5 rounded-lg hover:text-blue-600 transition ${pathName === link.href ? 'font-semibold text-white bg-blue-500' : ''}`}
              >{link.icon && <link.icon className="inline mr-1 mb-1" size={16} />}
                {link.label}
              </Link>
            ))
          )}
        </div>

        {/* User Section */}
        <SignedOut>
          <Link
            href={"/sign-in"}
            className=" font-medium text-white hover:bg-blue-500/70 text-xs bg-blue-500 p-1.5 rounded-md"
          >
            Sign In
          </Link>
        </SignedOut>
        <SignedIn>
          <div className=" hidden md:flex items-center gap-4">
            <UserButton/>
          </div>
        </SignedIn>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-gray-700 hover:text-blue-600"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex md:hidden items-center gap-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
