import { Test, TestingModule } from '@nestjs/testing';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { ItemService } from '../item/item.service';
import { PrismaService } from '../prisma/prisma.service';

jest.mock('../prisma/prisma.service');

describe('CategoryResolver', () => {
  let resolver: CategoryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryResolver, CategoryService, ItemService,        {
                provide: PrismaService,
                useValue: {
                  item: {
                    create: jest.fn(),
                    findMany: jest.fn(),
                    update: jest.fn(),
                    delete: jest.fn(),
                  },
                },
              },],
    }).compile();

    resolver = module.get<CategoryResolver>(CategoryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
