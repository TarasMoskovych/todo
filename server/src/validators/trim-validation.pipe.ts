import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function TrimValidator(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'TrimValidator',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: { ...validationOptions, message: `Shouldn't be empty` },
      validator: {
        validate(value: any, args: ValidationArguments) {
          return value.trim().length;
        },
      },
    });
  };
}
