"use client";
import { SignIn } from "@clerk/nextjs";
import { motion } from "framer-motion";
export default function Page() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, z: -900, scale: 0.4 }}
        animate={{ opacity: 1, z: 0, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.3, ease: "backInOut" }}
      >
        <SignIn />
      </motion.div>
    </div>
  );
}
