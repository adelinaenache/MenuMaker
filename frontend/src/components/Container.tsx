import { Flex, useColorMode } from '@chakra-ui/react';
import { useEffect } from 'react';

type ContainerProps = React.ComponentProps<typeof Flex>;

export const Container = (props: ContainerProps) => {
  const { colorMode } = useColorMode();

  // Use default values for SSR
  const bgColor = colorMode === 'dark' ? 'gray.800' : 'white';
  const color = colorMode === 'dark' ? 'white' : 'black';

  // Only update colors after hydration
  useEffect(() => {
    const updateColors = () => {
      document.documentElement.style.setProperty('--chakra-colors-gray-800', 'rgb(28, 30, 33)');
      document.documentElement.style.setProperty('--chakra-colors-white', 'rgb(255, 255, 255)');
    };
    updateColors();
  }, []);

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      bg={bgColor}
      color={color}
      {...props}
    />
  );
};
