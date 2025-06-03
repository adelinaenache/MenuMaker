import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      include: {
        Restaurant: true, // include related restaurants
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        Restaurant: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async create(createUserInput: any) {
    // Basic validation example
    if (!createUserInput.email) {
      throw new BadRequestException('Email is required');
    }
    try {
      return await this.prisma.user.create({
        data: createUserInput,
      });
    } catch (error) {
      // Handle unique constraint violation for email
      if (error.code === 'P2002') {
        throw new BadRequestException('Email already exists');
      }
      throw error;
    }
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: updateUserInput,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      throw error;
    }
  }

  async delete(id: number) {
    try {
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      throw error;
    }
  }
}
