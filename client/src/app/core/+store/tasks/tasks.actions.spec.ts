import { Task, TestData } from 'src/app/models';
import {
  GetTasks,
  TasksActions,
  TasksActionTypes,
  GetTasksSuccess,
  GetTasksError,
  CreateTask,
  CreateTaskSuccess,
  CreateTaskError,
  UpdateTask,
  UpdateTaskSuccess,
  UpdateTaskError,
  RemoveTask,
  RemoveTaskSuccess,
  RemoveTaskError,
  FilterTasks,
  ToggleStatistic,
} from './tasks.actions';

const { tasks, tasksFilter: filter } = TestData.data;
const error = 'Some error message';
const task: Task = tasks[0];

describe('TasksActions', () => {

  it('should create GetTasks', () => {
    const action: TasksActions = new GetTasks();
    expect(action).toBeTruthy();
    expect(action.type).toBe(TasksActionTypes.GET_TASKS);
  });

  it('should create GetTasksSuccess', () => {
    const action: TasksActions = new GetTasksSuccess([]);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual([]);
    expect(action.type).toBe(TasksActionTypes.GET_TASKS_SUCCESS);
  });

  it('should create GetTasksError', () => {
    const action: TasksActions = new GetTasksError(error);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(error);
    expect(action.type).toBe(TasksActionTypes.GET_TASKS_ERROR);
  });

  it('should create CreateTask', () => {
    const action: TasksActions = new CreateTask(task);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(task);
    expect(action.type).toBe(TasksActionTypes.CREATE_TASK);
  });

  it('should create CreateTaskSuccess', () => {
    const action: TasksActions = new CreateTaskSuccess(task);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(task);
    expect(action.type).toBe(TasksActionTypes.CREATE_TASK_SUCCESS);
  });

  it('should create CreateTaskError', () => {
    const action: TasksActions = new CreateTaskError(error);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(error);
    expect(action.type).toBe(TasksActionTypes.CREATE_TASK_ERROR);
  });

  it('should create UpdateTask', () => {
    const action: TasksActions = new UpdateTask(task);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(task);
    expect(action.type).toBe(TasksActionTypes.UPDATE_TASK);
  });

  it('should create UpdateTaskSuccess', () => {
    const action: TasksActions = new UpdateTaskSuccess(task);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(task);
    expect(action.type).toBe(TasksActionTypes.UPDATE_TASK_SUCCESS);
  });

  it('should create UpdateTaskError', () => {
    const action: TasksActions = new UpdateTaskError(error);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(error);
    expect(action.type).toBe(TasksActionTypes.UPDATE_TASK_ERROR);
  });

  it('should create RemoveTask', () => {
    const action: TasksActions = new RemoveTask(task);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(task);
    expect(action.type).toBe(TasksActionTypes.REMOVE_TASK);
  });

  it('should create RemoveTaskSuccess', () => {
    const action: TasksActions = new RemoveTaskSuccess(task);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(task);
    expect(action.type).toBe(TasksActionTypes.REMOVE_TASK_SUCCESS);
  });

  it('should create RemoveTaskError', () => {
    const action: TasksActions = new RemoveTaskError(error);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(error);
    expect(action.type).toBe(TasksActionTypes.REMOVE_TASK_ERROR);
  });

  it('should create FilterTasks', () => {
    const action: TasksActions = new FilterTasks(filter);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(filter);
    expect(action.type).toBe(TasksActionTypes.FILTER_TASKS);
  });

  it('should create ToggleStatistic', () => {
    const action: TasksActions = new ToggleStatistic(true);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(true);
    expect(action.type).toBe(TasksActionTypes.TOGGLE_STATISTIC);
  });
});
