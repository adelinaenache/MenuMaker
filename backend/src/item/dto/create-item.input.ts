import { InputType, OmitType } from '@nestjs/graphql';
import { Item } from 'item/entities/item.entity';

@InputType()
export class CreateItemInput extends OmitType(Item, ['id'] as const, InputType) {
  categoryId: number;
}
