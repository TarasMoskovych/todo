import { Category } from 'src/app/models';
import { CategoriesActionTypes, CategoriesActions } from './categories.actions';
import { initialCategoriesState, CategoriesState, CategoryEntity, } from './categories.state';

export function categoriesReducer(state = initialCategoriesState, action: CategoriesActions): CategoriesState {

  switch (action.type) {
    case CategoriesActionTypes.GET_CATEGORIES: {
      return {
        ...state,
        loading: true,
      };
    }

    case CategoriesActionTypes.GET_CATEGORIES_SUCCESS: {
      const entities = action.payload.reduce((acc: CategoryEntity, category: Category) => {
        return { ...acc, [category.id]: category }
      }, { ...state.entities });

      return {
        ...state,
        entities,
        loading: false,
        loaded: true,
      };
    }

    case CategoriesActionTypes.GET_CATEGORIES_ERROR: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload,
      };
    }

    case CategoriesActionTypes.CREATE_CATEGORY_SUCCESS:
    case CategoriesActionTypes.UPDATE_CATEGORY_SUCCESS: {
      const entities = { ...state.entities, [action.payload.id]: action.payload };

      return {
        ...state,
        entities,
      };
    }

    case CategoriesActionTypes.REMOVE_CATEGORY_SUCCESS: {
      const { [action.payload.id]: current, ...entities } = state.entities;

      return {
        ...state,
        entities,
      };
    }

    case CategoriesActionTypes.SELECT_CATEGORY: {
      const selected = action.payload;

      return {
        ...state,
        selected,
      }
    }

    default:
      return state;
  }
}
