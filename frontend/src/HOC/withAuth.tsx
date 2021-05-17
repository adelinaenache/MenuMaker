import { Spinner } from '@chakra-ui/spinner';
import { useUser } from '@/hooks';
import { Container } from 'next/app';
import React from 'react';

export function withAuth<T>(WrappedComponent: React.ComponentType<T>) {
  return (props: T) => {
    const { loading, error } = useUser();

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
