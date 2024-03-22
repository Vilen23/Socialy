"use client";
import React from "react";
import { motion } from "framer-motion";
import { SignUp } from "@clerk/nextjs";
export default function Page() {
  return (
    <motion.div
      initial={{ opacity: 0, z: -900, scale: 0.4 }}
      animate={{ opacity: 1, z: 0, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3, ease: "backInOut" }}
    >
      <SignUp />
    </motion.div>
  );
}
