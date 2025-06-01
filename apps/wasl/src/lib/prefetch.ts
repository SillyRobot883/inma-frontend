import { events } from '@inmaa-wasl/api-client';

import { queryClient } from '@/lib/query-client';

// Prefetch events for better UX
export const prefetchEvents = () => {
  return queryClient.prefetchQuery({
    queryKey: ['events'],
    queryFn: () => events.fetchAllEvents(),
    staleTime: 5 * 60 * 1000,
  });
};

// Prefetch event details when hovering over event cards
export const prefetchEventDetails = (eventId: string) => {
  return queryClient.prefetchQuery({
    queryKey: ['events', 'detail', eventId],
    queryFn: () => events.fetchEventDetails(eventId),
    staleTime: 2 * 60 * 1000,
  });
};

// Prefetch club events when navigating to club pages
export const prefetchClubEvents = (clubId: string) => {
  return queryClient.prefetchQuery({
    queryKey: ['events', 'club', clubId],
    queryFn: () => events.fetchClubEvents(clubId),
    staleTime: 5 * 60 * 1000,
  });
};
