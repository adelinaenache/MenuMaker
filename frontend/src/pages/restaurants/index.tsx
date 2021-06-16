import { Button, Layout } from '@/components';
import { RestaurantCard } from '@/components/RestaurantCard';
import { withAuth } from '@/hoc';
import { useMyRestaurantList, useUser } from '@/hooks';
import { Flex, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';

const RestaurantsDashboard = withAuth(() => {
  const { restaurants } = useMyRestaurantList();
  const { user } = useUser();

  return (
    <Layout>
      <Text fontSize="3xl" textAlign="center" mb={10}>
        You are currently logged in as: {user?.email}
      </Text>

      {restaurants.length === 0 && <Text>You have no restaurants.</Text>}

      <SimpleGrid columns={3} gap={6} mt={10}>
        {restaurants.map((restaurant) => (
          <RestaurantCard restaurant={restaurant} key={restaurant.id} />
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
