import { Flex, useColorMode } from '@chakra-ui/react';

type ContainerProps = React.ComponentProps<typeof Flex>;

export const Container = (props: ContainerProps) => {
  const { colorMode } = useColorMode();

  const bgColor = { light: 'white', dark: 'gray.800' };

  const color = { light: 'black', dark: 'white' };
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      {...props}
    />
  );
};
