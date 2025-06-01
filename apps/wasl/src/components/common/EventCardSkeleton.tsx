interface EventCardSkeletonProps {
  variant?: 'default' | 'compact' | 'registered';
  showClub?: boolean;
  showCategory?: boolean;
  className?: string;
}

export function EventCardSkeleton({
  variant = 'default',
  showClub = true,
  showCategory = true,
  className = '',
}: EventCardSkeletonProps) {
  if (variant === 'compact') {
    return (
      <div
        className={`group flex h-full cursor-default overflow-hidden rounded-xl border border-gray-200 bg-white ${className}`}
      >
        <div className="flex h-32 w-full">
          {/* Image skeleton */}
          <div className="relative h-full w-32 flex-shrink-0 overflow-hidden">
            <div className="h-full w-full animate-pulse bg-gray-200"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            {/* Status badge skeleton */}
            <div className="absolute right-2 top-2">
              <div className="h-6 w-16 animate-pulse rounded-full bg-gray-300"></div>
            </div>
            {/* Category badge skeleton */}
            {showCategory && (
              <div className="absolute bottom-2 left-2">
                <div className="h-5 w-12 animate-pulse rounded-full bg-gray-300"></div>
              </div>
            )}
          </div>

          {/* Content skeleton */}
          <div className="flex flex-1 flex-col p-4">
            {/* Club info skeleton */}
            {showClub && (
              <div className="mb-2 flex items-center justify-start gap-2" dir="rtl">
                <div className="h-4 w-4 animate-pulse rounded-full bg-gray-300"></div>
                <div className="h-3 w-20 animate-pulse rounded bg-gray-300"></div>
              </div>
            )}

            {/* Title skeleton */}
            <div className="mb-2 h-5 w-3/4 animate-pulse rounded bg-gray-300" dir="rtl"></div>

            {/* Date and location skeleton */}
            <div className="mt-2 flex items-center gap-4 text-sm" dir="rtl">
              <div className="flex items-center gap-1">
                <div className="h-4 w-4 animate-pulse rounded bg-gray-300"></div>
                <div className="h-3 w-16 animate-pulse rounded bg-gray-300"></div>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-4 w-4 animate-pulse rounded bg-gray-300"></div>
                <div className="h-3 w-20 animate-pulse rounded bg-gray-300"></div>
              </div>
            </div>

            {/* Details link skeleton */}
            <div className="mt-2 flex items-center justify-between">
              <div className="order-2 flex items-center gap-1">
                <div className="h-4 w-4 animate-pulse rounded bg-gray-300"></div>
                <div className="h-4 w-12 animate-pulse rounded bg-gray-300"></div>
              </div>
              {showCategory && (
                <div className="order-1">
                  <div className="h-5 w-16 animate-pulse rounded-full bg-gray-300"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group flex h-full cursor-default flex-col overflow-hidden rounded-xl border border-gray-200 bg-white ${className}`}
    >
      {/* Image skeleton */}
      <div className="relative h-48 overflow-hidden">
        <div className="h-full w-full animate-pulse bg-gray-200"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

        {/* Status badge skeleton */}
        <div className="absolute right-3 top-3">
          {variant === 'registered' ? (
            <div className="h-7 w-20 animate-pulse rounded-full bg-gray-300"></div>
          ) : (
            <div className="h-6 w-16 animate-pulse rounded-full bg-gray-300"></div>
          )}
        </div>

        {/* Category badge skeleton */}
        {showCategory && (
          <div className="absolute bottom-3 left-3">
            <div className="h-5 w-14 animate-pulse rounded-full bg-gray-300"></div>
          </div>
        )}
      </div>

      {/* Content skeleton */}
      <div className="flex flex-1 flex-col p-5">
        {/* Club info skeleton */}
        {showClub && (
          <div className="mb-2 flex items-center justify-start gap-2" dir="rtl">
            <div className="h-6 w-6 animate-pulse rounded-full bg-gray-300"></div>
            <div className="h-3 w-24 animate-pulse rounded bg-gray-300"></div>
          </div>
        )}

        {/* Title skeleton */}
        <div className="mb-2 h-6 w-4/5 animate-pulse rounded bg-gray-300" dir="rtl"></div>

        {/* Description skeleton */}
        <div className="mb-4 space-y-2" dir="rtl">
          <div className="h-4 w-full animate-pulse rounded bg-gray-300"></div>
          <div className="h-4 w-3/4 animate-pulse rounded bg-gray-300"></div>
        </div>

        {/* Event details skeleton */}
        <div className="mb-4 space-y-2">
          <div className="flex items-center justify-start gap-2" dir="rtl">
            <div className="h-4 w-4 animate-pulse rounded bg-gray-300"></div>
            <div className="h-4 w-32 animate-pulse rounded bg-gray-300"></div>
          </div>
          <div className="flex items-center justify-start gap-2" dir="rtl">
            <div className="h-4 w-4 animate-pulse rounded bg-gray-300"></div>
            <div className="h-4 w-28 animate-pulse rounded bg-gray-300"></div>
          </div>
          <div className="flex items-center justify-start gap-2" dir="rtl">
            <div className="h-4 w-4 animate-pulse rounded bg-gray-300"></div>
            <div className="h-4 w-24 animate-pulse rounded bg-gray-300"></div>
          </div>
        </div>

        {/* Footer skeleton */}
        <div className="mt-auto">
          {/* Seats progress skeleton */}
          <div className="mb-4">
            <div className="mb-1 flex items-center justify-between">
              <div className="h-3 w-20 animate-pulse rounded bg-gray-300"></div>
              <div className="h-3 w-12 animate-pulse rounded bg-gray-300"></div>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div className="h-2 w-2/3 animate-pulse rounded-full bg-gray-300"></div>
            </div>
          </div>

          {/* Action buttons skeleton */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {variant !== 'registered' && (
                <div className="h-9 w-20 animate-pulse rounded-lg bg-gray-300"></div>
              )}
              {variant === 'registered' && (
                <div className="h-7 w-24 animate-pulse rounded-lg bg-gray-300"></div>
              )}
            </div>
            <div className="flex items-center gap-1">
              <div className="h-4 w-4 animate-pulse rounded bg-gray-300"></div>
              <div className="h-4 w-12 animate-pulse rounded bg-gray-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
