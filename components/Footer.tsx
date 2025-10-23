"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative mt-4 w-full backdrop-blur-md bg-white/10 border-t border-white/20"
    >
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        <div>
          <h2 className="text-2xl font-semibold text-blue-700">PrinceLearner</h2>
          <p className="text-sm text-gray-600">
            Empowering teachers and students through technology 🌍
          </p>
        </div>

        <div className="flex gap-4 mt-4 md:mt-0">
          
          <Link href="https://www.linkedin.com/in/dominion-ikonwa-54348a207/" target="_blank" className="hover:text-blue-600">
            <Linkedin size={22} />
          </Link>
          <Link href="mailto:dominikolyson@gmail.com" className="hover:text-blue-600">
            <Mail size={22} />
          </Link>
        </div>

        <div className="mt-4 md:mt-0 text-gray-600">
          <p className="text-sm">
            ⚡ Built with ❤️ by <span className="font-semibold">Dev King 👑</span>
          </p>
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} PrinceLearner
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
