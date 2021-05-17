import { DarkModeSwitch } from '@/components';
import { Stack } from '@chakra-ui/react';
import React from 'react';

export const Header = () => {
  return (
    <Stack w="100%" alignItems="flex-end" p={4}>
      <DarkModeSwitch />
    </Stack>
  );
};
