"use client"

import { ServerWithMembersWithProfiles } from "@/types";
import { Channeltype, MemberRole } from "@prisma/client";
import { ActionToolTip } from "../action-tooltip";
import { Plus, Settings } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { motion } from "framer-motion";
interface ServerSectionProps {
    label:string;
    role?: MemberRole;
    sectionType: "channels" | "members";
    channelType?: Channeltype;
    server?: ServerWithMembersWithProfiles;
}


export const ServerSection = ({label,role,sectionType,channelType,server}:ServerSectionProps)=>{
    const {onOpen} = useModal();
    
    return (
        <motion.div 
        initial={{ scale: 0.95, x: 300 }}
        animate={{ scale: 1, x: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="flex items-center justify-between py-2">
        <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">{label}</p>
        {role!==MemberRole.GUEST && sectionType==="channels" && (
            <ActionToolTip label="Create Channel" side="top">
                <button 
                onClick={()=>onOpen("createChannel",{channelType})}
                className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
                    <Plus className="h-4 w-4"/>
                </button>
            </ActionToolTip>
        )}
        {role===MemberRole.ADMIN && sectionType==="members" &&(
            <ActionToolTip label="Manage Members" side="top">
            <button 
            onClick={()=>onOpen("members",{server})}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
                <Settings className="h-4 w-4"/>
            </button>
        </ActionToolTip>
        )}
        </motion.div>
    )
}