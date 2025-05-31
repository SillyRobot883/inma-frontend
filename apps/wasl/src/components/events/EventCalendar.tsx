import { useState } from 'react';
import { Link } from 'react-router-dom';

import type { Event } from '@inmaa-wasl/api-client';
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';

import { getStatusColor, getStatusLabel } from '../../lib/translations';

interface EventCalendarProps {
  events: Event[];
}

export function EventCalendar({ events }: EventCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

  const firstDayOfCalendar = new Date(firstDayOfMonth);
  firstDayOfCalendar.setDate(firstDayOfCalendar.getDate() - firstDayOfMonth.getDay());

  const calendarDays = [];
  const currentCalendarDay = new Date(firstDayOfCalendar);

  for (let i = 0; i < 42; i++) {
    calendarDays.push(new Date(currentCalendarDay));
    currentCalendarDay.setDate(currentCalendarDay.getDate() + 1);
  }

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.eventStart);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const monthNames = [
    'يناير',
    'فبراير',
    'مارس',
    'أبريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر',
  ];

  const dayNames = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <div className="border-b p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={goToToday}
              className="bg-trust-blue hover:bg-trust-blue/90 rounded-lg px-3 py-1 text-sm text-white transition-colors"
            >
              اليوم
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={goToPreviousMonth}
              className="rounded-lg p-2 transition-colors hover:bg-gray-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              onClick={goToNextMonth}
              className="rounded-lg p-2 transition-colors hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4 grid grid-cols-7 gap-1">
          {dayNames.map((day) => (
            <div key={day} className="p-3 text-center text-sm font-semibold text-gray-600">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((date, index) => {
            const dayEvents = getEventsForDate(date);
            const isCurrentMonthDay = isCurrentMonth(date);
            const isTodayDate = isToday(date);

            return (
              <div
                key={index}
                className={`min-h-[120px] rounded-lg border p-2 ${
                  isCurrentMonthDay ? 'bg-white' : 'bg-gray-50'
                } ${isTodayDate ? 'ring-trust-blue ring-2' : ''}`}
              >
                <div
                  className={`mb-2 text-sm font-semibold ${
                    isCurrentMonthDay ? 'text-gray-900' : 'text-gray-400'
                  } ${isTodayDate ? 'text-trust-blue' : ''}`}
                >
                  {date.getDate()}
                </div>

                <div className="space-y-1">
                  {dayEvents.slice(0, 2).map((event) => (
                    <Link
                      key={event.uuid}
                      to={`/events/${event.uuid}`}
                      className="bg-trust-blue/10 text-trust-blue hover:bg-trust-blue/20 block truncate rounded p-1 text-xs transition-colors"
                    >
                      {event.name}
                    </Link>
                  ))}

                  {dayEvents.length > 2 && (
                    <div className="px-1 text-xs text-gray-500">+{dayEvents.length - 2} أخرى</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          فعاليات {monthNames[currentDate.getMonth()]}
        </h3>

        <div className="space-y-3">
          {events
            .filter((event) => {
              const eventDate = new Date(event.eventStart);
              return (
                eventDate.getMonth() === currentDate.getMonth() &&
                eventDate.getFullYear() === currentDate.getFullYear()
              );
            })
            .sort((a, b) => new Date(a.eventStart).getTime() - new Date(b.eventStart).getTime())
            .slice(0, 5)
            .map((event) => (
              <Link
                key={event.uuid}
                to={`/events/${event.uuid}`}
                className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-gray-50"
              >
                <div className="bg-trust-blue/10 flex h-12 w-12 items-center justify-center rounded-lg">
                  <Calendar className="text-trust-blue h-6 w-6" />
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{event.name}</h4>
                  <div className="mt-1 flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {new Date(event.eventStart).toLocaleDateString('ar-SA')}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </div>
                  </div>
                </div>

                <div
                  className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(event.status)}`}
                >
                  {getStatusLabel(event.status)}
                </div>
              </Link>
            ))}
        </div>

        {events.filter((event) => {
          const eventDate = new Date(event.eventStart);
          return (
            eventDate.getMonth() === currentDate.getMonth() &&
            eventDate.getFullYear() === currentDate.getFullYear()
          );
        }).length > 5 && (
          <div className="mt-4 text-center">
            <Link
              to="/events"
              className="text-trust-blue hover:text-trust-blue/80 text-sm font-medium"
            >
              عرض جميع الفعاليات
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
