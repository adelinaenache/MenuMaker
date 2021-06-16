import { Field, InputType, Int, OmitType } from '@nestjs/graphql';
import { Item } from 'item/entities/item.entity';

@InputType()
export class CreateItemInput extends OmitType(Item, ['id'] as const, InputType) {
  @Field(() => Int)
  categoryId: number;
}
