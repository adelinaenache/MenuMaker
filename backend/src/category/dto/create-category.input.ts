import { Field, InputType, Int, OmitType } from '@nestjs/graphql';
import { Category } from 'category/entities/category.entity';

@InputType()
export class CreateCategoryInput extends OmitType(Category, ['id'] as const, InputType) {
  @Field(() => Int)
  restaurantId: number;
}
