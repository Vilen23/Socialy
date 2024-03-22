"use client"
import { motion } from "framer-motion";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return ( 
      <div
      className="grid place-content-center h-[100vh]">
        <div>{children}</div>
      </div>
     );
  }
   
  export default AuthLayout;