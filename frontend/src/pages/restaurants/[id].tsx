import { Button, Layout } from '@/components';
import { useRestaurantMenu } from '@/hooks/useRestaurantMenu';
import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

const Restaurant = () => {
  const router = useRouter();
  const { categories } = useRestaurantMenu(parseInt(router.query.id as string));

  console.log(categories);

  return (
    <Layout>
      {categories.map((category) => (
        <Box key={category.name}>
          <Text fontSize="4xl" my={6} textAlign="center">
            {category.name}
          </Text>

          <SimpleGrid columns={3} gap={6}>
            {category.items.map((item) => (
              <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" key={item.id}>
                <Flex flexDir="column" flex="1" px={6} py={3} minH="120px">
                  <Flex flexDir="column" flex="1">
                    <Text fontSize="xl">{item.name}</Text>

                    <Text fontSize="sm">{item.description}</Text>
                  </Flex>

                  <Text fontSize="md">{item.price} lei</Text>
                </Flex>
              </Box>
            ))}

            <Button
              maxW="sm"
              borderRadius="lg"
              overflow="hidden"
              cursor="pointer"
              minH="120px"
              onClick={() => {
                console.log('adding item');
              }}
            >
              <Flex flexDir="column" justifyContent="center" alignItems="center" flex="1" px={6} py={3}>
                <Text fontSize="3xl" color="gray.100">
                  Add new item
                </Text>
              </Flex>
            </Button>
          </SimpleGrid>
        </Box>
      ))}

      <Flex justifyContent="center" pt={6}>
        <Button
          w={60}
          onClick={() => {
            console.log('adding cat');
          }}
        >
          Add new category
        </Button>
      </Flex>
    </Layout>
  );
};

export default Restaurant;
