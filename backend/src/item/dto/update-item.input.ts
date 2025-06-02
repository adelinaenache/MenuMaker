import { Item } from '../entities/item.entity';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateItemInput extends PartialType(Item, InputType) {}
