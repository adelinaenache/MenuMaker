import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Item {
  id: number;
  name: string;
  description?: string;
  price: number;
  category: string;
  image?: string;
}
