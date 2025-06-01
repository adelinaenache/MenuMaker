import { Spinner } from '@chakra-ui/react';
import { useUser } from '@/hooks';
import { useRouter } from 'next/router';
import React from 'react';

export function withAuth<T>(WrappedComponent: React.ComponentType<T>) {
  return (props: React.PropsWithChildren<T>) => {
    const { loading, error } = useUser();
    const router = useRouter();

    if (loading) {
      return <Spinner size="xl" />;
    }

    if (error) {
      router.replace('/auth/login');
    }

    if (loading || error) {
      return <Spinner size="xl" />;
    }

    return <WrappedComponent {...props} />;
  };
}
