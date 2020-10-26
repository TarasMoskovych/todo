import { TasksActionTypes, TasksActions } from './tasks.actions';
import { initialTasksState, TasksState, taskAdapter, } from './tasks.state';

export function tasksReducer(state = initialTasksState, action: TasksActions): TasksState {

  switch (action.type) {
    case TasksActionTypes.GET_TASKS: {
      return {
        ...state,
        loading: true,
      };
    }

    case TasksActionTypes.GET_TASKS_SUCCESS: {
      return taskAdapter.setAll(action.payload, { ...state, loading: false, loaded: true });
    }

    case TasksActionTypes.GET_TASKS_ERROR: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload,
      };
    }

    case TasksActionTypes.CREATE_TASK_SUCCESS: {
      return taskAdapter.addOne(action.payload, state);
    }

    case TasksActionTypes.UPDATE_TASK_SUCCESS: {
      return taskAdapter.updateOne({ id: action.payload.id, changes: action.payload }, state);
    }

    case TasksActionTypes.REMOVE_TASK_SUCCESS: {
      return taskAdapter.removeOne(action.payload.id, state);
    }

    case TasksActionTypes.FILTER_TASKS: {
      const filter = action.payload;

      return {
        ...state,
        filter,
      };
    }

    case TasksActionTypes.TOGGLE_STATISTIC: {
      const statistic = action.payload;

      return {
        ...state,
        statistic,
      };
    }

    default:
      return state;
  }
}
