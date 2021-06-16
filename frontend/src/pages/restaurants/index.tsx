import { Button, Layout } from '@/components';
import { Price } from '@/components/Price';
import { withAuth } from '@/hoc';
import { useMyRestaurantList, useUser } from '@/hooks';
import { Box, Flex, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

const RestaurantsDashboard = withAuth(() => {
  const { restaurants } = useMyRestaurantList();
  const router = useRouter();
  const { user } = useUser();

  return (
    <Layout>
      <Text fontSize="3xl" textAlign="center" mb={10}>
        You are currently logged in as: {user?.email}
      </Text>

      {restaurants.length === 0 && <Text>You have no restaurants.</Text>}

      <SimpleGrid columns={3} gap={6} mt={10}>
        {restaurants.map((restaurant) => (
          <Box
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            onClick={async () => {
              await router.push(`/restaurants/${restaurant.id}`);
            }}
            key={restaurant.id}
            cursor="pointer"
          >
            <Image
              h="200px"
              w="100%"
              objectFit="cover"
              src={'https://designshack.net/wp-content/uploads/placeholder-image.png'}
              alt={`${restaurant.name} image`}
            />

            <Box p="6">
              <Box d="flex" alignItems="baseline">
                <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="xs" textTransform="uppercase">
                  {restaurant.itemCount} items
                </Box>
              </Box>

              <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                {restaurant.name}
              </Box>

              <Box>
                {restaurant.priceRange[1] !== 0 && (
                  <Flex>
                    <Price value={restaurant.priceRange[0]} />
                    <Box px={1}>-</Box>
                    <Price value={restaurant.priceRange[1]} />
                  </Flex>
                )}
              </Box>
            </Box>
          </Box>
        ))}
      </SimpleGrid>

      <Flex justifyContent="center" py={10}>
        <Button w={60} href="/restaurants/new">
          Add new restaurant
        </Button>
      </Flex>
    </Layout>
  );
});

export default RestaurantsDashboard;
