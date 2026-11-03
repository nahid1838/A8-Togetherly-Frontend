import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { ArrowRight, CalendarCheck, Sparkles } from "lucide-react";
import EventCard from "@/components/events/EventCard";
import { TEvent } from "@/type/eventType";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

type TJoinedEvent = {
    _id: string;
    userEmail: string;
    userName: string;
    userImageUrl: string;
    eventId: string;
    event: TEvent;
    joinedAt: string;
};

export const metadata: Metadata = {
    title: "Joined Events | Togetherly",
    description:
        "Every Togetherly event you've joined in one place — dates, places and details for the experiences you're part of.",
};

const JoinedEventsPage = async () => {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    const token = await getTokenFromServer();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/joined-events/${user?.email}`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
            cache: 'no-store'
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch your joined events");
    }

    const joins: TJoinedEvent[] = await res.json();

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
                        Your Commitments
                    </span>

                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Joined <span className="text-emerald-600">Events</span>
                    </h1>

                    <p className="mt-4 max-w-xl leading-7 text-slate-500">
                        Everything you&apos;ve said yes to — dates, places and
                        details for the events you&apos;re part of.
                    </p>
                </div>

                {/* Joined Events Grid / Empty State */}
                {joins.length > 0 ? (

                    <>
                        {/* Count Chip */}
                        <div className="mt-8 flex justify-center">
                            <div className="flex w-fit items-center gap-2 rounded-lg bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                                <CalendarCheck size={16} />
                                {joins.length}{" "}
                                {joins.length === 1 ? "Joined Event" : "Joined Events"}
                            </div>
                        </div>

                        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {joins.map((join) => (
                                <EventCard key={join._id} event={join.event} />
                            ))}
                        </div>
                    </>

                ) : (

                    /* Empty State */
                    <div className="mt-12 rounded-2xl border border-dashed border-emerald-200 bg-white px-6 py-16 text-center">
                        <CalendarCheck className="mx-auto size-10 text-emerald-600" strokeWidth={1.6} />

                        <h2 className="mt-4 text-xl font-bold text-slate-900">
                            No joined events yet
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            When you join an event, it shows up here — so you
                            never lose track of what&apos;s coming up.
                        </p>

                        <Link
                            href="/upcoming-events"
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition-colors hover:bg-emerald-700"
                        >
                            Browse Upcoming Events
                            <ArrowRight size={16} />
                        </Link>
                    </div>

                )}

            </div>
        </section>
    );
};

export default JoinedEventsPage;
