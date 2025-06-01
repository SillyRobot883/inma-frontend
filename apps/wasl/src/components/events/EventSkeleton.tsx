import { Calendar, Clock, MapPin } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';

interface EventSkeletonProps {
  variant?: 'default' | 'compact';
  count?: number;
}

function EventCardSkeleton({ variant = 'default' }: { variant?: 'default' | 'compact' }) {
  if (variant === 'compact') {
    return (
      <div className="flex gap-4 rounded-xl border bg-white p-4 shadow-sm">
        <Skeleton className="h-20 w-32 rounded-lg" />
        <div className="flex-1 space-y-3">
          <div className="space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-8 w-24 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <Skeleton className="h-48 w-full" />
      <div className="space-y-4 p-6">
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <Skeleton className="h-6 w-20 rounded-full" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-8 w-24 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function EventSkeleton({ variant = 'default', count = 6 }: EventSkeletonProps) {
  const getGridClasses = () => {
    switch (variant) {
      case 'compact':
        return 'space-y-4';
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    }
  };

  return (
    <div className={getGridClasses()}>
      {Array.from({ length: count }).map((_, index) => (
        <EventCardSkeleton key={index} variant={variant} />
      ))}
    </div>
  );
}
