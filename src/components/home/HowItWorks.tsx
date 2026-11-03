
import {
  Search,
  Users,
  CalendarPlus,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Discover Events",
    description:
      "Explore exciting events based on your interests, location, and passions. Find experiences that inspire you.",
    icon: Search,
    color: "bg-blue-50 text-blue-600",
  },
  {
    number: "02",
    title: "Join Community",
    description:
      "Connect with like-minded people, meet new friends, and become part of communities that share your interests.",
    icon: Users,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    number: "03",
    title: "Create Events",
    description:
      "Turn your ideas into reality. Organize meaningful events and invite others to create memorable experiences.",
    icon: CalendarPlus,
    color: "bg-orange-50 text-orange-600",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-[#FAFAF9] px-5 py-20 md:px-8 lg:py-24">
      {/* Background Decoration */}
      <div className="absolute -right-32 top-10 h-80 w-80 rounded-full bg-emerald-100/40 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-orange-100/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            <Sparkles size={16} />
            Simple & Easy
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            How <span className="text-emerald-600">Togetherly</span> Works
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-500 sm:text-lg">
            Getting involved in your community has never been easier.
            Just follow three simple steps and start making meaningful connections.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-7 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group relative rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5"
              >
                {/* Step Number */}
                <div className="mb-8 flex items-center justify-between">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl ${step.color} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon size={30} strokeWidth={1.8} />
                  </div>

                  <span className="text-5xl font-extrabold text-slate-100 transition-colors group-hover:text-emerald-100">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-emerald-700">
                  {step.title}
                </h3>

                <p className="mt-4 min-h-[100px] text-sm leading-7 text-slate-500 sm:text-base">
                  {step.description}
                </p>

                {/* Bottom Indicator */}
                <div className="mt-7 flex items-center gap-2 border-t border-slate-100 pt-5 text-sm font-semibold text-emerald-700">
                  <span>Step {index + 1}</span>
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <p className="mb-5 text-slate-600">
            Ready to be part of something meaningful?
          </p>

          <Link href={"/create-event"}>
          <button className="inline-flex items-center gap-2 rounded-xl bg-[#059669] px-7 py-3.5 font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all hover:-translate-y-1 hover:bg-[#047857]">
            Get Started
            <ArrowRight size={18} />
          </button>
          </Link>
        </div>

      </div>
    </section>
  );
}
