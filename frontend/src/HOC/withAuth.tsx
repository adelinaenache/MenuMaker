import { Spinner } from '@chakra-ui/spinner';
import { useUser } from '@/hooks';
import React from 'react';

export function withAuth<T>(WrappedComponent: React.ComponentType<T>) {
  return (props: T) => {
    const { loading, error } = useUser();

    if (loading) {
      return <Spinner size="xl" />;
    }

    if (error) {
      // router.replace("auth/login");
      console.error(error);
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
