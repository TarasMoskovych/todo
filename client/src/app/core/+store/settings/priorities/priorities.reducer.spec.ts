import { Priority, TestData } from 'src/app/models';
import { prioritiesReducer } from './priorities.reducer';
import { initialPrioritiesState, PriorityEntity } from './priorities.state';
import {
  CreatePrioritySuccess,
  GetPriorities,
  GetPrioritiesError,
  GetPrioritiesSuccess,
  RemovePrioritySuccess,
  UpdatePrioritySuccess
} from './priorities.actions';

const { priorities, prioritiesEntities: entities } = TestData.data;

describe('PrioritiesReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const state = prioritiesReducer(undefined, {} as any);

      expect(state).toBe(initialPrioritiesState);
    });
  });

  describe('GET_PRIORITIES action', () => {
    it('should set loading property to true', () => {
      const state = prioritiesReducer(initialPrioritiesState, new GetPriorities());

      expect(state.loaded).toEqual(false);
      expect(state.loading).toEqual(true);
      expect(state.entities).toEqual({});
    });
  });

  describe('GET_PRIORITIES_SUCCESS action', () => {
    it('should populate priorities array', () => {
      const state = prioritiesReducer(initialPrioritiesState, new GetPrioritiesSuccess(priorities));

      expect(state.loaded).toEqual(true);
      expect(state.loading).toEqual(false);
      expect(state.entities).toEqual(entities);
    });
  });

  describe('GET_PRIORITIES_ERROR action', () => {
    it('should populate error', () => {
      const error = new Error('Error during getting priorities.')
      const state = prioritiesReducer(initialPrioritiesState, new GetPrioritiesError(error));

      expect(state.loaded).toEqual(false);
      expect(state.loading).toEqual(false);
      expect(state.entities).toEqual({});
      expect(state.error).toEqual(error);
    });
  });

  describe('CREATE_PRIORITY_SUCCESS action', () => {
    it('should create new priority', () => {
      const priority: Priority = {
        id: '10',
        name: 'lowest',
        color: '#eee'
      };
      const entity: PriorityEntity = { 10: priority };
      const state = prioritiesReducer({ ...initialPrioritiesState, entities }, new CreatePrioritySuccess(priority));

      expect(state.entities).toEqual({ ...entities, ...entity });
    });
  });

  describe('UPDATE_PRIORITY_SUCCESS action', () => {
    it('should update the priority', () => {
      const priority: Priority =  {
        id: '3',
        name: 'high',
        color: '#fff'
      };
      const state = prioritiesReducer({ ...initialPrioritiesState, entities }, new UpdatePrioritySuccess(priority));

      expect(state.entities).toEqual({ ...entities, 3: priority });
    });
  });

  describe('REMOVE_PRIORITY_SUCCESS action', () => {
    it('should remove the priority', () => {
      const state = prioritiesReducer({ ...initialPrioritiesState, entities }, new RemovePrioritySuccess(priorities[1]));

      expect(state.entities).toEqual({
        1: priorities[0],
        3: priorities[2],
        4: priorities[3],
      });
    });
  });
});
