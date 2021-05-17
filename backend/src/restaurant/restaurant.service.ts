import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateRestaurantInput } from 'restaurant/dto/create-restaurant.input';
import { User } from 'user/models/user.model';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number) {
    return this.prisma.restaurant.findUnique({
      where: {
        id,
      },
    });
  }

  async findByUserId(userId: number) {
    return this.prisma.restaurant.findMany({
      where: {
        userId,
      },
    });
  }
}
