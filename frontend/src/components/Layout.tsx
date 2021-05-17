import { ConditionalWrapper, Container, Footer, Header, Main } from '@/components';
import React from 'react';

export type LayoutProps = {
  children?: React.ReactNode;
  unwrapped?: true;
};

export const Layout = ({ children, unwrapped }: LayoutProps) => {
  return (
    <Container height="100vh">
      <Header />

      <ConditionalWrapper condition={!unwrapped} thenComponent={<Main />}>
        {children}
      </ConditionalWrapper>

      <Footer />
    </Container>
  );
};
