
import Link from "next/link";
import {
    ArrowLeft,
    Home,
    SearchX,
    Sparkles,
} from "lucide-react";

export default function NotFound() {
    return (
        <main className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-background px-5 py-16">

            {/* Background Decorations */}
            <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />

            <div className="relative mx-auto w-full max-w-2xl text-center">

                {/* Icon */}
                <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 shadow-sm dark:text-emerald-400">
                    <SearchX size={38} strokeWidth={1.6} />
                </div>

                {/* 404 */}
                <h1 className="text-8xl font-extrabold tracking-tighter text-emerald-600 dark:text-emerald-400 sm:text-9xl">
                    404
                </h1>

                {/* Heading */}
                <div className="mt-5 flex items-center justify-center gap-2">
                    <Sparkles size={18} className="text-emerald-500" />
                    <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                        Oops! Page Not Found
                    </h2>
                </div>

                {/* Description */}
                <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
                    The page you're looking for doesn't exist or may have been moved.
                    Let's get you back to where the community begins.
                </p>

                {/* Buttons */}
                <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">

                    <Link
                        href="/"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-700 sm:w-auto"
                    >
                        <Home size={18} />
                        Back to Home
                    </Link>

                    <Link
                        href="/"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-muted sm:w-auto"
                    >
                        <ArrowLeft size={18} />
                        Go Back
                    </Link>

                </div>

                {/* Bottom Text */}
                <p className="mt-12 text-sm font-medium text-muted-foreground">
                    Togetherly — <span className="text-emerald-600 dark:text-emerald-400">Connecting People, Building Communities.</span>
                </p>

            </div>
        </main>
    );
}
