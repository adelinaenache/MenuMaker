import { Test, TestingModule } from '@nestjs/testing';
import { ItemResolver } from './item.resolver';
import { ItemService } from './item.service';
import { PrismaService } from '../prisma/prisma.service';

jest.mock('../prisma/prisma.service');

describe('ItemResolver', () => {
  let resolver: ItemResolver;
  let itemService: ItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemResolver,
        ItemService,
        {
          provide: PrismaService,
          useValue: {
            item: {
              create: jest.fn(),
              findMany: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<ItemResolver>(ItemResolver);
    itemService = module.get<ItemService>(ItemService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
