import { Category } from '../entities/category.entity';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCategoryInput extends PartialType(Category, InputType) {}
