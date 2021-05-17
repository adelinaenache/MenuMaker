import { Container, Footer, Header, Main } from '@/components';
import React from 'react';

export const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Container height="100vh">
      <Header />

      <Main>{children}</Main>

      <Footer />
    </Container>
  );
};
