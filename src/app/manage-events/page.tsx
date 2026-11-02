
import ManageUserEventCard from "@/components/events/ManageUserEventCard";
import { auth } from "@/lib/auth";
import { TEvent } from "@/type/eventType";
import { headers } from "next/headers";
import Link from "next/link";
import { Plus, CalendarDays, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const ManageEventsPage = async () => {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/event/${user?.email}`,
        { cache: "no-store" }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch your events");
    }

    const userEvents: TEvent[] = await res.json();

    return (
        <div className="mx-auto min-h-screen w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">

            {/* Intro Section */}
            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 p-6 shadow-lg sm:p-8 lg:p-10">

                {/* Decorative Elements */}
                <div className="absolute -right-16 -top-20 size-64 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute -bottom-24 right-1/3 size-60 rounded-full bg-teal-300/20 blur-3xl" />

                <div className="relative z-10 flex flex-col gap-7 md:flex-row md:items-center md:justify-between">

                    {/* Text Content */}
                    <div className="max-w-2xl">

                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-emerald-50">
                            <Sparkles size={15} />
                            Your Event Management Space
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                            Manage Your Events
                        </h1>

                        <p className="mt-3 max-w-xl text-sm leading-7 text-emerald-50 sm:text-base">
                            Every great connection starts with an event.
                            Keep your events organized, manage their details,
                            and create more opportunities to bring people
                            together with Togetherly.
                        </p>

                    </div>

                    {/* Create Event Button */}
                    <div className="shrink-0">
                        <Button
                            render={<Link href="/create-event" />}
                            nativeButton={false}
                            size="lg"
                            className="h-12 w-full rounded-xl bg-white px-6 font-semibold text-emerald-700 shadow-md transition-all hover:bg-emerald-50 hover:shadow-lg sm:w-auto"
                        >
                            <Plus size={19} />
                            Create New Event
                        </Button>
                    </div>

                </div>
            </section>

            {/* Events Section */}
            <section className="space-y-6">

                {/* Section Heading */}
                <div className="flex flex-col gap-2 border-b border-gray-100 pb-5 sm:flex-row sm:items-end sm:justify-between">

                    <div>
                        <div className="mb-2 flex items-center gap-2 text-emerald-600">
                            <CalendarDays size={18} />
                            <span className="text-sm font-semibold">
                                Event Dashboard
                            </span>
                        </div>

                        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                            Your Created Events
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            All your events in one place. View, edit and
                            manage them easily.
                        </p>
                    </div>

                    <div className="flex w-fit items-center gap-2 rounded-lg bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                        <CalendarDays size={16} />
                        {userEvents.length} Events
                    </div>

                </div>

                {/* Event Cards */}
                {userEvents.length > 0 ? (

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
                        {userEvents.map((userEvent) => (
                            <ManageUserEventCard
                                key={userEvent._id}
                                userEvent={userEvent}
                            />
                        ))}
                    </div>

                ) : (

                    /* Empty State */
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/40 px-5 py-14 text-center sm:py-20">

                        <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                            <CalendarDays size={30} />
                        </div>

                        <h3 className="text-xl font-bold text-gray-800">
                            No Events Yet!
                        </h3>

                        <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                            You haven&apos;t created any events yet.
                            Start something meaningful, invite people,
                            and build stronger connections with Togetherly.
                        </p>

                        <Button
                            render={<Link href="/create-event" />}
                            nativeButton={false}
                            className="mt-6 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
                        >
                            <Plus size={18} />
                            Create Your First Event
                        </Button>

                    </div>

                )}

            </section>

        </div>
    );
};

export default ManageEventsPage;