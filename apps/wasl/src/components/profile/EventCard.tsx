import { Calendar, Clock, MapPin, Timer } from 'lucide-react';

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

interface EventCardProps {
  event: UserEvent;
  showDuration?: boolean;
}

export function EventCard({ event, showDuration = false }: EventCardProps) {
  const getStatusBadge = () => {
    if (event.registrationStatus === 'accepted' || event.status === 'upcoming') {
      return (
        <div className="bg-secondary-blue/10 text-secondary-blue rounded-full px-3 py-1 text-xs font-medium">
          مسجل
        </div>
      );
    }
    if (event.status === 'completed') {
      return (
        <div className="bg-growth-green/10 text-growth-green rounded-full px-3 py-1 text-xs font-medium">
          مكتملة
        </div>
      );
    }
    return null;
  };

  const calculateDuration = () => {
    return Math.ceil(
      (new Date(event.eventEnd).getTime() - new Date(event.eventStart).getTime()) / (1000 * 60 * 60)
    );
  };

  return (
    <div className="border-trust-blue/20 hover:border-trust-blue/40 flex items-center justify-between rounded-lg border border-l-4 p-4 transition-colors">
      {getStatusBadge()}
      <div className="space-y-1 text-right">
        <h4 className="font-medium">{event.name}</h4>
        <p className="text-muted-foreground text-sm">{event.club.name}</p>
        <p className="text-muted-foreground flex items-center gap-1 text-xs" dir="rtl">
          <MapPin className="h-3 w-3" />
          {event.location}
        </p>
        <div className="flex items-center justify-end gap-4 text-sm">
          {showDuration ? (
            <span className="text-muted-foreground flex items-center gap-1" dir="rtl">
              <Timer className="h-3 w-3" />
              {calculateDuration()} ساعات
            </span>
          ) : (
            <span className="text-muted-foreground flex items-center gap-1" dir="rtl">
              <Clock className="h-3 w-3" />
              {new Date(event.eventStart).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })}
            </span>
          )}
          <span className="text-muted-foreground flex items-center gap-1" dir="rtl">
            <Calendar className="h-3 w-3" />
            {new Date(event.eventStart).toLocaleDateString('en-US')}
          </span>
        </div>
      </div>
    </div>
  );
}
