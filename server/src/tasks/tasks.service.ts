import { Injectable } from '@nestjs/common';
import { AbstractLowDbService } from '../database';
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
        if (filter.completed && (JSON.parse(filter.completed) && !task.completed || !JSON.parse(filter.completed) && task.completed)) { return false; }
        // Filter by query
        if (filter.q?.trim().length && task.name.search(new RegExp(filter.q, 'i')) === -1) { return false; }
        // Filter by priorities
        if (filter.priority !== undefined && (filter.priority !== task.priority && filter.priority !== '0' || filter.priority === '0' && task.priority)) { return false; }
        return true;
      });
  }

  create(payload: Task): Task {
    return super.create({ ...payload, completed: false });
  }
}
