export const useRestaurantList = () => {
  return { restaurants: ['a'] };
};

export type UseRestaurantList = ReturnType<typeof useRestaurantList>;
