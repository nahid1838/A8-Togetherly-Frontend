"use client";

import { useState } from "react";
import { TEvent } from "@/type/eventType";
import Link from "next/link";
import EditEventDialog from "@/components/events/EditEventDialog";
import DeleteEventDialog from "@/components/events/DeleteEventDialog";
import {
    CalendarDays,
    MapPin,
    Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card";

const MONTHS = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December",
];

/* Parse YYYY-MM-DD manually so the displayed date never shifts across
   timezones — unlike new Date().toLocaleDateString(), which can render
   the previous day in negative UTC offsets. */
function formatEventDate(date: string) {
    const [year, month, day] = date.split("-").map(Number);
    if (!year || !month || !day) return date;
    return `${MONTHS[month - 1]} ${day}, ${year}`;
}

const ManageUserEventCard = ({
    userEvent,
}: {
    userEvent: TEvent;
}) => {
    const [imageFailed, setImageFailed] = useState(false);

    return (
        <Card className="group overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5">

            {/* Event Thumbnail */}
            <div className="relative h-48 w-full overflow-hidden sm:h-52">
                {imageFailed ? (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-500 to-emerald-700">
                        <CalendarDays size={44} strokeWidth={1.5} className="text-white/75" />
                    </div>
                ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={userEvent.thumbnail}
                        alt={userEvent.title}
                        loading="lazy"
                        onError={() => setImageFailed(true)}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                <Badge className="absolute left-4 top-4 border-0 bg-emerald-50 px-3 py-1 text-emerald-700 hover:bg-emerald-100">
                    {userEvent.eventType}
                </Badge>

                <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="line-clamp-1 text-xl font-bold text-white">
                        {userEvent.title}
                    </h3>
                </div>
            </div>

            {/* Event Information */}
            <CardContent className="space-y-4 p-4 sm:p-5">

                <p className="line-clamp-2 min-h-10 text-sm leading-6 text-gray-500">
                    {userEvent.description}
                </p>

                <div className="space-y-3">

                    <div className="flex items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                            <CalendarDays size={18} />
                        </div>

                        <div className="min-w-0">
                            <p className="text-xs text-gray-400">Event Date</p>
                            <p className="truncate text-sm font-medium text-gray-700">
                                {formatEventDate(userEvent.date)}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                            <MapPin size={18} />
                        </div>

                        <div className="min-w-0">
                            <p className="text-xs text-gray-400">Location</p>
                            <p className="truncate text-sm font-medium text-gray-700">
                                {userEvent.location}
                            </p>
                        </div>
                    </div>

                </div>
            </CardContent>

            {/* Action Buttons */}
            <CardFooter className="flex flex-wrap gap-2 border-t border-emerald-50 bg-emerald-50/30 p-4">

                <Button
                    render={<Link href={`/upcoming-events/${userEvent._id}`} />}
                    nativeButton={false}
                    size="sm"
                    className="h-9 flex-1 bg-emerald-600 text-white hover:bg-emerald-700"
                >
                    <Eye size={16} />
                    View Details
                </Button>

                <EditEventDialog userEvent={userEvent} />

                <DeleteEventDialog userEvent={userEvent} />

            </CardFooter>
        </Card>
    );
};

export default ManageUserEventCard;
