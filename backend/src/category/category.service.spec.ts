import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { PrismaModule } from '../prisma/prisma.module';
import { faker } from '@faker-js/faker';

let service: CategoryService;
let prismaService: PrismaService;

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [PrismaModule],
    providers: [CategoryService],
  }).compile();

  service = module.get<CategoryService>(CategoryService);
  prismaService = module.get<PrismaService>(PrismaService);
});

afterEach(async () => {
  // Clean up the database after each test
  await prismaService.category.deleteMany({});
});

afterAll(async () => {
  await prismaService.$disconnect();
});

describe('CategoryService', () => {
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const createCategoryInput: CreateCategoryInput = {
        name: faker.lorem.word(),
        restaurantId: 1,
      };

      const result = await service.create(createCategoryInput);
      expect(result).toHaveProperty('id');
      expect(result.name).toBe(createCategoryInput.name);
      expect(result.restaurantId).toBe(createCategoryInput.restaurantId);
    });
  });

  describe('findAllByRestaurantId', () => {
    it('should find categories by restaurant ID', async () => {
      // Create test data
      const restaurantId = 1;
      const category1 = await service.create({
        name: faker.lorem.word(),
        restaurantId,
      });
      const category2 = await service.create({
        name: faker.lorem.word(),
        restaurantId,
      });

      const result = await service.findAllByRestaurantId(restaurantId);
      expect(result).toHaveLength(2);
      expect(result[0].restaurantId).toBe(restaurantId);
      expect(result[1].restaurantId).toBe(restaurantId);
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      // Create a category first
      const category = await service.create({
        name: faker.lorem.word(),
        restaurantId: 1,
      });

      const updateCategoryInput: UpdateCategoryInput = {
        id: category.id,
        name: faker.lorem.word(),
      };

      const result = await service.update(category.id, updateCategoryInput);
      expect(result.id).toBe(category.id);
      expect(result.name).toBe(updateCategoryInput.name);
    });
  });

  describe('remove', () => {
    it('should remove a category', async () => {
      // Create a category first
      const category = await service.create({
        name: faker.lorem.word(),
        restaurantId: 1,
      });

      const result = await service.remove(category.id);
      expect(result.id).toBe(category.id);

      // Verify it was actually deleted
      const deleted = await prismaService.category.findUnique({
        where: { id: category.id }
      });
      expect(deleted).toBeNull();
    });
  });
});
