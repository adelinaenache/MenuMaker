import { Menu, Restaurant } from '@/types/restaurant';
import { gql } from '@apollo/client/core';

export const RESTAURANT_FIELDS = gql`
  fragment RestaurantFields on Restaurant {
    id
    name
    access
    country
    city
    address
  }
`;

export const RESTAURANT_MENU = gql`
  query RESTAURANT_MENU($id: Int!) {
    restaurant(id: $id) {
      menu {
        id
        name
        description
        category
        price
        image
      }
    }
  }
`;

export type RestaurantMenuParams = Pick<Restaurant, 'id'>;

export type RestaurantMenuResult = {
  restaurant: {
    menu: Menu;
  };
};

export const MY_RESTAURANTS = gql`
  ${RESTAURANT_FIELDS}

  query MY_RESTAURANTS {
    me {
      id
      restaurants {
        ...RestaurantFields
      }
    }
  }
`;

export type MyRestaurantsResult = {
  me: {
    restaurants: Restaurant[];
  };
};

export const CREATE_RESTAURANT = gql`
  ${RESTAURANT_FIELDS}

  mutation CREATE_RESTAURANT($name: String!, $country: String!, $city: String!, $address: String!) {
    createRestaurant(data: { name: $name, country: $country, city: $city, address: $address }) {
      ...RestaurantFields
    }
  }
`;

export type CreateRestaurantMutation = Pick<Restaurant, 'name' | 'country' | 'city' | 'address'>;

export type CreateRestaurantResult = {
  createRestaurant: Restaurant;
};
