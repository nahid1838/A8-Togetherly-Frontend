
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#FAFAF9]">
      {/* Background Decorations */}
      <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-emerald-100/50 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-orange-100/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 md:px-8 lg:grid-cols-2 lg:gap-10 lg:py-28">

        {/* Left Content */}
        <div className="z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
            <Sparkles size={16} />
            Discover. Connect. Make an Impact.
          </div>

          <h1 className="max-w-xl text-4xl leading-[1.15] font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Bring People Together,
            <span className="mt-2 block text-[#059669]">
              Create Something Meaningful.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-8 text-slate-600 md:text-lg">
            Discover exciting events, connect with like-minded people,
            and create unforgettable experiences together.
            Your community starts here.
          </p>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href={"/upcoming-events"}>
            <Button
              size="lg"
              className="h-12 rounded-xl bg-[#059669] px-7 text-white shadow-lg shadow-emerald-600/20 hover:bg-[#047857]"
            >
              Explore Events
              <ArrowRight size={18} />
            </Button>
            </Link>

            <Link href={"create-event"}>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-xl border-slate-300 bg-white px-7 text-slate-800 hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
            >
              Create an Event
            </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="mt-12 flex flex-wrap items-center gap-8 border-t border-slate-200 pt-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                2.5K+
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Active Members
              </p>
            </div>

            <div className="h-10 w-px bg-slate-200" />

            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                500+
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Events Created
              </p>
            </div>

            <div className="h-10 w-px bg-slate-200" />

            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                50+
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Communities
              </p>
            </div>
          </div>
        </div>

        {/* Right Visual */}
        <div className="relative mx-auto w-full max-w-[550px] lg:ml-auto">

          {/* Main Image */}
          <div className="relative overflow-hidden rounded-[2rem] border-8 border-white shadow-2xl shadow-emerald-900/10">
            <img
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1000&q=85"
              alt="People gathering together at a community event"
              className="h-[350px] w-full object-cover sm:h-[450px]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

            <div className="absolute bottom-7 left-7 text-white">
              <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold">
                COMMUNITY EVENT
              </span>
              <h3 className="mt-3 text-2xl font-bold">
                Together We Make a Difference
              </h3>
              <p className="mt-2 flex items-center gap-2 text-sm text-white/80">
                <MapPin size={15} />
                Connect with your community
              </p>
            </div>
          </div>

          {/* Floating Event Card */}
          <div className="absolute -left-5 top-12 hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:block md:-left-12">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
                <CalendarDays size={23} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  Upcoming Events
                </p>
                <p className="text-xs text-slate-500">
                  Something exciting awaits!
                </p>
              </div>
            </div>
          </div>

          {/* Floating Community Card */}
          <div className="absolute -right-3 -bottom-7 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:-right-8 sm:p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
                <Users size={23} />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">
                  Join Togetherly
                </p>
                <p className="text-xs text-slate-500">
                  Be part of something bigger
                </p>
              </div>
            </div>
          </div>

          {/* Decorative Circle */}
          <div className="absolute -right-5 -top-7 -z-10 h-24 w-24 rounded-full border-[12px] border-emerald-200/60" />
        </div>
      </div>
    </section>
  );
}
