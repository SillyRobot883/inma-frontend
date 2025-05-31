import { EVENT_CATEGORIES, EVENT_STATUSES } from '@inmaa-wasl/api-client';
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  Filter,
  MapPin,
  Search,
  Users,
  XCircle,
} from 'lucide-react';

import { EVENT_CATEGORY_LABELS, EVENT_STATUS_LABELS } from '@/lib/translations';

interface EventFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  viewMode: 'grid' | 'compact';
  setViewMode: (mode: 'grid' | 'compact') => void;
  resultsCount: number;
  registrationStats?: {
    pending: number;
    accepted: number;
    rejected: number;
  };
  isMyEvents?: boolean;
  className?: string;
}

const categories = [
  ...EVENT_CATEGORIES.slice()
    .reverse()
    .map((category) => {
      const categoryIcons = {
        workshop: Users,
        conference: Users,
        hackathon: Clock,
        bootcamp: Users,
        seminar: Users,
        networking: Users,
        meeting: MapPin,
      } as const;

      return {
        value: category,
        label: EVENT_CATEGORY_LABELS[category],
        icon: categoryIcons[category] || Calendar,
      };
    }),
  { value: 'all', label: 'جميع الفئات', icon: Calendar },
];

const statuses = [
  ...EVENT_STATUSES.slice()
    .reverse()
    .map((status) => ({
      value: status,
      label: EVENT_STATUS_LABELS[status],
    })),
  { value: 'all', label: 'جميع الحالات' },
];

const registrationStatuses = [
  { value: 'rejected', label: 'مرفوضة', icon: XCircle },
  { value: 'pending', label: 'في الانتظار', icon: AlertCircle },
  { value: 'accepted', label: 'مؤكدة', icon: CheckCircle },
  { value: 'all', label: 'جميع التسجيلات', icon: Filter },
];

export function EventFilters({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
  viewMode,
  setViewMode,
  resultsCount,
  registrationStats,
  isMyEvents = false,
  className = '',
}: EventFiltersProps) {
  const clearAllFilters = () => {
    setSearchTerm('');
    if (isMyEvents) setSelectedStatus('all');
    else {
      setSelectedCategory('all');
      setSelectedStatus('all');
    }
  };

  const hasActiveFilters =
    searchTerm ||
    (isMyEvents
      ? selectedStatus !== 'all'
      : selectedCategory !== 'all' || selectedStatus !== 'all');

  return (
    <div className={`rounded-lg border bg-white p-6 shadow-sm ${className}`}>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute end-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
          <input
            type="text"
            placeholder={
              isMyEvents ? 'ابحث في فعالياتي المسجلة...' : 'ابحث في الفعاليات بالاسم أو الوصف...'
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="focus:ring-trust-blue focus:border-trust-blue w-full rounded-lg border border-gray-300 py-3 pe-10 ps-4 text-right focus:ring-2"
          />
        </div>
      </div>

      {isMyEvents ? (
        <>
          <div className="rtl mb-6 grid grid-cols-3 gap-4 text-center">
            <div className="rounded-lg bg-green-50 p-3">
              <div className="text-lg font-bold text-green-600">{registrationStats?.accepted}</div>
              <div className="text-sm text-green-700">مؤكدة</div>
            </div>
            <div className="rounded-lg bg-yellow-50 p-3">
              <div className="text-lg font-bold text-yellow-600">{registrationStats?.pending}</div>
              <div className="text-sm text-yellow-700">في الانتظار</div>
            </div>
            <div className="rounded-lg bg-red-50 p-3">
              <div className="text-lg font-bold text-red-600">{registrationStats?.rejected}</div>
              <div className="text-sm text-red-700">مرفوضة</div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="mb-3 text-right text-sm font-medium text-gray-700">حالة التسجيل</h3>
            <div className="flex flex-wrap justify-end gap-2">
              {registrationStatuses.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setSelectedStatus(value)}
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-all ${
                    selectedStatus === value
                      ? 'bg-trust-blue text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{label}</span>
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mb-6">
            <h3 className="mb-3 text-right text-sm font-medium text-gray-700">حالة الفعالية</h3>
            <div className="flex flex-wrap justify-end gap-2">
              {statuses.map((status) => (
                <button
                  key={status.value}
                  onClick={() => setSelectedStatus(status.value)}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition-all ${
                    selectedStatus === status.value
                      ? 'bg-trust-blue text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="mb-3 flex items-center justify-end gap-2 text-sm font-medium text-gray-700">
              <span>نوع الفعالية</span>
              <Filter className="h-4 w-4" />
            </h3>
            <div className="flex flex-wrap justify-end gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-all ${
                      selectedCategory === category.value
                        ? 'bg-secondary-blue text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span>{category.label}</span>
                    <Icon className="h-4 w-4" />
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}

      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
        <div className="order-2 flex items-center gap-4">
          <span className="text-right text-sm text-gray-600" dir="rtl">
            {resultsCount} فعالية {resultsCount !== 1 ? 'موجودة' : 'موجودة'}
          </span>

          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-trust-blue hover:text-trust-blue/80 text-right text-sm font-medium"
              dir="rtl"
            >
              إزالة جميع الخيارات
            </button>
          )}
        </div>

        <div className="order-1 flex rounded-lg border border-gray-300 bg-white">
          <button
            onClick={() => setViewMode('compact')}
            className={`flex items-center gap-2 rounded-s-lg px-4 py-2 text-sm ${
              viewMode === 'compact' ? 'bg-trust-blue text-white' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex h-4 w-4 flex-col gap-0.5">
              <div className="h-0.5 rounded bg-current"></div>
              <div className="h-0.5 rounded bg-current"></div>
              <div className="h-0.5 rounded bg-current"></div>
              <div className="h-0.5 rounded bg-current"></div>
            </div>
            قائمة
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-2 rounded-e-lg px-4 py-2 text-sm ${
              viewMode === 'grid' ? 'bg-trust-blue text-white' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="grid h-4 w-4 grid-cols-2 gap-0.5">
              <div className="rounded-sm bg-current"></div>
              <div className="rounded-sm bg-current"></div>
              <div className="rounded-sm bg-current"></div>
              <div className="rounded-sm bg-current"></div>
            </div>
            شبكة
          </button>
        </div>
      </div>
    </div>
  );
}
