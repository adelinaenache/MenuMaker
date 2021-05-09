import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  providers: [PrismaService],
})
export class UsersModule {}
