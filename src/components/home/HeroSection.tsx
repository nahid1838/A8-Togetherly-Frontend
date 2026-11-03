
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Sparkles,
  Users,
  Heart,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 transition-colors duration-300 dark:bg-[#0b1713] md:py-20 lg:py-24">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -right-40 -top-40 -z-10 size-[500px] rounded-full bg-emerald-100/70 blur-3xl dark:bg-emerald-900/20" />

      <div className="pointer-events-none absolute -bottom-40 -left-40 -z-10 size-[450px] rounded-full bg-green-100/70 blur-3xl dark:bg-green-900/20" />

      <div className="pointer-events-none absolute right-0 top-0 -z-10 h-[350px] w-[350px] rounded-bl-[100%] bg-gradient-to-bl from-emerald-100/80 to-transparent dark:from-emerald-900/20" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 md:px-8 lg:grid-cols-2 lg:gap-10">

        {/* Left Content */}
        <div className="relative z-10">

          {/* Badge */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-800 shadow-sm dark:border-emerald-800/60 dark:bg-emerald-950/60 dark:text-emerald-400">
            <Sparkles size={17} className="text-emerald-500" />
            Discover. Connect. Make an Impact.
          </div>

          {/* Heading */}
          <h1 className="max-w-2xl text-4xl leading-[1.15] font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white">
            Bring People Together,
            <span className="relative mt-2 block w-fit text-emerald-600 dark:text-emerald-400">
              Create Something
              <br />
              Meaningful.
              <span className="absolute -bottom-2 left-0 h-1 w-full -rotate-2 rounded-full bg-gradient-to-r from-emerald-500 to-lime-400" />
            </span>
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-xl text-base leading-8 text-slate-600 md:text-lg dark:text-slate-300">
            Discover exciting events, connect with like-minded people,
            and create unforgettable experiences together.
            Your community starts here.
          </p>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-wrap items-center gap-4">

            <Link href="/upcoming-events">
              <Button
                size="lg"
                className="h-12 rounded-xl bg-emerald-600 px-7 text-white shadow-lg shadow-emerald-600/20 transition-all hover:-translate-y-1 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
              >
                Explore Events
                <ArrowRight size={18} />
              </Button>
            </Link>

            <Link href="/create-event">
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-xl border-emerald-600/40 bg-transparent px-7 text-emerald-700 transition-all hover:-translate-y-1 hover:bg-emerald-50 hover:text-emerald-800 dark:border-emerald-500/50 dark:text-emerald-400 dark:hover:bg-emerald-950/60 dark:hover:text-emerald-300"
              >
                Create an Event
              </Button>
            </Link>

          </div>

          {/* Social Proof */}
          <div className="mt-12 grid max-w-xl grid-cols-3 divide-x divide-slate-200 border-t border-slate-200 pt-8 dark:divide-slate-700 dark:border-slate-700">

            <div className="pr-3">
              <div className="mb-2 flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <Users size={24} />
                <h3 className="text-xl font-extrabold text-slate-900 sm:text-2xl dark:text-white">
                  2.5K+
                </h3>
              </div>
              <p className="text-xs text-slate-500 sm:text-sm dark:text-slate-400">
                Active Members
              </p>
            </div>

            <div className="px-3 sm:px-5">
              <div className="mb-2 flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <CalendarDays size={24} />
                <h3 className="text-xl font-extrabold text-slate-900 sm:text-2xl dark:text-white">
                  500+
                </h3>
              </div>
              <p className="text-xs text-slate-500 sm:text-sm dark:text-slate-400">
                Events Created
              </p>
            </div>

            <div className="pl-3 sm:pl-5">
              <div className="mb-2 flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <Building2 size={24} />
                <h3 className="text-xl font-extrabold text-slate-900 sm:text-2xl dark:text-white">
                  50+
                </h3>
              </div>
              <p className="text-xs text-slate-500 sm:text-sm dark:text-slate-400">
                Communities
              </p>
            </div>

          </div>
        </div>

        {/* Right Visual */}
        <div className="relative mx-auto w-full max-w-[580px] lg:ml-auto">

          {/* Background Shape */}
          <div className="absolute -inset-5 -z-10 rounded-[35%] bg-gradient-to-br from-emerald-200/70 via-green-100/40 to-transparent blur-2xl dark:from-emerald-800/30 dark:via-green-900/20" />

          <div className="absolute -right-5 top-0 -z-10 size-32 rounded-full bg-emerald-200/50 dark:bg-emerald-800/20" />

          <div className="absolute -bottom-8 left-0 -z-10 size-48 rounded-full bg-orange-100/70 dark:bg-orange-900/10" />

          {/* Main Image */}
          <div className="relative rotate-[-3deg] overflow-hidden rounded-[2rem] border-[7px] border-white bg-white shadow-2xl shadow-emerald-950/15 transition-transform duration-500 hover:rotate-0 dark:border-slate-800 dark:bg-slate-800">

            <img
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=90"
              alt="People gathering together at a community event"
              className="h-[320px] w-full object-cover sm:h-[430px] lg:h-[480px]"
            />

            {/* Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent" />

            {/* Image Content */}
            <div className="absolute bottom-0 left-0 w-full p-5 text-white sm:p-7">

              <span className="inline-flex rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-bold tracking-wide text-white shadow-lg">
                COMMUNITY EVENT
              </span>

              <h3 className="mt-4 text-xl font-extrabold sm:text-2xl">
                Together We Make a Difference
              </h3>

              <p className="mt-2 flex items-center gap-2 text-sm text-white/80">
                <MapPin size={16} />
                Connect with your community
              </p>

            </div>
          </div>

          {/* Upcoming Events Floating Card */}
          <div className="absolute -left-2 top-5 flex items-center gap-3 rounded-2xl border border-slate-100/80 bg-white/95 p-3.5 shadow-xl shadow-slate-900/10 backdrop-blur-md sm:-left-10 sm:top-10 sm:p-4 dark:border-slate-700 dark:bg-slate-900/95">

            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400">
              <CalendarDays size={24} />
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Upcoming Events
              </h4>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Something exciting awaits!
              </p>
            </div>

          </div>

          {/* Join Togetherly Floating Card */}
          <div className="absolute -bottom-9 -right-1 flex items-center gap-3 rounded-2xl border border-slate-100/80 bg-white/95 p-3.5 shadow-xl shadow-slate-900/10 backdrop-blur-md sm:-right-8 sm:p-4 dark:border-slate-700 dark:bg-slate-900/95">

            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
              <Users size={25} />
            </div>

            <div>
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                Join Togetherly
              </h4>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Be part of something bigger
              </p>
            </div>

          </div>

          {/* Decorative Dots */}
          <div className="absolute -right-5 -top-10 -z-10 hidden grid-cols-4 gap-3 sm:grid">
            {Array.from({ length: 16 }).map((_, index) => (
              <span
                key={index}
                className="size-2 rounded-full bg-emerald-400/50 dark:bg-emerald-500/30"
              />
            ))}
          </div>

          {/* Decorative Circle */}
          <div className="absolute -bottom-10 -left-10 -z-10 size-24 rounded-full border-[12px] border-emerald-200/60 dark:border-emerald-800/40" />

        </div>
      </div>

      {/* Bottom Decorative Gradient */}
      <div className="pointer-events-none absolute bottom-0 left-0 -z-10 h-24 w-full bg-gradient-to-t from-emerald-50/80 to-transparent dark:from-emerald-950/20" />

    </section>
  );
}