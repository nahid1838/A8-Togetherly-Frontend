
import Link from "next/link";
import {
    ArrowUpRight,
    HandHeart,
    Heart,
    Mail,
    MapPin,
    Sparkles,
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
        { name: "Categories", href: "/categories" },
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
        <footer className="relative overflow-hidden bg-[#064E3B] text-white">

            {/* Background Decoration */}
            <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-teal-400/10 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-5 pt-16 md:px-8 lg:pt-20">

                {/* Main Footer Content */}
                <div className="grid gap-12 border-b border-white/10 pb-14 sm:grid-cols-2 lg:grid-cols-5 lg:gap-10">

                    {/* Brand Information */}
                    <div className="sm:col-span-2 lg:col-span-2">
                        <Link href="/" className="group flex shrink-0 items-center gap-3">
                            <span className="relative grid size-12 place-items-center rounded-2xl bg-white/10 text-emerald-300 ring-1 ring-white/15 transition-all duration-300 group-hover:bg-white/15 group-hover:-rotate-3">
                                <HandHeart className="size-7" strokeWidth={2.1} />
                                <span className="absolute -right-1 -top-1 size-3 rounded-full border-2 border-emerald-950 bg-amber-400" />
                            </span>

                            <span className="flex flex-col leading-none">
                                <span className="text-[1.65rem] font-extrabold tracking-[-0.055em] text-white">
                                    Togetherly
                                </span>

                                <span className="mt-2 text-[9px] font-bold tracking-[0.19em] text-emerald-100/60">
                                    SMALL ACTS. BIG IMPACT.
                                </span>
                            </span>
                        </Link>

                        <p className="mt-6 max-w-sm text-sm leading-7 text-emerald-100/70">
                            Bringing people together through meaningful events,
                            shared interests, and stronger communities.
                            Discover, connect, and create something meaningful with Togetherly.
                        </p>

                        {/* Contact Information */}
                        <div className="mt-7 space-y-4">
                            <div className="flex items-center gap-3 text-sm text-emerald-100/80">
                                <Mail size={17} className="text-emerald-300" />
                                hello@togetherly.com
                            </div>

                            <div className="flex items-center gap-3 text-sm text-emerald-100/80">
                                <MapPin size={17} className="text-emerald-300" />
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
                                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-emerald-100 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:bg-emerald-500 hover:text-white"
                                    >
                                        <Icon size={18} />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Platform Links */}
                    <div>
                        <h3 className="mb-6 text-base font-bold text-white">
                            Platform
                        </h3>

                        <ul className="space-y-4">
                            {footerLinks.platform.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="group flex w-fit items-center gap-2 text-sm text-emerald-100/70 transition-colors hover:text-white"
                                    >
                                        {link.name}
                                        <ArrowUpRight
                                            size={14}
                                            className="opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h3 className="mb-6 text-base font-bold text-white">
                            Resources
                        </h3>

                        <ul className="space-y-4">
                            {footerLinks.resources.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="group flex w-fit items-center gap-2 text-sm text-emerald-100/70 transition-colors hover:text-white"
                                    >
                                        {link.name}
                                        <ArrowUpRight
                                            size={14}
                                            className="opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <h3 className="mb-6 text-base font-bold text-white">
                            Legal
                        </h3>

                        <ul className="space-y-4">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="group flex w-fit items-center gap-2 text-sm text-emerald-100/70 transition-colors hover:text-white"
                                    >
                                        {link.name}
                                        <ArrowUpRight
                                            size={14}
                                            className="opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* Bottom Footer */}
                <div className="flex flex-col items-center justify-between gap-5 py-7 text-center sm:flex-row sm:text-left">

                    <p className="text-sm text-emerald-100/60">
                        © 2026 Togetherly. All rights reserved.
                    </p>

                    <p className="flex items-center gap-1.5 text-sm text-emerald-100/60">
                        Made with
                        <Heart size={15} className="fill-rose-400 text-rose-400" />
                        for stronger communities.
                    </p>

                    <Link
                        href="/"
                        className="text-sm font-medium text-emerald-200 transition-colors hover:text-white"
                    >
                        Back to top ↑
                    </Link>

                </div>

            </div>
        </footer>
    );
}
