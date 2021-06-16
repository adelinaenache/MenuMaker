import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Category {
  @Field(() => Int)
  id: number;
  name: string;
}
