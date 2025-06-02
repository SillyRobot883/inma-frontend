import { type Event, type RegisteredEvent, events } from '@inmaa-wasl/api-client';
import { useQuery } from '@tanstack/react-query';

interface EventFilters {
  category?: string;
  status?: string;
  clubId?: string;
}

export const useEvents = (filters?: EventFilters) => {
  // Fetch all events with optional filters
  return useQuery<Event[], Error>({
    queryKey: ['events', filters],
    queryFn: () => events.fetchAllEvents(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    refetchIntervalInBackground: false,
  });
};

// Hook for club-specific events
export const useClubEvents = (clubId: string) => {
  return useQuery<Event[], Error>({
    queryKey: ['events', 'club', clubId],
    queryFn: () => events.fetchClubEvents(clubId), // Now includes client-side filtering
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!clubId,
  });
};

// Hook for single event details
export const useEventDetails = (eventId: string) => {
  return useQuery<Event, Error>({
    queryKey: ['events', 'detail', eventId],
    queryFn: () => events.fetchEventDetails(eventId),
    staleTime: 2 * 60 * 1000, // 2 minutes for event details
    gcTime: 5 * 60 * 1000,
    enabled: !!eventId,
  });
};

// Hook for user's registered events
export const useUserRegisteredEvents = (enabled: boolean = true) => {
  return useQuery<RegisteredEvent[], Error>({
    queryKey: ['events', 'user-registrations'],
    queryFn: () => events.fetchUserRegisteredEvents(),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    enabled,
  });
};
