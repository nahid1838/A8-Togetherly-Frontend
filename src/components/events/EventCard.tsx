"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "cn";
import { categories } from "@/components/home/EventCategories";
import { TEvent } from "@/type/eventType";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/* Parse YYYY-MM-DD manually so the displayed date never shifts across
   server/client timezones — no Date object, no clock read (which would
   block prerendering under Next 16's cacheComponents). */
function parseDateString(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  if (!year || !month || !day) return null;
  return { year, month, day };
}

function EventCard({ event }: { event: TEvent }) {
  const [thumbnailFailed, setThumbnailFailed] = useState(false);

  const category = categories.find((item) => item.title === event.eventType);
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

        {/* View Event */}
        <div className="mt-5 flex-1" />

        <Button
          render={<Link href={`/events/${event._id}`} />}
          nativeButton={false}
          variant="outline"
          size="sm"
          className="h-10 w-full rounded-xl border-emerald-200 bg-emerald-50 text-sm font-semibold text-emerald-700 transition-colors hover:border-emerald-600 hover:bg-emerald-600 hover:text-white"
        >
          View Event
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </Button>
      </div>

    </article>
  );
}

export default EventCard;
