import { Prisma } from '@prisma/client';
import { CustomError } from 'ts-custom-error';

const LIST_ERRORS = [
  {
    code: 'P2025',
    message: 'not found',
  },
  {
    code: 'P2003',
    message: 'Foreign key constraint not found',
  },
  {
    code: 'P2009',
    message: 'Invalid input',
  },
  {
    code: 'P2002',
    message: 'duplicate',
  },
];
export type PrismaErrorContext =
  | Prisma.PrismaClientValidationError
  | Prisma.PrismaClientKnownRequestError
  | Prisma.PrismaClientInitializationError;

export class PrismaError extends CustomError {
  constructor(model: string, e: PrismaErrorContext) {
    console.error(`model name = ${model} => `, e);

    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      const error = LIST_ERRORS.find((error) => error.code === e.code);
      if (!error?.message) {
        super('Internal server error');
        return;
      }

      super(`${model} ${error.message} => ${(e.meta as any)?.target}`);
      return;
    }

    if (e instanceof Prisma.PrismaClientValidationError) {
      super('Invalid Input');
      return;
    }

    if (e instanceof Prisma.PrismaClientInitializationError) {
      super('Database error');
      return;
    }

    super('Internal server error');
  }
}
