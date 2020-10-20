import { Injectable } from '@nestjs/common';
import { AbstractLowDbService } from 'src/database';
import { Task, TaskFilter } from './task.model';

@Injectable()
export class TasksService extends AbstractLowDbService<Task> {

  constructor() {
    super('tasks', 'Task');
  }

  get(filter?: TaskFilter): Task[] {
    return this.getAll()
      .filter((task: Task) => {
        // Filter by status
        if (filter.completed && (filter.completed === 'true' && !task.completed || filter.completed === 'fase' && task.completed)) { return false; }
        // Filter by query
        if (filter.query && task.name.search(new RegExp(filter.query, 'i')) === -1) { return false; }
        // Filter by priorities
        if (filter.priority && (filter.priority !== task.priority && filter.priority !== 'null' || filter.priority === 'null' && task.priority)) { return false; }
        return true;
      });
  }

  create(payload: Task): Task {
    return super.create({ ...payload, completed: false });
  }
}
