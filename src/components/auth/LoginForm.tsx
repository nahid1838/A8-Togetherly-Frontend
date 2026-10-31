"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  HandHeart,
  Lock,
  Mail,
  Sparkles,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "cn";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const benefits = [
  "Discover exciting events happening around you",
  "Connect with like-minded people in your community",
  "Create and manage your own meaningful events",
];

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {email: string, password: string};

    const {data, error} = await authClient.signIn.email({
      ...user,
      callbackURL: "/"
    })

    if(data) {
      toast.success("User logedin successfully")
    }

    if(error) {
      toast.error(`${error.message}`)
    }
  }

  const handleGoogleSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google"
    })
  }

  return (
    <section className="relative overflow-hidden bg-[#FAFAF9] px-5 py-16 md:px-8 lg:py-24">
      {/* Background Decorations */}
      <div className="absolute -right-40 -top-40 h-[450px] w-[450px] rounded-full bg-emerald-100/50 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-orange-100/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">

        {/* Left Panel — Branding */}
        <div className="hidden lg:block">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#047857] to-[#059669] p-10 shadow-2xl shadow-emerald-900/15">
            {/* Decorative Circles */}
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border-[40px] border-white/5" />
            <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-100">
                <Sparkles size={16} />
                Welcome Back
              </span>

              <h2 className="mt-6 text-3xl leading-tight font-extrabold tracking-tight text-white xl:text-4xl">
                Small Acts.
                <span className="mt-1 block text-emerald-200">Big Impact.</span>
              </h2>

              <p className="mt-5 max-w-md text-base leading-7 text-emerald-100/80">
                Log in and continue being part of a community that turns
                everyday kindness into real change.
              </p>

              <ul className="mt-8 space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-sm leading-6 text-emerald-50">
                    <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-emerald-200" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Panel — Form Card */}
        <div className="mx-auto w-full max-w-md">
          <div className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-2xl shadow-emerald-950/5 sm:p-10">

            {/* Card Header */}
            <div className="flex flex-col items-center text-center">
              <span className="relative grid size-12 place-items-center rounded-[17px] bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
                <HandHeart className="size-6" strokeWidth={2.1} />
                <span className="absolute -right-1 -top-1 size-3 rounded-full border-2 border-white bg-amber-400" />
              </span>

              <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Login to your account
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Welcome back! Please enter your details to continue.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleOnSubmit} className="mt-8 space-y-5">

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="font-semibold text-slate-700">
                  Email
                </Label>
                <div className="relative">
                  <Mail size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600" />
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                    className="h-11 rounded-xl border-slate-200 bg-slate-50/60 pl-11 text-sm focus-visible:border-emerald-600 focus-visible:ring-emerald-600/20"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="font-semibold text-slate-700">
                    Password
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                    className="h-11 rounded-xl border-slate-200 bg-slate-50/60 pl-11 pr-11 text-sm focus-visible:border-emerald-600 focus-visible:ring-emerald-600/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition-colors hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                className="h-12 w-full rounded-xl bg-[#059669] text-white shadow-lg shadow-emerald-600/20 hover:bg-[#047857]"
              >
                Login
                <ArrowRight size={18} />
              </Button>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <span className="h-px flex-1 bg-slate-200" />
                <span className="text-xs font-medium tracking-wide text-slate-400">
                  OR CONTINUE WITH
                </span>
                <span className="h-px flex-1 bg-slate-200" />
              </div>

              {/* Google Login */}
              <Button onClick={handleGoogleSignIn}
                type="button"
                variant="outline"
                size="lg"
                className={cn(
                  "h-12 w-full rounded-xl border-slate-200 bg-white text-slate-700",
                  "hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
                )}
              >
                <FcGoogle size={20} />
                Sign in with Google
              </Button>
            </form>

            {/* Register Link */}
            <p className="mt-8 text-center text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-emerald-600 transition-colors hover:text-emerald-700"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
