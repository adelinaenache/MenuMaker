import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Restaurant } from 'restaurant/models/restaurant.model';
import { RestaurantService } from 'restaurant/restaurant.service';
import { CurrentUser } from 'utils/decorators/user.decorator';
import { GqlAuthGuard } from 'utils/guards/auth.guard';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './models/user.model';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  me(@CurrentUser() user: User) {
    return user;
  }

  @Mutation(() => User)
  update(@Args('data') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  delete(@Args('id', { type: () => Int }) id: number) {
    return this.userService.delete(id);
  }
}
