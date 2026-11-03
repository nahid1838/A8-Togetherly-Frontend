
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "cn";
import { categories } from "@/components/home/EventCategories";
import { TEvent } from "@/type/eventType";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function parseDateString(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  if (!year || !month || !day) return null;
  return { year, month, day };
}

function EventCard({ event }: { event: TEvent }) {
  const [thumbnailFailed, setThumbnailFailed] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);

  const category = categories.find(
    (item) => item.title === event.eventType
  );

  const CategoryIcon = category?.icon ?? CalendarDays;
  const parsedDate = parseDateString(event.date);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5">

      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        {thumbnailFailed ? (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-500 to-emerald-700">
            <CategoryIcon size={44} strokeWidth={1.4} className="text-white/80" />
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.thumbnail}
            alt={event.title}
            loading="lazy"
            onError={() => setThumbnailFailed(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* Event Type Badge */}
        <span
          className={cn(
            "absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-md",
            category?.color ?? "bg-emerald-50 text-emerald-600"
          )}
        >
          <CategoryIcon size={14} strokeWidth={2} />
          {event.eventType}
        </span>

        {/* Date Tile */}
        {parsedDate && (
          <div className="absolute bottom-4 left-4 rounded-xl bg-white/95 px-3 py-1.5 text-center shadow-lg">
            <span className="block text-[11px] font-bold tracking-widest text-emerald-600 uppercase">
              {MONTHS[parsedDate.month - 1]}
            </span>
            <span className="block text-xl leading-tight font-extrabold text-slate-900">
              {parsedDate.day}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 text-lg font-bold text-slate-900 transition-colors group-hover:text-emerald-700">
          {event.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
          {event.description}
        </p>

        {/* Meta */}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
          <span className="flex min-w-0 items-center gap-1.5">
            <MapPin size={16} className="shrink-0 text-emerald-600" />
            <span className="truncate">{event.location}</span>
          </span>

          <span className="flex items-center gap-1.5">
            <CalendarDays size={16} className="shrink-0 text-emerald-600" />
            {parsedDate
              ? `${MONTHS[parsedDate.month - 1]} ${parsedDate.day}, ${parsedDate.year}`
              : event.date}
          </span>
        </div>

        {/* Event Creator */}
        <div className="mt-5 flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3">
          {/* Avatar */}
          <div className="size-10 shrink-0 overflow-hidden rounded-full border-2 border-white bg-emerald-100 shadow-sm">
            {event?.userImageUrl && !avatarFailed ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={event?.userImageUrl}
                alt={event?.userName}
                onError={() => setAvatarFailed(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm font-bold text-emerald-700">
                {event?.userName.charAt(0).toUpperCase() || <UserRound size={18} />}
              </div>
            )}
          </div>

          {/* Creator Details */}
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
              Organized by
            </p>
            <p className="truncate text-sm font-bold text-slate-800">
              {event?.userName || "Anonymous"}
            </p>
          </div>

          <div className="shrink-0 rounded-full bg-emerald-100 p-2 text-emerald-700">
            <UserRound size={15} />
          </div>
        </div>

        {/* View Event */}
        <div className="mt-5 flex-1" />

        <Button
          render={<Link href={`/upcoming-events/${event._id}`} />}
          nativeButton={false}
          size="sm"
          className="h-10 w-full rounded-xl border border-emerald-600 bg-emerald-600 text-sm font-semibold text-white transition-colors hover:border-emerald-700 hover:bg-emerald-700 hover:text-white dark:border-emerald-500 dark:bg-emerald-600 dark:text-white dark:hover:border-emerald-400 dark:hover:bg-emerald-500"
        >
          View Event
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Button>
      </div>
    </article>
  );
}

export default EventCard;
