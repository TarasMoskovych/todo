import { IsNotEmpty } from 'class-validator';
import { TrimValidator } from 'src/validators';

export class Category {
  id: string;

  @IsNotEmpty()
  @TrimValidator()
  name: string;
}

export interface CategoryFilter {
  q: string;
}
