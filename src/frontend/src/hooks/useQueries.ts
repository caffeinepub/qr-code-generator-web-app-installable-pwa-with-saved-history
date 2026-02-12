import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { QRCodeData, UserProfile } from '../backend';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useQRCodeHistory() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<QRCodeData[]>({
    queryKey: ['qrCodeHistory'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getUserQRCodeHistory();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useSaveQRCode() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (qrData: QRCodeData) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveQRCode(qrData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qrCodeHistory'] });
    },
  });
}
