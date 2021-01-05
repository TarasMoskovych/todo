import { Priority, TestData } from 'src/app/models';
import {
  GetPriorities,
  PrioritiesActions,
  PrioritiesActionTypes,
  GetPrioritiesSuccess,
  GetPrioritiesError,
  CreatePriority,
  CreatePrioritySuccess,
  CreatePriorityError,
  UpdatePriority,
  UpdatePrioritySuccess,
  UpdatePriorityError,
  RemovePriority,
  RemovePrioritySuccess,
  RemovePriorityError
} from './priorities.actions';

const { priorities } = TestData.data;
const error = 'Some error message';
const priority: Priority = priorities[0];

describe('PrioritiesActions', () => {

  it('should create GetPriorities', () => {
    const action: PrioritiesActions = new GetPriorities();
    expect(action).toBeTruthy();
    expect(action.type).toBe(PrioritiesActionTypes.GET_PRIORITIES);
  });

  it('should create GetPrioritiesSuccess', () => {
    const action: PrioritiesActions = new GetPrioritiesSuccess([]);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual([]);
    expect(action.type).toBe(PrioritiesActionTypes.GET_PRIORITIES_SUCCESS);
  });

  it('should create GetPrioritiesError', () => {
    const action: PrioritiesActions = new GetPrioritiesError(error);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(error);
    expect(action.type).toBe(PrioritiesActionTypes.GET_PRIORITIES_ERROR);
  });

  it('should create CreatePriority', () => {
    const action: PrioritiesActions = new CreatePriority(priority);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(priority);
    expect(action.type).toBe(PrioritiesActionTypes.CREATE_PRIORITY);
  });

  it('should create CreatePrioritySuccess', () => {
    const action: PrioritiesActions = new CreatePrioritySuccess(priority);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(priority);
    expect(action.type).toBe(PrioritiesActionTypes.CREATE_PRIORITY_SUCCESS);
  });

  it('should create CreatePriorityError', () => {
    const action: PrioritiesActions = new CreatePriorityError(error);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(error);
    expect(action.type).toBe(PrioritiesActionTypes.CREATE_PRIORITY_ERROR);
  });

  it('should create UpdatePriority', () => {
    const action: PrioritiesActions = new UpdatePriority(priority);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(priority);
    expect(action.type).toBe(PrioritiesActionTypes.UPDATE_PRIORITY);
  });

  it('should create UpdatePrioritySuccess', () => {
    const action: PrioritiesActions = new UpdatePrioritySuccess(priority);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(priority);
    expect(action.type).toBe(PrioritiesActionTypes.UPDATE_PRIORITY_SUCCESS);
  });

  it('should create UpdatePriorityError', () => {
    const action: PrioritiesActions = new UpdatePriorityError(error);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(error);
    expect(action.type).toBe(PrioritiesActionTypes.UPDATE_PRIORITY_ERROR);
  });

  it('should create RemovePriority', () => {
    const action: PrioritiesActions = new RemovePriority(priority);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(priority);
    expect(action.type).toBe(PrioritiesActionTypes.REMOVE_PRIORITY);
  });

  it('should create RemovePrioritySuccess', () => {
    const action: PrioritiesActions = new RemovePrioritySuccess(priority);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(priority);
    expect(action.type).toBe(PrioritiesActionTypes.REMOVE_PRIORITY_SUCCESS);
  });

  it('should create RemovePriorityError', () => {
    const action: PrioritiesActions = new RemovePriorityError(error);
    expect(action).toBeTruthy();
    expect(action.payload).toEqual(error);
    expect(action.type).toBe(PrioritiesActionTypes.REMOVE_PRIORITY_ERROR);
  });
});
