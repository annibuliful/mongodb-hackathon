import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { IUser } from '../../@types/IUser';
import { AuthUser } from '../../shared/decorator/user.decorator';
import { AuthGuard } from '../../shared/guard/auth.guard';
import { CreateShopInput, UpdateShopInput } from './dto/shop.input';
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

  @Mutation(() => Shop)
  @UseGuards(new AuthGuard())
  updateShopw(
    @AuthUser() userInfo: IUser,
    @Args('updateShopInput') input: UpdateShopInput
  ) {
    return this.shopService.update(userInfo.userId, input);
  }
}
