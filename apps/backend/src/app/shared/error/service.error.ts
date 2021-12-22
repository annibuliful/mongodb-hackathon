import { Prisma } from '@prisma/client';
import { CustomError } from 'ts-custom-error';

import { NotFoundError } from './not-found.error';
import { PrismaError, PrismaErrorContext } from './prisma-error';

type ServiceErrorContext = PrismaErrorContext | NotFoundError;

export class ServiceError extends CustomError {
  constructor(field: string, e: ServiceErrorContext) {
    console.error(`${field} => `, e);
    if (e instanceof NotFoundError) {
      super(new NotFoundError(field).message);
    }

    if (
      e instanceof Prisma.PrismaClientValidationError ||
      e instanceof Prisma.PrismaClientKnownRequestError ||
      e instanceof Prisma.PrismaClientInitializationError
    ) {
      super(new PrismaError(field, e).message);
    }
  }
}
