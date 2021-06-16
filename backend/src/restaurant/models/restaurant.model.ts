import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Restaurant {
  @Field(() => Int)
  id: number;
  @Field({ nullable: true })
  access: boolean;
  name: string;
  city: string;
  country: string;
  address: string;
  userId: string;
}
