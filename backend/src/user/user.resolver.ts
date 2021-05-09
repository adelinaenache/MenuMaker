import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { UpdateUserInput } from './dto/update-user.input';
import { GqlAuthGuard } from 'src/utils/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/utils/decorators/user.decorator';

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
