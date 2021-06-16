import { GET_RESTAURANT, GetRestaurantParams, GetRestaurantResult } from '@/gql/restaurant';
import { Restaurant } from '@/types/restaurant';
import { useQuery } from '@apollo/client';

export const useRestaurant = (id: Restaurant['id']) => {
  const { data, ...rest } = useQuery<GetRestaurantResult, GetRestaurantParams>(GET_RESTAURANT, { variables: { id } });
  return { restaurant: data?.restaurant, ...rest };
};
