"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  HandHeart,
  ImagePlus,
  Lock,
  Mail,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "cn";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const benefits = [
  "Create your own events and rally your community",
  "RSVP to events and never miss out",
  "Follow organizations doing meaningful work",
];

type PasswordRule = {
  label: string;
  test: (value: string) => boolean;
};

/* Spec: must have an uppercase letter, a lowercase letter, and be at least 6 characters long. */
const passwordRules: PasswordRule[] = [
  { label: "At least 6 characters", test: (value) => value.length >= 6 },
  { label: "One uppercase letter", test: (value) => /[A-Z]/.test(value) },
  { label: "One lowercase letter", test: (value) => /[a-z]/.test(value) },
];

export default function RegisterForm() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const ruleStates = passwordRules.map((rule) => rule.test(password));
  const isPasswordValid = ruleStates.every(Boolean);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {name: string, email: string, imageUrl: string, password: string};

    const {data, error} = await authClient.signUp.email({
      ...user,
    })

    if(data) {
      toast.success("User created successfully")
      redirect("/")
    }

    if(error) {
      toast.error(`${error.message}`)
    }
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
                Join Togetherly
              </span>

              <h2 className="mt-6 text-3xl leading-tight font-extrabold tracking-tight text-white xl:text-4xl">
                Small Acts.
                <span className="mt-1 block text-emerald-200">Big Impact.</span>
              </h2>

              <p className="mt-5 max-w-md text-base leading-7 text-emerald-100/80">
                Create your free account and turn everyday kindness into real
                change with a community that cares.
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
                Create your account
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Start making an impact — it only takes a minute.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleOnSubmit}
              className="mt-8 space-y-5"
            >

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="font-semibold text-slate-700">
                  Name
                </Label>
                <div className="relative">
                  <User size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600" />
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    required
                    autoComplete="name"
                    className="h-11 rounded-xl border-slate-200 bg-slate-50/60 pl-11 text-sm focus-visible:border-emerald-600 focus-visible:ring-emerald-600/20"
                  />
                </div>
              </div>

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

              {/* Photo URL */}
              <div className="space-y-2">
                <Label htmlFor="photoURL" className="font-semibold text-slate-700">
                  Photo URL
                </Label>
                <div className="relative">
                  <ImagePlus size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600" />
                  <Input
                    id="photoURL"
                    type="url"
                    name="imageUrl"
                    placeholder="https://example.com/photo.jpg"
                    required
                    autoComplete="url"
                    className="h-11 rounded-xl border-slate-200 bg-slate-50/60 pl-11 text-sm focus-visible:border-emerald-600 focus-visible:ring-emerald-600/20"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="font-semibold text-slate-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    required
                    autoComplete="new-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    aria-invalid={password.length > 0 && !isPasswordValid}
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

                {/* Password Validation Rules */}
                <ul className="grid gap-1.5 pt-1 sm:grid-cols-2">
                  {passwordRules.map((rule, index) => {
                    const passed = ruleStates[index];
                    const showState = password.length > 0;
                    return (
                      <li
                        key={rule.label}
                        className={cn(
                          "flex items-center gap-1.5 text-xs font-medium transition-colors",
                          showState
                            ? passed
                              ? "text-emerald-600"
                              : "text-slate-400"
                            : "text-slate-400"
                        )}
                      >
                        {showState ? (
                          passed ? (
                            <Check size={14} className="shrink-0" />
                          ) : (
                            <X size={14} className="shrink-0" />
                          )
                        ) : (
                          <span className="size-1.5 shrink-0 rounded-full bg-slate-300" />
                        )}
                        {rule.label}
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                disabled={password.length > 0 && !isPasswordValid}
                className="h-12 w-full rounded-xl bg-[#059669] text-white shadow-lg shadow-emerald-600/20 hover:bg-[#047857] disabled:opacity-60"
              >
                Create Account
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

              {/* Google Signup */}
              <Button
                type="button"
                variant="outline"
                size="lg"
                className={cn(
                  "h-12 w-full rounded-xl border-slate-200 bg-white text-slate-700",
                  "hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
                )}
              >
                <FcGoogle size={20} />
                Sign up with Google
              </Button>
            </form>

            {/* Login Link */}
            <p className="mt-8 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-emerald-600 transition-colors hover:text-emerald-700"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

