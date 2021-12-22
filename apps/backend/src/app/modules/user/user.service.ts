import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';

import { NotFoundError } from '../../shared/error/not-found.error';
import { PrismaError } from '../../shared/error/prisma-error';
import { ServiceError } from '../../shared/error/service.error';
import { PrismaService } from '../../shared/services/prisma.service';
import { CreateUserInput } from './dto/user.input';

@Injectable()
export class UserService {
  private readonly modelName = 'User';

  constructor(private prismaService: PrismaService) {}

  async create({ email, password }: CreateUserInput) {
    try {
      const hashPassword = await hash(password);
      return await this.prismaService.user.create({
        data: {
          email,
          password: hashPassword,
        },
      });
    } catch (error) {
      throw new PrismaError(this.modelName, error);
    }
  }

  async getByEmail(email: string) {
    try {
      const userInfo = await this.prismaService.user.findUnique({
        where: { email },
      });
      if (!userInfo) throw new NotFoundError('user');
      return userInfo;
    } catch (error) {
      throw new ServiceError(this.modelName, error);
    }
  }

  async getById(id: string) {
    try {
      return this.prismaService.user.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new PrismaError(this.modelName, error);
    }
  }
}
