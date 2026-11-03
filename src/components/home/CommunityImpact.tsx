"use client";

import { useEffect, useRef, useState } from "react";
import { Users, CalendarDays, Globe2, HeartHandshake } from "lucide-react";

/* ---------- Count-up hook (runs once when section scrolls into view) ---------- */
function useCountUp(target: number, start: boolean, duration = 1600) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let frame: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      // reduced motion hole shorashori final value
      const progress = reduceMotion
        ? 1
        : Math.min((now - startTime) / duration, 1);

      const eased = 1 - Math.pow(1 - progress, 4); // easeOutQuart
      setCount(Math.round(target * eased));

      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, start, duration]);

  return count;
}

function Counter({
  value,
  suffix = "",
  start,
  className,
}: {
  value: number;
  suffix?: string;
  start: boolean;
  className?: string;
}) {
  const count = useCountUp(value, start);
  return (
    <span className={`tabular-nums ${className ?? ""}`}>
      {count.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

/* ---------- Data ---------- */
const members = {
  title: "Active Members",
  value: 2500,
  suffix: "+",
  description: "People building meaningful connections",
  icon: Users,
};

const events = {
  title: "Events Organized",
  value: 500,
  suffix: "+",
  description: "Experiences bringing people together",
  icon: CalendarDays,
};

const communities = {
  title: "Communities",
  value: 50,
  suffix: "+",
  description: "Groups sharing common interests",
  icon: Globe2,
};

const connections = {
  title: "Connections Made",
  value: 10000,
  suffix: "+",
  description: "Relationships that make a difference",
  icon: HeartHandshake,
};

/* ---------- Component ---------- */
export default function CommunityImpact() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const MembersIcon = members.icon;
  const EventsIcon = events.icon;
  const CommunitiesIcon = communities.icon;
  const ConnectionsIcon = connections.icon;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-background px-5 py-20 md:px-8 lg:py-28"
    >
      {/* Soft background glow */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 -left-40 h-[28rem] w-[28rem] rounded-full bg-teal-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-12 flex flex-col gap-6 md:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-2xl text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Real people. Real events.{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-300">
              Real impact.
            </span>
          </h2>

          <p className="max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            Every event and every new connection adds to something bigger.
            Here is what our community has built together.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 lg:gap-5">
          {/* Featured: Connections (tall card) */}
          <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-700 p-8 text-white shadow-xl shadow-emerald-900/10 md:col-span-2 lg:col-span-1 lg:row-span-2 lg:p-10">
            {/* Concentric rings */}
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full border border-white/15 transition-transform duration-700 group-hover:scale-110" />
            <div className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 rounded-full border border-white/20 transition-transform duration-700 group-hover:scale-110" />
            <div className="pointer-events-none absolute -bottom-2 -right-2 h-24 w-24 rounded-full bg-white/10 transition-transform duration-700 group-hover:scale-125" />

            <div className="relative flex h-full min-h-[18rem] flex-col justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur">
                <ConnectionsIcon size={28} strokeWidth={1.8} />
              </div>

              <div className="mt-12">
                <Counter
                  value={connections.value}
                  suffix={connections.suffix}
                  start={visible}
                  className="block text-6xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl"
                />
                <p className="mt-4 text-xl font-semibold">
                  {connections.title}
                </p>
                <p className="mt-2 max-w-xs text-sm leading-6 text-emerald-50/80">
                  {connections.description}
                </p>
              </div>
            </div>
          </div>

          {/* Members (wide card) */}
          <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg md:col-span-2 lg:p-10">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white dark:text-blue-400">
                  <MembersIcon size={24} strokeWidth={1.8} />
                </div>
                <p className="text-lg font-semibold text-foreground">
                  {members.title}
                </p>
                <p className="mt-1 max-w-xs text-sm leading-6 text-muted-foreground">
                  {members.description}
                </p>
              </div>

              <Counter
                value={members.value}
                suffix={members.suffix}
                start={visible}
                className="text-6xl font-extrabold tracking-tight text-foreground sm:text-7xl"
              />
            </div>

            {/* Overlapping avatar dots */}
            <div className="mt-8 flex items-center" aria-hidden="true">
              {[
                "bg-emerald-500",
                "bg-blue-500",
                "bg-amber-500",
                "bg-rose-500",
                "bg-violet-500",
              ].map((c, i) => (
                <span
                  key={c}
                  className={`${c} -ml-2 h-8 w-8 rounded-full border-2 border-card first:ml-0 ${
                    i % 2 ? "opacity-80" : ""
                  }`}
                />
              ))}
              <span className="ml-3 text-sm text-muted-foreground">
                and growing every week
              </span>
            </div>
          </div>

          {/* Events */}
          <div className="group rounded-3xl border border-border bg-card p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-600 transition-colors duration-300 group-hover:bg-violet-600 group-hover:text-white dark:text-violet-400">
                <EventsIcon size={24} strokeWidth={1.8} />
              </div>
              <Counter
                value={events.value}
                suffix={events.suffix}
                start={visible}
                className="text-5xl font-extrabold tracking-tight text-foreground"
              />
            </div>
            <p className="mt-6 text-lg font-semibold text-foreground">
              {events.title}
            </p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {events.description}
            </p>
          </div>

          {/* Communities */}
          <div className="group rounded-3xl border border-border bg-card p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 transition-colors duration-300 group-hover:bg-amber-500 group-hover:text-white dark:text-amber-400">
                <CommunitiesIcon size={24} strokeWidth={1.8} />
              </div>
              <Counter
                value={communities.value}
                suffix={communities.suffix}
                start={visible}
                className="text-5xl font-extrabold tracking-tight text-foreground"
              />
            </div>
            <p className="mt-6 text-lg font-semibold text-foreground">
              {communities.title}
            </p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {communities.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}