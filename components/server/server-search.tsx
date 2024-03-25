"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
interface ServerSearchProps {
  data: {
    label: string;
    type: "channel" | "member";
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}

const ServerSearch = ({ data }: ServerSearchProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const onClick = ({ id, type }: { id: string, type: "channel" | "member"}) => {
    setOpen(false); 

    if (type === "member") {
      return router.push(`/servers/${params?.serverId}/conversations/${id}`)
    }

    if (type === "channel") {
      return router.push(`/servers/${params?.serverId}/channels/${id}`)
    }
  }

  return (
    <>
      <motion.button
        initial={{ scale: 0.95, x: 300 }}
        animate={{ scale: 1, x: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        onClick={() => setOpen(true)}
        className="group px-2 py-2 rounded-md flex items-center  gap-x-2 w-full dark:bg-[#1E1F22] hover:bg-zinc-700/10 bg-white dark:hover:bg-zinc-700/50 transition "
      >
        <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
        <p className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 transition">
          Search
        </p>
        <motion.kbd
          initial={{ scale: 0.95, y: -300 }}
          animate={{ scale: 1, y: 0 }}
          transition={{
            duration: 0.2,
            type: "spring",
            damping: 10,
            stiffness: 100,
            delay: 0.2,
          }}
          className="pointer-events-none flex h-5 select-none items-center gap-1 rounded  bg- px-1.5 bg-[#313338] border border-white dark:border-[#1E1F22] font-mono text-[10px] font-medium text-muted-foreground ml-auto"
        >
          <span className="text-xs top-[2px] relative text-white ">
            CTRL + K
          </span>
        </motion.kbd>
      </motion.button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <motion.div
          initial={{ scale: 0.95, y: -300 }}
          animate={{ scale: 1, y: 0 }}
          transition={{
            duration: 0.2,
            type: "spring",
            damping: 20,
            stiffness: 100,
          }}
        >
          <CommandInput
            placeholder="Search all channels and members"
            className="border-0"
          />
        </motion.div>
        <CommandList>
          <motion.div
            initial={{ scale: 0.95, x: 400 }}
            animate={{ scale: 1, x: 0 }}
            transition={{
              duration: 0.2,
              type: "spring",
              damping: 20,
              stiffness: 100,
            }}
          >
            <CommandEmpty>No results found</CommandEmpty>
          </motion.div>
          {data.map(({ label, type, data }) => {
            if (!data?.length) return null;

            return (
              <CommandGroup key={label} heading={label}>
                {data?.map(({ id, icon, name }) => (
                  <motion.div
                    initial={{ scale: 0.95, x: 400 }}
                    animate={{ scale: 1, x: 0 }}
                    transition={{
                      duration: 0.2,
                      type: "spring",
                      damping: 20,
                      stiffness: 100,
                    }}
                  >
                    <CommandItem key={id} >
                      <motion.p
                        initial={{ scale: 0.95, x: -400 }}
                        animate={{ scale: 1, x: 0 }}
                        transition={{
                          duration: 0.2,
                          type: "spring",
                          damping: 20,
                          stiffness: 100,
                        }}
                      >
                        {icon}
                      </motion.p>
                      <motion.span
                        initial={{ scale: 0.95, x: 400 }}
                        animate={{ scale: 1, x: 0 }}
                        transition={{
                          duration: 0.2,
                          type: "spring",
                          damping: 20,
                          stiffness: 100,
                        }}
                        
                      >
                        {name}
                      </motion.span>
                    </CommandItem>
                  </motion.div>
                ))}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default ServerSearch;
