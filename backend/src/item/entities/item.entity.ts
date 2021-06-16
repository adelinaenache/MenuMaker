import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Item {
  @Field(() => Int)
  id: number;
  name: string;
  description?: string;
  price: number;
  image?: string;
}
