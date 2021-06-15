import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  create({ restaurantId, ...createCategoryInput }: CreateCategoryInput) {
    return this.prisma.category.create({
      data: { ...createCategoryInput, restaurant: { connect: { id: restaurantId } } },
    });
  }

  findAllByRestaurantId(restaurantId: number) {
    return this.prisma.category.findMany({ where: { id: restaurantId } });
  }

  update(id: number, updateCategoryInput: UpdateCategoryInput) {
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryInput,
    });
  }

  remove(id: number) {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
