import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Restaurant {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  access: boolean;

  @Field()
  name: string;

  @Field()
  city: string;

  @Field()
  country: string;

  @Field()
  address: string;
}
