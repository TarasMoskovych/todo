import { IsNotEmpty } from 'class-validator';
import { TrimValidator } from '../validators';

export class Category {
  id: string;

  @IsNotEmpty()
  @TrimValidator()
  name: string;
}

export interface CategoryFilter {
  q: string;
}
