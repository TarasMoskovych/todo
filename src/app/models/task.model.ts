import { Filter } from './filter.model';

export interface Task {
  id: number;
  name: string;
  completed: boolean;
  priorityId?: number;
  category?: number;
  date?: Date;
  filter?: TaskFilter;
}

export interface TaskFilter extends Filter {
  status?: string;
  priority?: number | string;
}
