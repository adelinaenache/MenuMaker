import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Category {
  id: number;
  name: string;
}
