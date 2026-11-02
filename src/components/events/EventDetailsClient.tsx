
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    CalendarCheck,
    MapPin,
    Users,
    CheckCircle2,
    Loader2,
    Mail,
    Share2,
    Sparkles,
    UserRound,
    UserRoundCheck,
    Ticket,
} from "lucide-react";

import { TEvent, TEventJoin } from "@/type/eventType";
import { categories } from "@/components/home/EventCategories";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { cn } from "cn";

const MONTHS = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December",
];

/* Small circular avatar: image with an initials-gradient fallback. */
function UserAvatar({
    src,
    name,
    className,
}: {
    src?: string;
    name: string;
    className?: string;
}) {
    const [failed, setFailed] = useState(false);

    if (src && !failed) {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={src}
                alt={name || "Attendee"}
                onError={() => setFailed(true)}
                className={cn("size-8 shrink-0 rounded-full object-cover", className)}
            />
        );
    }

    return (
        <span
            className={cn(
                "grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-xs font-bold text-white",
                className
            )}
        >
            {(name || "?").trim().charAt(0).toUpperCase() || "?"}
        </span>
    );
}

function EventDetailsClient({
    event,
    initialJoins,
}: {
    event: TEvent;
    initialJoins: TEventJoin[];
}) {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const [joins, setJoins] = useState<TEventJoin[]>(initialJoins);
    const [isJoining, setIsJoining] = useState(false);
    const [imageFailed, setImageFailed] = useState(false);

    const email = session?.user?.email;
    const joined =
        Boolean(email) && joins.some((join) => join.userEmail === email);

    const category = categories.find(
        (item) => item.title === event.eventType
    );

    const CategoryIcon = category?.icon ?? Sparkles;

    const [year, month, day] = event.date.split("-").map(Number);

    const formattedDate =
        year && month && day
            ? `${MONTHS[month - 1]} ${day}, ${year}`
            : event.date;

    const handleJoin = async () => {
        if (isPending || isJoining) return;

        // Not logged in → send to login instead of faking a join.
        if (!email) {
            router.push("/login");
            return;
        }

        setIsJoining(true);

        try {
            if (joined) {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/joined-events/${event._id}/${email}`,
                    { method: "DELETE" }
                );
                if (!res.ok) throw new Error("Failed to leave the event");

                setJoins((prev) =>
                    prev.filter((join) => join.userEmail !== email)
                );
                toast.success("You left the event");
            } else {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/joined-events`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            userEmail: email,
                            userName: session?.user?.name ?? "",
                            userImageUrl: session?.user?.image ?? "",
                            event,
                        }),
                    }
                );
                if (!res.ok) throw new Error("Failed to join the event");

                setJoins((prev) => [
                    ...prev,
                    {
                        _id: `local-${email}`,
                        userEmail: email,
                        userName: session?.user?.name ?? "",
                        userImageUrl: session?.user?.image ?? "",
                    },
                ]);
                toast.success("You joined this event 🎉");
            }
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsJoining(false);
        }
    };

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
        } catch (error) {
            console.error("Unable to copy event link:", error);
        }
    };

    const joinButtonClass = cn(
        "h-12 w-full rounded-xl text-sm font-bold transition-all",
        joined
            ? "bg-slate-100 text-emerald-700 hover:bg-slate-200"
            : "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700"
    );

    const joinButtonContent = isJoining ? (
        <>
            <Loader2 size={18} className="animate-spin" />
            {joined ? "Leaving…" : "Joining…"}
        </>
    ) : joined ? (
        <>
            <CheckCircle2 size={18} />
            Joined (Click to Leave)
        </>
    ) : (
        <>
            Join Now
            <ArrowRight size={18} />
        </>
    );

    return (
        <main className="min-h-screen bg-[#FAFAF9] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">

            <div className="mx-auto max-w-7xl">

                {/* Back Navigation */}
                <div className="mb-7 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
                    <Link
                        href="/upcoming-events"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-emerald-600"
                    >
                        <ArrowLeft size={18} />
                        Back to Events
                    </Link>

                    <button
                        onClick={handleShare}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-emerald-300 hover:text-emerald-600"
                    >
                        <Share2 size={16} />
                        Share Event
                    </button>
                </div>

                {/* Hero Section */}
                <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                    <div className="relative flex min-h-[260px] flex-col justify-end overflow-hidden sm:min-h-[380px] lg:min-h-[480px]">

                        {!imageFailed && event.thumbnail ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={event.thumbnail}
                                alt={event.title}
                                onError={() => setImageFailed(true)}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-500 to-emerald-800">
                                <CategoryIcon size={80} className="text-white/70" />
                            </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />

                        <div className="relative w-full p-6 sm:p-10">

                            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-xs font-bold text-white backdrop-blur-md">
                                <CategoryIcon size={15} />
                                {event.eventType}
                            </span>

                            <h1 className="max-w-4xl break-words text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                                {event.title}
                            </h1>

                            <div className="mt-5 flex flex-wrap items-center gap-4 break-words text-sm font-medium text-white/90">

                                <span className="flex items-center gap-2">
                                    <CalendarDays size={17} />
                                    {formattedDate}
                                </span>

                                <span className="flex items-center gap-2">
                                    <MapPin size={17} />
                                    {event.location}
                                </span>

                            </div>
                        </div>
                    </div>

                    {/* Event Summary */}
                    <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">

                        <div className="flex items-center gap-4 p-5 sm:p-7">
                            <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600">
                                <CalendarCheck size={23} />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-slate-400">
                                    Event Date
                                </p>
                                <p className="mt-1 text-sm font-bold text-slate-800">
                                    {formattedDate}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-5 sm:p-7">
                            <div className="rounded-2xl bg-orange-50 p-3 text-orange-500">
                                <MapPin size={23} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-medium text-slate-400">
                                    Location
                                </p>
                                <p className="mt-1 truncate text-sm font-bold text-slate-800">
                                    {event.location}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-5 sm:p-7">
                            <div className="rounded-2xl bg-blue-50 p-3 text-blue-500">
                                <Ticket size={23} />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-slate-400">
                                    Event Category
                                </p>
                                <p className="mt-1 text-sm font-bold text-slate-800">
                                    {event.eventType}
                                </p>
                            </div>
                        </div>

                    </div>
                </section>

                {/* Main Content */}
                <div className="mt-8 grid gap-8 lg:grid-cols-3">

                    {/* Left Content */}
                    <div className="space-y-8 lg:col-span-2">

                        {/* About Event */}
                        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                            <div className="mb-6 flex items-center gap-3">
                                <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
                                    <Sparkles size={21} />
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">
                                        About This Event
                                    </h2>
                                    <p className="text-sm text-slate-400">
                                        Everything you need to know
                                    </p>
                                </div>
                            </div>

                            <p className="whitespace-pre-line break-words text-sm leading-8 text-slate-600 sm:text-base">
                                {event.description}
                            </p>

                        </section>

                        {/* Who's Joined */}
                        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                            <div className="mb-6 flex items-center gap-3">
                                <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
                                    <UserRoundCheck size={21} />
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">
                                        Who&apos;s Joined
                                    </h2>
                                    <p className="text-sm text-slate-400">
                                        People attending this event
                                    </p>
                                </div>

                                <span className="ml-auto rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                                    {joins.length}{" "}
                                    {joins.length === 1 ? "Person" : "People"}
                                </span>
                            </div>

                            {joins.length > 0 ? (
                                <div className="flex flex-wrap gap-2.5">
                                    {joins.map((join) => {
                                        const isYou =
                                            Boolean(email) &&
                                            join.userEmail === email;

                                        return (
                                            <span
                                                key={join.userEmail}
                                                className={cn(
                                                    "flex items-center gap-2 rounded-full border py-1 pl-1 pr-3 text-sm font-semibold",
                                                    isYou
                                                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                                        : "border-slate-100 bg-slate-50 text-slate-700"
                                                )}
                                            >
                                                <UserAvatar
                                                    src={join.userImageUrl}
                                                    name={join.userName}
                                                    className="size-7 text-[11px]"
                                                />
                                                <span className="max-w-[150px] truncate">
                                                    {isYou
                                                        ? "You"
                                                        : join.userName ||
                                                          join.userEmail.split(
                                                              "@"
                                                          )[0]}
                                                </span>
                                            </span>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-4 py-6 text-center text-sm text-slate-500">
                                    No one has joined yet — open a spot by
                                    being the first!
                                </p>
                            )}

                        </section>

                        {/* Event Location */}
                        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                            <div className="mb-5 flex items-center gap-3">
                                <div className="rounded-xl bg-orange-50 p-2.5 text-orange-500">
                                    <MapPin size={21} />
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">
                                        Event Location
                                    </h2>
                                    <p className="text-sm text-slate-400">
                                        Where the event takes place
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-5">
                                <MapPin className="mt-1 shrink-0 text-emerald-600" size={20} />
                                <div>
                                    <p className="break-words font-bold text-slate-800">
                                        {event.location}
                                    </p>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Event venue and meeting location
                                    </p>
                                </div>
                            </div>

                        </section>

                        {/* Organizer Information */}
                        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                            <div className="mb-6 flex items-center gap-3">
                                <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                                    <Users size={21} />
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">
                                        Event Organizer
                                    </h2>
                                    <p className="text-sm text-slate-400">
                                        Meet the person behind this event
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-5 rounded-2xl border border-slate-100 bg-slate-50/70 p-5 sm:flex-row sm:items-center">


                                {/* Organizer Avatar */}
                                <div className="size-20 shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-emerald-100 shadow-sm">
                                    {event.userImageUrl ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={event.userImageUrl}
                                            alt={event.userName || "Event Organizer"}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-2xl font-bold text-emerald-700">
                                            {(event.userName || "U").charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>

                                {/* Organizer Details */}
                                <div className="min-w-0 flex-1">
                                    <h3 className="break-words text-lg font-bold text-slate-900">
                                        {event.userName || "Anonymous"}
                                    </h3>

                                    {event.userEmail && (
                                        <p className="mt-2 flex items-center gap-2 break-all text-sm text-slate-500">
                                            <Mail
                                                size={15}
                                                className="shrink-0"
                                            />
                                            {event.userEmail}
                                        </p>
                                    )}

                                    <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-emerald-600">
                                        Event Organizer
                                    </p>
                                </div>


                            </div>
                        </section>

                    </div>

                    {/* Right Sidebar */}
                    <aside className="space-y-6">

                        {/* Join Event Card */}
                        <section className="lg:sticky lg:top-24 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                            <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-emerald-800 p-6 text-white">

                                <div className="absolute -right-10 -top-10 size-36 rounded-full bg-white/10 blur-2xl" />

                                <div className="relative">
                                    <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white">
                                        <Sparkles size={14} />
                                        Be Part of It
                                    </span>

                                    <h2 className="mt-5 text-2xl font-extrabold">
                                        Don&apos;t Miss Out!
                                    </h2>

                                    <p className="mt-2 text-sm leading-6 text-emerald-50">
                                        Join this event and connect with people who share your interests.
                                    </p>
                                </div>
                            </div>

                            <div className="p-6">

                                <div className="mb-5 flex items-center justify-between gap-4">
                                    <div className="min-w-0 break-words">
                                        <p className="text-xs text-slate-400">
                                            Event Date
                                        </p>
                                        <p className="mt-1 font-bold text-slate-800">
                                            {formattedDate}
                                        </p>
                                    </div>

                                    <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                                        <CalendarDays size={22} />
                                    </div>
                                </div>

                                {/* Joined Count + Avatars */}
                                {joins.length > 0 ? (
                                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                                        <div className="flex -space-x-2.5">
                                            {joins.slice(0, 6).map((join) => (
                                                <UserAvatar
                                                    key={join.userEmail}
                                                    src={join.userImageUrl}
                                                    name={join.userName}
                                                    className="ring-2 ring-white"
                                                />
                                            ))}

                                            {joins.length > 6 && (
                                                <span className="grid size-8 place-items-center rounded-full bg-emerald-100 text-[11px] font-bold text-emerald-700 ring-2 ring-white">
                                                    +{joins.length - 6}
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-xs font-semibold text-slate-500">
                                            {joins.length}{" "}
                                            {joins.length === 1
                                                ? "person"
                                                : "people"}{" "}
                                            joined
                                        </p>
                                    </div>
                                ) : (
                                    <p className="mb-5 text-xs font-semibold text-slate-400">
                                        Be the first to join this event
                                    </p>
                                )}

                                <Button
                                    onClick={handleJoin}
                                    disabled={isPending || isJoining}
                                    className={joinButtonClass}
                                >
                                    {joinButtonContent}
                                </Button>

                                <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                                    {joined
                                        ? "You've joined this event — click the button again to leave."
                                        : "Be part of an amazing experience. Join today!"}
                                </p>

                            </div>
                        </section>

                        {/* Quick Information */}
                        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

                            <h3 className="mb-5 font-bold text-slate-900">
                                Event Information
                            </h3>

                            <div className="space-y-5">

                                <div className="flex items-center gap-3">
                                    <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
                                        <CalendarDays size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Date
                                        </p>
                                        <p className="text-sm font-semibold text-slate-800">
                                            {formattedDate}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="rounded-xl bg-orange-50 p-2.5 text-orange-500">
                                        <MapPin size={18} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-slate-400">
                                            Location
                                        </p>
                                        <p className="truncate text-sm font-semibold text-slate-800">
                                            {event.location}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="rounded-xl bg-blue-50 p-2.5 text-blue-500">
                                        <UserRound size={18} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-slate-400">
                                            Organized By
                                        </p>
                                        <p className="truncate text-sm font-semibold text-slate-800">
                                            {event?.userName || "Anonymous"}
                                        </p>
                                    </div>
                                </div>

                            </div>

                        </section>

                    </aside>
                </div>

                {/* Bottom CTA */}
                <section className="mt-10 overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 px-6 py-10 text-center text-white sm:px-12">

                    <Sparkles className="mx-auto mb-4" size={30} />

                    <h2 className="text-2xl font-extrabold sm:text-3xl">
                        Great Experiences Start With You!
                    </h2>

                    <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-emerald-50">
                        Discover more exciting events, meet new people and make unforgettable memories with Togetherly.
                    </p>

                    <Link
                        href="/upcoming-events"
                        className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-emerald-700 shadow-lg transition hover:bg-emerald-50"
                    >
                        Explore More Events
                        <ArrowRight size={17} />
                    </Link>

                </section>

            </div>

            {/* Mobile/tablet: sticky bottom join bar (sidebar card is only sticky on lg+) */}
            <div
                className="sticky bottom-0 z-40 mt-8 border-t border-slate-200 bg-white/95 px-4 pt-3 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur-md lg:hidden"
                style={{
                    paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))",
                }}
            >
                <Button
                    onClick={handleJoin}
                    disabled={isPending || isJoining}
                    className={joinButtonClass}
                >
                    {joinButtonContent}
                </Button>
            </div>
        </main>
    );
}

export default EventDetailsClient;
