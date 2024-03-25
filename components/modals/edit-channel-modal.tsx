"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import qs from "query-string";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Channeltype } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect } from "react";

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Channel name is required",
    })
    .refine(
      (name): name is string => name.toLowerCase() !== "general",
      "Cannot be general"
    ),
  type: z.nativeEnum(Channeltype),
});

export const EditChannelModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { channel } = data;
  const isModalOpen = isOpen && type === "editChannel";
  const router = useRouter();
  const params = useParams();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: channel?.type || Channeltype.TEXT,
    },
  });

  useEffect(() => {
    if (channel) {
      form.setValue("name", channel.name);
      form.setValue("type", channel.type);
    } else {
      form.setValue("type", Channeltype.TEXT);
    }
  }, [Channeltype, channel, form]);
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const channelId = channel?.id;
      const url = qs.stringifyUrl({
        url: `/api/channels/editChannel/${channelId}`,
        query: {
          serverId: params?.serverId,
        },
      });
      await axios.patch(url, values);
      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-[#1E1F22] border-[#313338] text-white p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="font-bold text-center text-2xl">
            <motion.p
              initial={{ opacity: 0, x: -400 }}
              animate={{ opacity: 1, x: [-400, 0] }}
              transition={{
                duration: 0.2,
                type: "spring",
                damping: 20,
                stiffness: 100,
              }}
            >
              Edit Channel
            </motion.p>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: 400 }}
                  animate={{ opacity: 1, x: [400, 0] }}
                  transition={{
                    duration: 0.2,
                    type: "spring",
                    damping: 20,
                    stiffness: 100,
                  }}
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-xs text-zinc-500 font-bold dark:text-secondary/70">
                          Channel Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            className="bg-[#313338] border-0 focus-visible:ring-0 text-white focus-visible:ring-offset-0"
                            placeholder="Enter channel name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -400 }}
                  animate={{ opacity: 1, x: [-400, 0] }}
                  transition={{
                    duration: 0.2,
                    type: "spring",
                    damping: 20,
                    stiffness: 100,
                  }}
                  className="mt-3"
                >
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-xs text-zinc-500 font-bold dark:text-secondary/70">
                          CHANNEL TYPE
                        </FormLabel>
                        <Select
                          disabled={isLoading}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-[#313338] border-0 focus:ring-0 text-white ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                              <SelectValue placeholder="Select channel type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#1E1F22] border-black shadow-lg">
                            {Object.values(Channeltype).map((type) => (
                              <SelectItem
                                key={type}
                                value={type}
                                className="capitalize "
                              >
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              </div>
            </div>
            <DialogFooter className=" px-6 py-4">
              <motion.button
                initial={{ opacity: 0, y: 400 }}
                animate={{ opacity: 1, y: [400, 0] }}
                transition={{
                  duration: 0.2,
                  type: "spring",
                  damping: 20,
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.06,
                  background: "white",
                  color: "black",
                  transition: { duration: 0.4, ease: "easeInOut" },
                }}
                whileTap={{ scale: 0.9, transition: { duration: 0.2 } }}
                disabled={isLoading}
                className="bg-[#313338] text-white py-3 rounded-xl px-4 w-full font-bold text-lg"
              >
                Save
              </motion.button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
