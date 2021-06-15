import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { ItemService } from './item.service';
import { ItemResolver } from './item.resolver';

@Module({
  imports: [PrismaModule],
  providers: [ItemResolver, ItemService],
  exports: [ItemService],
})
export class ItemModule {}
