"use client";

import axios from "axios";
import * as z from "zod";
import { useForm } from "react-hook-form";
import qs from "query-string";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Button } from "../ui/button";
import FileUpload from "../FileUpload";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/useModalStore";

const formSchema = z.object({
    fileUrl: z.string().min(1, {
        message: 'File is required.'
    })
});

export const MessageFileModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const router = useRouter();
    const form = useForm({
        defaultValues: {
            fileUrl: '',
        }
    });
    const { apiUrl, query } = data;
    
    const isLoading = form.formState.isSubmitting;
    const isModalOpen = isOpen && type === "messageFile";

    const handleClose = () => {
        form.reset();
        onClose();
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: apiUrl || "",
                query,
            });

            await axios.post(url, {
                ...values,
                content: values.fileUrl,
            });

            form.reset();
            router.refresh();
            handleClose();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center text-zinc text-2xl">Add an attachment</DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Send a file as an attachment for your message
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center w-full">
                                <FormField control={form.control} name="fileUrl" render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <FileUpload
                                                endpoint="messageFile"
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )} />
                            </div>
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button disabled={isLoading} variant="primary">
                                Send
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
