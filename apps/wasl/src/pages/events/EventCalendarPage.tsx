import { EventCalendar } from '@/components/events/EventCalendar';
import { mockEvents } from '@/data/mockEvents';

export function EventCalendarPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">تقويم الفعاليات</h1>
          <p className="text-gray-600">
            استعرض جميع الفعاليات في تقويم شهري واطلع على التواريخ المهمة
          </p>
        </div>

        <EventCalendar events={mockEvents} />
      </div>
    </div>
  );
}
