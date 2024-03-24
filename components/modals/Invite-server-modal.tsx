"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCcw, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";

export const InviteModal = () => {
  const origin = useOrigin();
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const server = data?.server;
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === "invite";
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);
      const res = await axios.patch(`/api/servers/${server?.id}/invite-code`);
      onOpen("invite", { server: res.data });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1E1F22] border-[#313338] text-white p-0 overflow-hidden">
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
              Invite Friends
            </motion.p>
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <motion.div
          initial={{scale:0,opacity:0,x:-500}}
          animate={{scale:1,opacity:1,x:[-500,0]}}
          transition={{duration:0.5,type:"spring",damping:10,stiffness:100}}
          >
            <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-white/70">
              Server Invite Link
            </Label>
          </motion.div>
          <motion.div 
          initial={{scale:0,opacity:0,x:500,y:500}}
          animate={{scale:1,opacity:1,x:[500,0],y:[500,0]}}
          transition={{duration:0.5,type:"spring",damping:10,stiffness:100}}
          className="flex items-center mt-2 gap-x-2">
            <Input
              disabled={isLoading}
              value={inviteUrl}
              readOnly
              className="bg-white/90 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
            />
            <Button size="icon" onClick={onCopy} disabled={isLoading}>
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </motion.div>
          <motion.div
          initial={{scale:0,opacity:0,x:-500,y:-500}}
          animate={{scale:1,opacity:1,x:[-500,0],y:[-500,0]}}
          transition={{duration:0.5,type:"spring",damping:10,stiffness:100}}
          >
          <Button
            onClick={onNew}
            disabled={isLoading}
            variant="link"
            size="sm"
            className="text-xs text-white/90 mt-4"
          >
            Generate New Link
            <RefreshCw className="w-4 h-4 ml-2" />
          </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
