export interface Task {
  id: number;
  name: string;
  completed: boolean;
  priorityId?: number;
  categoryId?: number;
  date?: Date;
}
