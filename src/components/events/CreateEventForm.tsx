"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AlignLeft,
  ArrowRight,
  CalendarDays,
  CalendarPlus,
  CheckCircle2,
  ImagePlus,
  MapPin,
  Megaphone,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { cn } from "cn";
import { categories } from "@/components/home/EventCategories";

const DESCRIPTION_MAX_LENGTH = 500;

const benefits = [
  "Reach people who already care about your cause",
  "Collect RSVPs and share updates in one place",
  "Grow a community around what you love",
];

/* Local today as YYYY-MM-DD for the date input's `min`.
   Only called from an effect or an event handler — never during render,
   which would block prerendering under Next 16's cacheComponents. */
function getTodayISO() {
  const now = new Date();
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

export default function CreateEventForm() {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [eventType, setEventType] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [thumbnailError, setThumbnailError] = useState(false);

  // Effects never run during prerender, so `new Date()` is safe here;
  // writing the DOM attribute directly avoids setState-in-effect (lint rule).
  // Once set, the native picker rejects past dates.
  useEffect(() => {
    if (dateInputRef.current) {
      dateInputRef.current.min = getTodayISO();
    }
  }, []);

  const selectedCategory = categories.find(
    (category) => category.title === eventType
  );

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const event = Object.fromEntries(formData.entries()) as {
      title: string;
      description: string;
      eventType: string;
      thumbnail: string;
      location: string;
      date: string;
    };

    // The date input's `min` already blocks past dates in the picker —
    // double-check here too so nothing slips through (e.g. autofill),
    // using a fresh value in case the page was left open past midnight.
    if (event.date < getTodayISO()) {
      // TODO: give your own feedback here, e.g. toast.error("Please pick a future date")
      return;
    }

    // TODO: implement the rest yourself, for example:
    // 1. Validate the fields
    // 2. POST the event to your API / MongoDB
    // 3. toast.success("Event created!")
    // 4. router.push("/manage-events")
    console.log("New event:", event);
  };

  return (
    <section className="relative overflow-hidden bg-[#FAFAF9] px-5 py-16 md:px-8 lg:py-24">
      {/* Background Decorations */}
      <div className="absolute -right-40 -top-40 h-[450px] w-[450px] rounded-full bg-emerald-100/50 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-orange-100/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">

        {/* Left Panel — Branding */}
        <div className="hidden lg:block">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#047857] to-[#059669] p-10 shadow-2xl shadow-emerald-900/15">
            {/* Decorative Circles */}
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border-[40px] border-white/5" />
            <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-100">
                <Sparkles size={16} />
                Host with Togetherly
              </span>

              <h2 className="mt-6 text-3xl leading-tight font-extrabold tracking-tight text-white xl:text-4xl">
                Turn Your Idea Into
                <span className="mt-1 block text-emerald-200">A Gathering.</span>
              </h2>

              <p className="mt-5 max-w-md text-base leading-7 text-emerald-100/80">
                Fill in the details below and your event will be ready to share
                with a community that wants to show up.
              </p>

              <ul className="mt-8 space-y-4">
                {benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-3 text-sm leading-6 text-emerald-50"
                  >
                    <CheckCircle2
                      size={19}
                      className="mt-0.5 shrink-0 text-emerald-200"
                    />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Panel — Form Card */}
        <div className="mx-auto w-full max-w-xl">
          <div className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-2xl shadow-emerald-950/5 sm:p-10">

            {/* Route — not interested in creating? */}
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3 text-sm">
              <span className="text-slate-500">Not interested in creating?</span>
              <Link
                href="/upcoming-events"
                className="group inline-flex items-center gap-1.5 font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
              >
                Browse Upcoming Events
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            {/* Card Header */}
            <div className="mt-6 flex flex-col items-center text-center">
              <span className="relative grid size-12 place-items-center rounded-[17px] bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
                <CalendarPlus className="size-6" strokeWidth={2.1} />
                <span className="absolute -right-1 -top-1 size-3 rounded-full border-2 border-white bg-amber-400" />
              </span>

              <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Create a new event
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Share the details — what, where and when.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleOnSubmit} className="mt-8 space-y-5">

              {/* Event Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="font-semibold text-slate-700">
                  Event Title
                </Label>
                <div className="relative">
                  <Megaphone
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600"
                  />
                  <Input
                    id="title"
                    type="text"
                    name="title"
                    placeholder="e.g. Community Tech Meetup"
                    required
                    minLength={5}
                    maxLength={100}
                    className="h-11 rounded-xl border-slate-200 bg-slate-50/60 pl-11 text-sm focus-visible:border-emerald-600 focus-visible:ring-emerald-600/20"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="description"
                    className="font-semibold text-slate-700"
                  >
                    Description
                  </Label>
                  <span
                    className={cn(
                      "text-xs font-medium tabular-nums",
                      description.length >= DESCRIPTION_MAX_LENGTH * 0.9
                        ? "text-amber-500"
                        : "text-slate-400"
                    )}
                  >
                    {description.length}/{DESCRIPTION_MAX_LENGTH}
                  </span>
                </div>
                <div className="relative">
                  <AlignLeft
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-3 text-emerald-600"
                  />
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="What's this event about? Tell people what to expect..."
                    required
                    minLength={20}
                    maxLength={DESCRIPTION_MAX_LENGTH}
                    rows={4}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    className="min-h-28 rounded-xl border-slate-200 bg-slate-50/60 pl-11 text-sm focus-visible:border-emerald-600 focus-visible:ring-emerald-600/20"
                  />
                </div>
              </div>

              {/* Event Type */}
              <div className="space-y-2">
                <Label
                  htmlFor="eventType"
                  className="font-semibold text-slate-700"
                >
                  Event Type
                </Label>
                <Select
                  name="eventType"
                  required
                  value={eventType}
                  onValueChange={(value) => setEventType(value ?? "")}
                >
                  <SelectTrigger
                    id="eventType"
                    className={cn(
                      "h-11 w-full rounded-xl border-slate-200 bg-slate-50/60 px-3.5 text-sm hover:border-slate-300 focus-visible:border-emerald-600 focus-visible:ring-emerald-600/20",
                      !eventType && "text-slate-400"
                    )}
                  >
                    {selectedCategory ? (
                      <span className="flex items-center gap-2.5">
                        <span
                          className={cn(
                            "grid size-7 shrink-0 place-items-center rounded-lg",
                            selectedCategory.color
                          )}
                        >
                          <selectedCategory.icon
                            size={15}
                            strokeWidth={1.9}
                          />
                        </span>
                        {selectedCategory.title}
                      </span>
                    ) : (
                      "Select event type"
                    )}
                  </SelectTrigger>
                  <SelectContent className="max-h-72 p-1.5">
                    {categories.map((category) => {
                      const Icon = category.icon;

                      return (
                        <SelectItem
                          key={category.title}
                          value={category.title}
                          className="py-2 pl-2 pr-8"
                        >
                          <span className="flex items-center gap-2.5">
                            <span
                              className={cn(
                                "grid size-7 shrink-0 place-items-center rounded-lg",
                                category.color
                              )}
                            >
                              <Icon size={15} strokeWidth={1.9} />
                            </span>
                            {category.title}
                          </span>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Thumbnail Image URL */}
              <div className="space-y-2">
                <Label
                  htmlFor="thumbnail"
                  className="font-semibold text-slate-700"
                >
                  Thumbnail Image URL
                </Label>
                <div className="relative">
                  <ImagePlus
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600"
                  />
                  <Input
                    id="thumbnail"
                    type="url"
                    name="thumbnail"
                    placeholder="https://example.com/event-cover.jpg"
                    required
                    value={thumbnail}
                    onChange={(event) => {
                      setThumbnail(event.target.value);
                      setThumbnailError(false);
                    }}
                    className="h-11 rounded-xl border-slate-200 bg-slate-50/60 pl-11 text-sm focus-visible:border-emerald-600 focus-visible:ring-emerald-600/20"
                  />
                </div>

                {/* Live Preview */}
                {thumbnail && !thumbnailError && (
                  <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={thumbnail}
                      alt="Event thumbnail preview"
                      onError={() => setThumbnailError(true)}
                      className="h-36 w-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Location + Event Date */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="location"
                    className="font-semibold text-slate-700"
                  >
                    Location
                  </Label>
                  <div className="relative">
                    <MapPin
                      size={18}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600"
                    />
                    <Input
                      id="location"
                      type="text"
                      name="location"
                      placeholder="e.g. Dhaka, Bangladesh"
                      required
                      maxLength={120}
                      className="h-11 rounded-xl border-slate-200 bg-slate-50/60 pl-11 text-sm focus-visible:border-emerald-600 focus-visible:ring-emerald-600/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date" className="font-semibold text-slate-700">
                    Event Date
                  </Label>
                  <div className="relative">
                    <CalendarDays
                      size={18}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600"
                    />
                    <Input
                      ref={dateInputRef}
                      id="date"
                      type="date"
                      name="date"
                      required
                      className="h-11 rounded-xl border-slate-200 bg-slate-50/60 pl-11 text-sm focus-visible:border-emerald-600 focus-visible:ring-emerald-600/20"
                    />
                  </div>
                  <p className="text-xs text-slate-400">
                    Today or any future date — past dates are blocked.
                  </p>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                className="h-12 w-full rounded-xl bg-[#059669] text-white shadow-lg shadow-emerald-600/20 hover:bg-[#047857]"
              >
                Create Event
                <ArrowRight size={18} />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
