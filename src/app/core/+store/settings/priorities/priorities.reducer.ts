import { Priority } from 'src/app/models';
import { PrioritiesActionTypes, PrioritiesActions } from './priorities.actions';
import { initialPrioritiesState, PrioritiesState, PriorityEntity, } from './priorities.state';

export function prioritiesReducer(state = initialPrioritiesState, action: PrioritiesActions): PrioritiesState {

  switch (action.type) {
    case PrioritiesActionTypes.GET_PRIORITIES: {
      return {
        ...state,
        loading: true,
      };
    }

    case PrioritiesActionTypes.GET_PRIORITIES_SUCCESS: {
      const entities = action.payload.reduce((acc: PriorityEntity, priority: Priority) => {
        return { ...acc, [priority.id]: priority }
      }, { ...state.entities });

      return {
        ...state,
        entities,
        loading: false,
        loaded: true,
      };
    }

    case PrioritiesActionTypes.GET_PRIORITIES_ERROR: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload,
      };
    }

    case PrioritiesActionTypes.REMOVE_PRIORITY_SUCCESS: {
      const { [action.payload.id]: current, ...entities } = state.entities;

      return {
        ...state,
        entities,
      };
    }

    default:
      return state;
  }
}
