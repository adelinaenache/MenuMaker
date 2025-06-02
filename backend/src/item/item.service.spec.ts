import { Test, TestingModule } from '@nestjs/testing';
import { ItemService } from './item.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { faker } from '@faker-js/faker';
import { CategoryService } from '../category/category.service';
import { CreateCategoryInput } from '../category/dto/create-category.input';

jest.mock('../prisma/prisma.service');
jest.mock('../category/category.service');

describe('ItemService', () => {
  let service: ItemService;
  let prismaService: PrismaService;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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
            category: {
              findUnique: jest.fn(),
            },
          },
        },
        {
          provide: CategoryService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ItemService>(ItemService);
    prismaService = module.get<PrismaService>(PrismaService);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new item', async () => {
      const createItemInput: CreateItemInput = {
        name: faker.lorem.word(),
        description: faker.lorem.sentence(),
        price: faker.number.float({ min: 0, max: 100 }),
        categoryId: 1,
      };

      const mockItem = {
        id: 1,
        ...createItemInput,
      };

      (prismaService.item.create as jest.Mock).mockResolvedValue(mockItem);

      const result = await service.create(createItemInput);
      expect(result).toEqual(mockItem);
      expect(prismaService.item.create).toHaveBeenCalledWith({
        data: {
          ...createItemInput,categoryId: undefined,
          category: { connect: { id: createItemInput.categoryId } },
        },
      });
    });
  });

  describe('findAllByCategoryId', () => {
    it('should find items by category ID', async () => {
      const mockItems = [
        {
          id: 1,
          name: faker.lorem.word(),
          description: faker.lorem.sentence(),
          price: faker.number.float({ min: 0, max: 100 }),
          categoryId: 1,
        },
        {
          id: 2,
          name: faker.lorem.word(),
          description: faker.lorem.sentence(),
          price: faker.number.float({ min: 0, max: 100 }),
          categoryId: 1,
        },
      ];

      (prismaService.item.findMany as jest.Mock).mockResolvedValue(mockItems);

      const result = await service.findAllByCategoryId(1);
      expect(result).toEqual(mockItems);
      expect(prismaService.item.findMany).toHaveBeenCalledWith({
        where: { categoryId: 1 }
      });
    });
  });

  describe('update', () => {
    it('should update an item', async () => {
      const updateItemInput: UpdateItemInput = {
        id: 1,
        name: faker.lorem.word(),
        description: faker.lorem.sentence(),
        price: faker.number.float({ min: 0, max: 100 }),
      };

      const mockItem = {
        ...updateItemInput,
        categoryId: 1,
      };

      (prismaService.item.update as jest.Mock).mockResolvedValue(mockItem);

      const result = await service.update(1, updateItemInput);
      expect(result).toEqual(mockItem);
      expect(prismaService.item.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateItemInput
      });
    });
  });

  describe('remove', () => {
    it('should remove an item', async () => {
      const mockItem = {
        id: 1,
        name: faker.lorem.word(),
        description: faker.lorem.sentence(),
        price: faker.number.float({ min: 0, max: 100 }),
        categoryId: 1,
      };

      (prismaService.item.delete as jest.Mock).mockResolvedValue(mockItem);

      const result = await service.remove(1);
      expect(result).toEqual(mockItem);
      expect(prismaService.item.delete).toHaveBeenCalledWith({
        where: { id: 1 }
      });
    });
  });
});
