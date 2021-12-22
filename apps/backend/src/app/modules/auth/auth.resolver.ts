import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { LoginInput } from './dto/auth.dto';
import { UserAuth } from './dto/auth.schema';

@Resolver(() => UserAuth)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => UserAuth)
  userLogin(@Args('LoginInput') input: LoginInput) {
    return this.authService.login(input);
  }
}
