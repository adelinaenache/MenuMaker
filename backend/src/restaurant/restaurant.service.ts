import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateRestaurantInput } from 'restaurant/dto/create-restaurant.input';
import { User } from 'user/models/user.model';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.restaurant.findMany();
  }

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

  async create(user: User, data: CreateRestaurantInput) {
    return this.prisma.restaurant.create({
      data: {
        owner: {
          connect: {
            id: user.id,
          },
        },
        ...data,
      },
    });
  }
}
