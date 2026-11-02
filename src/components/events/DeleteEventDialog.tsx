"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { TEvent } from "@/type/eventType";

function DeleteEventDialog({ userEvent }: { userEvent: TEvent }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/events/${userEvent._id}`,
                { method: "DELETE" }
            );

            if (!res.ok) {
                toast.error("Failed to delete event");
                return;
            }

            toast.success("Event deleted!");
            setOpen(false);
            router.refresh(); // re-fetch the manage-events list
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        title="Delete Event"
                        className="size-9 shrink-0 border-red-200 text-red-500 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                    />
                }
            >
                <Trash2 size={16} />
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <span className="mx-auto grid size-12 place-items-center rounded-full bg-red-50 text-red-600">
                        <AlertTriangle size={24} strokeWidth={2} />
                    </span>

                    <DialogTitle className="text-center text-lg font-bold text-slate-900">
                        Delete Event?
                    </DialogTitle>

                    <DialogDescription className="text-center text-slate-500">
                        You&apos;re about to delete &quot;{userEvent.title}&quot;.
                        This cannot be undone — the event will be removed for
                        everyone.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={isDeleting}
                        className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                    >
                        Cancel
                    </Button>

                    <Button
                        type="button"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="rounded-xl bg-red-600 text-white shadow-md shadow-red-600/20 hover:bg-red-700"
                    >
                        {isDeleting ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                Deleting…
                            </>
                        ) : (
                            <>
                                <Trash2 size={16} />
                                Delete Event
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default DeleteEventDialog;
