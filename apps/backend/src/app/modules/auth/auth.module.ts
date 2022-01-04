import { Module } from '@nestjs/common';

import { JwtService } from '../../shared/services/jwt.service';
import { PrismaService } from '../../shared/services/prisma.service';
import { ShopService } from '../shop/shop.service';
import { UserService } from '../user/user.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  providers: [
    PrismaService,
    UserService,
    JwtService,
    AuthResolver,
    AuthService,
    ShopService,
  ],
})
export class AuthModule {}
