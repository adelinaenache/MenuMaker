import { ConditionalWrapper, Container, Footer, Header, Main } from '@/components';
import React from 'react';

export type LayoutProps = {
  children?: React.ReactNode;
  unwrapped?: true;
};

export const Layout = ({ children, unwrapped }: LayoutProps) => {
  // Only render children if unwrapped is true
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
