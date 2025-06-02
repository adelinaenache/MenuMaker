import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { RestaurantService } from 'restaurant/restaurant.service';
import { PrismaService } from 'prisma/prisma.service';
import { User } from 'user/models/user.model';
import { CreateRestaurantInput } from 'restaurant/dto/create-restaurant.input';

describe('RestaurantService', () => {
  let prisma: PrismaService;
  let service: RestaurantService;
  let testUser: User;
  let restaurant1: any;
  let restaurant2: any;

  beforeAll(async () => {
    prisma = new PrismaService();
    await prisma.$connect();
    service = new RestaurantService(prisma);

    // Clean up before tests
    await prisma.restaurant.deleteMany();
    await prisma.user.deleteMany();

    // Create a test user
    testUser = await prisma.user.create({
      data: {
        email: 'testuser@example.com',
        password: 'securepassword',
      },
    });

    // Create two restaurants for the user
    restaurant1 = await prisma.restaurant.create({
      data: {
        name: 'Testaurant One',
        userId: testUser.id,
      },
    });
    restaurant2 = await prisma.restaurant.create({
      data: {
        name: 'Testaurant Two',
        userId: testUser.id,
      },
    });
  });

  afterAll(async () => {
    await prisma.restaurant.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  it('should_return_all_restaurants', async () => {
    const restaurants = await service.findAll();
    expect(Array.isArray(restaurants)).toBe(true);
    expect(restaurants.length).toBeGreaterThanOrEqual(2);
    const ids = restaurants.map(r => r.id);
    expect(ids).toContain(restaurant1.id);
    expect(ids).toContain(restaurant2.id);
  });

  it('should_return_restaurant_by_id', async () => {
    const found = await service.findOne(restaurant1.id);
    expect(found).not.toBeNull();
    expect(found.id).toBe(restaurant1.id);
    expect(found.name).toBe(restaurant1.name);
  });

  it('should_create_restaurant_with_owner', async () => {
    const input: CreateRestaurantInput = {
      name: 'Brand New Eatery',
    };
    const created = await service.create(testUser, input);
    expect(created).toBeDefined();
    expect(created.name).toBe(input.name);
    expect(created.userId).toBe(testUser.id);

    // Clean up
    await prisma.restaurant.delete({ where: { id: created.id } });
  });

  it('should_return_null_for_nonexistent_restaurant_id', async () => {
    const found = await service.findOne(999999);
    expect(found).toBeNull();
  });

  it('should_return_empty_list_for_user_with_no_restaurants', async () => {
    const lonelyUser = await prisma.user.create({
      data: {
        email: 'lonely@example.com',
        password: 'none',
      },
    });
    const restaurants = await service.findByUserId(lonelyUser.id);
    expect(Array.isArray(restaurants)).toBe(true);
    expect(restaurants.length).toBe(0);

    // Clean up
    await prisma.user.delete({ where: { id: lonelyUser.id } });
  });

  it('should_throw_error_for_invalid_user_on_create', async () => {
    const invalidUser: User = { id: 999999, email: 'ghost@example.com' };
    const input: CreateRestaurantInput = {
      name: 'Ghost Kitchen',
    };
    await expect(service.create(invalidUser, input)).rejects.toThrow();
  });
});