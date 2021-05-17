import { Button, Layout } from '@/components';
import { withAuth } from '@/hoc';
import { useRestaurantList } from '@/hooks';
import { Text } from '@chakra-ui/react';
import React from 'react';

const RestaurantsDashboard = withAuth(() => {
  const { restaurants } = useRestaurantList();

  return (
    <Layout>
      {restaurants.length === 0 && <Text>You have no restaurants.</Text>}

      {restaurants.map((restaurant, index) => (
        <Text key={index}>a</Text>
      ))}

      <Button href="/restaurants/create" w={40}>
        Add a restaurant
      </Button>
    </Layout>
  );
});

export default RestaurantsDashboard;
