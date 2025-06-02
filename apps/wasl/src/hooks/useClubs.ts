import { type Club, clubs } from '@inmaa-wasl/api-client';
import { useQuery } from '@tanstack/react-query';

// Hook for all clubs
export const useClubs = () => {
  return useQuery<Club[], Error>({
    queryKey: ['clubs'],
    queryFn: () => clubs.fetchAllClubs(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    refetchIntervalInBackground: false,
  });
};

// Hook for single club details
export const useClubDetails = (clubUuid: string) => {
  return useQuery<Club, Error>({
    queryKey: ['clubs', 'detail', clubUuid],
    queryFn: () => clubs.fetchClubDetails(clubUuid),
    staleTime: 2 * 60 * 1000, // 2 minutes for club details
    gcTime: 5 * 60 * 1000,
    enabled: !!clubUuid,
  });
};
