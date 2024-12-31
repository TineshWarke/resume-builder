'use client'
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col bg-base-300 text-neutral-content"
    >
      {/* Header Section */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="glass text-white py-4 shadow-lg"
      >
        <h1 className="text-5xl font-extrabold text-center tracking-wide">
          Resume Builder
        </h1>
      </motion.header>

      {/* Main Content */}
      <motion.main
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-1 flex-col items-center justify-center text-center px-6"
      >
        <motion.h2
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-4xl font-bold mb-6"
        >
          Welcome to <span className="text-primary-focus">Resume Builder</span>
        </motion.h2>
        <motion.p
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-lg mb-8 max-w-xl"
        >
          Craft your professional resume effortlessly. Powered by{" "}
          <span className="font-semibold text-primary-focus">Tinesh Warke</span>,
          this tool ensures you stand out in your career journey.
        </motion.p>
        <Link href="/builder">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary btn-lg shadow-xl"
          >
            Start Building
          </motion.button>
        </Link>
      </motion.main>

      {/* Decorative Animation */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 bg-primary opacity-40 rounded-full filter blur-3xl"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ repeat: Infinity, duration: 3 }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-32 h-32 bg-secondary opacity-30 rounded-full filter blur-3xl"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ repeat: Infinity, duration: 3, delay: 1 }}
      />

      {/* Footer Section */}
      <motion.footer
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="bg-neutral text-neutral-content py-4 shadow-md"
      >
        <p className="text-center text-sm">
          Designed with ❤️ by Tinesh Warke | © {new Date().getFullYear()} Resume
          Builder. All rights reserved.
        </p>
      </motion.footer>
    </motion.div>
  );
}
