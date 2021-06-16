import { Module } from '@nestjs/common';
import { CategoryModule } from 'category/category.module';
import { PrismaService } from 'prisma/prisma.service';
import { RestaurantResolver } from './restaurant.resolver';
import { RestaurantService } from './restaurant.service';

@Module({
  imports: [CategoryModule],
  providers: [PrismaService, RestaurantResolver, RestaurantService],
  exports: [RestaurantService],
})
export class RestaurantsModule {}
