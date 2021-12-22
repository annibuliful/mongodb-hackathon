import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { IUser } from '../../@types/IUser';
import { AuthUser } from '../../shared/decorator/user.decorator';
import { AuthGuard } from '../../shared/guard/auth.guard';
import { CreateShopInput } from './dto/shop.input';
import { Shop } from './dto/shop.schema';
import { ShopService } from './shop.service';

@Resolver(() => Shop)
export class ShopResolver {
  constructor(private shopService: ShopService) {}

  @Mutation(() => Shop)
  @UseGuards(new AuthGuard())
  createShop(
    @AuthUser() userInfo: IUser,
    @Args('createShopInput') input: CreateShopInput
  ) {
    return this.shopService.create(userInfo.userId, input);
  }
}
