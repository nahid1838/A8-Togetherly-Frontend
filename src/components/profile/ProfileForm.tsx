"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import {
  Link2,
  Loader2,
  Lock,
  Mail,
  RotateCcw,
  Save,
  UserRound,
} from "lucide-react";

type Props = {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };
};

const inputClass =
  "h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15";

export default function ProfileForm({ user }: Props) {
  const router = useRouter();

  // Last saved values (used to detect unsaved changes and to reset)
  const [saved, setSaved] = useState({
    name: user.name || "",
    image: user.image || "",
  });

  const [name, setName] = useState(saved.name);
  const [imageUrl, setImageUrl] = useState(saved.image);
  const [isSaving, setIsSaving] = useState(false);
  const [failedUrl, setFailedUrl] = useState("");

  const trimmedName = name.trim();
  const trimmedImage = imageUrl.trim();

  const isDirty = trimmedName !== saved.name || trimmedImage !== saved.image;
  const showImage = trimmedImage !== "" && failedUrl !== trimmedImage;
  const initial = (trimmedName || user.email || "?").charAt(0).toUpperCase();

  const handleReset = () => {
    setName(saved.name);
    setImageUrl(saved.image);
  };

  const handleUpdateProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const { error } = await authClient.updateUser({
        name: trimmedName,
        image: trimmedImage,
      });

      if (error) {
        toast.error("Couldn't update your profile", {
          description: error.message || "Please check your details and try again.",
        });
        return;
      }

      setSaved({ name: trimmedName, image: trimmedImage });
      toast.success("Profile updated", {
        description: "Your changes have been saved successfully.",
      });
      router.refresh();
    } catch {
      toast.error("Something went wrong", {
        description: "Please check your connection and try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-background px-5 py-16 md:px-8 lg:py-20">
      {/* Background glow */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[26rem] w-[26rem] rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[26rem] w-[26rem] rounded-full bg-teal-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-2xl">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            My{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-300">
              profile
            </span>
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Update your name and profile picture.
          </p>
        </div>

        {/* Card */}
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-emerald-900/5">
          {/* Banner */}
          <div className="relative h-32 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 dark:from-emerald-800 dark:via-emerald-900 dark:to-emerald-950 sm:h-36">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.15] [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:22px_22px]"
            />
            <div
              aria-hidden="true"
              className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-emerald-300/20 blur-2xl"
            />
          </div>

          {/* Avatar + identity */}
          <div className="px-6 sm:px-10">
            <div className="-mt-14 flex flex-col items-center sm:-mt-16 sm:flex-row sm:items-end sm:gap-5">
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full bg-muted ring-4 ring-card sm:h-32 sm:w-32">
                {showImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={trimmedImage}
                    alt="Profile preview"
                    onError={() => setFailedUrl(trimmedImage)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600 text-4xl font-bold text-white">
                    {initial}
                  </div>
                )}
              </div>

              <div className="mt-4 text-center sm:mb-2 sm:mt-0 sm:text-left">
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  {trimmedName || "Your name"}
                </h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            {trimmedImage !== "" && failedUrl === trimmedImage && (
              <p className="mt-4 text-center text-xs text-amber-600 dark:text-amber-400 sm:text-left">
                This image couldn't be loaded. Check the URL and try again.
              </p>
            )}
          </div>

          {/* Form */}
          <form
            onSubmit={handleUpdateProfile}
            className="space-y-5 px-6 pb-8 pt-8 sm:px-10 sm:pb-10"
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Full name
              </label>
              <div className="relative">
                <UserRound
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  maxLength={100}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Email (read only) */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  id="email"
                  type="email"
                  value={user.email}
                  readOnly
                  className="h-12 w-full cursor-not-allowed rounded-xl border border-border bg-muted pl-11 pr-11 text-sm text-muted-foreground outline-none"
                />
                <Lock
                  size={16}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Your email address can't be changed here.
              </p>
            </div>

            {/* Image URL */}
            <div>
              <label
                htmlFor="imageUrl"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Profile image URL
              </label>
              <div className="relative">
                <Link2
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  id="imageUrl"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/profile.jpg"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
              {isDirty && !isSaving && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 text-sm font-semibold text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/15"
                >
                  <RotateCcw size={17} />
                  Reset
                </button>
              )}

              <button
                type="submit"
                disabled={isSaving || !isDirty || !trimmedName || !trimmedImage}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400"
              >
                {isSaving ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}