import { EventCardSkeleton } from '@/components/common/EventCardSkeleton';

interface EventGridSkeletonProps {
  variant?: 'default' | 'compact' | 'registered';
  count?: number;
  className?: string;
}

export function EventGridSkeleton({
  variant = 'default',
  count = 6,
  className = '',
}: EventGridSkeletonProps) {
  const getGridClasses = () => {
    return variant === 'compact'
      ? 'space-y-4 rtl'
      : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 rtl';
  };

  return (
    <div className={`${getGridClasses()} ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <EventCardSkeleton
          key={`skeleton-${index}`}
          variant={variant}
          showClub={true}
          showCategory={true}
        />
      ))}
    </div>
  );
}
