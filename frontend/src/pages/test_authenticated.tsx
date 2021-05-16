import { Text } from '@chakra-ui/layout';
import { Container } from 'next/app';
import * as React from 'react';
import { withAuth } from 'HOC/withAuth';

function Test() {
  return (
    <Container>
      <Text>Hello</Text>
    </Container>
  );
}

export default withAuth(Test);
