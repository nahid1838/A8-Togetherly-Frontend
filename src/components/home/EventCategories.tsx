
import {
  ArrowRight,
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

export const categories = [
  {
    title: "Technology",
    description: "Explore tech meetups, hackathons and developer events.",
    icon: Code2,
    color: "bg-blue-50 text-blue-600",
    events: "120+ Events",
  },
  {
    title: "Education",
    description: "Discover workshops, seminars and learning opportunities.",
    icon: GraduationCap,
    color: "bg-amber-50 text-amber-600",
    events: "85+ Events",
  },
  {
    title: "Sports",
    description: "Join tournaments, fitness activities and sports communities.",
    icon: Trophy,
    color: "bg-orange-50 text-orange-600",
    events: "64+ Events",
  },
  {
    title: "Charity",
    description: "Make a difference through volunteering and social impact.",
    icon: HeartHandshake,
    color: "bg-rose-50 text-rose-600",
    events: "45+ Events",
  },
  {
    title: "Music",
    description: "Experience concerts, live performances and music festivals.",
    icon: Music2,
    color: "bg-purple-50 text-purple-600",
    events: "72+ Events",
  },
  {
    title: "Arts & Culture",
    description: "Celebrate creativity, exhibitions and cultural gatherings.",
    icon: Palette,
    color: "bg-pink-50 text-pink-600",
    events: "38+ Events",
  },
  {
    title: "Community",
    description: "Meet people and build meaningful local connections.",
    icon: Users,
    color: "bg-emerald-50 text-emerald-600",
    events: "95+ Events",
  },
  {
    title: "Business",
    description: "Connect with professionals and explore new opportunities.",
    icon: BriefcaseBusiness,
    color: "bg-cyan-50 text-cyan-600",
    events: "56+ Events",
  },
];

export default function EventCategories() {
  return (
    <section className="bg-white px-5 py-20 md:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="mb-3 inline-block rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              Explore Your Interests
            </span>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Discover Events by{" "}
              <span className="text-emerald-600">Category</span>
            </h2>

            <p className="mt-4 max-w-xl leading-7 text-slate-500">
              Find your passion, connect with like-minded people, and
              explore experiences that bring communities together.
            </p>
          </div>

          <Link href={"/upcoming-events"}>
          <button className="group flex w-fit items-center gap-2 font-semibold text-emerald-700 transition-colors hover:text-emerald-800">
            Explore All Categories
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
          </Link>
        </div>

        {/* Category Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className={`rounded-xl p-3 ${category.color}`}>
                    <Icon size={25} strokeWidth={1.8} />
                  </div>

                  <ArrowRight
                    size={19}
                    className="text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-emerald-600"
                  />
                </div>

                <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-emerald-700">
                  {category.title}
                </h3>

                <p className="mt-2 min-h-[72px] text-sm leading-6 text-slate-500">
                  {category.description}
                </p>

                <div className="mt-5 border-t border-slate-100 pt-4">
                  <span className="text-sm font-semibold text-emerald-700">
                    {category.events}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
