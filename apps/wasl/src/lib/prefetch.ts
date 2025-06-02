import { clubs, events } from '@inmaa-wasl/api-client';

import { queryClient } from '@/lib/query-client';

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

export const prefetchClubs = () => {
  return queryClient.prefetchQuery({
    queryKey: ['clubs'],
    queryFn: () => clubs.fetchAllClubs(),
    staleTime: 5 * 60 * 1000,
  });
};

// Prefetch club details when hovering over club cards
export const prefetchClubDetails = (clubUuid: string) => {
  return queryClient.prefetchQuery({
    queryKey: ['clubs', 'detail', clubUuid],
    queryFn: () => clubs.fetchClubDetails(clubUuid),
    staleTime: 2 * 60 * 1000,
  });
};
