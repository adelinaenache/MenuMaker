import { Box } from '@chakra-ui/react';
import React from 'react';

export const Price = ({ value }: { value: number }) => {
  const integer = Math.floor(value);
  const real = value - integer === 0 ? '00' : (Math.round((value - integer) * 100) / 100).toString().slice(2);

  return (
    <Box>
      {integer}.{real} lei
    </Box>
  );
};
