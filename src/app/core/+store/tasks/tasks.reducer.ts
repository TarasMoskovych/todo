import { Task } from 'src/app/models';
import { TasksActionTypes, TasksActions } from './tasks.actions';
import { initialTasksState, TasksState, TaskEntity, } from './tasks.state';

export function tasksReducer(state = initialTasksState, action: TasksActions): TasksState {

  switch (action.type) {
    case TasksActionTypes.GET_TASKS: {
      return {
        ...state,
        loading: true,
      };
    }

    case TasksActionTypes.GET_TASKS_SUCCESS: {
      const entities = action.payload.reduce((acc: TaskEntity, task: Task) => {
        return { ...acc, [task.id]: task }
      }, { ...state.entities });

      return {
        ...state,
        entities,
        loading: false,
        loaded: true,
      };
    }

    case TasksActionTypes.GET_TASKS_ERROR: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload,
      };
    }

    case TasksActionTypes.CREATE_TASK_SUCCESS:
    case TasksActionTypes.UPDATE_TASK_SUCCESS: {
      const entities = { ...state.entities, [action.payload.id]: action.payload };

      return {
        ...state,
        entities,
      };
    }

    case TasksActionTypes.REMOVE_TASK_SUCCESS: {
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
