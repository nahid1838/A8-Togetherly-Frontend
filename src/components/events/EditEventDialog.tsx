
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
        if (nextOpen) setEventType(userEvent.eventType);
    };

    const router = useRouter();

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
                        authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(updates),
                }
            );

            if (!res.ok) {
                toast.error("Failed to update event");
                return;
            }

            toast.success("Event updated!");
            router.refresh();
            setOpen(false);
        } catch {
            toast.error("Something went wrong");
        }
    };

    const inputStyles =
        "h-11 rounded-xl border-border/70 bg-muted/40 text-foreground placeholder:text-muted-foreground/70 shadow-none transition-all focus-visible:border-emerald-500 focus-visible:ring-4 focus-visible:ring-emerald-500/10";

    const labelStyles = "text-sm font-semibold text-foreground";

    const iconStyles =
        "pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600 dark:text-emerald-400";

    return (
        <Dialog open={open} onOpenChange={handleOnOpenChange}>
            <DialogTrigger
                render={
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-9 flex-1 rounded-lg border-emerald-500/25 text-emerald-700 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
                    />
                }
            >
                <Pencil size={15} />
                Edit
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] gap-0 overflow-y-auto rounded-2xl border-border/70 bg-background p-0 shadow-2xl sm:max-w-xl">

                {/* Header */}
                <DialogHeader className="border-b border-border/70 bg-muted/30 px-6 py-6 sm:px-7">
                    <div className="mb-3 flex size-12 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <Pencil size={22} />
                    </div>

                    <DialogTitle className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                        Edit Event
                    </DialogTitle>

                    <DialogDescription className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        Update your event information and keep your community
                        informed.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleOnSubmit} className="space-y-5 px-6 py-6 sm:px-7">

                    {/* Event Title */}
                    <div className="space-y-2">
                        <Label htmlFor={`title-${userEvent._id}`} className={labelStyles}>
                            Event Title
                        </Label>

                        <div className="relative">
                            <Megaphone size={17} className={iconStyles} />
                            <Input
                                id={`title-${userEvent._id}`}
                                name="title"
                                type="text"
                                defaultValue={userEvent.title}
                                required
                                minLength={5}
                                maxLength={100}
                                className={cn(inputStyles, "pl-11")}
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor={`description-${userEvent._id}`} className={labelStyles}>
                            Description
                        </Label>

                        <div className="relative">
                            <AlignLeft
                                size={17}
                                className="pointer-events-none absolute left-3.5 top-3.5 text-emerald-600 dark:text-emerald-400"
                            />
                            <Textarea
                                id={`description-${userEvent._id}`}
                                name="description"
                                defaultValue={userEvent.description}
                                required
                                minLength={20}
                                rows={3}
                                className="min-h-28 resize-none rounded-xl border-border/70 bg-muted/40 pl-11 text-sm text-foreground shadow-none transition-all placeholder:text-muted-foreground/70 focus-visible:border-emerald-500 focus-visible:ring-4 focus-visible:ring-emerald-500/10"
                            />
                        </div>
                    </div>

                    {/* Event Type */}
                    <div className="space-y-2">
                        <Label htmlFor={`eventType-${userEvent._id}`} className={labelStyles}>
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
                                    inputStyles,
                                    "w-full px-3.5",
                                    !eventType && "text-muted-foreground"
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

                            <SelectContent className="max-h-72 rounded-xl border-border bg-popover p-1.5">
                                {categories.map((category) => {
                                    const Icon = category.icon;

                                    return (
                                        <SelectItem
                                            key={category.title}
                                            value={category.title}
                                            className="rounded-lg py-2 pl-2 pr-8"
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

                    {/* Thumbnail */}
                    <div className="space-y-2">
                        <Label htmlFor={`thumbnail-${userEvent._id}`} className={labelStyles}>
                            Thumbnail Image URL
                        </Label>

                        <div className="relative">
                            <ImagePlus size={17} className={iconStyles} />
                            <Input
                                id={`thumbnail-${userEvent._id}`}
                                name="thumbnail"
                                type="url"
                                defaultValue={userEvent.thumbnail}
                                required
                                placeholder="https://example.com/event-cover.jpg"
                                className={cn(inputStyles, "pl-11")}
                            />
                        </div>
                    </div>

                    {/* Location + Date */}
                    <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor={`location-${userEvent._id}`} className={labelStyles}>
                                Location
                            </Label>

                            <div className="relative">
                                <MapPin size={17} className={iconStyles} />
                                <Input
                                    id={`location-${userEvent._id}`}
                                    name="location"
                                    type="text"
                                    defaultValue={userEvent.location}
                                    required
                                    maxLength={120}
                                    placeholder="e.g. Dhaka, Bangladesh"
                                    className={cn(inputStyles, "pl-11")}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor={`date-${userEvent._id}`} className={labelStyles}>
                                Event Date
                            </Label>

                            <div className="relative">
                                <CalendarDays size={17} className={iconStyles} />
                                <Input
                                    id={`date-${userEvent._id}`}
                                    name="date"
                                    type="date"
                                    defaultValue={userEvent.date}
                                    required
                                    className={cn(inputStyles, "pl-11")}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <DialogFooter className="flex-col gap-2 border-t border-border/70 pt-5 sm:flex-row">
                        <Button
                            type="button"
                            onClick={() => setOpen(false)}
                            variant="outline"
                            className="h-11 w-full rounded-xl border-border text-foreground hover:bg-muted sm:w-auto"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            className="h-11 w-full rounded-xl bg-emerald-600 font-semibold text-white shadow-lg shadow-emerald-600/15 transition-all hover:bg-emerald-700 sm:w-auto"
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