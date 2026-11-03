
export default function LoadingSkeleton() {
  return (
    <section className="animate-pulse">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">

        {/* Section Heading Skeleton */}
        <div className="mb-10 flex flex-col items-center gap-3">
          <div className="h-4 w-32 rounded-full bg-muted" />
          <div className="h-8 w-64 max-w-full rounded-lg bg-muted sm:h-10 sm:w-80" />
          <div className="h-3 w-72 max-w-full rounded-md bg-muted" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">

          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            >
              {/* Image Skeleton */}
              <div className="aspect-[16/10] w-full bg-muted" />

              {/* Content Skeleton */}
              <div className="space-y-4 p-5">

                {/* Category and Date */}
                <div className="flex items-center justify-between gap-3">
                  <div className="h-5 w-20 rounded-full bg-muted" />
                  <div className="h-4 w-24 rounded-md bg-muted" />
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <div className="h-5 w-full rounded-md bg-muted" />
                  <div className="h-5 w-3/4 rounded-md bg-muted" />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <div className="h-3 w-full rounded-md bg-muted" />
                  <div className="h-3 w-5/6 rounded-md bg-muted" />
                  <div className="h-3 w-2/3 rounded-md bg-muted" />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <div className="h-8 w-24 rounded-lg bg-muted" />
                  <div className="h-8 w-20 rounded-lg bg-muted" />
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
