import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Restaurant } from '../../restaurant/models/restaurant.model';

@ObjectType()
export class User {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field((type) => Restaurant, { nullable: 'items' })
  restaurants: Restaurant[];
}
