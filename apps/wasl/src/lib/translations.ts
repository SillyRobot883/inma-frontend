import type { EventCategoryType, EventStatusType } from '@inmaa-wasl/api-client';

// Event Categories Translation
export const EVENT_CATEGORY_LABELS: Record<EventCategoryType, string> = {
  bootcamp: 'معسكر تدريبي',
  workshop: 'ورشة عمل',
  meeting: 'اجتماع',
  hackathon: 'هاكاثون',
  seminar: 'ندوة',
  conference: 'مؤتمر',
  networking: 'تواصل مهني',
} as const;

// Event Status Translation
export const EVENT_STATUS_LABELS: Record<EventStatusType, string> = {
  upcoming: 'قادم',
  ongoing: 'جاري',
  registration_open: 'التسجيل مفتوح',
  completed: 'مكتمل',
  cancelled: 'ملغي',
} as const;

// Helper functions for getting translated labels
export const getCategoryLabel = (category: EventCategoryType): string => {
  return EVENT_CATEGORY_LABELS[category] || category;
};

export const getStatusLabel = (status: EventStatusType): string => {
  return EVENT_STATUS_LABELS[status] || status;
};

// Status color mappings (for UI styling)
export const getStatusColor = (status: EventStatusType): string => {
  const colors: Record<EventStatusType, string> = {
    upcoming: 'bg-blue-100 text-blue-800 border-blue-200',
    ongoing: 'bg-green-100 text-green-800 border-green-200',
    registration_open: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    completed: 'bg-gray-100 text-gray-800 border-gray-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
  };
  return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
};

// Category color mappings (for UI styling)
export const getCategoryColor = (category: EventCategoryType): string => {
  const colors: Record<EventCategoryType, string> = {
    bootcamp: 'bg-purple-100 text-purple-800 border-purple-200',
    workshop: 'bg-blue-100 text-blue-800 border-blue-200',
    meeting: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    hackathon: 'bg-red-100 text-red-800 border-red-200',
    seminar: 'bg-green-100 text-green-800 border-green-200',
    conference: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    networking: 'bg-pink-100 text-pink-800 border-pink-200',
  };
  return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
};
