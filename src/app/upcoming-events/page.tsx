import { Metadata } from "next";
import Link from "next/link";
import { CalendarX, Sparkles } from "lucide-react";
import EventCard from "@/components/events/EventCard";
import { TEvent } from "@/type/eventType";

export const metadata: Metadata = {
    title: "Upcoming Events | Togetherly",
    description:
        "Browse upcoming events on Togetherly — discover meetups, workshops, concerts and community gatherings happening near you.",
};

const UpcomingEventsPage = async () => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`);
    const events = await res.json();

    return (
        <section className="relative overflow-hidden bg-[#FAFAF9] px-5 py-16 md:px-8 lg:py-20">
            {/* Background Decorations */}
            <div className="absolute -right-40 -top-40 h-[450px] w-[450px] rounded-full bg-emerald-100/50 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-orange-100/40 blur-3xl" />

            <div className="relative mx-auto max-w-7xl">

                {/* Section Heading */}
                <div className="flex flex-col items-center text-center">
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                        <Sparkles size={15} />
                        What&apos;s Happening Next
                    </span>

                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Upcoming <span className="text-emerald-600">Events</span>
                    </h1>

                    <p className="mt-4 max-w-xl leading-7 text-slate-500">
                        Find your next experience — from tech meetups and
                        workshops to concerts and community gatherings.
                    </p>
                </div>

                {/* Events Grid / Empty State */}
                {events.length > 0 ? (
                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {
                            events.map((event: TEvent) => <EventCard key={event._id} event={event} />)
                        }
                    </div>
                ) : (
                    <div className="mt-12 rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
                        <CalendarX className="mx-auto size-10 text-emerald-600" strokeWidth={1.6} />

                        <h2 className="mt-4 text-xl font-bold text-slate-900">
                            No upcoming events yet
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Be the spark — create an event and bring people together.
                        </p>

                        <Link
                            href="/create-event"
                            className="mt-6 inline-flex rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition-colors hover:bg-emerald-700"
                        >
                            Create an Event
                        </Link>
                    </div>
                )}

            </div>
        </section>
    );
};

export default UpcomingEventsPage;
