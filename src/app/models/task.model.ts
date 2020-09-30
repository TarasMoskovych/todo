export interface Task {
  id: number;
  name: string;
  completed: boolean;
  priorityId?: number;
  category?: number;
  date?: Date;
}
