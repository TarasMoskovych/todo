import { Priority } from './priority.model';
import { Category } from './category.model';

export interface Task {
  id: number;
  name: string;
  completed: boolean;
  prioriry?: Priority;
  category?: Category;
  date?: Date;
}
