"use client";
import { motion } from "framer-motion";

import React from "react";
import { ModeToggle } from "../mode-toggle";
import { UserButton } from "@clerk/nextjs";

function UserButn() {
  return (
    <motion.div
    initial={{ scale: 0, opacity: 0, x: -100 }}
    animate={{ scale: 1, opacity: 1, x: 0 }}
    transition={{ duration: 0.4, ease: "easeInOut",delay:0.7 }}   
      className="pb-3 mt-auto flex items-center flex-col gap-y-4"
    >
      <ModeToggle />
      <UserButton 
      afterSignOutUrl="/"
      appearance={{
        elements:{
            avatarBox:"h-[40px] w-[40px]"
        }
      }}
      />
    </motion.div>
  );
}

export default UserButn;
