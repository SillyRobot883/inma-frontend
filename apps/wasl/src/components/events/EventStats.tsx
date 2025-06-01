import type { Event, EventCategoryType } from '@inmaa-wasl/api-client';
import { Award, Calendar, Clock, MapPin, TrendingUp, Users } from 'lucide-react';

import { getCategoryLabel } from '@/lib/translations';

interface EventStatsProps {
  events: Event[];
  className?: string;
}

export function EventStats({ events, className = '' }: EventStatsProps) {
  const totalEvents = events.length;
  const totalSeats = events.reduce((sum, event) => sum + event.seatsAvailable, 0);
  const totalRegistrations = events.reduce(
    (sum, event) => sum + (event.seatsAvailable - event.seatsRemaining),
    0
  );
  const openRegistrations = events.filter((event) => event.status === 'registration_open').length;
  const upcomingEvents = events.filter((event) => event.status === 'upcoming').length;
  const mostPopularCategory = getMostPopularCategory(events);

  const stats = [
    {
      title: 'إجمالي الفعاليات',
      value: totalEvents.toLocaleString('ar-SA'),
      icon: Calendar,
      color: 'bg-blue-500',
      description: 'فعالية متاحة',
    },
    {
      title: 'المقاعد المتاحة',
      value: totalSeats.toLocaleString('ar-SA'),
      icon: Users,
      color: 'bg-green-500',
      description: 'مقعد في جميع الفعاليات',
    },
    {
      title: 'إجمالي التسجيلات',
      value: totalRegistrations.toLocaleString('ar-SA'),
      icon: TrendingUp,
      color: 'bg-trust-blue',
      description: 'تسجيل مؤكد',
    },
    {
      title: 'التسجيل مفتوح',
      value: openRegistrations.toLocaleString('ar-SA'),
      icon: Clock,
      color: 'bg-amber-500',
      description: 'فعالية يمكن التسجيل بها',
    },
    {
      title: 'فعاليات قادمة',
      value: upcomingEvents.toLocaleString('ar-SA'),
      icon: MapPin,
      color: 'bg-secondary-blue',
      description: 'فعالية ستبدأ قريباً',
    },
    {
      title: 'الفئة الأكثر شعبية',
      value: getCategoryLabel(mostPopularCategory as EventCategoryType),
      icon: Award,
      color: 'bg-purple-500',
      description: 'أكثر الفئات إقبالاً',
    },
  ];

  return (
    <div className={`rounded-lg border bg-white p-6 shadow-sm ${className}`}>
      <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-900">
        <TrendingUp className="text-trust-blue h-5 w-5" />
        إحصائيات الفعاليات
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="mb-1 text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="mt-1 text-xs text-gray-500">{stat.description}</p>
                </div>
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 border-t border-gray-200 pt-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">معدلات الإقبال</h3>

        <div className="space-y-4">
          <div>
            <div className="mb-1 flex justify-between text-sm text-gray-600">
              <span>معدل التسجيل الإجمالي</span>
              <span>
                {totalSeats > 0 ? Math.round((totalRegistrations / totalSeats) * 100) : 0}%
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div
                className="bg-trust-blue h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${totalSeats > 0 ? (totalRegistrations / totalSeats) * 100 : 0}%`,
                }}
              ></div>
            </div>
          </div>

          <div>
            <div className="mb-2 flex justify-between text-sm text-gray-600">
              <span>توزيع الفئات</span>
              <span>{categories.length} فئة</span>
            </div>
            <div className="flex h-2 gap-1 overflow-hidden rounded-full bg-gray-200">
              {getCategoryDistribution(events).map((cat, index) => (
                <div
                  key={cat.category}
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${cat.percentage}%`,
                    backgroundColor: getCategoryColor(cat.category, index),
                  }}
                  title={`${getCategoryLabel(cat.category as EventCategoryType)}: ${cat.count} فعالية`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getMostPopularCategory(events: Event[]): string {
  const categoryCount: Record<string, number> = {};

  events.forEach((event) => {
    categoryCount[event.category] = (categoryCount[event.category] || 0) + 1;
  });

  return (
    Object.entries(categoryCount).reduce((a, b) =>
      categoryCount[a[0]] > categoryCount[b[0]] ? a : b
    )?.[0] || 'workshop'
  );
}

function getCategoryDistribution(events: Event[]) {
  const categoryCount: Record<string, number> = {};

  events.forEach((event) => {
    categoryCount[event.category] = (categoryCount[event.category] || 0) + 1;
  });

  const total = events.length;

  return Object.entries(categoryCount)
    .map(([category, count]) => ({
      category,
      count,
      percentage: total > 0 ? (count / total) * 100 : 0,
    }))
    .sort((a, b) => b.count - a.count);
}

const categories = [
  'workshop',
  'conference',
  'hackathon',
  'bootcamp',
  'seminar',
  'networking',
  'meeting',
];

function getCategoryColor(category: string, index: number): string {
  const colors = [
    '#3B82F6', // blue
    '#10B981', // green
    '#8B5CF6', // purple
    '#F59E0B', // amber
    '#EF4444', // red
    '#EC4899', // pink
    '#6B7280', // gray
  ];

  return colors[index % colors.length];
}
