import { Hero, Layout, Main } from '@/components';
import { RestaurantCard } from '@/components/RestaurantCard';
import { useRestaurantList } from '@/hooks';
import { SimpleGrid } from '@chakra-ui/react';

const Index = () => {
  const { restaurants } = useRestaurantList();

  return (
    <Layout>
      <Hero title="MenuMaker" />

      <Main>
        <SimpleGrid columns={3} gap={6} mt={10}>
          {restaurants.map((restaurant) => (
            <RestaurantCard restaurant={restaurant} key={restaurant.id} />
          ))}
        </SimpleGrid>
      </Main>
    </Layout>
  );
};

export default Index;
