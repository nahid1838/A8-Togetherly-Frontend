import { Metadata } from "next";
import { Suspense } from "react";
import { Sparkles } from "lucide-react";
import UpcomingEventsClient from "@/components/events/UpcomingEventsClient";
import { TEvent } from "@/type/eventType";

export const metadata: Metadata = {
    title: "Upcoming Events | Togetherly",
    description:
        "Browse upcoming events on Togetherly — discover meetups, workshops, concerts and community gatherings happening near you.",
};

// Dynamic (uncached) fetch → must live inside a <Suspense> boundary with
// cacheComponents; the heading above it stays in the static shell.
async function UpcomingEventsContent() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/upcoming-events`,
        {
            cache: "no-store",
        }
    );

    const data = await res.json();
    const events: TEvent[] = Array.isArray(data) ? data : [];

    return <UpcomingEventsClient events={events} />;
}

const UpcomingEventsPage = () => {
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

                    <p className="mt-4 max-w-xl leading-7 text-gray-700 dark:text-gray-100">
                        Find your next experience — from tech meetups and
                        workshops to concerts and community gatherings.
                    </p>
                </div>

                {/* Search, category filters, grid and empty states */}
                <Suspense
                    fallback={
                        <div className="flex min-h-[40vh] items-center justify-center">
                            <div className="text-center">
                                <div className="mx-auto size-10 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600" />
                                <p className="mt-4 text-sm font-medium text-slate-500">
                                    Loading events...
                                </p>
                            </div>
                        </div>
                    }
                >
                    <UpcomingEventsContent />
                </Suspense>

            </div>
        </section>
    );
};

export default UpcomingEventsPage;
