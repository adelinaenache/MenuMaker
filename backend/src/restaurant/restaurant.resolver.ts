import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';
import { Args, Int, Query } from '@nestjs/graphql';
import { CreateRestaurantInput } from 'restaurant/dto/create-restaurant.input';
import { User } from 'user/models/user.model';
import { CurrentUser } from 'utils/decorators/user.decorator';
import { GqlAuthGuard } from 'utils/guards/auth.guard';
import { Restaurant } from './models/restaurant.model';
import { RestaurantService } from './restaurant.service';

@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(private restaurantService: RestaurantService) {}

  @Query(() => Restaurant)
  async restaurant(@Args('id', { type: () => Int }) id: number) {
    return this.restaurantService.findOne(id);
  }

  @Mutation(() => Restaurant)
  @UseGuards(GqlAuthGuard)
  async createRestaurant(
    @CurrentUser() user: User,
    @Args('data') createRestaurantInput: CreateRestaurantInput,
  ) {
    return this.restaurantService.create(user, createRestaurantInput);
  }
}
