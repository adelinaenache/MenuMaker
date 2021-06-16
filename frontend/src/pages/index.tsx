import { Hero, Layout, Main } from '@/components';
import { Price } from '@/components/Price';
import { useRestaurantList } from '@/hooks';
import { Box, SimpleGrid, Image, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const Index = () => {
  const { restaurants } = useRestaurantList();
  const router = useRouter();

  return (
    <Layout unwrapped>
      <Hero title="MenuMaker" />

      <Main>
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
                src={'http://pizzeriaitalianasacele.ro/wp-content/uploads/2014/09/margheritawiki.jpg'}
                alt={'Pizza'}
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
      </Main>
    </Layout>
  );
};

export default Index;
