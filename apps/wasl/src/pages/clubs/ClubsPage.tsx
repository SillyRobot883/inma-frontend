import { useState } from 'react';

import { AlertTriangle, Search, Users } from 'lucide-react';

import { ClubCard } from '@/components/clubs/ClubCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useClubs } from '@/hooks/useClubs';

function ClubsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: clubs = [], isLoading, error } = useClubs();

  // Filter clubs based on search query
  const filteredClubs = clubs.filter(
    (club) =>
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <ClubsPageSkeleton />;
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-6xl space-y-6 px-4 py-8 md:px-6 lg:px-8">
        <div className="py-12 text-center">
          <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-red-500" />
          <h2 className="mb-2 text-2xl font-bold text-gray-900">خطأ في تحميل الأندية</h2>
          <p className="mb-6 text-gray-600">
            {error.message || 'حدث خطأ غير متوقع أثناء تحميل قائمة الأندية'}
          </p>
          <Button onClick={() => window.location.reload()}>إعادة المحاولة</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl space-y-6 px-4 py-8 md:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-trust-blue text-3xl font-bold">الأندية الطلابية</h1>
          <p className="text-muted-foreground mt-2">
            اكتشف الأندية الطلابية وانضم للأنشطة التي تهمك
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="البحث في الأندية..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pr-10"
            />
          </div>
        </div>
      </div>

      {/* Search Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          {filteredClubs.length === clubs.length
            ? `${clubs.length} نادي متاح`
            : `${filteredClubs.length} من أصل ${clubs.length} نادي`}
        </p>
      </div>

      {/* Clubs Grid */}
      {filteredClubs.length === 0 ? (
        <div className="py-12 text-center">
          <Users className="mx-auto mb-4 h-12 w-12 text-gray-300" />
          <h3 className="mb-2 text-lg font-medium text-gray-900">
            {searchQuery ? 'لم يتم العثور على أندية' : 'لا توجد أندية متاحة'}
          </h3>
          <p className="text-gray-500">
            {searchQuery
              ? 'جرب البحث بكلمات مختلفة أو تحقق من الإملاء'
              : 'لم يتم إنشاء أي أندية بعد'}
          </p>
          {searchQuery && (
            <Button variant="outline" onClick={() => setSearchQuery('')} className="mt-4">
              إظهار جميع الأندية
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredClubs.map((club) => (
            <ClubCard key={club.uuid} club={club} />
          ))}
        </div>
      )}
    </div>
  );
}

function ClubsPageSkeleton() {
  return (
    <div className="container mx-auto max-w-6xl space-y-6 px-4 py-8 md:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Skeleton className="mb-2 h-9 w-48" />
          <Skeleton className="h-5 w-80" />
        </div>
        <Skeleton className="h-10 w-64" />
      </div>

      <Skeleton className="h-5 w-32" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <ClubCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

function ClubCardSkeleton() {
  return (
    <div className="space-y-4 rounded-lg border p-6">
      <div className="flex items-start gap-3">
        <Skeleton className="h-12 w-12 rounded-lg" />
        <div className="flex-1">
          <Skeleton className="mb-2 h-6 w-full" />
          <div className="flex gap-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-12" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>

      <Skeleton className="h-10 w-full" />
    </div>
  );
}

export default ClubsPage;
