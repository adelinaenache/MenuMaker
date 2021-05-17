import { Button, DarkModeSwitch } from '@/components';
import { NextChakraLink } from '@/components/NextChakraLink';
import { Flex, HStack, Text } from '@chakra-ui/react';
import React from 'react';

export const Header = () => {
  return (
    <HStack w="100%" justifyContent="space-between" p={4}>
      <HStack>
        <Flex justifyContent="center" bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
          <NextChakraLink href="/">
            <Text fontSize="xl">MenuMaker</Text>
          </NextChakraLink>
        </Flex>
      </HStack>

      <HStack spacing={8}>
        <Button href="/restaurants">View your restaurants</Button>

        <DarkModeSwitch />
      </HStack>
    </HStack>
  );
};
