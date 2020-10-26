import { CategoriesActionTypes, CategoriesActions } from './categories.actions';
import { initialCategoriesState, CategoriesState, categoryAdapter, } from './categories.state';

export function categoriesReducer(state = initialCategoriesState, action: CategoriesActions): CategoriesState {

  switch (action.type) {
    case CategoriesActionTypes.GET_CATEGORIES: {
      return {
        ...state,
        loading: true,
      };
    }

    case CategoriesActionTypes.GET_CATEGORIES_SUCCESS: {
      return categoryAdapter.setAll(action.payload, { ...state, loading: false, loaded: true });
    }

    case CategoriesActionTypes.GET_CATEGORIES_ERROR: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload,
      };
    }

    case CategoriesActionTypes.CREATE_CATEGORY_SUCCESS: {
      return categoryAdapter.addOne(action.payload, { ...state, selected: action.payload });
    }

    case CategoriesActionTypes.UPDATE_CATEGORY_SUCCESS: {
      return categoryAdapter.updateOne({ id: action.payload.id, changes: action.payload }, state);
    }

    case CategoriesActionTypes.REMOVE_CATEGORY_SUCCESS: {
      const nextState = { ...state };

      if (action.payload.id === state.selected?.id) {
        Object.assign(nextState, { selected: null });
      }

      return categoryAdapter.removeOne(action.payload.id, nextState);
    }

    case CategoriesActionTypes.SELECT_CATEGORY: {
      const selected = action.payload;

      return {
        ...state,
        selected,
      };
    }

    case CategoriesActionTypes.FILTER_CATEGORIES: {
      const filter = action.payload;

      return {
        ...state,
        filter,
      };
    }

    default:
      return state;
  }
}
