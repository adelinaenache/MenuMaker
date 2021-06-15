export type Item = {
  id: number;
  name: string;
  description?: string;
  price: number;
  category: string;
  image?: string;
};

export type Menu = Item[];

export type Restaurant = {
  id: number;
  access: boolean;
  name: string;
  city: string;
  country: string;
  address: string;
  menu: Menu;
};
