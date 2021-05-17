import { ME } from '@/gql/user';
import { UserResult } from '@/types/UserTypes';
import { useQuery } from '@apollo/client';

export const useUser = () => {
  const { data, ...rest } = useQuery<UserResult>(ME);
  return { user: data?.me, ...rest };
};

export type UseUser = ReturnType<typeof useUser>;
