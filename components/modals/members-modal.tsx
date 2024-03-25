"use client";
import qs from "query-string";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useModal } from "@/hooks/use-modal-store";
import { useEffect, useState } from "react";
import { ServerWithMembersWithProfiles } from "@/types";
import { ScrollArea } from "../ui/scroll-area";
import UserAvatar from "../User-avatar";
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MemberRole } from "@prisma/client";
import { db } from "@/lib/db";
import axios from "axios";
import { useRouter } from "next/navigation";
const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-yellow-500" />,
  ADMIN: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
};

export const MembersModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const { server } = (data as { server: ServerWithMembersWithProfiles }) || {
    server: undefined,
  };
  const [isMounted, setIsMounted] = useState(false);
  const [loadingId, setIsLoadingId] = useState("");

  const isModalOpen = isOpen && type === "members";

  const onRoleChange = async (memberId: string, role: MemberRole) => {
    try {
      setIsLoadingId(memberId);
      const url = qs.stringifyUrl({
        url:`/api/servers/changerole/${memberId}`,
        query:{
          serverId:server.id,
        }
      })
      const response = await axios.patch(url,{role})
      router.refresh();
      onOpen("members",{server:response.data})
    } catch (error) {
      console.log(error);
    } finally {
      if (isMounted) {
        setIsLoadingId("");
      }
    }
  };

  const onKick = async(memberId: string) => {
    try {
      setIsLoadingId(memberId);
      const response = await axios.patch(`/api/servers/members/kick/${memberId}`, { serverId: server.id });
      console.log(response.data);
      setIsLoadingId("");
      router.refresh();
      onOpen("members", { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      if (isMounted) {
        setIsLoadingId("");
      }
    }
  }

  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1E1F22] border-[#313338] text-white  overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="font-bold text-center text-2xl">
            <motion.p
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
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
            <motion.p
              initial={{ scale: 2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                type: "spring",
                damping: 10,
                stiffness: 100,
              }}
            >
              {server?.Members?.length} Members
            </motion.p>
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {server?.Members?.map((member) => (
            <div key={member.id} className="flex items-center gap-x-2 mb-6">
              <motion.div
                initial={{ scale: 0, opacity: 0, x: -100 }}
                animate={{ scale: 1, opacity: 1, x: [-100, 0] }}
                transition={{
                  duration: 0.5,
                  type: "spring",
                  damping: 10,
                  stiffness: 100,
                }}
              >
                <UserAvatar src={member.profile.imageUrl} />
              </motion.div>
              <div className="flex flex-col gap-y-1">
                <motion.div
                  initial={{ scale: 0, opacity: 0, y: -100 }}
                  animate={{ scale: 1, opacity: 1, y: [-100, 0] }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    damping: 10,
                    stiffness: 100,
                  }}
                  className="text-xs font-semibold flex items-center gap-x-1"
                >
                  {member.profile.name}
                  {roleIconMap[member.role]}
                </motion.div>
                <motion.p
                  initial={{ scale: 0, opacity: 0, y: 100 }}
                  animate={{ scale: 1, opacity: 1, y: [100, 0] }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    damping: 10,
                    stiffness: 100,
                  }}
                  className="text-xs text-white/60"
                >
                  {member.profile.email}
                </motion.p>
              </div>
              {server.profileId !== member.profileId &&
                loadingId !== member.id && (
                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className="h-4 w-4 text-zinc-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="left" className="bg-[#313338]">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="flex items-center">
                            <ShieldQuestion className="w-4 h-4 mr-2" />
                            <span>Role</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent className="bg-[#1E1F22] border-none shadow-lg left-[-10px] relative">
                              <DropdownMenuItem
                                onClick={() => onRoleChange(member.id, "GUEST")}
                              >
                                <Shield className="h-4 w-4 mr-2" />
                                Guest
                                {member.role === "GUEST" && (
                                  <Check className="h-4 w-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  onRoleChange(member.id, "MODERATOR")
                                }
                              >
                                <ShieldCheck className="h-4 w-4 mr-2" />
                                Moderator
                                {member.role === "MODERATOR" && (
                                  <Check className="h-4 w-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onKick(member.id)}>
                          <Gavel className="h-4 w-4 mr-2" />
                          Kick
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              {loadingId === member.id && (
                <Loader2 className="animate-spin text-white/60 ml-auto w-4 h-4" />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
