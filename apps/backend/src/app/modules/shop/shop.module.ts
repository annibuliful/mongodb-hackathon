import { Module } from '@nestjs/common';

import { PrismaService } from '../../shared/services/prisma.service';
import { ShopResolver } from './shop.resolver';
import { ShopService } from './shop.service';

@Module({ providers: [PrismaService, ShopService, ShopResolver] })
export class ShopModule {}
