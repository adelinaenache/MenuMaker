import { Text } from '@chakra-ui/react';
import { Container } from '@chakra-ui/react';
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
