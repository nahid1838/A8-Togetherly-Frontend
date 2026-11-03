"use client";

import { useState } from "react";
import {
    AlignLeft,
    CalendarDays,
    ImagePlus,
    MapPin,
    Megaphone,
    Pencil,
    Save,
} from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select";
import { cn } from "cn";
import { categories } from "@/components/home/EventCategories";
import { TEvent } from "@/type/eventType";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

function EditEventDialog({ userEvent }: { userEvent: TEvent }) {
    const [open, setOpen] = useState(false);
    const [eventType, setEventType] = useState(userEvent.eventType);

    const selectedCategory = categories.find(
        (item) => item.title === eventType
    );

    const handleOnOpenChange = (nextOpen: boolean) => {
        setOpen(nextOpen);
        // Reset the select when reopening so a cancelled edit doesn't stick.
        if (nextOpen) setEventType(userEvent.eventType);
    };

    const router = useRouter()
const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const updates = Object.fromEntries(formData.entries()) as {
        title: string;
        description: string;
        eventType: string;
        thumbnail: string;
        location: string;
        date: string;
    };

    const token = await getTokenFromClient();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/events/${userEvent._id}`,
            {
                method: "PATCH",
                headers: { 
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updates),
            }
        );

        if (!res.ok) {
            toast.error("Failed to update event");
            return;
        }

        toast.success("Event updated!");
        router.refresh();   // re-fetch the manage-events list
        setOpen(false);     // close the dialog
    } catch {
        toast.error("Something went wrong");
    }
};

    return (
        <Dialog open={open} onOpenChange={handleOnOpenChange}>
            <DialogTrigger
                render={
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-9 flex-1 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                    />
                }
            >
                <Pencil size={15} />
                Edit
            </DialogTrigger>

            <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold text-slate-900">
                        Edit Event
                    </DialogTitle>
                    <DialogDescription className="text-slate-500">
                        Update the details of &quot;{userEvent.title}&quot;.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleOnSubmit} className="space-y-4">

                    {/* Event Title */}
                    <div className="space-y-2">
                        <Label
                            htmlFor={`title-${userEvent._id}`}
                            className="font-semibold text-slate-700"
                        >
                            Event Title
                        </Label>
                        <div className="relative">
                            <Megaphone
                                size={17}
                                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600"
                            />
                            <Input
                                id={`title-${userEvent._id}`}
                                name="title"
                                type="text"
                                defaultValue={userEvent.title}
                                required
                                minLength={5}
                                maxLength={100}
                                className="h-11 rounded-xl border-slate-200 bg-slate-50/60 pl-11 text-sm focus-visible:border-emerald-600 focus-visible:ring-emerald-600/20"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label
                            htmlFor={`description-${userEvent._id}`}
                            className="font-semibold text-slate-700"
                        >
                            Description
                        </Label>
                        <div className="relative">
                            <AlignLeft
                                size={17}
                                className="pointer-events-none absolute left-3.5 top-3 text-emerald-600"
                            />
                            <Textarea
                                id={`description-${userEvent._id}`}
                                name="description"
                                defaultValue={userEvent.description}
                                required
                                minLength={20}
                                rows={3}
                                className="min-h-24 rounded-xl border-slate-200 bg-slate-50/60 pl-11 text-sm focus-visible:border-emerald-600 focus-visible:ring-emerald-600/20"
                            />
                        </div>
                    </div>

                    {/* Event Type */}
                    <div className="space-y-2">
                        <Label
                            htmlFor={`eventType-${userEvent._id}`}
                            className="font-semibold text-slate-700"
                        >
                            Event Type
                        </Label>
                        <Select
                            name="eventType"
                            required
                            value={eventType}
                            onValueChange={(value) => setEventType(value ?? "")}
                        >
                            <SelectTrigger
                                id={`eventType-${userEvent._id}`}
                                className={cn(
                                    "h-11 w-full rounded-xl border-slate-200 bg-slate-50/60 px-3.5 text-sm hover:border-slate-300 focus-visible:border-emerald-600 focus-visible:ring-emerald-600/20",
                                    !eventType && "text-slate-400"
                                )}
                            >
                                {selectedCategory ? (
                                    <span className="flex items-center gap-2.5">
                                        <span
                                            className={cn(
                                                "grid size-7 shrink-0 place-items-center rounded-lg",
                                                selectedCategory.color
                                            )}
                                        >
                                            <selectedCategory.icon
                                                size={15}
                                                strokeWidth={1.9}
                                            />
                                        </span>
                                        {selectedCategory.title}
                                    </span>
                                ) : (
                                    "Select event type"
                                )}
                            </SelectTrigger>
                            <SelectContent className="max-h-72 p-1.5">
                                {categories.map((category) => {
                                    const Icon = category.icon;

                                    return (
                                        <SelectItem
                                            key={category.title}
                                            value={category.title}
                                            className="py-2 pl-2 pr-8"
                                        >
                                            <span className="flex items-center gap-2.5">
                                                <span
                                                    className={cn(
                                                        "grid size-7 shrink-0 place-items-center rounded-lg",
                                                        category.color
                                                    )}
                                                >
                                                    <Icon size={15} strokeWidth={1.9} />
                                                </span>
                                                {category.title}
                                            </span>
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Thumbnail Image URL */}
                    <div className="space-y-2">
                        <Label
                            htmlFor={`thumbnail-${userEvent._id}`}
                            className="font-semibold text-slate-700"
                        >
                            Thumbnail Image URL
                        </Label>
                        <div className="relative">
                            <ImagePlus
                                size={17}
                                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600"
                            />
                            <Input
                                id={`thumbnail-${userEvent._id}`}
                                name="thumbnail"
                                type="url"
                                defaultValue={userEvent.thumbnail}
                                required
                                placeholder="https://example.com/event-cover.jpg"
                                className="h-11 rounded-xl border-slate-200 bg-slate-50/60 pl-11 text-sm focus-visible:border-emerald-600 focus-visible:ring-emerald-600/20"
                            />
                        </div>
                    </div>

                    {/* Location + Event Date */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label
                                htmlFor={`location-${userEvent._id}`}
                                className="font-semibold text-slate-700"
                            >
                                Location
                            </Label>
                            <div className="relative">
                                <MapPin
                                    size={17}
                                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600"
                                />
                                <Input
                                    id={`location-${userEvent._id}`}
                                    name="location"
                                    type="text"
                                    defaultValue={userEvent.location}
                                    required
                                    maxLength={120}
                                    placeholder="e.g. Dhaka, Bangladesh"
                                    className="h-11 rounded-xl border-slate-200 bg-slate-50/60 pl-11 text-sm focus-visible:border-emerald-600 focus-visible:ring-emerald-600/20"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor={`date-${userEvent._id}`}
                                className="font-semibold text-slate-700"
                            >
                                Event Date
                            </Label>
                            <div className="relative">
                                <CalendarDays
                                    size={17}
                                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600"
                                />
                                <Input
                                    id={`date-${userEvent._id}`}
                                    name="date"
                                    type="date"
                                    defaultValue={userEvent.date}
                                    required
                                    className="h-11 rounded-xl border-slate-200 bg-slate-50/60 pl-11 text-sm focus-visible:border-emerald-600 focus-visible:ring-emerald-600/20"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <DialogFooter className="mt-5">
                        <Button
                            type="button"
                            onClick={() => setOpen(false)}
                            variant="outline"
                            className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700"
                        >
                            <Save size={16} />
                            Save Changes
                        </Button>
                    </DialogFooter>

                </form>
            </DialogContent>
        </Dialog>
    );
}

export default EditEventDialog;
