
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Community Volunteer",
    image: "https://i.pravatar.cc/150?img=47",
    review:
      "Togetherly helped me discover amazing community events and connect with people who share my passion for making a difference. It's truly a wonderful platform!",
  },
  {
    name: "Michael Chen",
    role: "Event Organizer",
    image: "https://i.pravatar.cc/150?img=12",
    review:
      "Organizing events has never been this easy. Togetherly gives me everything I need to bring people together and build an active community.",
  },
  {
    name: "Emily Davis",
    role: "Active Member",
    image: "https://i.pravatar.cc/150?img=44",
    review:
      "I joined Togetherly to find local activities, but I found much more than that. I've made great friends and become part of an amazing community.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white px-5 py-20 md:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            Community Voices
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Stories From Our{" "}
            <span className="text-emerald-600">Community</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-500 sm:text-lg">
            Discover how Togetherly is helping people connect,
            create meaningful experiences, and build stronger communities.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="group relative rounded-3xl border border-slate-200 bg-[#FAFAF9] p-7 transition-all duration-300 hover:-translate-y-2 hover:border-emerald-200 hover:bg-white hover:shadow-xl hover:shadow-emerald-900/5 sm:p-8"
            >
              {/* Quote Icon */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={17}
                      fill="currentColor"
                    />
                  ))}
                </div>

                <Quote
                  size={34}
                  className="text-emerald-100 transition-colors group-hover:text-emerald-200"
                  fill="currentColor"
                />
              </div>

              {/* Review */}
              <p className="min-h-[144px] text-base leading-7 text-slate-600">
                "{testimonial.review}"
              </p>

              {/* User Information */}
              <div className="mt-8 flex items-center gap-4 border-t border-slate-200 pt-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full border-2 border-emerald-100 object-cover"
                />

                <div>
                  <h3 className="font-bold text-slate-900 transition-colors group-hover:text-emerald-700">
                    {testimonial.name}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="mt-14 text-center">
          <p className="text-sm font-medium text-slate-500">
            Be part of our growing community and create your own story.
          </p>
        </div>

      </div>
    </section>
  );
}
