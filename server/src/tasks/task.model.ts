import { IsBoolean, IsBooleanString, IsDateString, IsNotEmpty, IsOptional } from 'class-validator';
import { TrimValidator } from 'src/validators';

export class Task {
  id: string;

  @IsNotEmpty()
  @TrimValidator()
  name: string;

  @IsOptional()
  @IsBoolean()
  completed: boolean;

  priority?: string;
  category?: string;

  @IsOptional()
  @IsDateString()
  date?: Date;
}

export class TaskFilter {
  @IsOptional()
  @IsBooleanString()
  completed?: string;

  priority?: string;
  query?: string;
}
