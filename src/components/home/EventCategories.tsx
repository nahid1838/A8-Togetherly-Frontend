import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  GraduationCap,
  HeartHandshake,
  Music2,
  Palette,
  Trophy,
  Users,
  BriefcaseBusiness,
} from "lucide-react";
import Link from "next/link";

// NOTE: `title`, `description`, `icon`, `color`, `events` are kept the same as
// before, so any other file importing `categories` keeps working.
// Full class names are written out so Tailwind can detect them.
export const categories = [
  {
    title: "Technology",
    description: "Explore tech meetups, hackathons and developer events.",
    icon: Code2,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    hover: "group-hover:bg-blue-600 group-hover:text-white",
    glow: "bg-blue-500/20",
    dot: "bg-blue-500",
    events: "120+ Events",
  },
  {
    title: "Education",
    description: "Discover workshops, seminars and learning opportunities.",
    icon: GraduationCap,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    hover: "group-hover:bg-amber-500 group-hover:text-white",
    glow: "bg-amber-500/20",
    dot: "bg-amber-500",
    events: "85+ Events",
  },
  {
    title: "Sports",
    description: "Join tournaments, fitness activities and sports communities.",
    icon: Trophy,
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    hover: "group-hover:bg-orange-500 group-hover:text-white",
    glow: "bg-orange-500/20",
    dot: "bg-orange-500",
    events: "64+ Events",
  },
  {
    title: "Charity",
    description: "Make a difference through volunteering and social impact.",
    icon: HeartHandshake,
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    hover: "group-hover:bg-rose-500 group-hover:text-white",
    glow: "bg-rose-500/20",
    dot: "bg-rose-500",
    events: "45+ Events",
  },
  {
    title: "Music",
    description: "Experience concerts, live performances and music festivals.",
    icon: Music2,
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    hover: "group-hover:bg-purple-600 group-hover:text-white",
    glow: "bg-purple-500/20",
    dot: "bg-purple-500",
    events: "72+ Events",
  },
  {
    title: "Arts & Culture",
    description: "Celebrate creativity, exhibitions and cultural gatherings.",
    icon: Palette,
    color: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
    hover: "group-hover:bg-pink-500 group-hover:text-white",
    glow: "bg-pink-500/20",
    dot: "bg-pink-500",
    events: "38+ Events",
  },
  {
    title: "Community",
    description: "Meet people and build meaningful local connections.",
    icon: Users,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    hover: "group-hover:bg-emerald-600 group-hover:text-white",
    glow: "bg-emerald-500/20",
    dot: "bg-emerald-500",
    events: "95+ Events",
  },
  {
    title: "Business",
    description: "Connect with professionals and explore new opportunities.",
    icon: BriefcaseBusiness,
    color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
    hover: "group-hover:bg-cyan-600 group-hover:text-white",
    glow: "bg-cyan-500/20",
    dot: "bg-cyan-500",
    events: "56+ Events",
  },
];

export default function EventCategories() {
  return (
    <section className="relative overflow-hidden bg-background px-5 py-20 md:px-8 lg:py-28">
      {/* Soft background glow */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[26rem] w-[26rem] rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[26rem] w-[26rem] rounded-full bg-teal-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-14 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
              Discover events by{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-300">
                category
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Find your passion, connect with like-minded people, and explore
              experiences that bring communities together.
            </p>
          </div>

          {/* Link styled directly (no <button> inside <a>) */}
          <Link
            href="/upcoming-events"
            className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition-all duration-300 hover:border-emerald-500/40 hover:bg-emerald-600 hover:text-white hover:shadow-lg hover:shadow-emerald-900/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            Explore All Categories
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Category Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.title}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-900/10"
              >
                {/* Corner glow, colored per category, appears on hover */}
                <div
                  className={`pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 ${category.glow}`}
                />

                <div className="relative">
                  <div className="mb-7 flex items-start justify-between">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 ${category.color} ${category.hover}`}
                    >
                      <Icon size={26} strokeWidth={1.8} />
                    </div>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-transparent group-hover:bg-emerald-600 group-hover:text-white">
                      <ArrowUpRight
                        size={17}
                        className="transition-transform duration-300 group-hover:rotate-12"
                      />
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-foreground">
                    {category.title}
                  </h3>

                  <p className="mt-2 min-h-[72px] text-sm leading-6 text-muted-foreground">
                    {category.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 border-t border-border pt-4">
                    <span
                      className={`h-2 w-2 rounded-full ${category.dot}`}
                      aria-hidden="true"
                    />
                    <span className="text-sm font-semibold text-foreground">
                      {category.events}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}