import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { IUser } from '../../@types/IUser';
import { JwtService } from '../services/jwt.service';

export const AuthUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = GqlExecutionContext.create(ctx).getContext();
    const authToken: string = request.req?.headers?.authorization;

    if (!authToken) {
      return null;
    }

    const jwtService = new JwtService();
    const { payload: user } = jwtService.decode<IUser>(
      authToken.replace('Bearer ', '')
    );
    return data ? user?.[data] : user;
  }
);
