"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  CalendarCheck,
  CalendarPlus,
  ClipboardList,
  HandHeart,
  LogOut,
  Moon,
  Sun,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { useTheme } from "@/components/ThemeProvider";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Upcoming Events", href: "/upcoming-events" },
];

const accountLinks = [
  { label: "Create Event", href: "/create-event", icon: CalendarPlus },
  { label: "Manage Events", href: "/manage-events", icon: ClipboardList },
  { label: "Joined Events", href: "/joined-events", icon: CalendarCheck },
  { label: "Profile", href: "/profile", icon: UserRound },
];

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export default function Navbar() {
  // Must be the same `authClient` instance the login/register forms use —
  // Better Auth session state is per-instance (cross-tab sync uses localStorage
  // storage events, which never fire in the tab that made the change).
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user ?? null;
  const [loggingOut, setLoggingOut] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  // Green pill follows the route currently on screen.
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await authClient.signOut();
    } finally {
      setLoggingOut(false);
    }
    // FIX: redirect() is for render/server code. In an event handler use the router.
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-950/10 bg-white/95 shadow-[0_4px_24px_-18px_rgba(15,23,42,0.25)] backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-2 px-3 min-[380px]:px-4 sm:gap-4 sm:px-6 lg:px-8">
        {/* FIX: min-w-0 (not shrink-0) so the logo can shrink on very small screens */}
        <Link href="/" className="group flex min-w-0 items-center gap-2 sm:gap-2.5">
          <span className="relative grid size-9 shrink-0 place-items-center rounded-[15px] bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 transition-transform duration-300 group-hover:-rotate-3 min-[380px]:size-10 sm:size-11 sm:rounded-[17px]">
            <HandHeart className="size-5 min-[380px]:size-6" strokeWidth={2.1} />
            <span className="absolute -right-1 -top-1 size-3 rounded-full border-2 border-white bg-amber-400" />
          </span>
          <span className="flex min-w-0 flex-col leading-none">
            <span className="truncate text-[1.1rem] font-extrabold tracking-[-0.055em] text-slate-900 min-[380px]:text-[1.3rem] sm:text-[1.45rem]">
              Togetherly<span className="text-emerald-600">.</span>
            </span>
            <span className="mt-1.5 hidden text-[9px] font-bold tracking-[0.19em] text-slate-500 sm:block">
              SMALL ACTS. BIG IMPACT.
            </span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                isActive(item.href)
                  ? "bg-emerald-50 text-emerald-800"
                  : "text-slate-600 hover:bg-slate-50 hover:text-emerald-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          {/* Theme toggle — stays visible on every screen size */}
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label={
              theme === "dark"
                ? "Switch to light theme"
                : "Switch to dark theme"
            }
            title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            className="size-9 rounded-full border-slate-200 text-slate-600 transition-colors hover:border-emerald-300 hover:text-emerald-600 sm:size-10 lg:size-11"
          >
            {theme === "dark" ? (
              <Sun className="size-[18px]" />
            ) : (
              <Moon className="size-[18px]" />
            )}
          </Button>

          {isPending ? (
            /* Session still loading — placeholder avoids a Login → Avatar flash */
            <span
              aria-hidden="true"
              className="block size-9 animate-pulse rounded-full bg-slate-100 ring-1 ring-slate-200 sm:size-10 lg:size-11"
            />
          ) : user ? (
            <>
              {/* Profile picture: hover shows the display name, click opens the account dropdown */}
              <div className="group relative">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    aria-label={`Account menu for ${user.name}`}
                    className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/40"
                  >
                    <Avatar className="size-9 border-2 border-white shadow-md ring-1 ring-emerald-600/30 transition-all group-hover:ring-emerald-600 sm:size-10">
                      {user.image ? (
                        <AvatarImage
                          src={user.image}
                          alt={user.name}
                        />
                      ) : null}
                      <AvatarFallback className="bg-emerald-600 font-bold text-white">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>

                  {/* FIX: max-w keeps the dropdown inside the screen on tiny devices */}
                  <DropdownMenuContent
                    align="end"
                    sideOffset={12}
                    className="w-64 max-w-[calc(100vw-1.5rem)] rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl shadow-emerald-950/10"
                  >
                    {/* Identity header — also surfaces the name on touch devices */}
                    <div className="flex items-center gap-3 rounded-xl bg-gradient-to-br from-[#047857] to-[#059669] p-3 text-white">
                      <Avatar className="size-10 ring-2 ring-white/30">
                        {user.image ? (
                          <AvatarImage
                            src={user.image}
                            alt={user.name}
                          />
                        ) : null}
                        <AvatarFallback className="bg-white/20 font-bold text-white">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold">
                          {user.name}
                        </p>
                        <p className="truncate text-xs text-emerald-100/80">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="my-1.5 h-px bg-slate-100" />

                    {accountLinks.map(({ label, href, icon: Icon }) => (
                      <DropdownMenuItem
                        key={href}
                        render={<Link href={href} />}
                        className="cursor-pointer gap-3 rounded-xl px-3 py-2.5 font-medium text-slate-700 focus:bg-emerald-50 focus:text-emerald-800 focus:**:text-emerald-600"
                      >
                        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
                          <Icon className="size-4" />
                        </span>
                        {label}
                      </DropdownMenuItem>
                    ))}

                    <div className="my-1.5 h-px bg-slate-100" />

                    {/* Mobile: logout lives here (desktop keeps the navbar button) */}
                    <DropdownMenuItem
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className="cursor-pointer gap-3 rounded-xl px-3 py-2.5 font-medium text-red-600 focus:bg-red-50 focus:text-red-600 lg:hidden"
                    >
                      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-red-50 text-red-600">
                        <LogOut className="size-4" />
                      </span>
                      {loggingOut ? "Logging out…" : "Logout"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/*
                  Tooltip: visible only when hovering the avatar (hover-capable devices).
                  FIX (main cause of the right-side blank space): it used to be centered
                  under the avatar (left-1/2 -translate-x-1/2). The avatar sits at the far
                  right edge, so a long name stuck out past the screen, and even with
                  opacity-0 it still made the page scroll sideways.
                  Now it is anchored to the avatar's RIGHT edge and grows to the left.
                */}
                <span
                  role="tooltip"
                  aria-hidden="true"
                  className="pointer-events-none absolute right-0 top-full z-10 mt-2 hidden max-w-[min(14rem,70vw)] truncate rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100 [@media(hover:hover)]:block"
                >
                  {user.name}
                </span>
              </div>

              {/* Desktop only — on mobile Logout lives inside the dropdown below */}
              <div className="hidden lg:block">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  aria-label="Logout"
                  className="h-10 rounded-full border-slate-200 px-3 text-slate-700 hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-60 lg:h-11 lg:px-4"
                >
                  <LogOut className="size-4" />
                  <span className="hidden font-semibold lg:inline">
                    {loggingOut ? "Logging out…" : "Logout"}
                  </span>
                </Button>
              </div>
            </>
          ) : (
            <Button
              render={<Link href="/login" />}
              nativeButton={false}
              className="h-9 rounded-full bg-emerald-600 px-3 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700 sm:h-10 sm:px-4 lg:h-11 lg:px-5"
            >
              Login
            </Button>
          )}
        </div>
      </div>

      <div className="border-t border-slate-100 lg:hidden">
        <nav
          aria-label="Mobile navigation"
          className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-3 py-1 [scrollbar-width:none] min-[380px]:px-4 sm:px-6 [&::-webkit-scrollbar]:hidden"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors ${
                isActive(item.href)
                  ? "bg-emerald-50 text-emerald-800"
                  : "text-slate-600 hover:bg-slate-50"
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