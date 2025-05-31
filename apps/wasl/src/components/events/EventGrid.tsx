import type { Event } from '@inmaa-wasl/api-client';

import { EventCard } from '../common/EventCard';

interface EventGridProps {
  events: Event[];
  variant?: 'default' | 'compact' | 'registered';
  showRegistrationButton?: boolean;
  showRegistrationStatus?: boolean;
  onRegister?: (eventId: string) => void;
  onUnregister?: (eventId: string) => void;
  className?: string;
}

export function EventGrid({
  events,
  variant = 'default',
  showRegistrationButton = false,
  showRegistrationStatus = false,
  onRegister,
  onUnregister,
  className = '',
}: EventGridProps) {
  if (events.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
          <svg
            className="h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-center text-lg font-medium text-gray-900" dir="rtl">
          لا توجد فعاليات
        </h3>
        <p className="text-center text-gray-600" dir="rtl">
          لم يتم العثور على أي فعاليات في الوقت الحالي.
        </p>
      </div>
    );
  }

  const getGridClasses = () => {
    return variant === 'compact'
      ? 'space-y-4 rtl'
      : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 rtl';
  };

  return (
    <div className={`${getGridClasses()} ${className}`}>
      {events.map((event) => (
        <EventCard
          key={event.uuid}
          event={event}
          variant={variant}
          showRegistrationButton={variant !== 'registered' && showRegistrationButton}
          showRegistrationStatus={showRegistrationStatus || variant === 'registered'}
          onRegister={variant !== 'registered' ? onRegister : undefined}
          onUnregister={variant === 'registered' ? onUnregister : undefined}
        />
      ))}
    </div>
  );
}
