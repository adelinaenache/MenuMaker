import { Stack } from '@chakra-ui/react';

export const Main = (props: React.ComponentProps<typeof Stack>) => (
  <Stack width="100%" flex="1" maxWidth="80rem" px="1rem" {...props} />
);
