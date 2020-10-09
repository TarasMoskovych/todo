import { Filter } from './filter.model';

export interface Task {
  id: number;
  name: string;
  completed: boolean;
  priority?: number;
  category?: number;
  date?: Date;
  filter?: TaskFilter;
}

export interface TasksStatistics {
  count: number;
  completed: number;
  completedValue: number;
  uncompleted: number;
  uncompletedValue: number;
}

export interface TaskFilter extends Filter {
  status?: string;
  priority?: number | string;
}
