import { Injectable } from '@nestjs/common';

import { ServiceError } from '../../shared/error/service.error';
import { PrismaService } from '../../shared/services/prisma.service';
import { CreateShopInput } from './dto/shop.input';

@Injectable()
export class ShopService {
  private readonly name = 'Shop';
  constructor(private prismaService: PrismaService) {}

  create(ownerId: string, data: CreateShopInput) {
    try {
      return this.prismaService.shop.create({
        data: { ...data, slug: data.name.replace(' ', '-'), ownerId },
      });
    } catch (error) {
      throw new ServiceError(this.name, error);
    }
  }
}
