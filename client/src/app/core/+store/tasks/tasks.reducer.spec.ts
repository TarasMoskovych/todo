import { TaskEntity, Task, TaskFilter, TestData } from 'src/app/models';
import { tasksReducer } from './tasks.reducer';
import { initialTasksState } from './tasks.state';
import {
  CreateTaskSuccess,
  FilterTasks,
  GetTasks,
  GetTasksError,
  GetTasksSuccess,
  RemoveTaskSuccess,
  UpdateTaskSuccess
} from './tasks.actions';

const { tasks, tasksEntities: entities } = TestData.data;

describe('TasksReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const state = tasksReducer(undefined, {} as any);

      expect(state).toBe(initialTasksState);
    });
  });

  describe('GET_TASKS action', () => {
    it('should set loading property to true', () => {
      const state = tasksReducer(initialTasksState, new GetTasks());

      expect(state.loaded).toEqual(false);
      expect(state.loading).toEqual(true);
      expect(state.entities).toEqual({});
    });
  });

  describe('GET_TASKS_SUCCESS action', () => {
    it('should populate tasks array', () => {
      const state = tasksReducer(initialTasksState, new GetTasksSuccess(tasks));

      expect(state.loaded).toEqual(true);
      expect(state.loading).toEqual(false);
      expect(state.entities).toEqual(entities);
    });
  });

  describe('GET_TASKS_ERROR action', () => {
    it('should populate error', () => {
      const error = new Error('Error during getting tasks.')
      const state = tasksReducer(initialTasksState, new GetTasksError(error));

      expect(state.loaded).toEqual(false);
      expect(state.loading).toEqual(false);
      expect(state.entities).toEqual({});
      expect(state.error).toEqual(error);
    });
  });

  describe('CREATE_TASK_SUCCESS action', () => {
    it('should create new task', () => {
      const task: Task = {
        id: '20',
        name: 'new task',
        completed: false,
      };
      const taskEntity: TaskEntity = { 20: task };
      const state = tasksReducer({ ...initialTasksState, entities }, new CreateTaskSuccess(task));

      expect(state.entities).toEqual({ ...entities, ...taskEntity });
    });
  });

  describe('UPDATE_TASK_SUCCESS action', () => {
    it('should update the task', () => {
      const task: Task = {
        id: '1',
        name: 'Fill the gasoline tank full',
        priority: '3',
        completed: true,
        category: null,
        date: new Date('2020-04-10'),
      };
      const state = tasksReducer({ ...initialTasksState, entities }, new UpdateTaskSuccess(task));

      expect(state.entities).toEqual({ ...entities, 1: task });
    });
  });

  describe('REMOVE_TASK_SUCCESS action', () => {
    it('should remove the task', () => {
      const state = tasksReducer({ ...initialTasksState, entities }, new RemoveTaskSuccess(entities[3]));

      expect(state.entities).toEqual({
        1: tasks[0],
        2: tasks[1],
        4: tasks[3],
        5: tasks[4],
      });
    });
  });

  describe('FILTER_TASKS action', () => {
    it('should populate filter', () => {
      const filter: TaskFilter = {
        completed: false,
        priority: '2',
        q: null,
      };
      const state = tasksReducer({ ...initialTasksState, entities }, new FilterTasks(filter));

      expect(state.filter).toEqual(filter);
    });
  });
});
