import { Price } from '@/components/Price';
import { Restaurant } from '@/types/restaurant';
import { Box, Flex, Image } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

export const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  const router = useRouter();

  return (
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
  );
};
