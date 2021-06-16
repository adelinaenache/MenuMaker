import { Category, Item, Menu, Restaurant } from '@/types/restaurant';
import { gql } from '@apollo/client/core';

export const ITEM_FIELDS = gql`
  fragment ItemFields on Item {
    id
    name
    price
    description
    image
  }
`;

export const CATEGORY_FIELDS = gql`
  ${ITEM_FIELDS}

  fragment CategoryFields on Category {
    id
    name
    items {
      ...ItemFields
    }
  }
`;

export const RESTAURANT_FIELDS = gql`
  fragment RestaurantFields on Restaurant {
    id
    name
    access
    country
    city
    address
    itemCount
    priceRange
    userId
  }
`;

export const RESTAURANT_MENU = gql`
  ${CATEGORY_FIELDS}

  query RESTAURANT_MENU($id: Int!) {
    restaurant(id: $id) {
      categories {
        ...CategoryFields
      }
    }
  }
`;

export type RestaurantMenuParams = Pick<Restaurant, 'id'>;

export type RestaurantMenuResult = {
  restaurant: Pick<Restaurant, 'categories'>;
};

export const CREATE_CATEGORY = gql`
  ${CATEGORY_FIELDS}

  mutation CREATE_CATEGORY($name: String!, $restaurantId: Int!) {
    createCategory(createCategoryInput: { name: $name, restaurantId: $restaurantId }) {
      ...CategoryFields
    }
  }
`;

export type CreateCategoryParams = { restaurantId: Restaurant['id'] } & Pick<Category, 'name'>;

export type CreateCategoryResult = {
  createCategory: Category;
};

export const DELETE_CATEGORY = gql`
  mutation DELETE_CATEGORY($id: Int!) {
    removeCategory(id: $id) {
      id
    }
  }
`;

export type DeleteCategoryParams = Pick<Restaurant, 'id'>;

export type DeleteCategoryResult = {
  removeCategory: Pick<Category, 'id'>;
};

export const CREATE_ITEM = gql`
  ${ITEM_FIELDS}

  mutation CREATE_ITEM($name: String!, $image: String, $description: String, $price: Float!, $categoryId: Int!) {
    createItem(
      createItemInput: { name: $name, image: $image, description: $description, price: $price, categoryId: $categoryId }
    ) {
      ...ItemFields
    }
  }
`;

export type CreateItemParams = Omit<Item, 'id'>;

export type CreateItemResult = {
  createItem: Item;
};

export const UPDATE_ITEM = gql`
  ${ITEM_FIELDS}

  mutation UPDATE_ITEM($name: String!, $image: String, $description: String, $price: Float!, $id: Int!) {
    updateItem(updateItemInput: { name: $name, image: $image, description: $description, price: $price, id: $id }) {
      ...ItemFields
    }
  }
`;

export type UpdateItemParams = Omit<Item, 'categoryId'>;

export type UpdateItemResult = {
  updateItem: Item;
};

export const DELETE_ITEM = gql`
  mutation DELETE_ITEM($id: Int!) {
    removeItem(id: $id) {
      id
    }
  }
`;

export type DeleteItemParams = Pick<Item, 'id'>;

export type DeleteItemResult = {
  removeItem: Pick<Item, 'id'>;
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

export const GET_RESTAURANT = gql`
  ${RESTAURANT_FIELDS}
  ${CATEGORY_FIELDS}

  query GET_RESTAURANT($id: Int!) {
    restaurant(id: $id) {
      ...RestaurantFields
      categories {
        ...CategoryFields
      }
    }
  }
`;

export type GetRestaurantParams = Pick<Restaurant, 'id'>;

export type GetRestaurantResult = {
  restaurant: Restaurant;
};

export const GET_RESTAURANTS = gql`
  ${RESTAURANT_FIELDS}

  query GET_RESTAURANT {
    restaurants {
      ...RestaurantFields
    }
  }
`;

export type GetRestaurantsResult = {
  restaurants: Restaurant[];
};
