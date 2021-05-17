import { Restaurant } from '@/types/restaurant';
import { gql } from '@apollo/client/core';

export const MY_RESTAURANTS = gql`
  query MY_RESTAURANTS {
    me {
      id
      restaurants {
        id
        name
        access
        country
        city
        address
      }
    }
  }
`;

export type MyRestaurantsResult = {
  me: {
    restaurants: Restaurant[];
  };
};
