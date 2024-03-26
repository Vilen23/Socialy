"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ActionToolTip } from "@/components/action-tooltip";
import { motion } from "framer-motion";

interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

const NavigationItem = ({ id, imageUrl, name }: NavigationItemProps) => {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/servers/${id}`)
  };

  return (
    <ActionToolTip side="right" align="center" label={name}>
      <button onClick={onClick} className="group relative flex items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0, x: -100 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          transition={{ duration:0.2, ease: "easeInOut" }}
          className={cn(
            "absolute left-0 bg-[#313338] dark:bg-white rounded-full transition-all w-[4px]",
            params?.serverId !== id && "group-hover:h-[20px]",
            params?.serverId === id ? "h-[36px]" : "h-[8px]"
          )}
        >
          {" "}
        </motion.div>
        <motion.div
          initial={{ scale: 0, opacity: 0, x: -100 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          transition={{ duration:0.2, ease: "easeInOut" }}
          // whileInView={{boxShadow:"0 5px 10px black"}}
          className={cn(
            "relative group flex mx-3  h-[48px] w-[48px] rounded-[24px]  group-hover:rounded-[16px] transition-all overflow-hidden shadow-md",
            params?.serverId === id && "bg-primary/10 text-primary rounded-[16px]",
            "dark:shadow-black","shadow-gray-600"
          )}
        >
          <Image fill objectFit="cover"  src={imageUrl} alt="Channel" />
        </motion.div>
      </button>
    </ActionToolTip>
  );
};

export default NavigationItem;
