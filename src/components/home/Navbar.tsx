"use client";

import Link from "next/link";
import { HandHeart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Upcoming Events", href: "/upcoming-events" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-950/10 bg-white/95 shadow-[0_4px_24px_-18px_rgba(15,23,42,0.25)] backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <span className="relative grid size-11 place-items-center rounded-[17px] bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 transition-transform duration-300 group-hover:-rotate-3">
            <HandHeart className="size-6" strokeWidth={2.1} />
            <span className="absolute -right-1 -top-1 size-3 rounded-full border-2 border-white bg-amber-400" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[1.45rem] font-extrabold tracking-[-0.055em] text-slate-900">
              Togetherly<span className="text-emerald-600">.</span>
            </span>
            <span className="mt-1.5 text-[9px] font-bold tracking-[0.19em] text-slate-500">
              SMALL ACTS. BIG IMPACT.
            </span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {navigation.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                index === 0
                  ? "bg-emerald-50 text-emerald-800"
                  : "text-slate-600 hover:bg-slate-50 hover:text-emerald-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href={"/login"} className="hidden shrink-0 items-center gap-2 lg:flex">
          <Button
            className="h-11 rounded-full bg-emerald-600 px-5 font-semibold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700"
          >
            Login
          </Button>
        </Link>

        {/* Decorative only for now; no menu handler is attached. */}
        <div className="lg:hidden">
          <Button variant="outline" size="icon" aria-label="Menu" className="size-10 rounded-xl border-slate-200 bg-white text-slate-700">
            <Menu className="size-5" />
          </Button>
        </div>
      </div>

      <div className="border-t border-slate-100 lg:hidden">
        <nav
          aria-label="Mobile navigation"
          className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-6"
        >
          {navigation.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-semibold ${
                index === 0 ? "bg-emerald-50 text-emerald-800" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
