
import {
  Users,
  CalendarDays,
  Globe2,
  HeartHandshake,
  Sparkles,
} from "lucide-react";

const impactStats = [
  {
    title: "Active Members",
    value: "2,500+",
    description: "People building meaningful connections",
    icon: Users,
  },
  {
    title: "Events Organized",
    value: "500+",
    description: "Experiences bringing people together",
    icon: CalendarDays,
  },
  {
    title: "Communities",
    value: "50+",
    description: "Groups sharing common interests",
    icon: Globe2,
  },
  {
    title: "Connections Made",
    value: "10K+",
    description: "Relationships that make a difference",
    icon: HeartHandshake,
  },
];

export default function CommunityImpact() {
  return (
    <section className="relative overflow-hidden bg-[#047857] px-5 py-20 md:px-8 lg:py-24">

      {/* Background Decorations */}
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-teal-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-100">
            <Sparkles size={16} />
            Our Growing Community
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Together, We're Making
            <span className="mt-2 block text-emerald-200">
              A Real Difference
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-emerald-100/80 sm:text-lg">
            Every event, every connection, and every member contributes
            to something bigger. Here's the impact we're creating together.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {impactStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="group rounded-2xl border border-white/15 bg-white/10 p-7 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-white/30 hover:bg-white/15 hover:shadow-xl hover:shadow-emerald-950/10"
              >
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-emerald-100 transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-emerald-700">
                  <Icon size={27} strokeWidth={1.8} />
                </div>

                <h3 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                  {stat.value}
                </h3>

                <p className="mt-3 text-lg font-semibold text-emerald-100">
                  {stat.title}
                </p>

                <p className="mt-3 text-sm leading-6 text-emerald-100/70">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Message */}
        <div className="mt-14 border-t border-white/15 pt-8 text-center">
          <p className="text-base font-medium text-emerald-100 sm:text-lg">
            Small connections. Big impact. One community.
          </p>
        </div>

      </div>
    </section>
  );
}
