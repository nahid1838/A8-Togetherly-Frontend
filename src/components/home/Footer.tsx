
import Link from "next/link";
import {
    ArrowUpRight,
    HandHeart,
    Heart,
    Mail,
    MapPin,
} from "lucide-react";
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaXTwitter,
} from "react-icons/fa6";

const footerLinks = {
    platform: [
        { name: "Home", href: "/" },
        { name: "Explore Events", href: "/events" },
        { name: "Create Event", href: "/create-event" },
        { name: "Manage Events", href: "/manage-events" },
    ],
    resources: [
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "FAQs", href: "/faqs" },
        { name: "Help Center", href: "/help" },
    ],
    legal: [
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms & Conditions", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
    ],
};

const socialLinks = [
    { icon: FaFacebookF, href: "#", label: "Facebook" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaXTwitter, href: "#", label: "Twitter" },
    { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
];

export default function Footer() {
    return (
        <footer className="relative isolate overflow-hidden bg-emerald-700 text-emerald-50 dark:bg-slate-900 dark:text-slate-300">

            {/* Background Decorations */}
            <div className="pointer-events-none absolute -right-40 -top-40 -z-10 size-[450px] rounded-full bg-emerald-200/30 blur-[100px] dark:bg-emerald-500/10" />

            <div className="pointer-events-none absolute -bottom-40 -left-40 -z-10 size-[400px] rounded-full bg-teal-200/30 blur-[100px] dark:bg-teal-500/10" />

            <div className="mx-auto max-w-7xl px-5 pt-16 md:px-8 lg:pt-20">

                {/* Main Footer Content */}
                <div className="grid gap-12 border-b border-white/20 pb-12 dark:border-slate-800 sm:grid-cols-2 lg:grid-cols-5 lg:gap-10 lg:pb-14">

                    {/* Brand Information */}
                    <div className="sm:col-span-2 lg:col-span-2">

                        <Link href="/" className="group flex w-fit items-center gap-3">

                            <span className="relative grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-950/20 transition-all duration-300 group-hover:-rotate-3 group-hover:scale-105">

                                <HandHeart className="size-7" strokeWidth={2.1} />

                                <span className="absolute -right-1 -top-1 size-3 rounded-full border-2 border-emerald-700 bg-amber-400 dark:border-[#0B1120]" />

                            </span>

                            <span className="flex flex-col leading-none">

                                <span className="text-[1.65rem] font-extrabold tracking-[-0.055em] text-white">
                                    Togetherly
                                </span>

                                <span className="mt-2 text-[9px] font-bold tracking-[0.19em] text-emerald-100 dark:text-emerald-400">
                                    SMALL ACTS. BIG IMPACT.
                                </span>

                            </span>

                        </Link>

                        <p className="mt-6 max-w-sm text-sm leading-7 text-emerald-50 dark:text-slate-400">
                            Bringing people together through meaningful events,
                            shared interests, and stronger communities.
                            Discover, connect, and create something meaningful with Togetherly.
                        </p>

                        {/* Contact Information */}
                        <div className="mt-7 space-y-4">

                            <div className="flex items-center gap-3 text-sm text-emerald-50 dark:text-slate-400">

                                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/15 text-white dark:bg-emerald-500/10 dark:text-emerald-400">
                                    <Mail size={17} />
                                </span>

                                hello@togetherly.com

                            </div>

                            <div className="flex items-center gap-3 text-sm text-emerald-50 dark:text-slate-400">

                                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/15 text-white dark:bg-emerald-500/10 dark:text-emerald-400">
                                    <MapPin size={17} />
                                </span>

                                Dhaka, Bangladesh

                            </div>

                        </div>

                        {/* Social Links */}
                        <div className="mt-8 flex items-center gap-3">

                            {socialLinks.map((social) => {
                                const Icon = social.icon;

                                return (
                                    <Link
                                        key={social.label}
                                        href={social.href}
                                        aria-label={social.label}
                                        className="flex size-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:border-emerald-500 dark:hover:bg-emerald-500 dark:hover:text-white"
                                    >
                                        <Icon size={17} />
                                    </Link>
                                );
                            })}

                        </div>

                    </div>

                    {/* Footer Link Sections */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div
                            key={title}
                            className={title === "legal" ? "sm:col-span-2 lg:col-span-1" : ""}
                        >

                            <h3 className="mb-6 text-base font-bold capitalize text-white">
                                {title}
                            </h3>

                            <ul className="space-y-4">

                                {links.map((link) => (
                                    <li key={link.name}>

                                        <Link
                                            href={link.href}
                                            className="group flex w-fit items-center gap-2 text-sm text-emerald-100 transition-colors duration-200 hover:text-white dark:text-slate-400 dark:hover:text-emerald-400"
                                        >
                                            {link.name}

                                            <ArrowUpRight
                                                size={14}
                                                className="opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                                            />

                                        </Link>

                                    </li>
                                ))}

                            </ul>

                        </div>
                    ))}

                </div>

                {/* Bottom Footer */}
                <div className="flex flex-col items-center justify-between gap-5 py-7 text-center sm:flex-row sm:text-left">

                    <p className="text-sm text-emerald-100 dark:text-slate-500">
                        © 2026 Togetherly. All rights reserved.
                    </p>

                    <p className="flex items-center gap-1.5 text-sm text-emerald-100 dark:text-slate-500">
                        Made with
                        <Heart
                            size={15}
                            className="fill-rose-400 text-rose-400"
                        />
                        for stronger communities.
                    </p>

                    <Link
                        href="/"
                        className="text-sm font-semibold text-white transition-colors hover:text-emerald-200 dark:text-emerald-400 dark:hover:text-emerald-300"
                    >
                        Back to top ↑
                    </Link>

                </div>

            </div>
        </footer>
    );
}