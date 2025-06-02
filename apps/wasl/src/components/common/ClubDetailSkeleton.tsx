import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ClubDetailSkeleton() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Skeleton className="mb-6 h-4 w-32" />

      <div className="rounded-lg border p-8 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <Skeleton className="h-24 w-24 rounded-xl" />

          <div className="flex-1">
            <div className="mb-3 flex items-start gap-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="mb-2 h-6 w-full" />
            <Skeleton className="mb-4 h-6 w-3/4" />
            <div className="flex gap-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>

          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-6 flex items-center justify-between">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-9 w-36" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function EventCardSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <Skeleton className="h-6 w-full" />
      </CardHeader>
      <CardContent>
        <Skeleton className="mb-2 h-4 w-full" />
        <Skeleton className="mb-4 h-4 w-3/4" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-4 w-52" />
        </div>
      </CardContent>
    </Card>
  );
}
