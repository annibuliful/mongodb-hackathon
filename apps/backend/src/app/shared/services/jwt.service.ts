import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../../constants/config';

@Injectable()
export class JwtService {
  sign(payload: Record<string, any>, expireDate?: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const expiresIn = expireDate || '7d';
      jwt.sign(
        { payload },
        JWT_SECRET,
        {
          expiresIn,
        },
        (err, token) => {
          if (err) reject(err);
          resolve(token);
        }
      );
    });
  }

  async verify<T>(authorization: string) {
    try {
      if (authorization) {
        const token = authorization.replace('Bearer ', '');
        await jwt.verify(token, JWT_SECRET);
        const { payload } = jwt.decode(token) as { payload: T };
        return { isValid: true, ...payload };
      }
    } catch (e) {
      return { isValid: false };
    }
  }

  decode<T = any>(token: string) {
    return jwt.decode(token) as {
      payload: T;
      iat: number;
      exp;
    };
  }
}
