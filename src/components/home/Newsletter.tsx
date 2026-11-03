"use client";

import {
  ArrowRight,
  Mail,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Newsletter() {
  return (
    <section className="bg-background px-5 py-20 md:px-8 lg:py-24">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#047857] px-6 py-16 sm:px-12 lg:px-20 lg:py-20 dark:bg-emerald-950 dark:ring-1 dark:ring-emerald-500/20">

        {/* Background Decorations */}
        <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full border-[50px] border-white/5 dark:border-emerald-400/5" />
        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl dark:bg-emerald-500/15" />

        <div className="relative mx-auto max-w-3xl text-center">

          {/* Badge */}
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-100 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
            <Sparkles size={16} />
            Join Our Growing Community
          </span>

          {/* Heading */}
          <h2 className="text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Be Part of Something
            <span className="mt-2 block text-emerald-200 dark:text-emerald-400">
              Bigger.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-emerald-100/80 sm:text-lg dark:text-emerald-100/70">
            Stay connected with amazing events, discover new opportunities,
            and get inspired by stories from our growing community.
          </p>

          {/* Newsletter Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto mt-10 flex max-w-xl flex-col gap-3 rounded-2xl bg-white p-2 shadow-xl shadow-emerald-950/10 sm:flex-row dark:border dark:border-emerald-800/60 dark:bg-emerald-900/40 dark:shadow-black/30"
          >
            <div className="flex flex-1 items-center gap-3 px-4">
              <Mail
                size={20}
                className="shrink-0 text-emerald-600 dark:text-emerald-400"
              />

              <input
                type="email"
                placeholder="Enter your email address"
                required
                className="h-12 w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-emerald-50 dark:placeholder:text-emerald-200/40"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="h-12 rounded-xl bg-[#059669] px-6 text-white hover:bg-[#047857] dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400"
            >
              Subscribe
              <ArrowRight size={18} />
            </Button>
          </form>

          {/* Trust Message */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2 text-sm text-emerald-100/80 dark:text-emerald-200/60">
            <Users size={17} />
            <span>
              Join our community and never miss an opportunity.
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}