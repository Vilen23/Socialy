"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useModal } from "@/hooks/use-modal-store";
import { useState } from "react";
import { ServerWithMembersWithProfiles } from "@/types";
import { ScrollArea } from "../ui/scroll-area";
import UserAvatar from "../User-avatar";
import { ShieldAlert, ShieldCheck } from "lucide-react";


const roleIconMap = {
  "GUEST":null,
  "MODERATOR":<ShieldCheck className="h-4 w-4 ml-2 text-yellow-500"/>,
  "ADMIN":<ShieldAlert className="h-4 w-4 ml-2 text-rose-500"/>
}


export const MembersModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const {server} = data  as {server:ServerWithMembersWithProfiles};
  const [loadingId, setIsLoadingId] = useState("");

  const isModalOpen = isOpen && type === "members";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1E1F22] border-[#313338] text-white  overflow-hidden">
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
              Manage Members
            </motion.p>
          </DialogTitle>
        <DialogDescription className="text-center text-white/70 font-bold">
            {server?.Members?.length} Members
        </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
              {server?.Members?.map((member)=>(
                <div key={member.id} className="flex items-center gap-x-2 mb-6">
                  <motion.div
                  initial={{scale:0,opacity:0,x:-100}}
                  animate={{scale:1,opacity:1,x:[-100,0]}}
                  transition={{duration:0.5,type:"spring",damping:10,stiffness:100}}
                  >
                  <UserAvatar src={member.profile.imageUrl}/>
                  </motion.div>
                  <div className="flex flex-col gap-y-1">
                    <motion.div 
                    initial={{scale:0,opacity:0,y:-100}}
                    animate={{scale:1,opacity:1,y:[-100,0]}}
                    transition={{duration:0.5,type:"spring",damping:10,stiffness:100}}
                    className="text-xs font-semibold flex items-center gap-x-1">
                      {member.profile.name}
                      {roleIconMap[member.role]}
                    </motion.div>
                    <motion.p
                    initial={{scale:0,opacity:0,y:100}}
                    animate={{scale:1,opacity:1,y:[100,0]}}
                    transition={{duration:0.5,type:"spring",damping:10,stiffness:100}} 
                    className="text-xs text-white/60">
                      {member.profile.email}
                    </motion.p>
                  </div>
                  {server.profileId !== member.profileId && loadingId !== member.id && (
                    <div>
                      Actions!
                    </div>
                  )}
                </div>
              ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
