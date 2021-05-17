import { Container, Footer, Header } from '@/components';
import React from 'react';

export const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Container height="100vh">
      <Header />

      {children}

      <Footer />
    </Container>
  );
};
