import { Spinner } from '@chakra-ui/spinner';
import { useUser } from '@/hooks';
import { useRouter } from 'next/router';
import React from 'react';

export function withAuth<T>(WrappedComponent: React.ComponentType<T>) {
  return (props: T) => {
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
