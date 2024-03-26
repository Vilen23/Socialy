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
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import FileUpload from "@/components/file-upload";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import qs from "query-string"

const formSchema = z.object({
  fileUrl: z.string().min(1, {
    message: "Attatchment is required",
  }),
});

export const MessageFileModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const isModalOpen = isOpen && type === "messageFile";
  const {apiUrl,query} = data;
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      fileUrl: "",
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl as string,
        query,
      })
      await axios.post(url, {
        ...values,
        content:values.fileUrl
      });
      form.reset();
      router.refresh();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
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
              Add an attatchment
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
              Send a file as a message!
            </motion.p>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8  px-6">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 0.2, 0.3, 1], opacity: 1 }}
                transition={{
                  duration: 0.5,
                  type: "spring",
                  damping: 10,
                  stiffness: 100,
                }}
                className="flex items-center justify-center text-center"
              >
                <FormField
                  control={form.control}
                  name="fileUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint="messageFile"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </motion.div>
            </div>
            <DialogFooter className=" px-6 py-4">
              <motion.button
              aria-disabled={isLoading}
                initial={{ scale: 0, opacity: 0, x: 900 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "backInOut" }}
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
                Send
              </motion.button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
