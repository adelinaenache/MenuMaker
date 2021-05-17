import { MY_RESTAURANTS, MyRestaurantsResult } from '@/gql/restaurant';
import { useQuery } from '@apollo/client';

export const useRestaurantList = () => {
  const { data, ...rest } = useQuery<MyRestaurantsResult>(MY_RESTAURANTS);
  return { restaurants: data?.me.restaurants ?? [], ...rest };
};

export type UseRestaurantList = ReturnType<typeof useRestaurantList>;
