import { Module } from '@nestjs/common';
import { ItemModule } from 'item/item.module';
import { PrismaModule } from 'prisma/prisma.module';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';

@Module({
  imports: [PrismaModule, ItemModule],
  providers: [CategoryResolver, CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
