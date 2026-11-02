import { TEvent, TEventJoin } from "@/type/eventType";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import EventDetailsClient from "@/components/events/EventDetailsClient";

type Props = {
    params: Promise<{ id: string }>;
};

async function getEvent(id: string): Promise<TEvent | null> {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/events/${id}`,
            {
                cache: "no-store",
            }
        );

        if (!res.ok) return null;

        return await res.json();
    } catch (error) {
        console.error("Failed to fetch event:", error);
        return null;
    }
}

async function getEventJoins(id: string): Promise<TEventJoin[]> {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/joined-events/event/${id}`,
            {
                cache: "no-store",
            }
        );

        if (!res.ok) return [];

        const joins = await res.json();
        return Array.isArray(joins) ? joins : [];
    } catch (error) {
        console.error("Failed to fetch event joins:", error);
        return [];
    }
}

async function EventDetailsContent({ id }: { id: string }) {
    const [event, joins] = await Promise.all([
        getEvent(id),
        getEventJoins(id),
    ]);

    if (!event) {
        notFound();
    }

    return <EventDetailsClient event={event} initialJoins={joins} />;
}

export default async function EventDetailsPage({ params }: Props) {
    const { id } = await params;

    return (
        <Suspense
            fallback={
                <div className="flex min-h-[60vh] items-center justify-center">
                    <div className="text-center">
                        <div className="mx-auto size-10 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600" />
                        <p className="mt-4 text-sm font-medium text-slate-500">
                            Loading event details...
                        </p>
                    </div>
                </div>
            }
        >
            <EventDetailsContent id={id} />
        </Suspense>
    );
}
