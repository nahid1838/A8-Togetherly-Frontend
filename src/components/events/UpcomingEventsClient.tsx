"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarX, LayoutGrid, Plus, Search, X } from "lucide-react";

import EventCard from "@/components/events/EventCard";
import { categories } from "@/components/home/EventCategories";
import { Input } from "@/components/ui/input";
import { TEvent } from "@/type/eventType";
import { cn } from "cn";

const filterTypes = [
    { label: "All", Icon: LayoutGrid },
    ...categories.map((category) => ({
        label: category.title,
        Icon: category.icon,
    })),
];

type Props = {
    events: TEvent[];
};

export default function UpcomingEventsClient({ events }: Props) {
    const [query, setQuery] = useState("");
    const [activeType, setActiveType] = useState("All");

    const trimmedQuery = query.trim().toLowerCase();

    const filteredEvents = events.filter((event) => {
        const matchesType =
            activeType === "All" || event.eventType === activeType;

        const matchesQuery =
            trimmedQuery === "" ||
            event.title.toLowerCase().includes(trimmedQuery) ||
            event.location.toLowerCase().includes(trimmedQuery) ||
            (event.description || "").toLowerCase().includes(trimmedQuery) ||
            event.eventType.toLowerCase().includes(trimmedQuery);

        return matchesType && matchesQuery;
    });

    const hasActiveFilters = trimmedQuery !== "" || activeType !== "All";

    const clearFilters = () => {
        setQuery("");
        setActiveType("All");
    };

    return (
        <div className="mt-10">

            {/* Search + Create Event */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <Input
                        type="search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search by title, location or category..."
                        aria-label="Search events"
                        className="h-11 rounded-full border-slate-200 bg-white pl-11 pr-4 focus-visible:border-emerald-400 focus-visible:ring-emerald-600/20"
                    />
                </div>

                <Link
                    href="/create-event"
                    className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition-colors hover:bg-emerald-700"
                >
                    <Plus className="size-4" />
                    Create Event
                </Link>
            </div>

            {events.length === 0 ? (
                /* No upcoming events at all */
                <div className="mt-8 rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
                    <CalendarX
                        className="mx-auto size-10 text-emerald-600"
                        strokeWidth={1.6}
                    />

                    <h2 className="mt-4 text-xl font-bold text-slate-900">
                        No upcoming events yet
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        Be the spark — create an event and bring people
                        together.
                    </p>

                    <Link
                        href="/create-event"
                        className="mt-6 inline-flex rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition-colors hover:bg-emerald-700"
                    >
                        Create an Event
                    </Link>
                </div>
            ) : (
                <>
                    {/* Event type filter buttons */}
                    <div className="mt-5 flex flex-wrap gap-2.5">
                        {filterTypes.map(({ label, Icon }) => {
                            const isActive = activeType === label;

                            return (
                                <button
                                    key={label}
                                    type="button"
                                    onClick={() => setActiveType(label)}
                                    aria-pressed={isActive}
                                    className={cn(
                                        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                                        isActive
                                            ? "border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                                            : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-700"
                                    )}
                                >
                                    <Icon className="size-4" />
                                    {label}
                                </button>
                            );
                        })}
                    </div>

                    {filteredEvents.length > 0 ? (
                        <>
                            {/* Result count + clear */}
                            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                                <p className="text-sm text-slate-500">
                                    Showing{" "}
                                    <span className="font-bold text-slate-800">
                                        {filteredEvents.length}
                                    </span>{" "}
                                    of {events.length} upcoming events
                                </p>

                                {hasActiveFilters && (
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-800"
                                    >
                                        <X className="size-4" />
                                        Clear filters
                                    </button>
                                )}
                            </div>

                            {/* Events Grid */}
                            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {filteredEvents.map((event) => (
                                    <EventCard
                                        key={event._id}
                                        event={event}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        /* Filters matched nothing */
                        <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-14 text-center">
                            <Search
                                className="mx-auto size-10 text-emerald-600"
                                strokeWidth={1.6}
                            />

                            <h2 className="mt-4 text-xl font-bold text-slate-900">
                                No events match your filters
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                Try a different search term or pick another
                                category.
                            </p>

                            <button
                                type="button"
                                onClick={clearFilters}
                                className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-emerald-300 hover:text-emerald-700"
                            >
                                <X className="size-4" />
                                Clear filters
                            </button>
                        </div>
                    )}
                </>
            )}

        </div>
    );
}
