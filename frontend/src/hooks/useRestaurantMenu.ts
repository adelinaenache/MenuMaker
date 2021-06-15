import { RESTAURANT_MENU, RestaurantMenuParams, RestaurantMenuResult } from '@/gql/restaurant';
import { useQuery } from '@apollo/client';

export const useRestaurantMenu = (restaurantId: number) => {
  const { data, ...rest } = useQuery<RestaurantMenuResult, RestaurantMenuParams>(RESTAURANT_MENU, {
    variables: { id: restaurantId },
  });

  return { categories: data?.restaurant.categories ?? [], ...rest };
};
