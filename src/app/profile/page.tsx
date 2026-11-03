"use client";

import { authClient } from "@/lib/auth-client";
import { LogIn, UserRound } from "lucide-react";
import Link from "next/link";
import ProfileForm from "@/components/profile/ProfileForm";

function ProfileSkeleton() {
  return (
    <section className="min-h-screen bg-background px-5 py-16 md:px-8 lg:py-20">
      <div
        role="status"
        aria-label="Loading profile"
        className="mx-auto max-w-2xl animate-pulse"
      >
        <div className="mx-auto mb-8 h-12 w-56 rounded-xl bg-muted" />
        <div className="overflow-hidden rounded-3xl border border-border bg-card">
          <div className="h-32 bg-muted sm:h-36" />
          <div className="px-6 sm:px-10">
            <div className="-mt-14 h-28 w-28 rounded-full bg-muted ring-4 ring-card sm:-mt-16 sm:h-32 sm:w-32" />
          </div>
          <div className="space-y-5 px-6 pb-10 pt-8 sm:px-10">
            <div className="h-12 rounded-xl bg-muted" />
            <div className="h-12 rounded-xl bg-muted" />
            <div className="h-12 rounded-xl bg-muted" />
            <div className="h-12 rounded-xl bg-muted" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <ProfileSkeleton />;
  }

  if (!session?.user) {
    return (
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-background px-5">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[26rem] w-[26rem] rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[26rem] w-[26rem] rounded-full bg-teal-500/10 blur-3xl" />

        <div className="relative w-full max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-xl shadow-emerald-900/5 sm:p-10">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 ring-8 ring-emerald-500/5 dark:text-emerald-400">
            <UserRound size={36} strokeWidth={1.8} />
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Sign in to see your profile
          </h2>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            You need to be signed in to update your name and profile picture.
          </p>

          <Link
            href="/login"
            className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/30 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400"
          >
            <LogIn size={18} />
            Sign in
          </Link>
        </div>
      </section>
    );
  }

  return <ProfileForm key={session.user.id} user={session.user} />;
}