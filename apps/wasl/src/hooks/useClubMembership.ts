import { type Member, type MembershipResponse, members } from '@inmaa-wasl/api-client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

// Hook for fetching club members
export const useClubMembers = (clubUuid: string) => {
  return useQuery<Member[], Error>({
    queryKey: ['clubs', clubUuid, 'members'],
    queryFn: () => members.fetchClubMembers(clubUuid),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!clubUuid,
  });
};

// Hook to get user's membership status for a specific club
export const useMyMembership = (clubUuid: string) => {
  return useQuery({
    queryKey: ['membership', 'my', clubUuid],
    queryFn: async () => {
      try {
        // Try to get the current user's membership details
        // This endpoint should return the user's membership for the club if they are a member
        const response = await fetch(`/api/clubs/${clubUuid}/memberships/me`);
        if (response.status === 404) {
          // User is not a member
          return null;
        }
        if (!response.ok) {
          throw new Error('Failed to fetch membership');
        }
        return response.json();
      } catch {
        // If error, assume not a member
        return null;
      }
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!clubUuid,
  });
};

// Hook for checking user's membership status in a club (alternative approach using club members list)
export const useUserMembershipStatus = (clubUuid: string, userUuid?: string) => {
  const { data: clubMembers = [], isLoading } = useClubMembers(clubUuid);

  if (!userUuid || isLoading) {
    return {
      isMember: false,
      membershipStatus: null,
      isLoading: isLoading || !userUuid,
    };
  }

  const userMembership = clubMembers.find(
    (member) => member.userId?.toString() === userUuid || member.uuid === userUuid
  );

  return {
    isMember: !!userMembership,
    membershipStatus: userMembership?.status || null,
    isLoading: false,
  };
};

// Hook to join a club
export const useJoinClub = () => {
  const queryClient = useQueryClient();

  return useMutation<MembershipResponse, Error, string>({
    mutationFn: (clubUuid: string) => members.joinClub(clubUuid),
    onSuccess: (data, clubUuid) => {
      toast.success('تم إرسال طلب الانضمام بنجاح!', {
        description: 'سيتم مراجعة طلبك قريباً',
      });

      // Invalidate and refetch membership data
      queryClient.invalidateQueries({ queryKey: ['membership', 'my', clubUuid] });
      queryClient.invalidateQueries({ queryKey: ['clubs', clubUuid, 'members'] });
      queryClient.invalidateQueries({ queryKey: ['clubs', 'detail', clubUuid] });
      queryClient.invalidateQueries({ queryKey: ['clubs'] });
    },
    onError: (error) => {
      console.error('Error joining club:', error);
      toast.error('حدث خطأ أثناء الانضمام للنادي', {
        description: error.message || 'حاول مرة أخرى لاحقاً',
      });
    },
  });
};

// Hook to leave a club
export const useLeaveClub = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (clubUuid: string) => members.leaveClub(clubUuid),
    onSuccess: (_, clubUuid) => {
      toast.success('تم مغادرة النادي بنجاح');

      // Invalidate and refetch membership data
      queryClient.invalidateQueries({ queryKey: ['membership', 'my', clubUuid] });
      queryClient.invalidateQueries({ queryKey: ['clubs', clubUuid, 'members'] });
      queryClient.invalidateQueries({ queryKey: ['clubs', 'detail', clubUuid] });
      queryClient.invalidateQueries({ queryKey: ['clubs'] });
    },
    onError: (error) => {
      console.error('Error leaving club:', error);
      toast.error('حدث خطأ أثناء مغادرة النادي', {
        description: error.message || 'حاول مرة أخرى لاحقاً',
      });
    },
  });
};
