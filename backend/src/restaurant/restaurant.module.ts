import { Module } from '@nestjs/common';
import { ItemModule } from 'item/item.module';
import { PrismaService } from 'prisma/prisma.service';
import { RestaurantResolver } from './restaurant.resolver';
import { RestaurantService } from './restaurant.service';

@Module({
  imports: [ItemModule],
  providers: [PrismaService, RestaurantResolver, RestaurantService],
  exports: [RestaurantService],
})
export class RestaurantsModule {}
