"use client";
import { motion } from "framer-motion";
import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useModal } from "@/hooks/use-modal-store";
import { ServerInfoAtom } from "@/State/Server-info/ServerAtom";

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const isAdmin = role === MemberRole.ADMIN;
  const moderator = isAdmin || role === MemberRole.MODERATOR;
  const { onOpen } = useModal();

  const HandleServerSettings = () => {
    onOpen("editServer", { server });
  };

  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.2,
        type: "spring",
        damping: 20,
        stiffness: 100,
      }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none" asChild>
          <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
            {server.name}
            <ChevronDown className="ml-auto h-5 w-5 hidden md:flex" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={cn(
            "w-56 text-xs font-medium text-black dark:text-neutral-100 space-y-[2px]  dark:bg-[#1E1F22] "
          )}
        >
          {
            <motion.div
              initial={{ scale: 0, opacity: 0, x: 200 }}
              animate={{ scale: 1, opacity: 1, x: [200,0] }}
              transition={{
                duration: 0.2,
                type: "spring",
                damping: 20,
                stiffness: 100,
              }}
            >
              <DropdownMenuItem
                onClick={() => onOpen("invite", { server })}
                className="text-indigo-600  dark:text-indigo-400 px-3 py-2 text-xs cursor"
              >
                Invite People
                <UserPlus className="ml-auto h-4 w-4" />
              </DropdownMenuItem>
            </motion.div>
          }
          {isAdmin && (
            <motion.div
              initial={{ scale: 0, opacity: 0, x: -200 }}
              animate={{ scale: 1, opacity: 1, x: [-200,0] }}
              transition={{
                duration: 0.164,
                type: "spring",
                damping: 20,
                stiffness: 100,
              }}
            >
              <DropdownMenuItem
                onClick={HandleServerSettings}
                className="px-3 py-2 text-xs cursor "
              >
                Server Settings
                <Settings className="ml-auto h-4 w-4" />
              </DropdownMenuItem>
            </motion.div>
          )}
          {isAdmin && (
            <motion.div
              initial={{ scale: 0, opacity: 0, x: 250 }}
              animate={{ scale: 1, opacity: 1, x:[250,0] }}
              transition={{
                duration: 0.164,
                type: "spring",
                damping: 20,
                stiffness: 100,
              }}
            >
              <DropdownMenuItem
                onClick={() => onOpen("members", { server })}
                className="px-3 py-2 text-xs cursor"
              >
                Manage Members
                <Users className="ml-auto h-4 w-4" />
              </DropdownMenuItem>
            </motion.div>
          )}
          {moderator && (
            <motion.div
              initial={{ scale: 0, opacity: 0, x: -250 }}
              animate={{ scale: 1, opacity: 1, x: [-250,0] }}
              transition={{
                duration: 0.164,
                type: "spring",
                damping: 20,
                stiffness: 100,
              }}
            >
              <DropdownMenuItem
                onClick={() => onOpen("createChannel")}
                className="px-3 py-2 text-xs cursor"
              >
                Create Channel
                <PlusCircle className="ml-auto h-4 w-4" />
              </DropdownMenuItem>
            </motion.div>
          )}
          {moderator && (
            <DropdownMenuSeparator
              className={cn("bg-[#F2F3F5] dark:bg-[#2B2D31]")}
            />
          )}
          {isAdmin && (
            <motion.div
              initial={{ scale: 0, opacity: 0, x: 300 }}
              animate={{ scale: 1, opacity: 1, x: [300,0] }}
              transition={{
                duration: 0.164,
                type: "spring",
                damping: 20,
                stiffness: 100,
              }}
            >
              <DropdownMenuItem
                onClick={() => onOpen("deleteServer", { server })}
                className="px-3 py-2 text-xs cursor text-rose-500"
              >
                Delete Server
                <Trash className="ml-auto h-4 w-4" />
              </DropdownMenuItem>
            </motion.div>
          )}
          {!isAdmin && (
            <motion.div
              initial={{ scale: 0, opacity: 0, x: -350 }}
              animate={{ scale: 1, opacity: 1, x: [-350,0] }}
              transition={{
                duration: 0.164,
                type: "spring",
                damping: 20,
                stiffness: 100,
              }}
            >
              <DropdownMenuItem
                onClick={() => onOpen("leaveServer", { server })}
                className="px-3 py-2 text-xs cursor text-rose-500"
              >
                Leave Server
                <LogOut className="ml-auto h-4 w-4" />
              </DropdownMenuItem>
            </motion.div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
};

export default ServerHeader;
