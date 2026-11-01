
import { TEvent } from "@/type/eventType";
import Image from "next/image";
import Link from "next/link";
import {
    CalendarDays,
    MapPin,
    Eye,
    Pencil,
    Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card";

const ManageUserEventCard = ({
    userEvent,
}: {
    userEvent: TEvent;
}) => {
    return (
        <Card className="group overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            {/* Event Thumbnail */}
            <div className="relative h-48 w-full overflow-hidden sm:h-52">
                <Image
                    src={userEvent.thumbnail}
                    alt={userEvent.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

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
                                {new Date(userEvent.date).toLocaleDateString(
                                    "en-US",
                                    {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    }
                                )}
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
                    size="sm"
                    className="h-9 flex-1 bg-emerald-600 text-white hover:bg-emerald-700"
                >
                    <Link href={`/events/${userEvent._id}`}>
                        <Eye size={16} />
                        View Details
                    </Link>
                </Button>

                <Button
                    size="sm"
                    variant="outline"
                    className="h-9 flex-1 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                >
                    <Link href={`/edit-event/${userEvent._id}`}>
                        <Pencil size={15} />
                        Edit
                    </Link>
                </Button>

                <Button
                    size="icon"
                    variant="outline"
                    title="Delete Event"
                    className="size-9 shrink-0 border-red-200 text-red-500 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                >
                    <Trash2 size={16} />
                </Button>

            </CardFooter>
        </Card>
    );
};

export default ManageUserEventCard;