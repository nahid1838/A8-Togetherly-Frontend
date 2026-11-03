import { ArrowUpRight, Camera } from "lucide-react";

const galleryImages = [
    {
        id: 1,
        title: "Community Cleanup",
        category: "Environment",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=85",
        className: "md:col-span-2 md:row-span-2",
    },
    {
        id: 2,
        title: "Helping Hands",
        category: "Community Support",
        image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=900&q=85",
        className: "",
    },
    {
        id: 3,
        title: "Making a Difference",
        category: "Volunteering",
        image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=900&q=85",
        className: "",
    },
    {
        id: 4,
        title: "Growing Together",
        category: "Tree Plantation",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=900&q=85",
        className: "",
    },
    {
        id: 5,
        title: "Sharing Happiness",
        category: "Social Welfare",
        image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=900&q=85",
        className: "",
    },
];

const Gallery = () => {
    return (
        <section className="relative overflow-hidden bg-white py-20 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Section Heading */}
                <div className="mb-12 flex flex-col items-center text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                        <Camera size={16} />
                        Moments That Matter
                    </div>

                    <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                        Little Moments,{" "}
                        <span className="text-emerald-600">
                            Big Impact
                        </span>
                    </h2>

                    <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
                        Every smile tells a story. Explore the beautiful
                        moments created by people coming together to make
                        their communities better.
                    </p>
                </div>

                {/* Gallery Grid */}
                <div className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[230px] md:grid-cols-3">

                    {galleryImages.map((item) => (
                        <div
                            key={item.id}
                            className={`group relative isolate overflow-hidden rounded-2xl bg-emerald-50 ${item.className}`}
                        >
                            {/* Gallery Image */}
                            <img
                                src={item.image}
                                alt={item.title}
                                loading="lazy"
                                className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 -z-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

                            {/* Content */}
                            <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between p-5 sm:p-6">
                                <div>
                                    <span className="mb-2 inline-block rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                                        {item.category}
                                    </span>

                                    <h3 className="text-xl font-bold text-white sm:text-2xl">
                                        {item.title}
                                    </h3>
                                </div>

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/20 text-white backdrop-blur-md transition-all duration-300 group-hover:rotate-45 group-hover:bg-emerald-500 group-hover:border-emerald-500">
                                    <ArrowUpRight size={20} />
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

                {/* Bottom Text */}
                <div className="mt-10 text-center">
                    <p className="text-sm font-medium text-gray-500">
                        Together, we create moments worth remembering.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default Gallery;