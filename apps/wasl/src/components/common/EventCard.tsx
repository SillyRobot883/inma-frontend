import { Link } from 'react-router-dom';

import type { Event, EventRegistrationStatusType } from '@inmaa-wasl/api-client';
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  type LucideIcon,
  MapPin,
  Timer,
  XCircle,
} from 'lucide-react';

import {
  getCategoryColor,
  getCategoryLabel,
  getStatusColor,
  getStatusLabel,
} from '@/lib/translations';

interface BaseEvent {
  id?: number;
  uuid: string;
  name: string;
  location: string;
  eventStart: string;
  eventEnd: string;
  status: 'upcoming' | 'ongoing' | 'registration_open' | 'completed' | 'cancelled';
}

type FullEvent = Event;

interface ProfileEvent extends BaseEvent {
  club: {
    name: string;
  };
  registrationStatus?: EventRegistrationStatusType;
}

interface RegisteredEvent extends Event {
  registrationStatus: EventRegistrationStatusType;
}

type EventCardEvent = FullEvent | ProfileEvent | RegisteredEvent;

export interface EventCardProps {
  event: EventCardEvent;
  variant?: 'default' | 'compact' | 'profile' | 'registered';

  showRegistrationButton?: boolean;
  showRegistrationStatus?: boolean;
  onRegister?: (eventId: string) => void;
  onUnregister?: (eventId: string) => void;

  showDuration?: boolean;
  showCategory?: boolean;
  showClub?: boolean;

  className?: string;
}

