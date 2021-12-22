import { CustomError } from 'ts-custom-error';

export class NotFoundError extends CustomError {
  constructor(field: string) {
    super(`${field} not found`);
  }
}
