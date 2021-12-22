import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUserInput } from './dto/user.input';
import { User } from './dto/user.schema';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') input: CreateUserInput) {
    return this.userService.create(input);
  }

  @Query(() => User)
  getUserById(@Args('id') id: string) {
    return this.userService.getById(id);
  }
}
