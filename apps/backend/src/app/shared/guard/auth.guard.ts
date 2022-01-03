import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { JwtService } from '../services/jwt.service';

interface IAuthToken {
  payload: {
    userId: string;
    email: string;
  };
}

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const jwtService = new JwtService();
    const request = GqlExecutionContext.create(context).getContext();
    const authToken: string = request.req?.headers?.authorization;

    // no authentication token
    if (!authToken) {
      return false;
    }

    // invalid authentication token pattern
    if (authToken.indexOf('Bearer ') === -1) {
      return false;
    }
    const { isValid } = await jwtService.verify<IAuthToken>(authToken);

    // invalid token
    if (!isValid) {
      return false;
    }

    return true;
  }
}
