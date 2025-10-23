"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AnimatedLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="flex flex-col items-center"
      >
        {/* Logo */}
        <Image
          src="/prin.png"
          alt="PrinceLearner"
          width={120}
          height={120}
          className="drop-shadow-lg"
        />

        {/* Glow effect */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-32 h-32 rounded-full bg-blue-500/20 absolute"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-6 text-blue-600 font-semibold text-lg tracking-wide"
        >
          PrinceLearner
        </motion.p>
      </motion.div>
    </div>
  );
}
