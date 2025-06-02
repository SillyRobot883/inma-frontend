import { Link } from 'react-router-dom';

import { ArrowLeft } from 'lucide-react';

export function EventDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <Link
            to="/events"
            className="text-trust-blue hover:text-trust-blue/80 mb-4 inline-flex items-center gap-2 font-medium"
          >
            العودة للفعاليات
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Hero Section Skeleton */}
        <div className="mb-8 overflow-hidden rounded-xl border bg-white shadow-sm">
          <div className="relative h-64 md:h-80">
            <div className="h-full w-full animate-pulse bg-gray-200"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
                <div className="flex-1">
                  {/* Title skeleton */}
                  <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-white/20 sm:h-8 md:h-10"></div>
                  {/* Tags skeleton */}
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="h-6 w-20 animate-pulse rounded-full bg-white/20"></div>
                    <div className="h-6 w-16 animate-pulse rounded-full bg-white/20"></div>
                  </div>
                </div>
                {/* Action buttons skeleton */}
                <div className="flex flex-wrap gap-2 sm:flex-nowrap">
                  <div className="h-10 w-10 animate-pulse rounded-lg bg-white/20"></div>
                  <div className="h-10 w-10 animate-pulse rounded-lg bg-white/20"></div>
                  <div className="h-10 w-10 animate-pulse rounded-lg bg-white/20"></div>
                  <div className="h-10 w-10 animate-pulse rounded-lg bg-white/20"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2 lg:space-y-8">
            {/* Description skeleton */}
            <div className="rounded-xl border bg-white p-4 shadow-sm lg:p-6">
              <div className="mb-4 h-6 w-24 animate-pulse rounded bg-gray-200"></div>
              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
                <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
              </div>
            </div>

            {/* Date and location skeleton */}
            <div className="rounded-xl border bg-white p-4 shadow-sm lg:p-6">
              <div className="mb-4 h-6 w-32 animate-pulse rounded bg-gray-200"></div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 animate-pulse rounded bg-gray-200"></div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 h-4 w-20 animate-pulse rounded bg-gray-200"></div>
                    <div className="h-4 w-48 animate-pulse rounded bg-gray-200"></div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 animate-pulse rounded bg-gray-200"></div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 h-4 w-16 animate-pulse rounded bg-gray-200"></div>
                    <div className="h-4 w-32 animate-pulse rounded bg-gray-200"></div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 animate-pulse rounded bg-gray-200"></div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 h-4 w-16 animate-pulse rounded bg-gray-200"></div>
                    <div className="h-4 w-40 animate-pulse rounded bg-gray-200"></div>
                    <div className="mt-1 h-3 w-24 animate-pulse rounded bg-gray-200"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration period skeleton */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="mb-4 h-6 w-28 animate-pulse rounded bg-gray-200"></div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-4 w-32 animate-pulse rounded bg-gray-200"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-4 w-32 animate-pulse rounded bg-gray-200"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration section skeleton */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="mb-4 h-6 w-16 animate-pulse rounded bg-gray-200"></div>

              {/* Progress bar skeleton */}
              <div className="mb-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
                </div>
                <div className="h-3 w-full animate-pulse rounded-full bg-gray-200"></div>
                <div className="mt-1 h-3 w-20 animate-pulse rounded bg-gray-200"></div>
              </div>

              {/* Registration button skeleton */}
              <div className="h-12 w-full animate-pulse rounded-lg bg-gray-200"></div>
            </div>

            {/* Statistics skeleton */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="mb-4 h-6 w-32 animate-pulse rounded bg-gray-200"></div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-pulse rounded bg-gray-200"></div>
                    <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
                  </div>
                  <div className="h-4 w-12 animate-pulse rounded bg-gray-200"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-pulse rounded bg-gray-200"></div>
                    <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
                  </div>
                  <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
                </div>
              </div>
            </div>

            {/* Related events skeleton */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="mb-4 h-6 w-24 animate-pulse rounded bg-gray-200"></div>
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="rounded-lg border p-3">
                    <div className="mb-1 h-4 w-full animate-pulse rounded bg-gray-200"></div>
                    <div className="h-3 w-20 animate-pulse rounded bg-gray-200"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
