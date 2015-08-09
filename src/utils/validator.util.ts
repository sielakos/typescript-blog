import * as _ from 'lodash';

export interface Validator {
  (value: any): string;
}

export interface Conditions {
  [field: string]: Array<Validator>
}

export interface ValidationErrors {
  [name: string]: Array<string>;
}

export class ValidationResult {
    pass: boolean;
    errors: ValidationErrors;

    constructor(pass: boolean = true, errors: ValidationErrors = {}) {
      this.pass = pass;
      this.errors = errors;
    }

    addError(field: string, error: string): void {
      if (!this.errors[field]) {
        this.errors[field] = [];
      }

      this.errors[field].push(error);
      this.pass = false;
    }

    merge(other: ValidationResult): void {
      this.pass = this.pass && other.pass;

      _.forOwn(other.errors, (errors, field) => {
        if (!this.errors[field]) {
          this.errors[field] = [];
        }

        this.errors[field] = this.errors[field].concat(errors);
      });
    }
}

export function validateBody(body: Object, conditions: Conditions): ValidationResult {
  let validationResult = new ValidationResult();

  _.forOwn(body, (value, field) => {
    if (_.has(conditions, field)) {
      validationResult.merge(validateConditions(value, field, conditions[field]));
    }
  });

  return validationResult;
}

function validateConditions(value: any, field: string, conditions: Array<Validator>): ValidationResult {
  let validationResult = new ValidationResult();

  conditions.forEach((validator: Validator) => {
    let error = validator(value);

    if (error) {
      validationResult.addError(field, error);
    }
  });

  return validationResult;
}
