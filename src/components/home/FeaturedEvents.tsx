import { TEvent } from "@/type/eventType";
import EventCard from "../events/EventCard";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const FeaturedEvents = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/featured-events`
    );

    const featuredEvents = await res.json();

    return (
        <section className="relative overflow-hidden bg-[#FAFAF9] py-20 md:py-24">
            {/* Background Decoration */}
            <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-emerald-100/40 blur-3xl" />
            <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-amber-100/30 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Section Heading */}
                <div className="mb-12 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-2xl">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                            <Sparkles size={16} />
                            Discover What's Happening
                        </div>

                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                            Recent Upcoming{" "}
                            <span className="text-emerald-600">
                                Events
                            </span>
                        </h2>

                        <p className="mt-4 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
                            Find meaningful events happening around you.
                            Connect with people, share experiences, and make
                            a positive impact together.
                        </p>
                    </div>

                    <Link
                        href="/upcoming-events"
                        className="group inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-white px-6 py-3 text-sm font-semibold text-emerald-700 shadow-sm transition-all duration-300 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white"
                    >
                        Explore All Events
                        <ArrowRight
                            size={17}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </Link>
                </div>

                {/* Events Grid */}
                {featuredEvents.length > 0 ? (
                    <div className="grid grid-cols-1 items-stretch gap-7 sm:grid-cols-2 lg:grid-cols-3">
                        {featuredEvents.map((event: TEvent) => (
                            <div key={event._id} className="flex">
                                <EventCard event={event} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-3xl border border-dashed border-emerald-200 bg-white/70 px-6 py-16 text-center">
                        <Sparkles className="mx-auto mb-4 text-emerald-500" size={32} />
                        <h3 className="text-xl font-bold text-gray-800">
                            No Upcoming Events Yet
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                            New events will appear here as soon as they are created.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedEvents;