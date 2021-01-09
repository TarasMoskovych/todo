import { IsNotEmpty } from 'class-validator';
import { TrimValidator } from '../validators';

export class Priority {
  id: string;

  @IsNotEmpty()
  @TrimValidator()
  name: string;

  @IsNotEmpty()
  @TrimValidator()
  color: string;
}
