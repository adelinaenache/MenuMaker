import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Restaurant } from '../../restaurant/models/restaurant.model';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  password?: string;

  @Field(() => [Restaurant], { nullable: 'itemsAndList' })
  restaurants?: Restaurant[];
}
