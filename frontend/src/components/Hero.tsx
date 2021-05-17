import { Flex, Heading } from '@chakra-ui/react';

export const Hero = ({ title }: { title: string }) => (
  <Flex justifyContent="center" bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
    <Heading fontSize="6vw">{title}</Heading>
  </Flex>
);
