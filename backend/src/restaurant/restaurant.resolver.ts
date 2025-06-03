import { UseGuards } from '@nestjs/common';
import { Float, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Args, Int, Query } from '@nestjs/graphql';
import { CategoryService } from '../category/category.service';
import { Category } from '../category/entities/category.entity';
import { Item } from '../item/entities/item.entity';
import { ItemService } from '../item/item.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { User } from '../user/models/user.model';
import { CurrentUser } from '../utils/decorators/user.decorator';
import { GqlAuthGuard } from 'utils/guards/auth.guard';
import { Restaurant } from './models/restaurant.model';
import { RestaurantService } from './restaurant.service';

@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly categoryService: CategoryService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [Restaurant])
  async restaurants() {
    return this.restaurantService.findAll();
  }

  @Query(() => Restaurant)
  async restaurant(@Args('id', { type: () => Int }) id: number) {
    return this.restaurantService.findOne(id);
  }

  @Mutation(() => Restaurant)
  @UseGuards(GqlAuthGuard)
  async createRestaurant(@CurrentUser() user: User, @Args('data') createRestaurantInput: CreateRestaurantInput) {
    return this.restaurantService.create(user, createRestaurantInput);
  }

  @ResolveField(() => [Category])
  async categories(@Parent() { id }: Restaurant) {
    return this.categoryService.findAllByRestaurantId(id);
  }

  @ResolveField(() => Int)
  async itemCount(@Parent() { id }: Restaurant) {
    const categories = await this.prisma.category.findMany({
      where: { restaurantId: id },
      include: { items: true },
    });

    return categories.reduce((acc, c) => acc + c.items.length, 0);
  }

  @ResolveField(() => [Float])
  async priceRange(@Parent() { id }: Restaurant) {
    const categories = await this.prisma.category.findMany({
      where: { restaurantId: id },
      include: { items: true },
    });

    if (categories.reduce((acc, c) => acc + c.items.length, 0) == 0) {
      return [0, 0];
    }

    return [
      Math.min(...categories.flatMap((c) => Math.min(...c.items.map((i) => i.price)))),
      Math.max(...categories.flatMap((c) => Math.max(...c.items.map((i) => i.price)))),
    ];
  }
}
