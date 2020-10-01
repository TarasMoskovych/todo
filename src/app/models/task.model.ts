export interface Task {
  id: number;
  name: string;
  completed: boolean;
  priorityId?: number;
  category?: number;
  date?: Date;
  filter?: TaskFilter;
}

export interface TaskFilter {
  query?: string;
  status?: string;
  priority?: number | string;
}
