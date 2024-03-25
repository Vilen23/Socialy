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
import qs from "query-string"
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Channeltype } from "@prisma/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Channel name is required",
  }).refine((name): name is string => name.toLowerCase() !== "general", "Cannot be general"),
  type: z.nativeEnum(Channeltype),
});

export const CreateChannelModal = () => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "createChannel";
  const router = useRouter();
  const params = useParams();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type:Channeltype.TEXT
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url:"/api/servers/channels/createChannel",
        query:{
          serverId:params?.serverId
        }
      })
      await axios.post(url, values);
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
    <Dialog open={isModalOpen} onOpenChange={handleClose} >
      <DialogContent className="bg-[#1E1F22] border-[#313338] text-white p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="font-bold text-center text-2xl">
            <motion.p
              initial={{ scale: 0, opacity: 0, x: -400 }}
              animate={{ scale: 1, opacity: 1, x: [-400, 0] }}
              transition={{
                duration: 0.5,
                ease: "easeInOut"
              }}
            >
              Create Channel
            </motion.p>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <motion.div
              initial={{ scale: 0, opacity: 0,x:400 }}
              animate={{ scale: 1, opacity: 1,x:[400,0] }}
              transition={{ duration: 0.5,ease: "easeInOut",}}
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
              <div className="mt-3">
              <FormField control={form.control} name="type" render={({field})=>(
                <FormItem>
                  <FormLabel className="uppercase text-xs text-zinc-500 font-bold dark:text-secondary/70">CHANNEL TYPE</FormLabel>
                  <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-[#313338] border-0 focus:ring-0 text-white ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                        <SelectValue placeholder="Select channel type"/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[#1E1F22] border-black shadow-lg">
                      {Object.values(Channeltype).map((type)=>(
                        <SelectItem key={type} value={type} className="capitalize ">
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                      <FormMessage/>
                </FormItem>
              )}/>
              </div>
              </motion.div>
            </div>
            <DialogFooter className=" px-6 py-4">
              <motion.button
                initial={{ scale: 0, opacity: 0, y: 400 }}
                animate={{ scale: 1, opacity: 1, y: [400,0] }}
                transition={{ duration: 0.5, ease: "backInOut" }}
                whileHover={{
                  scale: 1.06,
                  background:"white",
                  color:"black",
                  transition: { duration: 0.4, ease: "easeInOut" },

                }}
                whileTap={{ scale: 0.9, transition: { duration: 0.2 } }}
                
                disabled={isLoading}
                className="bg-[#313338] text-white py-3 rounded-xl px-4 w-full font-bold text-lg"
              >
                Create
              </motion.button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
