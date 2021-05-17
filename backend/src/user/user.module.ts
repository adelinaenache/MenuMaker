import { Module } from '@nestjs/common';
import { RestaurantsModule } from 'restaurant/restaurant.module';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [RestaurantsModule],
  providers: [UserResolver, UserService, PrismaService],
})
export class UserModule {}
