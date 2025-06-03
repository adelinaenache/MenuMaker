import { Container, Footer, Header, Main } from '@/components';
import React from 'react';

export type LayoutProps = {
  children?: React.ReactNode;
  unwrapped?: true;
};

export const Layout = ({ children, unwrapped }: LayoutProps) => {
  if (unwrapped) {
    return <>{children}</>;
  }

  return (
    <Container height="100vh">
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Container>
  );
};
