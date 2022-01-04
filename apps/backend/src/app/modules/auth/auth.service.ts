import { Injectable } from '@nestjs/common';
import { verify } from 'argon2';

import { NotFoundError } from '../../shared/error/not-found.error';
import { ServiceError } from '../../shared/error/service.error';
import { JwtService } from '../../shared/services/jwt.service';
import { ShopService } from '../shop/shop.service';
import { UserService } from '../user/user.service';
import { LoginInput } from './dto/auth.dto';
import { UserAuth } from './dto/auth.schema';

@Injectable()
export class AuthService {
  private readonly name = 'Authentication';
  constructor(
    private userService: UserService,
    private shopService: ShopService,
    private jwtService: JwtService
  ) {}

  async login({ email, password }: LoginInput): Promise<UserAuth> {
    const userInfo = await this.userService.getByEmail(email);
    const isPasswordCorrect = await verify(userInfo.password, password);
    if (!isPasswordCorrect) {
      throw new NotFoundError('User');
    }

    const shopInfo = await this.shopService.getByOwnerId(userInfo.id);
    if (!shopInfo) {
      throw new NotFoundError('Shop');
    }

    try {
      const token = await this.jwtService.sign({
        userId: userInfo.id,
        email: userInfo.email,
        shopId: shopInfo.id,
      });
      return {
        token,
        expireTime: new Date(new Date().setDate(new Date().getDate() + 7)),
      };
    } catch (error) {
      throw new ServiceError(this.name, error);
    }
  }
}
