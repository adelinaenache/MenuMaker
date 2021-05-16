import { Container } from '@chakra-ui/react';
import React from 'react';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return <Container height="100vh">{children}</Container>;
};
