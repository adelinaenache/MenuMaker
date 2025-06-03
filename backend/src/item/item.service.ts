import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  create({ categoryId, ...createItemInput }: CreateItemInput) {
    return this.prisma.item.create({
      data: {
        ...createItemInput,
        category: { connect: { id: categoryId } },
      },
    });
  }

  findAllByCategoryId(id: number) {
    return this.prisma.item.findMany({ where: { categoryId: id } });
  }

  update(id: number, updateItemInput: UpdateItemInput) {
    return this.prisma.item.update({
      where: {
        id,
      },
      data: updateItemInput,
    });
  }

  remove(id: number) {
    return this.prisma.item.delete({
      where: {
        id,
      },
    });
  }
}
