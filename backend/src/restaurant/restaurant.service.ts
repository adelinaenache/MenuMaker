import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
