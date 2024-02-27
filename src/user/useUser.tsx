import {useQuery} from '@tanstack/react-query';
import userQueryKeys from './userQueryKeys';
import {fetchUser} from './userFunctions';
import {User} from './userTypes';
import {useStore} from '@/store/useStore';

export function useUser(userId?: string) {
  const userQuery = useQuery<
    unknown,
    unknown,
    User,
    ReturnType<typeof userQueryKeys.user>
  >({
    queryFn: fetchUser,
    queryKey: userQueryKeys.user(userId ?? useStore.getState().userId),
    refetchOnMount: true,
    staleTime: 0,
  });

  return userQuery;
}
