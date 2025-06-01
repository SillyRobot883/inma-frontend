import { type Event, events } from '@inmaa-wasl/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface MutationOptions {
  onSuccess?: (eventId: string) => void;
  onError?: (error: Error, eventId: string) => void;
}

export const useRegisterForEvent = (options?: MutationOptions) => {
  const queryClient = useQueryClient();

  // Register for an event and update cache
  return useMutation({
    mutationFn: (eventId: string) => events.registerForEvent(eventId),
    onSuccess: (data, eventId) => {
      queryClient.setQueryData(['events'], (oldData: Event[] | undefined) => {
        if (!oldData) return oldData;
        return oldData.map((event: Event) => {
          if (event.uuid === eventId) {
            return {
              ...event,
              seatsRemaining: Math.max(0, event.seatsRemaining - 1),
            };
          }
          return event;
        });
      });
      queryClient.setQueryData(['events', 'detail', eventId], (oldData: Event | undefined) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          seatsRemaining: Math.max(0, oldData.seatsRemaining - 1),
        };
      });
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['events', 'user-registrations'] });
      options?.onSuccess?.(eventId);
    },
    onError: (error, eventId) => {
      options?.onError?.(error as Error, eventId);
    },
  });
};

export const useUnregisterFromEvent = (options?: MutationOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventId: string) => events.unregisterFromEvent(eventId),
    onSuccess: (data, eventId) => {
      // Optimistically update the events list
      queryClient.setQueryData(['events'], (oldData: Event[] | undefined) => {
        if (!oldData) return oldData;

        return oldData.map((event: Event) => {
          if (event.uuid === eventId) {
            return {
              ...event,
              seatsRemaining: event.seatsRemaining + 1,
            };
          }
          return event;
        });
      });

      // Update event details if cached
      queryClient.setQueryData(['events', 'detail', eventId], (oldData: Event | undefined) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          seatsRemaining: oldData.seatsRemaining + 1,
        };
      });

      // Invalidate all event-related queries for consistency
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['events', 'user-registrations'] });

      options?.onSuccess?.(eventId);
    },
    onError: (error, eventId) => {
      options?.onError?.(error as Error, eventId);
    },
  });
};
