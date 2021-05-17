import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRestaurantInput {
  @Field()
  name: string;

  @Field()
  country: string;

  @Field()
  city: string;

  @Field()
  address: string;
}
