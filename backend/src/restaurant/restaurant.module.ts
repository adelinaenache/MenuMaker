import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { RestaurantResolver } from './restaurant.resolver';
import { RestaurantService } from './restaurant.service';

@Module({
  imports: [],
  providers: [PrismaService, RestaurantResolver, RestaurantService],
  exports: [RestaurantService],
})
export class RestaurantsModule {}
