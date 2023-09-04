"use client";

import { useState } from "react";
import axios from "axios";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

import { useModal } from "@/hooks/useModalStore";
import { useRouter } from "next/navigation";

export const LeaveServerModal = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "leaveServer";
    const { server } = data;

    const onConfirm = async () => {
        try {
            setIsLoading(true);

            await axios.patch("/api/servers/" + server?.id + "/leave");

            onClose();
            router.refresh();
            router.push("/");
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center text-zinc text-2xl">Leave Server</DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to leave <span className="font-semibold text-indigo-500">{server?.name}</span>?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 px-6 py-4">
                    <div className="flex items-center jusitfy-">
                        <Button disabled={isLoading} variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button disabled={isLoading} variant="primary" onClick={onConfirm}>
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
