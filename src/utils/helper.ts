import { ValidationError } from '@nestjs/common';

export class Helper {
  static formatErrorsValidate(errors: ValidationError[]) {
    const params = {};
    errors.forEach((error: ValidationError) => {
      params[error.property] = Object.values(error.constraints)[0];
    });
    return params;
  }
}
