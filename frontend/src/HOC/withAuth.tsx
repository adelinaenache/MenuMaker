import { useQuery } from '@apollo/client';
import { Spinner } from '@chakra-ui/spinner';
import { Container } from 'next/app';
import React from 'react';
import { UserResult } from '@/types/UserTypes';
import { ME } from '@/gql/user';

export function withAuth<T>(WrappedComponent: React.ComponentType<T>) {
  return (props: T) => {
    const { loading, error } = useQuery<UserResult>(ME);

    if (loading) {
      return (
        <Container>
          <Spinner size="xl" />
        </Container>
      );
    }

    if (error) {
      // router.replace("auth/login");
      console.error(error);
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