export function EventCard({
  event,
  variant = 'default',
  showRegistrationButton = false,
  showRegistrationStatus = false,
  onRegister,
  onUnregister,
  showDuration = false,
  showCategory = true,
  showClub = true,
  className = '',
}: EventCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-GA', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-SA', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const getSeatsPercentage = () => {
    if ('seatsAvailable' in event && 'seatsRemaining' in event) {
      return ((event.seatsAvailable - event.seatsRemaining) / event.seatsAvailable) * 100;
    }
    return 0;
  };

  const calculateDuration = () => {
    return Math.ceil(
      (new Date(event.eventEnd).getTime() - new Date(event.eventStart).getTime()) / (1000 * 60 * 60)
    );
  };

  const clubData = 'club' in event ? event.club : null;

  const hasLogo = (club: unknown): club is { name: string; logo: string; uuid?: string } => {
    return !!(
      club &&
      typeof club === 'object' &&
      'logo' in club &&
      typeof (club as { logo: unknown }).logo === 'string'
    );
  };

  const isRegistrationOpen = event.status === 'registration_open';
  const canRegister = isRegistrationOpen && 'seatsRemaining' in event && event.seatsRemaining > 0;

  const getRegistrationStatusBadge = (): {
    icon: LucideIcon;
    label: string;
    className: string;
  } | null => {
    if (!('registrationStatus' in event)) return null;

    switch (event.registrationStatus) {
      case 'accepted':
        return {
          icon: CheckCircle,
          label: 'مؤكد',
          className: 'bg-green-100 text-green-800 border-green-200',
        };
      case 'pending':
        return {
          icon: AlertCircle,
          label: 'في الانتظار',
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        };
      case 'rejected':
        return {
          icon: XCircle,
          label: 'مرفوض',
          className: 'bg-red-100 text-red-800 border-red-200',
        };
      default:
        return null;
    }
  };

  const getProfileStatusBadge = () => {
    if (
      ('registrationStatus' in event && event.registrationStatus === 'accepted') ||
      event.status === 'upcoming'
    ) {
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

  if (variant === 'profile') {
    return (
      <div className="border-trust-blue/20 hover:border-trust-blue/40 flex items-center justify-between rounded-lg border border-l-4 p-4 transition-colors">
        {getProfileStatusBadge()}
        <div className="space-y-1 text-right">
          <h4 className="font-medium">{event.name}</h4>
          {clubData && <p className="text-muted-foreground text-sm">{clubData.name}</p>}
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
                {formatTime(event.eventStart)}
              </span>
            )}
            <span className="text-muted-foreground flex items-center gap-1" dir="rtl">
              <Calendar className="h-3 w-3" />
              {formatDate(event.eventStart)}
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    const statusBadge = getRegistrationStatusBadge();
    const StatusIcon = statusBadge?.icon;

    return (
      <Link
        to={`/events/${event.uuid}`}
        className={`block cursor-pointer rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md ${className}`}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            {' '}
            <img
              src={
                'poster' in event
                  ? event.poster || '/placeholder-event.jpg'
                  : '/placeholder-event.jpg'
              }
              alt={event.name}
              className="h-16 w-16 rounded-lg object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src =
                  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yOCAzMkwyMCAyNFYxOEg0NFYyNEwzNiAzMkgyOFoiIGZpbGw9IiM5Q0E0QUYiLz4KPHBhdGggZD0iTTI0IDM0SDQwVjQ2SDI0VjM0WiIgZmlsbD0iIzlDQTNBRiIvPgo8Y2lyY2xlIGN4PSIyOCIgY3k9IjI4IiByPSIyIiBmaWxsPSIjNjM3NEI0Ii8+Cjwvc3ZnPgo=';
              }}
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="truncate text-right font-semibold text-gray-900" dir="rtl">
                {event.name}
              </h3>
              {statusBadge &&
              StatusIcon &&
              showRegistrationStatus &&
              event.status !== 'cancelled' ? (
                <span
                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-medium ${statusBadge.className}`}
                >
                  <StatusIcon className="h-3 w-3" />
                  {statusBadge.label}
                </span>
              ) : (
                <span
                  className={`rounded-full border px-2 py-1 text-xs font-medium ${getStatusColor(event.status)}`}
                >
                  {getStatusLabel(event.status)}
                </span>
              )}
            </div>

            {showClub && clubData && (
              <div className="mb-2 mt-1 flex items-center gap-2" dir="rtl">
                <span className="text-xs text-gray-500">{clubData.name}</span>
                {hasLogo(clubData) && (
                  <img
                    src={clubData.logo}
                    alt={clubData.name}
                    className="h-5 w-5 rounded-full object-cover"
                  />
                )}
              </div>
            )}

            <div className="mt-2 flex items-center gap-4 text-sm text-gray-600" dir="rtl">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(event.eventStart)}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span className="truncate">{event.location}</span>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <div className="text-trust-blue order-2 flex items-center gap-1 text-sm font-medium">
                <ArrowLeft className="h-4 w-4" />
                <span>التفاصيل</span>
              </div>
              {showCategory && 'category' in event && (
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${getCategoryColor(event.category)} order-1`}
                >
                  {getCategoryLabel(event.category)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  const statusBadge = getRegistrationStatusBadge();
  const StatusIcon = statusBadge?.icon;

  return (
    <Link
      to={`/events/${event.uuid}`}
      className={`group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-lg ${className}`}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={
            'poster' in event ? event.poster || '/placeholder-event.jpg' : '/placeholder-event.jpg'
          }
          alt={event.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDgwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zNTAgMjAwTDMwMCAxNTBWMTAwSDUwMFYxNTBMNDUwIDIwMEgzNTBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0zMDAgMjIwSDUwMFYzMDBIMzAwVjIyMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPGNpcmNsZSBjeD0iMzUwIiBjeT0iMTc1IiByPSIxMCIgZmlsbD0iIzYzNzRCNCIvPgo8L3N2Zz4K';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute right-3 top-3">
          {variant === 'registered' && event.status !== 'cancelled' && statusBadge && StatusIcon ? (
            <span
              className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 font-medium ${statusBadge.className} bg-white`}
            >
              <StatusIcon className="h-4 w-4" />
              {statusBadge.label}
            </span>
          ) : (
            <span
              className={`rounded-full border px-2 py-1 text-xs font-medium ${getStatusColor(event.status)} bg-white`}
            >
              {getStatusLabel(event.status)}
            </span>
          )}
        </div>
        {showCategory && 'category' in event && (
          <div className="absolute bottom-3 left-3">
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${getCategoryColor(event.category)}`}
            >
              {getCategoryLabel(event.category)}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        {showClub && clubData && (
          <div className="mb-2 flex items-center justify-start gap-2" dir="rtl">
            {hasLogo(clubData) && (
              <img
                src={clubData.logo}
                alt={clubData.name}
                className="h-6 w-6 rounded-full object-cover"
              />
            )}
            <span className="text-xs text-gray-500">{clubData.name}</span>
          </div>
        )}

        <h3 className="mb-2 line-clamp-1 text-right text-lg font-bold text-gray-900" dir="rtl">
          {event.name}
        </h3>
        {'description' in event && (
          <p className="mb-4 line-clamp-2 text-right text-sm text-gray-600" dir="rtl">
            {event.description}
          </p>
        )}

        <div className="mb-4 space-y-2">
          <div className="flex items-center justify-start gap-2 text-sm text-gray-600" dir="rtl">
            <Calendar className="h-4 w-4" />
            <span>
              {formatDate(event.eventStart)} - {formatDate(event.eventEnd)}
            </span>
          </div>
          <div className="flex items-center justify-start gap-2 text-sm text-gray-600" dir="rtl">
            <Clock className="h-4 w-4" />
            <span>
              {formatTime(event.eventStart)} - {formatTime(event.eventEnd)}
            </span>
          </div>
          <div className="flex items-center justify-start gap-2 text-sm text-gray-600" dir="rtl">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
        </div>

        <div className="mt-auto">
          {'seatsAvailable' in event && 'seatsRemaining' in event && (
            <div className="mb-4">
              <div className="mb-1 flex items-center justify-between text-sm text-gray-600">
                <span className="text-left" dir="rtl">
                  المقاعد المحجوزة
                </span>
                <span className="text-right" dir="rtl">
                  {event.seatsAvailable - event.seatsRemaining} / {event.seatsAvailable}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="bg-trust-blue h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getSeatsPercentage()}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {variant !== 'registered' && showRegistrationButton && canRegister && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onRegister?.(event.uuid);
                  }}
                  className="bg-trust-blue hover:bg-trust-blue/90 rounded-lg px-4 py-2 font-medium text-white transition-colors"
                >
                  سجل الآن
                </button>
              )}

              {variant === 'registered' &&
                'registrationStatus' in event &&
                event.registrationStatus === 'accepted' &&
                onUnregister && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onUnregister(event.uuid);
                    }}
                    className="rounded-lg border border-red-200 px-3 py-1 text-sm text-red-600 transition-colors hover:bg-red-50"
                  >
                    إلغاء التسجيل
                  </button>
                )}

              {variant !== 'registered' && !showRegistrationButton && (
                <div className="text-right">
                  {'seatsRemaining' in event && !canRegister && event.seatsRemaining === 0 && (
                    <span className="text-sm font-medium text-red-600">المقاعد ممتلئة</span>
                  )}
                  {!isRegistrationOpen && (
                    <span className="text-sm text-gray-600">التسجيل مغلق</span>
                  )}
                </div>
              )}
            </div>

            <div className="text-trust-blue inline-flex items-center gap-1 text-sm font-medium">
              <ArrowLeft className="h-4 w-4" />
              <span>التفاصيل</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
