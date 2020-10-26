import { Filter } from './filter.model';

export interface Task {
  id: string;
  name: string;
  completed: boolean;
  priority?: string;
  category?: string;
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

export interface TaskCountEntity {
  [name: string]: number;
}

export interface TasksUncompletedCount {
  count: number;
  entities: TaskCountEntity,
}

export interface TaskFilter extends Filter {
  completed: boolean;
  priority: string;
}
