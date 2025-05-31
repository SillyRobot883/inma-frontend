import { useNavigate } from 'react-router-dom';

import { Calendar, Trophy } from 'lucide-react';

import { EventCard } from '@/components/common/EventCard';
import { Button } from '@/components/ui/button';

type EventStatusType = 'upcoming' | 'ongoing' | 'registration_open' | 'completed' | 'cancelled';
type EventRegistrationStatusType = 'pending' | 'accepted' | 'rejected';

interface UserEvent {
  id: number;
  uuid: string;
  name: string;
  location: string;
  eventStart: string;
  eventEnd: string;
  club: {
    name: string;
  };
  status: EventStatusType;
  registrationStatus?: EventRegistrationStatusType;
}

interface EventsListProps {
  events: UserEvent[];
  type: 'registered' | 'completed';
}

export function EventsList({ events, type }: EventsListProps) {
  const navigate = useNavigate();

  const isRegistered = type === 'registered';
  const icon = isRegistered ? Calendar : Trophy;
  const title = isRegistered ? 'لا توجد فعاليات مسجلة' : 'لا توجد فعاليات مكتملة';
  const description = isRegistered
    ? 'تصفح الفعاليات المتاحة وسجل في التي تهمك'
    : 'شارك في المزيد من الفعاليات لبناء سجلك';
  const buttonText = 'تصفح الفعاليات';

  if (events.length === 0) {
    return (
      <div className="py-8 text-center">
        {icon({ className: 'text-muted-foreground mx-auto mb-4 h-12 w-12' })}
        <h3 className="mb-2 text-lg font-medium">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <Button onClick={() => navigate('/events')}>{buttonText}</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          variant="profile"
          showDuration={!isRegistered}
          showClub={true}
        />
      ))}
    </div>
  );
}
