import { Button, Layout } from '@/components';
import { NextChakraLink } from '@/components/NextChakraLink';
import { withAuth } from '@/hoc';
import { useMyRestaurantList } from '@/hooks';
import { Text } from '@chakra-ui/react';
import React from 'react';

const RestaurantsDashboard = withAuth(() => {
  const { restaurants } = useMyRestaurantList();

  return (
    <Layout>
      {restaurants.length === 0 && <Text>You have no restaurants.</Text>}

      {restaurants.map((restaurant, index) => (
        <NextChakraLink href={`/restaurants/${restaurant.id}`} key={index}>
          {restaurant.name}
        </NextChakraLink>
      ))}

      <Button href="/restaurants/new" w={40}>
        Add a restaurant
      </Button>
    </Layout>
  );
});

export default RestaurantsDashboard;
