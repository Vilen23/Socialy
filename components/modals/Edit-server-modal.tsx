"use client";
import {
  Dialog,
  DialogTitle,
  DialogDescription,
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
import { useEffect, useState } from "react";
import FileUpload from "@/components/file-upload";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { ServerInfoAtom } from "@/State/Server-info/ServerAtom";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Server Name is required",
  }),
  imageUrl: z.string().min(1, {
    message: "Server image is required",
  }),
});

export const EditServerModal = () => {
  const { isOpen, onClose, type , data} = useModal();
  const isModalOpen = isOpen && type === "editServer";
  const server  = data?.server;
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  useEffect(()=>{
    if(server){
      form.setValue("name",server.name);
      form.setValue("imageUrl",server.imageUrl);
    }
  },[server,form])
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/servers/${server?.id}`, values);
      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
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
                type: "spring",
                damping: 10,
                stiffness: 100,
              }}
            >
              Customize Your Server
            </motion.p>
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            <motion.p
            initial={{ scale: 0, opacity: 0, x: 400 }}
            animate={{ scale: 1, opacity: 1, x: [400, 0] }}
            transition={{
              duration: 0.5,
              type: "spring",
              damping: 10,
              stiffness: 100,
            }}
            >
            Give Your server a personality with a name and image. You can always
            Change it later.
            </motion.p>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8  px-6">
              <motion.div 
              initial={{ scale: 0, opacity: 0, }}
              animate={{ scale: [0,0.2,0.3,1], opacity: 1, }}
              transition={{ duration: 0.5,type: "spring", damping: 10, stiffness: 100 }}
              className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                      <FileUpload
                          endpoint="serverImage"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </motion.div>
              <motion.div
              initial={{ scale: 0, opacity: 0,y:900 }}
              animate={{ scale: 1, opacity: 1,y:0 }}
              transition={{ duration: 0.5,ease: "easeInOut",}}
              whileTap={{x:20}}
              >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs text-zinc-500 font-bold dark:text-secondary/70">
                      Server Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-[#313338] border-0 focus-visible:ring-0 text-white focus-visible:ring-offset-0"
                        placeholder="Enter server name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </motion.div>
            </div>
            <DialogFooter className=" px-6 py-4">
              <motion.button
                initial={{ scale: 0, opacity: 0, x: 900 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
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
                Save
              </motion.button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
