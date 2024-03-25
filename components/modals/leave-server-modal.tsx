"use client";
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfiles } from "@/types";
import { Loader2 } from "lucide-react";

export const LeaveServerModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const isModalOpen = isOpen && type === "leaveServer";
  const { server } = (data as { server: ServerWithMembersWithProfiles }) || {
    server: undefined,
  };
  const [isMounted, setIsMounted] = useState(false);
  const form = useForm();
  const isLoading = form.formState.isSubmitting;
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = async () => {
    try {
      const url = qs.stringifyUrl({
        url: `/api/servers/leaveServer`,
        query: {
          serverId: server.id,
        },
      });
      await axios.patch(url);
      router.push("/");
      window.location.reload();
      onClose();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-[#1E1F22] border-0 ring-0 focus-visible:ring-0 border-[#313338] text-white p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="font-bold text-center text-2xl">
            <motion.p
              initial={{ scale: 0, opacity: 0, x: -400 }}
              animate={{ scale: 1, opacity: 1, x: [-400, 0] }}
              transition={{
                duration: 0.5,
                type: "spring",
                damping: 10,
                stiffness: 100,
              }}
            >
              Leave Server ?
            </motion.p>
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            <motion.p
              initial={{ scale: 0, opacity: 0, x: 400 }}
              animate={{ scale: 1, opacity: 1, x: [400, 0] }}
              transition={{
                duration: 0.5,
                type: "spring",
                damping: 10,
                stiffness: 100,
              }}
            >
              Are you sure you want to leave this server ?
            </motion.p>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogFooter className=" px-6 py-4 w-full flex justify-center">
              <motion.button
                initial={{ scale: 0, opacity: 0, x: 900 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "backInOut" }}
                whileHover={{
                  scale: 1.06,
                  background: "white",
                  color: "black",
                  transition: { duration: 0.4, ease: "easeInOut" },
                }}
                whileTap={{ scale: 0.9, transition: { duration: 0.2 } }}
                disabled={isLoading}
                className="bg-[#313338] ring-0 border-0 focus-visible:ring-0 group text-white py-3 rounded-xl px-4 w-[100px] font-bold text-lg"
              >
                {isLoading ?<Loader2 className="animate-spin text-white/90 group-hover:text-black mx-auto w-6 h-6" />:"Leave"}
              </motion.button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
