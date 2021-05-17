import { ME } from '@/gql/user';
import { UserResult } from '@/types/UserTypes';
import { useQuery } from '@apollo/client';

export const useUser = () => {
  const { data, ...response } = useQuery<UserResult>(ME);
  return { user: data?.me, ...response };
};

export type UseUser = ReturnType<typeof useUser>;
