export type Item = {
  id: number;
  name: string;
  description?: string;
  price: number;
  category: string;
  image?: string;
};

export type Category = {
  id: number;
  name: string;
  items: Item[];
};

export type Restaurant = {
  id: number;
  access: boolean;
  name: string;
  city: string;
  country: string;
  address: string;
  categories: Category[];
};
