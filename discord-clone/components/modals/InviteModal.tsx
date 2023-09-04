"use client";

import { useState } from "react";
import axios from "axios";
import { Check, Copy, RefreshCw } from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { useModal } from "@/hooks/useModalStore";
import { useOrigin } from "@/hooks/useOrigin";

export const InviteModal = () => {
    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { isOpen, onClose, onOpen, type, data } = useModal();
    const origin = useOrigin();

    const isModalOpen = isOpen && type === "invite";
    const { server } = data;
    const inviteUrl = origin + "/invite/" + server?.inviteCode;

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1000);
    }

    const onNew = async () => {
        try {
            setIsLoading(true);
            const response = await axios.patch("/api/servers/" + server?.id + "/invite-code");

            onOpen("invite", { server: response.data });
        } catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center text-zinc text-2xl">Invite Friends</DialogTitle>
                </DialogHeader>
                <div className="p-6">
                    <Label className="uppercase text-sx font-bold text-zinc-500 dark:text-secondary/70">Server invite link</Label>
                    <div className="flex items-center mt-2 gap-x-2">
                        <Input
                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                            value={inviteUrl}
                        />
                        <Button disabled={isLoading} size="icon" onClick={onCopy}>
                            {copied ? (
                                <Check className="w-4 h-4 text-emerald-500" />
                            ) : (
                                <Copy className="w-4 h-4" />
                            )}
                        </Button>
                    </div>
                    <Button variant="link" size="sm" className="text-xs text-zinc-500 mt-4" onClick={onNew}>
                        Generate a new link
                        <RefreshCw className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
