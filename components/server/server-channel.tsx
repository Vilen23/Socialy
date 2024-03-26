"use client";

import { cn } from "@/lib/utils";
import { Channel, Channeltype, MemberRole, Server } from "@prisma/client";
import { Edit, Hash, Lock, LockIcon, Mic, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ActionToolTip } from "../action-tooltip";
import { motion } from "framer-motion";
import { ModalType, useModal } from "@/hooks/use-modal-store";

interface serverChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}

const IconMap = {
  [Channeltype.TEXT]: Hash,
  [Channeltype.AUDIO]: Mic,
  [Channeltype.VIDEO]: Video,
};

export const ServerChannel = ({channel,server,role,}: serverChannelProps) => {
  const router = useRouter();
  const params = useParams();
  const Icon = IconMap[channel.type];
  const {onOpen} = useModal();

  const onClick = ()=>{
    router.push(`/servers/${params?.serverId}/channels/${channel.id}`)
  }

  const onAction = (e:React.MouseEvent,action:ModalType)=>{
    e.stopPropagation();
    onOpen(action,{server,channel})
  }

  return (
    <motion.button
    initial={{ scale: 0.95, x: -300 }}
    animate={{ scale: 1, x: [-300,0] }}
    transition={{ duration: 0.2, ease: "easeInOut" }}
      onClick={onClick}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.channelId===channel.id && "bg-zinc-700/10 dark:bg-zinc-700"
      )}
    >
      <Icon className="flex shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
      <p
        className={cn(
          "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          params?.channelId===channel.id && "text-zinc-600 dark:text-zinc-300 dark:group-hover:text-white"
        )}
      >
        {channel.name}
      </p>
      {channel.name!=="general" && role!==MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
            <ActionToolTip label="Edit">
                <Edit onClick={(e)=>onAction(e,"editChannel")} className="h-4 w-4 hidden group-hover:flex text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"/>
            </ActionToolTip>
            <ActionToolTip label="Delete">
                <Trash onClick={(e)=>onAction(e,"deleteChannel")} className="h-4 w-4 hidden group-hover:flex text-rose-500 hover:text-rose-600 dark:text-rose-500 dark:hover:text-rose-400 transition"/>
            </ActionToolTip>
        </div>
      )}
      {channel.name==="general" && (
        <LockIcon className="ml-auto w-4 h-4 text-zinc-500 dark:text-zinc-400"/>
      )}
    </motion.button>
  );
};
